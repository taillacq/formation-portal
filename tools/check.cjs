'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const context={};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(root,'assets/content.js'),'utf8'),context);
const content=JSON.parse(JSON.stringify(context.PORTAL_CONTENT));
const P=require('../assets/progress.js');
const catalog=new Map(content.lessons.map(l=>[l.id,l.quiz.length]));
let passed=0;
function test(name,fn){fn();passed++;console.log('OK '+name);}
function memory(){const data=new Map();return {getItem:k=>data.has(k)?data.get(k):null,setItem:(k,v)=>data.set(k,v),data};}
const wrap=p=>P.envelope(p,content.version);
const read=text=>P.parse(text,catalog,content.version);
const sample=()=>({completed:['tae-01'],quizzes:{'tae-01':{best:3,last:2,total:3,attempts:4,updatedAt:'2026-11-05T10:00:00.000Z'}}});
test('26 leçons uniques, 78 questions complètes, deux parcours',()=>{
  assert.equal(content.lessons.length,26);assert.equal(catalog.size,26);assert.equal(content.lessons.filter(l=>l.course==='istqb').length,16);assert.equal(content.lessons.filter(l=>l.course==='vibe').length,10);
  assert.equal(content.lessons.reduce((n,l)=>n+l.quiz.length,0),78);
  for(const l of content.lessons){assert(l.concepts.length>=3);assert(l.exercise.length>60&&l.solution.length>100);for(const q of l.quiz){assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4);assert(q.explanation.length>40);}}
});
test('aller-retour JSON exact',()=>assert.deepEqual(read(JSON.stringify(wrap(sample()))),sample()));
test('rejet atomique de 13 familles de fichiers invalides',()=>{
  const mutations=[d=>d.schemaVersion=99,d=>d.contentVersion='3.0.0',d=>d.format='autre',d=>d.progress.completed.push('inconnu'),d=>d.progress.completed.push('tae-01'),d=>d.progress.quizzes['tae-01'].last=-1,d=>d.progress.quizzes['tae-01'].best=4,d=>d.progress.quizzes['tae-01'].total=30,d=>d.progress.quizzes['tae-01'].attempts=0,d=>d.exportedAt='demain',d=>d.progress.quizzes['tae-01'].updatedAt='2026-02-30T10:00:00.000Z',d=>d.progress.secret='refusé',d=>d.progress.quizzes.inconnu=d.progress.quizzes['tae-01']];
  for(const mutation of mutations){const d=wrap(sample());mutation(d);assert.throws(()=>read(JSON.stringify(d)));}
  assert.throws(()=>read('{cassé'));assert.throws(()=>read(' '.repeat(P.MAX_BYTES+1)));assert.throws(()=>read('null'));assert.throws(()=>read('{"__proto__":{}}'));
});
test('fusion sans perte, symétrique et idempotente ; compteurs non additionnés',()=>{
  const a=sample(),b={completed:['vibe-01'],quizzes:{'tae-01':{best:2,last:1,total:3,attempts:2,updatedAt:'2026-11-05T12:00:00.000Z'}}};
  const m=P.merge(a,b);assert.deepEqual(m.completed,['tae-01','vibe-01']);assert.equal(m.quizzes['tae-01'].best,3);assert.equal(m.quizzes['tae-01'].last,1);assert.equal(m.quizzes['tae-01'].attempts,4);
  assert.deepEqual(P.merge(m,b),m);assert.deepEqual(P.merge(a,b),P.merge(b,a));
  b.quizzes['tae-01'].updatedAt=a.quizzes['tae-01'].updatedAt;assert.deepEqual(P.merge(a,b),P.merge(b,a));
});
test('copie préalable, import répété et relecture persistante',()=>{
  const storage=memory(),s=P.createStore(storage,catalog,content.version);s.complete('vibe-01');s.record('vibe-01',1);
  const before=s.state,p=s.preview(JSON.stringify(wrap(sample())));assert.deepEqual(s.state,before);assert.equal(s.import(p.imported),true);assert.deepEqual(s.previous().progress,before);
  const once=s.state;s.import(p.imported);assert.deepEqual(s.state,once);assert.deepEqual(P.createStore(storage,catalog,content.version).state,once);
});
test('un import invalide ne touche ni état ni stockage',()=>{
  const storage=memory(),s=P.createStore(storage,catalog,content.version);s.complete('tae-02');const raw=storage.getItem(P.KEY),before=s.state;
  assert.throws(()=>s.preview('{"format":"inconnu"}'));assert.throws(()=>s.import({completed:['intrus'],quizzes:{}}));assert.equal(storage.getItem(P.KEY),raw);assert.deepEqual(s.state,before);
});
test('échec de copie préalable : aucune écriture de progression',()=>{
  const storage=memory(),s=P.createStore(storage,catalog,content.version);s.complete('tae-02');const raw=storage.getItem(P.KEY),before=s.state;
  const original=storage.setItem;storage.setItem=(k,v)=>{if(k===P.BACKUP_KEY)throw Error('quota');original(k,v);};
  assert.throws(()=>s.import(sample()));assert.equal(storage.getItem(P.KEY),raw);assert.deepEqual(s.state,before);
});
test('échec d’écriture après copie : ancien état conservé',()=>{
  const storage=memory(),s=P.createStore(storage,catalog,content.version);s.complete('tae-02');const raw=storage.getItem(P.KEY),before=s.state;
  const original=storage.setItem;storage.setItem=(k,v)=>{if(k===P.KEY)throw Error('quota');original(k,v);};
  assert.throws(()=>s.import(sample()));assert.equal(storage.getItem(P.KEY),raw);assert.deepEqual(s.state,before);assert.equal(storage.getItem(P.BACKUP_KEY),raw);
});
test('quota dépassé : progression de session exportable',()=>{
  const storage={getItem:()=>null,setItem:()=>{throw Error('quota');}},s=P.createStore(storage,catalog,content.version);
  assert.equal(s.complete('tae-01'),false);assert.equal(s.mode,'memory');assert.deepEqual(read(JSON.stringify(s.export())).completed,['tae-01']);
});
test('stockage absent : progression de session et import en mémoire',()=>{
  const s=P.createStore(null,catalog,content.version);s.complete('vibe-02');assert.equal(s.mode,'memory');assert.equal(s.import(sample()),false);assert.deepEqual(s.state.completed,['tae-01','vibe-02']);
});
test('valeur corrompue protégée puis réparée par import avec copie brute',()=>{
  const storage=memory();storage.setItem(P.KEY,'{cassé');const s=P.createStore(storage,catalog,content.version);
  assert.equal(s.mode,'corrupt');assert.equal(s.complete('vibe-03'),false);assert.equal(storage.getItem(P.KEY),'{cassé');
  s.import(sample());assert.equal(storage.getItem(P.BACKUP_KEY),'{cassé');assert.deepEqual(s.state.completed,['tae-01','vibe-03']);
});
test('deux onglets : lecture avant modification et fusion des acquis',()=>{
  const storage=memory(),a=P.createStore(storage,catalog,content.version),b=P.createStore(storage,catalog,content.version);
  a.complete('tae-01');b.complete('vibe-01');a.record('tae-01',3);b.record('vibe-01',2);a.sync();b.sync();assert.deepEqual(a.state,b.state);assert.equal(a.state.completed.length,2);assert.equal(Object.keys(a.state.quizzes).length,2);
});
test('meilleur résultat conservé après un moins bon essai',()=>{
  const s=P.createStore(memory(),catalog,content.version);s.record('tae-01',3);s.record('tae-01',1);assert.equal(s.state.quizzes['tae-01'].best,3);assert.equal(s.state.quizzes['tae-01'].last,1);assert.equal(s.state.quizzes['tae-01'].attempts,2);
});
test('aucune dépendance distante et ressources locales présentes',()=>{
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
  for(const match of html.matchAll(/(?:src|href)="(\.\/[^"?]+)(?:\?[^"]*)?"/g))assert(fs.existsSync(path.resolve(root,match[1])));
  assert(!/<script[^>]+src="https?:/i.test(html));assert(!/<link[^>]+href="https?:/i.test(html));
  for(const file of ['assets/app.js','assets/progress.js','assets/content.js','assets/style.css'])assert(!/\bfetch\s*\(|XMLHttpRequest|WebSocket|@import|url\s*\(\s*['"]?https?:/i.test(fs.readFileSync(path.join(root,file),'utf8')));
});
console.log(`\n${passed} groupes de contrôles réussis. Tests du navigateur : voir VALIDATION.md.`);
