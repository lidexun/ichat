import{_ as w,W as h,j as c,t as B,v,I as L,M as d,N as m,O as e,y as i,R as t,P as M,Q as N,Z as z,ab as j,ac as R,ad as S,S as V,G as q,T as D,ae as O}from"./index.fc0e2afd.js";import{B as E}from"./index.ddb97a99.js";import{N as F}from"./index.c57e1302.js";import{e as G}from"./bus.0e6517c1.js";import{m as H}from"./user.b36f1c33.js";import"./use-route.f6be4a4d.js";import"./use-placeholder.8dc646e9.js";const P={class:"chat"},Q={class:"header"},W={class:"chat_list"},Z={class:"chat_list_content"},$={class:"content"},A={class:"footer"},J={class:"emoji"},K={class:"content"},U={class:"button"},X=q("\u53D1\u9001"),Y={__name:"index",setup(ee){const g=D(),p=j(),n=h.getItem("userInfo"),b=new Map(Object.entries(h.getItem("messageList")));let a=c(""),l=c(null),_=c(null),u=c(b.get(p.query._id));function x(){g.back()}B(()=>{v(()=>{_.value.scrollTop=99999999999})});function y(o){a.value=o.target.innerHTML}function k(){if(!a.value)return;let o=l.value.innerText.replace(/↵/g,"<br/>").replace(/\n/g,"<br/>").replace(/\s/g,"&nbsp;");const f={content_type:1,content:o,to_uid:p.query._id,from_uid:n._id};H(f).then(r=>{u.value.push(r.data),G.emit("send_message",r.data),l.value.textContent="",a.value="",v(()=>{_.value.scrollTop=99999999999})})}return(o,f)=>{const r=F,I=O("user-avatar"),T=L,C=E;return d(),m("div",P,[e("header",Q,[i(r,{title:t(u)[0].userinfo.username,"left-text":"\u8FD4\u56DE","left-arrow":"",onClickLeft:x},null,8,["title"])]),e("main",{class:"main",ref_key:"main",ref:_},[e("ul",W,[(d(!0),m(M,null,N(t(u),(s,te)=>(d(),m("li",{class:R(["chat_list_item",{on:s.from_uid===t(n)._id}]),style:S({order:`${Math.round(new Date(s.createdTime)/1e3)}`})},[i(I,{width:"38px",height:"38px",name:s.from_uid===t(n)._id?t(n).username:s.userinfo.username,round:""},null,8,["name"]),e("div",Z,[e("div",$,V(s.content),1)])],6))),256))])],512),e("footer",A,[e("div",J,[i(T,{name:"smile-o",size:"30"})]),e("div",K,[e("div",{ref_key:"content_input",ref:l,class:"input",contenteditable:"",style:{"-webkit-user-select":"auto"},onInput:y,placeholder:"\u8BF7\u8F93\u5165\u6587\u5B57"},null,544)]),e("div",U,[i(C,{size:"small",disabled:!(t(a).length>0),type:"primary",onClick:k},{default:z(()=>[X]),_:1},8,["disabled"])])])])}}},le=w(Y,[["__scopeId","data-v-d731bbf7"]]);export{le as default};
