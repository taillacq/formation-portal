/* Moteur sans dépendance, partagé par le navigateur et les tests Node. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.PortalProgress=api;
})(typeof globalThis==='undefined'?this:globalThis,function(){
'use strict';
const KEY='formation-portal.progress.v3';
const LEGACY_KEY='formation-portal.progress.v2';
const BACKUP_KEY='formation-portal.progress.v3.before-import';
const FORMAT='formation-portal-progress';
const MAX_BYTES=1024*1024;
function fail(message){throw new Error(message);}
function object(value,label){if(!value||typeof value!=='object'||Array.isArray(value)) fail(label+' : objet attendu.');}
function fields(value,keys,label){object(value,label);const actual=Object.keys(value);if(actual.length!==keys.length||actual.some(k=>!keys.includes(k)))fail(label+' : champs inattendus ou manquants.');}
function date(value){return typeof value==='string'&&/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)&&Number.isFinite(Date.parse(value))&&new Date(value).toISOString()===value;}
function integer(n,min,max){return Number.isInteger(n)&&n>=min&&n<=max;}
const fresh=()=>({completed:[],quizzes:{}});
const clone=x=>JSON.parse(JSON.stringify(x));
function envelope(progress,version){return {format:FORMAT,schemaVersion:2,contentVersion:version,exportedAt:new Date().toISOString(),progress:clone(progress)};}
function validate(data,catalog,version){
  fields(data,['format','schemaVersion','contentVersion','exportedAt','progress'],'Fichier');
  if(data.format!==FORMAT)fail('Ce fichier n’est pas un export de progression du portail.');
  const legacy=version==='3.0.0'&&data.contentVersion==='2.0.0';
  if(data.schemaVersion!==2||(data.contentVersion!==version&&!legacy))fail('Version de sauvegarde incompatible avec ce portail.');
  if(!date(data.exportedAt))fail('Date de sauvegarde invalide.');
  fields(data.progress,['completed','quizzes'],'Progression');
  const p=data.progress;
  if(!Array.isArray(p.completed)||p.completed.length>catalog.size||new Set(p.completed).size!==p.completed.length)fail('Liste de leçons terminées invalide ou dupliquée.');
  const known=id=>typeof id==='string'&&catalog.has(id)&&(!legacy||/^(tae|vibe)-/.test(id));
  p.completed.forEach(id=>{if(!known(id))fail('Leçon inconnue dans le fichier.');});
  object(p.quizzes,'Quiz');
  if(Object.keys(p.quizzes).length>catalog.size)fail('Trop de résultats.');
  for(const [id,r] of Object.entries(p.quizzes)){
    if(!known(id))fail('Quiz inconnu dans le fichier.');
    fields(r,['best','last','total','attempts','updatedAt'],'Résultat de quiz');
    const total=catalog.get(id);
    if(r.total!==total||!integer(r.best,0,total)||!integer(r.last,0,r.best)||!integer(r.attempts,1,1000000)||!date(r.updatedAt))fail('Score, compteur ou date de quiz invalide.');
  }
  return clone(p);
}
function parse(text,catalog,version){
  if(typeof text!=='string'||text.length>MAX_BYTES||new TextEncoder().encode(text).length>MAX_BYTES)fail('Fichier trop volumineux (maximum 1 Mo).');
  let data;try{data=JSON.parse(text);}catch{fail('JSON illisible : choisissez un export .json du portail V2 ou V3.');}
  return validate(data,catalog,version);
}
function merge(a,b){
  const out=fresh();out.completed=[...new Set([...a.completed,...b.completed])].sort();
  for(const id of new Set([...Object.keys(a.quizzes),...Object.keys(b.quizzes)])){
    const x=a.quizzes[id],y=b.quizzes[id];
    if(!x||!y){out.quizzes[id]=clone(x||y);continue;}
    // En cas d’égalité de date, départage stable pour une fusion commutative.
    const recent=x.updatedAt>y.updatedAt?x:y.updatedAt>x.updatedAt?y:x.last>=y.last?x:y;
    out.quizzes[id]={best:Math.max(x.best,y.best),last:recent.last,total:x.total,attempts:Math.max(x.attempts,y.attempts),updatedAt:recent.updatedAt};
  }
  return out;
}
function createStore(storage,catalog,version){
  let state=fresh(),mode='saved',previous=null,migrated=false;
  try{
    if(!storage)throw Error('Stockage absent');
    let raw=storage.getItem(KEY);
    if(raw===null&&version==='3.0.0'){
      const legacyRaw=storage.getItem(LEGACY_KEY);
      if(legacyRaw!==null){
        try{
          // Ne jamais lire un état V3 stocké par erreur dans la clé V2 comme une migration V2.
          if(JSON.parse(legacyRaw).contentVersion!=='2.0.0')throw Error('Version V2 attendue');
          state=parse(legacyRaw,catalog,version);migrated=true;
        }catch{mode='corrupt';}
      }
    }else if(raw!==null){try{state=parse(raw,catalog,version);}catch{mode='corrupt';}}
  }catch{mode='memory';}
  const wrap=p=>envelope(p,version);
  function sync(){
    if(!storage||mode==='corrupt')return;
    let raw;try{raw=storage.getItem(KEY);}catch{mode='memory';return;}
    if(raw!==null){try{state=merge(state,parse(raw,catalog,version));}catch{mode='corrupt';}}
  }
  function commit(change){
    sync();const next=clone(state);change(next);validate(wrap(next),catalog,version);state=next;
    if(mode==='corrupt')return false;
    try{if(!storage)throw Error();storage.setItem(KEY,JSON.stringify(wrap(state)));mode='saved';return true;}catch{mode='memory';return false;}
  }
  return {
    get state(){return clone(state);},get mode(){return mode;},get migrated(){return migrated;},sync,
    export(){sync();return wrap(state);},
    complete(id){if(!catalog.has(id))fail('Leçon inconnue.');return commit(p=>{if(!p.completed.includes(id))p.completed.push(id);p.completed.sort();});},
    record(id,score){const total=catalog.get(id);if(!integer(score,0,total))fail('Score invalide.');return commit(p=>{const old=p.quizzes[id];p.quizzes[id]={best:Math.max(old?old.best:0,score),last:score,total,attempts:Math.min(1000000,(old?old.attempts:0)+1),updatedAt:new Date().toISOString()};});},
    preview(text){const imported=parse(text,catalog,version);sync();return {imported,merged:merge(state,imported)};},
    import(progress){
      validate(wrap(progress),catalog,version);sync();const before=clone(state),next=merge(before,progress);
      // Copie préalable obligatoire lorsque le stockage est accessible.
      if(storage){
        try{const raw=storage.getItem(KEY);storage.setItem(BACKUP_KEY,raw===null?JSON.stringify(wrap(before)):raw);storage.setItem(KEY,JSON.stringify(wrap(next)));}
        catch{fail('Import non appliqué : impossible de conserver la copie préalable ou d’écrire la progression. Exportez votre état actuel et libérez de l’espace ou autorisez le stockage.');}
        mode='saved';
      }else mode='memory';
      previous=before;state=next;return mode==='saved';
    },
    previous(){
      if(previous)return wrap(previous);
      try{const raw=storage&&storage.getItem(BACKUP_KEY);if(raw!==null&&raw!==false&&raw!==undefined){const p=parse(raw,catalog,version);return wrap(p);}}catch{}
      fail('Aucune copie préalable valide disponible dans ce navigateur.');
    }
  };
}
return {KEY,LEGACY_KEY,BACKUP_KEY,MAX_BYTES,fresh,envelope,parse,validate,merge,createStore};
});
