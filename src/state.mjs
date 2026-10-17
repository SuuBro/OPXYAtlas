export function sanitizeState(value,{actions,tutorials,controls,categories}){
 const v=value&&typeof value==='object'&&!Array.isArray(value)?value:{};
 const has=(items,id)=>items.some(x=>x.id===id);
 const progress={};for(const t of tutorials){const n=v.progress?.[t.id];if(Number.isInteger(n)&&n>=0)progress[t.id]=Math.min(n,t.steps.length-1);}
 const tutorial=has(tutorials,v.tutorial)?v.tutorial:null,action=has(actions,v.action)?v.action:null;
 return {query:typeof v.query==='string'?v.query.slice(0,500):'',frequency:v.frequency==='all'?'all':'common',category:categories.includes(v.category)?v.category:'all',control:has(controls,v.control)?v.control:null,action,tab:v.tab==='tutorials'?'tutorials':'actions',tutorial,step:Number.isInteger(v.step)&&v.step>=0?v.step:0,detailOpen:!!v.detailOpen&&!!(action||tutorial),progress};
}
export function pinchTransform({startCenter,currentCenter,startPan,startZoom,distanceRatio}){const zoom=Math.max(1,Math.min(7,startZoom*distanceRatio)),ratio=zoom/startZoom;return {zoom,pan:{x:currentCenter.x-(startCenter.x-startPan.x)*ratio,y:currentCenter.y-(startCenter.y-startPan.y)*ratio}};}
