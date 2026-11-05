/* Scénarios du parcours dans des dépôts temporaires ne contenant que des données fictives.
   Node 18+ et Git 2.28+. Aucun réseau, aucune configuration globale modifiée. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {spawnSync}=require('node:child_process');
const assert=require('node:assert/strict');
const workspace=fs.mkdtempSync(path.join(os.tmpdir(),'formation-git-v3-'));
const repo=path.join(workspace,'atelier-git'),other=path.join(workspace,'lecteur-b'),remote=path.join(workspace,'partage.git');
const hooks=path.join(workspace,'empty-hooks');fs.mkdirSync(repo);fs.mkdirSync(hooks);
const emptyConfig=path.join(workspace,'empty-config');fs.writeFileSync(emptyConfig,'');
const env={...process.env,GIT_CONFIG_NOSYSTEM:'1',GIT_CONFIG_GLOBAL:emptyConfig,GIT_TERMINAL_PROMPT:'0',GIT_PAGER:'cat',GIT_MERGE_AUTOEDIT:'no'};
for(const key of ['GIT_DIR','GIT_WORK_TREE','GIT_INDEX_FILE','GIT_OBJECT_DIRECTORY','GIT_ALTERNATE_OBJECT_DIRECTORIES','GIT_COMMON_DIR','GIT_CONFIG','GIT_CONFIG_COUNT'])delete env[key];
function command(cwd,args,expected=0){
  const r=spawnSync('git',['-c','core.autocrlf=false','-c','commit.gpgsign=false','-c','tag.gpgSign=false','-c','core.hooksPath='+hooks,...args],{cwd,env,encoding:'utf8',timeout:15000});
  if(r.error)throw r.error;
  assert.equal(r.status,expected,`git ${args.join(' ')}\n${r.stdout}\n${r.stderr}`);return r.stdout.trim();
}
const git=(...args)=>command(repo,args);
const write=(name,text)=>fs.writeFileSync(path.join(repo,name),text+'\n');
const read=name=>fs.readFileSync(path.join(repo,name),'utf8');
function identity(cwd){command(cwd,['config','--local','user.name','Atelier Git']);command(cwd,['config','--local','user.email','atelier@example.invalid']);}
let passed=0;function test(label,fn){fn();passed++;console.log('OK '+label);}
test('initialisation, identité locale et premier commit (leçons 1–2)',()=>{
  git('init','-b','main');identity(repo);write('README.md','Carnet de lecture fictif');assert(git('status','--short').includes('?? README.md'));
  git('add','README.md');assert(git('diff','--staged').includes('Carnet de lecture fictif'));git('commit','-m','Initialiser le carnet fictif');assert.equal(git('status','--porcelain'),'');assert.equal(git('remote','-v'),'');
});
test('contenu préparé distinct des éditions suivantes et observation (leçons 3–4)',()=>{
  write('README.md','Carnet de lecture fictif\nObjectif : suivre des lectures');git('add','README.md');
  write('README.md','Carnet de lecture fictif\nObjectif : suivre des lectures\nAtelier local');
  assert(git('diff').includes('+Atelier local'));assert(!git('diff','--staged').includes('+Atelier local'));
  git('commit','-m','Préciser l’objectif du carnet');assert(!git('show','HEAD:README.md').includes('Atelier local'));assert(git('show','HEAD').includes('Objectif'));
  assert(git('diff','HEAD~1','HEAD').includes('Objectif'));assert(git('status','--porcelain').includes('README.md'));
  git('add','README.md');git('commit','-m','Décrire le contexte local');
});
test('branche et fusion fast-forward sans nouveau commit (leçons 5–6)',()=>{
  git('switch','-c','ajout-liste');write('livres.txt','Mer calme\nJardin\nVoyage');git('add','livres.txt');git('commit','-m','Ajouter une première liste de lectures');
  const target=git('rev-parse','HEAD');git('switch','main');assert(!fs.existsSync(path.join(repo,'livres.txt')));
  const before=git('rev-list','--all','--count');git('merge','ajout-liste');assert.equal(git('rev-parse','HEAD'),target);assert.equal(git('rev-list','--all','--count'),before);assert.equal(read('livres.txt').trim().split('\n').length,3);
});
test('conflit provoqué et résolution à deux parents (leçon 7)',()=>{
  git('switch','-c','titre-mer');write('livres.txt','Mer tranquille\nJardin\nVoyage');git('add','livres.txt');git('commit','-m','Préciser le titre maritime');
  git('switch','main');write('livres.txt','Océan calme\nJardin\nVoyage');git('add','livres.txt');git('commit','-m','Renommer le titre principal');
  command(repo,['merge','titre-mer'],1);assert(read('livres.txt').includes('<<<<<<< HEAD'));assert(git('status','--porcelain').includes('UU livres.txt'));
  write('livres.txt','Mer tranquille\nJardin\nVoyage');git('add','livres.txt');git('commit','-m','Réconcilier les deux propositions de titre');
  assert.equal(git('show','--no-patch','--format=%P','HEAD').split(' ').length,2);assert.equal(git('status','--porcelain'),'');
});
test('désindexation sans perte et annulation traçable (leçon 8)',()=>{
  const original=read('README.md');write('README.md',original.trimEnd()+'\nBrouillon jetable');git('add','README.md');git('restore','--staged','README.md');
  assert.equal(git('diff','--staged'),'');assert(read('README.md').includes('Brouillon jetable'));git('add','README.md');git('commit','-m','Ajouter un brouillon de démonstration');
  const originalCommit=git('rev-parse','HEAD');git('revert','--no-edit','HEAD');assert.equal(read('README.md'),original);assert(git('log','--format=%H').includes(originalCommit));
});
test('stash avec non-suivi, apply et règle ignore (leçon 9)',()=>{
  const original=read('README.md');write('README.md',original.trimEnd()+'\nNote temporaire');write('brouillon-local.txt','Texte fictif');
  git('stash','push','-u','-m','Pause du carnet fictif');assert.equal(read('README.md'),original);assert(!fs.existsSync(path.join(repo,'brouillon-local.txt')));
  git('stash','apply');assert(read('README.md').includes('Note temporaire'));assert.equal(git('stash','list').split('\n').length,1);
  write('.gitignore','brouillon-local.txt');assert(git('check-ignore','-v','brouillon-local.txt').includes('.gitignore'));git('add','README.md','.gitignore');git('commit','-m','Documenter et ignorer le brouillon');
});
test('partage local, clone, fetch séparé puis intégration (leçon 10)',()=>{
  git('init','--bare','-b','main',remote);git('remote','add','origin',remote);git('push','-u','origin','main');git('clone',remote,other);identity(other);
  fs.appendFileSync(path.join(other,'README.md'),'Lu depuis le clone B\n');command(other,['add','README.md']);command(other,['commit','-m','Ajouter une note depuis B']);command(other,['push','origin','main']);
  const before=git('rev-parse','main');git('fetch','origin');assert.equal(git('rev-parse','main'),before);assert.notEqual(git('rev-parse','origin/main'),before);assert(git('diff','main','origin/main').includes('Lu depuis le clone B'));
  git('merge','--ff-only','origin/main');assert.equal(git('rev-parse','main'),command(other,['rev-parse','main']));
});
test('tag annoté partagé explicitement et atelier final (leçons 11–12)',()=>{
  git('tag','-a','carnet-v1.0','-m','Première version du carnet fictif vérifiée');assert.equal(git('cat-file','-t','carnet-v1.0'),'tag');git('push','origin','carnet-v1.0');
  assert(command(remote,['show-ref','--tags']).includes('refs/tags/carnet-v1.0'));
  git('switch','-c','ajout-quatrieme-titre');fs.appendFileSync(path.join(repo,'livres.txt'),'Aube\n');fs.appendFileSync(path.join(repo,'README.md'),'Mode d’utilisation de démonstration\n');
  git('add','livres.txt','README.md');git('commit','-m','Ajouter une lecture et sa note d’utilisation');assert(git('diff','main...HEAD').includes('+Aube'));
  git('switch','main');git('merge','ajout-quatrieme-titre');git('push','origin','main');command(other,['fetch','origin']);command(other,['merge','--ff-only','origin/main']);
  assert.equal(read('livres.txt'),fs.readFileSync(path.join(other,'livres.txt'),'utf8'));assert.equal(read('livres.txt').trim().split('\n').length,4);assert.equal(git('rev-parse','HEAD'),command(other,['rev-parse','HEAD']));
});
console.log(`\n${passed} scénarios Git réussis, sans accès réseau. Dépôts fictifs conservés dans : ${workspace}`);
