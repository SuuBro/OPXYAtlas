import {byControl} from './geometry.mjs';
export const normalize = value => String(value).replace(/^\s*\+\s*$/,'plus').replace(/^\s*[-−]\s*$/,'minus').replace(/\+\s*\+\s*$/,' plus').replace(/\+\s*[-−]\s*$/,' minus').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[–—−]/g,'-').replace(/\brec\b/g,'record').replace(/\bbpm\b/g,'tempo').replace(/\bknob\b/g,'encoder').replace(/[^a-z0-9]+/g,' ').trim();
export const actionControls = a => [...new Set(a.interactions.flatMap(i=>i.controls))];
export function editDistance(a,b){const d=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){let prev=d[0];d[0]=i;for(let j=1;j<=b.length;j++){let old=d[j];d[j]=Math.min(d[j]+1,d[j-1]+1,prev+(a[i-1]!==b[j-1]));prev=old;}}return d[b.length];}
export function rankActions(actions,query='',{frequency='common',category='all',control=null}={}){
 const q=normalize(query), tokens=q.split(' ').filter(t=>t&&!['how','do','does','can','could','i','the','a','an','to','my','please','on','of','for'].includes(t));
 const order=['Playback','Tracks','Sequencing','Recording','Editing','Sounds','Arrangement','Mixing','Automation','Advanced','Sampling','System'];
 return actions.flatMap(a=>{
  const ids=actionControls(a);
  if(control&&!ids.includes(control))return [];
  if(category!=='all'&&a.category!==category)return [];
  if(!q&&!control&&frequency==='common'&&a.priority<70)return [];
  const name=normalize(a.name),aliases=(a.aliases||[]).map(normalize),labels=ids.map(id=>normalize(byControl[id]?.label||id));
  const text=[name,...aliases,normalize(a.description),normalize(a.context),...labels].join(' '),words=text.split(' ');
  let score=0;
  if(q){if(!tokens.length)return [];if(name===q)score=10000;else if(aliases.includes(q))score=9500;else if(name.startsWith(q))score=8500;else if(name.includes(q))score=8000;else if(tokens.every(t=>text.includes(t)))score=6000+tokens.filter(t=>name.includes(t)).length*100;
  else if(tokens.every(t=>words.some(w=>w===t||(t.length>3&&Math.abs(w.length-t.length)<=1&&editDistance(w,t)<=1))))score=1000;else return [];}
  return [{action:a,score}];
 }).sort((a,b)=>b.score-a.score||(!q&&!control?(order.indexOf(a.action.category)-order.indexOf(b.action.category)):0)||b.action.priority-a.action.priority||a.action.name.localeCompare(b.action.name)).map(x=>x.action);
}
