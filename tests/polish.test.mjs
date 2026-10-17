import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const css=readFileSync(new URL('../src/style.css',import.meta.url),'utf8');const html=readFileSync(new URL('../src/index.html',import.meta.url),'utf8');
function luminance(hex){const v=hex.match(/[a-f0-9]{2}/gi).map(c=>parseInt(c,16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);return v[0]*.2126+v[1]*.7152+v[2]*.0722;}
function contrast(a,b){const values=[luminance(a),luminance(b)].sort((a,b)=>b-a);return (values[0]+.05)/(values[1]+.05);}
test('secondary reading text retains AA contrast on every primary surface',()=>{const muted=/--muted:(#[a-f0-9]{6})/.exec(css)[1];for(const bg of ['#eeede7','#f8f7f2','#fafaf4','#e3e2db','#e7e9df'])assert.ok(contrast(muted,bg)>=4.5,`${muted} on ${bg}`);});
test('mobile search and view controls have explicit accessible names',()=>{for(const id of ['search','map-expand','sheet-toggle','about-mobile']){const tag=html.match(new RegExp(`<[^>]+id="${id}"[^>]*>`))?.[0];assert.ok(tag,id);assert.match(tag,/aria-label="[A-Za-z][^"]{8,}"/);}});
