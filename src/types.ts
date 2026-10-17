export type InteractionType = 'press' | 'hold' | 'release' | 'rotate' | 'simultaneous' | 'switch' | 'pressure';
export interface Control { id:string; label:string; type:'button'|'encoder'|'potentiometer'|'pressure'|'switch'; x:number;y:number;w:number;h:number;group:string; accessibilityLabel:string;fill:string;symbol:string;touchTarget:{x:number;y:number;w:number;h:number} }
export interface SourceReference {url:string;section:string;revision:string;checked:string;note?:string;verification?:'documented'|'inferred';notes?:string}
export interface Interaction {type:InteractionType;controls:string[];instruction:string}
export interface Action {id:string;name:string;description:string;category:string;priority:number;aliases:string[];context:string;contextId:string;interactions:Interaction[];outcome:string;related:string[];verification:'documented'|'inferred';sources:SourceReference[];warning?:string}
export interface Tutorial {id:string;title:string;objective:string;prerequisites:string;sources:SourceReference[];verification:'documented'|'inferred';steps:{actionId:string;instruction?:string;outcome?:string}[]}
export interface Context {id:string;mode:'instrument'|'auxiliary'|'arrange'|'mix'|'song'|null;selectedTrack:string|null;selectedModule:string|null;patternOrSceneState:string|null;playback:'stopped'|'playing'|null;prerequisites:string[]}
