import{g as xe,s as Ie,i as Se,a as Ve,b as Ee,c as we,d as ee,n as j,m as x,e as Te,f as K,u as Me,h as te,r as Pe,j as I,k as Ae,F as Be,l as E,o as Re,p as ne,q as Le,w as $e,t as Ne,v as B,x as Oe,y as c,z as N,A as Fe,B as p,I as O,C as De,D as Y,E as ae,G as ze,H as We,J as re,K as je,L as G,_ as pe,M as F,N as D,O as z,P as Q,Q as Ke,R as Ue,S as qe,T as He,U as Je}from"./index.fc0e2afd.js";import{c as Ye,C as Ge}from"./index.132f904d.js";import{s as Qe}from"./user.b36f1c33.js";import{o as Xe}from"./user.87d65084.js";import"./use-route.f6be4a4d.js";function oe(e){return Array.isArray(e)?!e.length:e===0?!1:!e}function Ze(e,n){if(oe(e)){if(n.required)return!1;if(n.validateEmpty===!1)return!0}return!(n.pattern&&!n.pattern.test(String(e)))}function et(e,n){return new Promise(a=>{const u=n.validator(e,n);if(Se(u)){u.then(a);return}a(u)})}function X(e,n){const{message:a}=n;return Ve(a)?a(e,n):a||""}function tt({target:e}){e.composing=!0}function Z({target:e}){e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}function nt(e,n){const a=xe();e.style.height="auto";let u=e.scrollHeight;if(Ee(n)){const{maxHeight:o,minHeight:d}=n;o!==void 0&&(u=Math.min(u,o)),d!==void 0&&(u=Math.max(u,d))}u&&(e.style.height=`${u}px`,Ie(a))}function at(e){return e==="number"?{type:"text",inputmode:"decimal"}:e==="digit"?{type:"tel",inputmode:"numeric"}:{type:e}}function W(e){return[...e].length}function rt(e,n){return[...e].slice(0,n).join("")}let ot=0;function le(){const e=we(),{name:n="unknown"}=(e==null?void 0:e.type)||{};return`${n}-${++ot}`}const[lt,m]=ee("field"),U={id:String,name:String,leftIcon:String,rightIcon:String,autofocus:Boolean,clearable:Boolean,maxlength:j,formatter:Function,clearIcon:x("clear"),modelValue:Te(""),inputAlign:String,placeholder:String,autocomplete:String,errorMessage:String,enterkeyhint:String,clearTrigger:x("focus"),formatTrigger:x("onChange"),error:{type:Boolean,default:null},disabled:{type:Boolean,default:null},readonly:{type:Boolean,default:null}},it=K({},Ye,U,{rows:j,type:x("text"),rules:Array,autosize:[Boolean,Object],labelWidth:j,labelClass:Me,labelAlign:String,showWordLimit:Boolean,errorMessageAlign:String,colon:{type:Boolean,default:null}});var ct=te({name:lt,props:it,emits:["blur","focus","clear","keypress","click-input","end-validate","start-validate","click-left-icon","click-right-icon","update:modelValue"],setup(e,{emit:n,slots:a}){const u=le(),o=Pe({status:"unvalidated",focused:!1,validateMessage:""}),d=I(),v=I(),h=I(),{parent:f}=Ae(Be),b=()=>{var t;return String((t=e.modelValue)!=null?t:"")},s=t=>{if(N(e[t]))return e[t];if(f&&N(f.props[t]))return f.props[t]},T=E(()=>{const t=s("readonly");if(e.clearable&&!t){const l=b()!=="",i=e.clearTrigger==="always"||e.clearTrigger==="focus"&&o.focused;return l&&i}return!1}),S=E(()=>h.value&&a.input?h.value():e.modelValue),R=t=>t.reduce((l,i)=>l.then(()=>{if(o.status==="failed")return;let{value:g}=S;if(i.formatter&&(g=i.formatter(g,i)),!Ze(g,i)){o.status="failed",o.validateMessage=X(g,i);return}if(i.validator)return oe(g)&&i.validateEmpty===!1?void 0:et(g,i).then(y=>{y&&typeof y=="string"?(o.status="failed",o.validateMessage=y):y===!1&&(o.status="failed",o.validateMessage=X(g,i))})}),Promise.resolve()),_=()=>{o.status="unvalidated",o.validateMessage=""},M=()=>n("end-validate",{status:o.status}),P=(t=e.rules)=>new Promise(l=>{_(),t?(n("start-validate"),R(t).then(()=>{o.status==="failed"?(l({name:e.name,message:o.validateMessage}),M()):(o.status="passed",l(),M())})):l()}),V=t=>{if(f&&e.rules){const{validateTrigger:l}=f.props,i=Y(l).includes(t),g=e.rules.filter(y=>y.trigger?Y(y.trigger).includes(t):i);g.length&&P(g)}},L=t=>{const{maxlength:l}=e;if(N(l)&&W(t)>l){const i=b();return i&&W(i)===+l?i:rt(t,+l)}return t},k=(t,l="onChange")=>{if(t=L(t),e.type==="number"||e.type==="digit"){const i=e.type==="number";t=Fe(t,i,i)}e.formatter&&l===e.formatTrigger&&(t=e.formatter(t)),d.value&&d.value.value!==t&&(d.value.value=t),t!==e.modelValue&&n("update:modelValue",t)},$=t=>{t.target.composing||k(t.target.value)},r=()=>{var t;return(t=d.value)==null?void 0:t.blur()},A=()=>{var t;return(t=d.value)==null?void 0:t.focus()},C=()=>{const t=d.value;e.type==="textarea"&&e.autosize&&t&&nt(t,e.autosize)},ie=t=>{o.focused=!0,n("focus",t),B(C),s("readonly")&&r()},ce=t=>{s("readonly")||(o.focused=!1,k(b(),"onBlur"),n("blur",t),V("onBlur"),B(C),We())},q=t=>n("click-input",t),se=t=>n("click-left-icon",t),ue=t=>n("click-right-icon",t),de=t=>{p(t),n("update:modelValue",""),n("clear",t)},H=E(()=>{if(typeof e.error=="boolean")return e.error;if(f&&f.props.showError&&o.status==="failed")return!0}),fe=E(()=>{const t=s("labelWidth");if(t)return{width:Re(t)}}),ge=t=>{t.keyCode===13&&(!(f&&f.props.submitOnEnter)&&e.type!=="textarea"&&p(t),e.type==="search"&&r()),n("keypress",t)},J=()=>e.id||`${u}-input`,me=()=>o.status,he=()=>{const t=m("control",[s("inputAlign"),{error:H.value,custom:!!a.input,"min-height":e.type==="textarea"&&!e.autosize}]);if(a.input)return c("div",{class:t,onClick:q},[a.input()]);const l={id:J(),ref:d,name:e.name,rows:e.rows!==void 0?+e.rows:void 0,class:t,disabled:s("disabled"),readonly:s("readonly"),autofocus:e.autofocus,placeholder:e.placeholder,autocomplete:e.autocomplete,enterkeyhint:e.enterkeyhint,"aria-labelledby":e.label?`${u}-label`:void 0,onBlur:ce,onFocus:ie,onInput:$,onClick:q,onChange:Z,onKeypress:ge,onCompositionend:Z,onCompositionstart:tt};return e.type==="textarea"?c("textarea",l,null):c("input",ae(at(e.type),l),null)},be=()=>{const t=a["left-icon"];if(e.leftIcon||t)return c("div",{class:m("left-icon"),onClick:se},[t?t():c(O,{name:e.leftIcon,classPrefix:e.iconPrefix},null)])},ve=()=>{const t=a["right-icon"];if(e.rightIcon||t)return c("div",{class:m("right-icon"),onClick:ue},[t?t():c(O,{name:e.rightIcon,classPrefix:e.iconPrefix},null)])},ye=()=>{if(e.showWordLimit&&e.maxlength){const t=W(b());return c("div",{class:m("word-limit")},[c("span",{class:m("word-num")},[t]),ze("/"),e.maxlength])}},_e=()=>{if(f&&f.props.showErrorMessage===!1)return;const t=e.errorMessage||o.validateMessage;if(t){const l=a["error-message"],i=s("errorMessageAlign");return c("div",{class:m("error-message",i)},[l?l({message:t}):t])}},ke=()=>{const t=s("colon")?":":"";if(a.label)return[a.label(),t];if(e.label)return c("label",{id:`${u}-label`,for:J()},[e.label+t])},Ce=()=>[c("div",{class:m("body")},[he(),T.value&&c(O,{ref:v,name:e.clearIcon,class:m("clear")},null),ve(),a.button&&c("div",{class:m("button")},[a.button()])]),ye(),_e()];return ne({blur:r,focus:A,validate:P,formValue:S,resetValidation:_,getValidationStatus:me}),Le(De,{customValue:h,resetValidation:_,validateWithTrigger:V}),$e(()=>e.modelValue,()=>{k(b()),_(),V("onChange"),B(C)}),Ne(()=>{k(b(),e.formatTrigger),B(C)}),Oe("touchstart",de,{target:E(()=>{var t;return(t=v.value)==null?void 0:t.$el})}),()=>{const t=s("disabled"),l=s("labelAlign"),i=ke(),g=be();return c(Ge,{size:e.size,icon:e.leftIcon,class:m({error:H.value,disabled:t,[`label-${l}`]:l}),center:e.center,border:e.border,isLink:e.isLink,clickable:e.clickable,titleStyle:fe.value,valueClass:m("value"),titleClass:[m("label",[l,{required:e.required}]),e.labelClass],arrowDirection:e.arrowDirection},{icon:g?()=>g:null,title:i?()=>i:null,value:Ce,extra:a.extra})}}});const st=re(ct),[ut,w,dt]=ee("search"),ft=K({},U,{label:String,shape:x("square"),leftIcon:x("search"),clearable:je,actionText:String,background:String,showAction:Boolean});var gt=te({name:ut,props:ft,emits:["blur","focus","clear","search","cancel","click-input","click-left-icon","click-right-icon","update:modelValue"],setup(e,{emit:n,slots:a,attrs:u}){const o=le(),d=I(),v=()=>{a.action||(n("update:modelValue",""),n("cancel"))},h=r=>{r.keyCode===13&&(p(r),n("search",e.modelValue))},f=()=>e.id||`${o}-input`,b=()=>{if(a.label||e.label)return c("label",{class:w("label"),for:f()},[a.label?a.label():e.label])},s=()=>{if(e.showAction){const r=e.actionText||dt("cancel");return c("div",{class:w("action"),role:"button",tabindex:0,onClick:v},[a.action?a.action():r])}},T=()=>{var r;return(r=d.value)==null?void 0:r.blur()},S=()=>{var r;return(r=d.value)==null?void 0:r.focus()},R=r=>n("blur",r),_=r=>n("focus",r),M=r=>n("clear",r),P=r=>n("click-input",r),V=r=>n("click-left-icon",r),L=r=>n("click-right-icon",r),k=Object.keys(U),$=()=>{const r=K({},u,G(e,k),{id:f()}),A=C=>n("update:modelValue",C);return c(st,ae({ref:d,type:"search",class:w("field"),border:!1,onBlur:R,onFocus:_,onClear:M,onKeypress:h,"onClick-input":P,"onClick-left-icon":V,"onClick-right-icon":L,"onUpdate:modelValue":A},r),G(a,["left-icon","right-icon"]))};return ne({focus:S,blur:T}),()=>{var r;return c("div",{class:w({"show-action":e.showAction}),style:{background:e.background}},[(r=a.left)==null?void 0:r.call(a),c("div",{class:w("content",e.shape)},[b(),$()]),s()])}}});const mt=re(gt);const ht={action:"/"},bt={class:"search_list"},vt=["onClick"],yt={class:"username van-hairline--bottom"},_t={__name:"index",setup(e){const n=I(""),a=I([]),u=He();function o(v){!v||Qe({username:v}).then(h=>{a.value=h.data.list})}function d(){u.back()}return(v,h)=>{const f=mt,b=Je;return F(),D(Q,null,[z("form",ht,[c(f,{modelValue:n.value,"onUpdate:modelValue":[h[0]||(h[0]=s=>n.value=s),o],placeholder:"\u8BF7\u8F93\u5165\u7528\u6237\u540D","show-action":"",autofocus:"",onSearch:o,onCancel:d},null,8,["modelValue"])]),z("ul",bt,[(F(!0),D(Q,null,Ke(a.value,(s,T)=>(F(),D("li",{onClick:S=>Ue(Xe)(s._id)},[c(b,{class:"image",src:s.avatar||`https://avatars.dicebear.com/api/initials/:${s.username}.svg`,fit:"cover",round:""},null,8,["src"]),z("div",yt,qe(s.username),1)],8,vt))),256))])],64)}}},Vt=pe(_t,[["__scopeId","data-v-1bad1776"]]);export{Vt as default};
