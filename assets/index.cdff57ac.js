import{c as o,d as c,a as r,F as d,t as u,b as m,ad as f,w as v}from"./index.cb71e29c.js";const[b,i]=o("cell-group"),g={title:String,inset:Boolean,border:u};var p=c({name:b,inheritAttrs:!1,props:g,setup(e,{slots:t,attrs:l}){const n=()=>{var a;return r("div",m({class:[i({inset:e.inset}),{[f]:e.border&&!e.inset}]},l),[(a=t.default)==null?void 0:a.call(t)])},s=()=>r("div",{class:i("title",{inset:e.inset})},[t.title?t.title():e.title]);return()=>e.title||t.title?r(d,null,[s(),n()]):n()}});const P=v(p);export{P as C};