import{V as dr,W as hr,X as pr,Y as we}from"./index.fc0e2afd.js";var Ve={exports:{}},fe={exports:{}},We=function(r,t){return function(){for(var n=new Array(arguments.length),a=0;a<n.length;a++)n[a]=arguments[a];return r.apply(t,n)}},mr=We,le=Object.prototype.toString,ce=function(e){return function(r){var t=le.call(r);return e[t]||(e[t]=t.slice(8,-1).toLowerCase())}}(Object.create(null));function S(e){return e=e.toLowerCase(),function(t){return ce(t)===e}}function de(e){return Array.isArray(e)}function $(e){return typeof e>"u"}function vr(e){return e!==null&&!$(e)&&e.constructor!==null&&!$(e.constructor)&&typeof e.constructor.isBuffer=="function"&&e.constructor.isBuffer(e)}var ze=S("ArrayBuffer");function Er(e){var r;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?r=ArrayBuffer.isView(e):r=e&&e.buffer&&ze(e.buffer),r}function Rr(e){return typeof e=="string"}function yr(e){return typeof e=="number"}function Xe(e){return e!==null&&typeof e=="object"}function B(e){if(ce(e)!=="object")return!1;var r=Object.getPrototypeOf(e);return r===null||r===Object.prototype}var wr=S("Date"),br=S("File"),Or=S("Blob"),Ar=S("FileList");function he(e){return le.call(e)==="[object Function]"}function Sr(e){return Xe(e)&&he(e.pipe)}function Cr(e){var r="[object FormData]";return e&&(typeof FormData=="function"&&e instanceof FormData||le.call(e)===r||he(e.toString)&&e.toString()===r)}var xr=S("URLSearchParams");function Pr(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function Tr(){return typeof navigator<"u"&&(navigator.product==="ReactNative"||navigator.product==="NativeScript"||navigator.product==="NS")?!1:typeof window<"u"&&typeof document<"u"}function pe(e,r){if(!(e===null||typeof e>"u"))if(typeof e!="object"&&(e=[e]),de(e))for(var t=0,i=e.length;t<i;t++)r.call(null,e[t],t,e);else for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&r.call(null,e[n],n,e)}function oe(){var e={};function r(n,a){B(e[a])&&B(n)?e[a]=oe(e[a],n):B(n)?e[a]=oe({},n):de(n)?e[a]=n.slice():e[a]=n}for(var t=0,i=arguments.length;t<i;t++)pe(arguments[t],r);return e}function gr(e,r,t){return pe(r,function(n,a){t&&typeof n=="function"?e[a]=mr(n,t):e[a]=n}),e}function Nr(e){return e.charCodeAt(0)===65279&&(e=e.slice(1)),e}function _r(e,r,t,i){e.prototype=Object.create(r.prototype,i),e.prototype.constructor=e,t&&Object.assign(e.prototype,t)}function Dr(e,r,t){var i,n,a,s={};r=r||{};do{for(i=Object.getOwnPropertyNames(e),n=i.length;n-- >0;)a=i[n],s[a]||(r[a]=e[a],s[a]=!0);e=Object.getPrototypeOf(e)}while(e&&(!t||t(e,r))&&e!==Object.prototype);return r}function Ur(e,r,t){e=String(e),(t===void 0||t>e.length)&&(t=e.length),t-=r.length;var i=e.indexOf(r,t);return i!==-1&&i===t}function qr(e){if(!e)return null;var r=e.length;if($(r))return null;for(var t=new Array(r);r-- >0;)t[r]=e[r];return t}var Lr=function(e){return function(r){return e&&r instanceof e}}(typeof Uint8Array<"u"&&Object.getPrototypeOf(Uint8Array)),m={isArray:de,isArrayBuffer:ze,isBuffer:vr,isFormData:Cr,isArrayBufferView:Er,isString:Rr,isNumber:yr,isObject:Xe,isPlainObject:B,isUndefined:$,isDate:wr,isFile:br,isBlob:Or,isFunction:he,isStream:Sr,isURLSearchParams:xr,isStandardBrowserEnv:Tr,forEach:pe,merge:oe,extend:gr,trim:Pr,stripBOM:Nr,inherits:_r,toFlatObject:Dr,kindOf:ce,kindOfTest:S,endsWith:Ur,toArray:qr,isTypedArray:Lr,isFileList:Ar},T=m;function be(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var Ke=function(r,t,i){if(!t)return r;var n;if(i)n=i(t);else if(T.isURLSearchParams(t))n=t.toString();else{var a=[];T.forEach(t,function(f,d){f===null||typeof f>"u"||(T.isArray(f)?d=d+"[]":f=[f],T.forEach(f,function(h){T.isDate(h)?h=h.toISOString():T.isObject(h)&&(h=JSON.stringify(h)),a.push(be(d)+"="+be(h))}))}),n=a.join("&")}if(n){var s=r.indexOf("#");s!==-1&&(r=r.slice(0,s)),r+=(r.indexOf("?")===-1?"?":"&")+n}return r},Br=m;function j(){this.handlers=[]}j.prototype.use=function(r,t,i){return this.handlers.push({fulfilled:r,rejected:t,synchronous:i?i.synchronous:!1,runWhen:i?i.runWhen:null}),this.handlers.length-1};j.prototype.eject=function(r){this.handlers[r]&&(this.handlers[r]=null)};j.prototype.forEach=function(r){Br.forEach(this.handlers,function(i){i!==null&&r(i)})};var Fr=j,$r=m,jr=function(r,t){$r.forEach(r,function(n,a){a!==t&&a.toUpperCase()===t.toUpperCase()&&(r[t]=n,delete r[a])})},Qe=m;function N(e,r,t,i,n){Error.call(this),this.message=e,this.name="AxiosError",r&&(this.code=r),t&&(this.config=t),i&&(this.request=i),n&&(this.response=n)}Qe.inherits(N,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var Ye=N.prototype,Ge={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED"].forEach(function(e){Ge[e]={value:e}});Object.defineProperties(N,Ge);Object.defineProperty(Ye,"isAxiosError",{value:!0});N.from=function(e,r,t,i,n,a){var s=Object.create(Ye);return Qe.toFlatObject(e,s,function(f){return f!==Error.prototype}),N.call(s,e.message,r,t,i,n),s.name=e.name,a&&Object.assign(s,a),s};var D=N,Ze={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},w=m;function Ir(e,r){r=r||new FormData;var t=[];function i(a){return a===null?"":w.isDate(a)?a.toISOString():w.isArrayBuffer(a)||w.isTypedArray(a)?typeof Blob=="function"?new Blob([a]):Buffer.from(a):a}function n(a,s){if(w.isPlainObject(a)||w.isArray(a)){if(t.indexOf(a)!==-1)throw Error("Circular reference detected in "+s);t.push(a),w.forEach(a,function(f,d){if(!w.isUndefined(f)){var c=s?s+"."+d:d,h;if(f&&!s&&typeof f=="object"){if(w.endsWith(d,"{}"))f=JSON.stringify(f);else if(w.endsWith(d,"[]")&&(h=w.toArray(f))){h.forEach(function(u){!w.isUndefined(u)&&r.append(c,i(u))});return}}n(f,c)}}),t.pop()}else r.append(s,i(a))}return n(e),r}var er=Ir,W,Oe;function kr(){if(Oe)return W;Oe=1;var e=D;return W=function(t,i,n){var a=n.config.validateStatus;!n.status||!a||a(n.status)?t(n):i(new e("Request failed with status code "+n.status,[e.ERR_BAD_REQUEST,e.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))},W}var z,Ae;function Mr(){if(Ae)return z;Ae=1;var e=m;return z=e.isStandardBrowserEnv()?function(){return{write:function(i,n,a,s,o,f){var d=[];d.push(i+"="+encodeURIComponent(n)),e.isNumber(a)&&d.push("expires="+new Date(a).toGMTString()),e.isString(s)&&d.push("path="+s),e.isString(o)&&d.push("domain="+o),f===!0&&d.push("secure"),document.cookie=d.join("; ")},read:function(i){var n=document.cookie.match(new RegExp("(^|;\\s*)("+i+")=([^;]*)"));return n?decodeURIComponent(n[3]):null},remove:function(i){this.write(i,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}(),z}var Hr=function(r){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(r)},Jr=function(r,t){return t?r.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):r},Vr=Hr,Wr=Jr,rr=function(r,t){return r&&!Vr(t)?Wr(r,t):t},X,Se;function zr(){if(Se)return X;Se=1;var e=m,r=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];return X=function(i){var n={},a,s,o;return i&&e.forEach(i.split(`
`),function(d){if(o=d.indexOf(":"),a=e.trim(d.substr(0,o)).toLowerCase(),s=e.trim(d.substr(o+1)),a){if(n[a]&&r.indexOf(a)>=0)return;a==="set-cookie"?n[a]=(n[a]?n[a]:[]).concat([s]):n[a]=n[a]?n[a]+", "+s:s}}),n},X}var K,Ce;function Xr(){if(Ce)return K;Ce=1;var e=m;return K=e.isStandardBrowserEnv()?function(){var t=/(msie|trident)/i.test(navigator.userAgent),i=document.createElement("a"),n;function a(s){var o=s;return t&&(i.setAttribute("href",o),o=i.href),i.setAttribute("href",o),{href:i.href,protocol:i.protocol?i.protocol.replace(/:$/,""):"",host:i.host,search:i.search?i.search.replace(/^\?/,""):"",hash:i.hash?i.hash.replace(/^#/,""):"",hostname:i.hostname,port:i.port,pathname:i.pathname.charAt(0)==="/"?i.pathname:"/"+i.pathname}}return n=a(window.location.href),function(o){var f=e.isString(o)?a(o):o;return f.protocol===n.protocol&&f.host===n.host}}():function(){return function(){return!0}}(),K}var Q,xe;function I(){if(xe)return Q;xe=1;var e=D,r=m;function t(i){e.call(this,i==null?"canceled":i,e.ERR_CANCELED),this.name="CanceledError"}return r.inherits(t,e,{__CANCEL__:!0}),Q=t,Q}var Y,Pe;function Kr(){return Pe||(Pe=1,Y=function(r){var t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(r);return t&&t[1]||""}),Y}var G,Te;function ge(){if(Te)return G;Te=1;var e=m,r=kr(),t=Mr(),i=Ke,n=rr,a=zr(),s=Xr(),o=Ze,f=D,d=I(),c=Kr();return G=function(u){return new Promise(function(ur,C){var U=u.data,q=u.headers,L=u.responseType,x;function Ee(){u.cancelToken&&u.cancelToken.unsubscribe(x),u.signal&&u.signal.removeEventListener("abort",x)}e.isFormData(U)&&e.isStandardBrowserEnv()&&delete q["Content-Type"];var l=new XMLHttpRequest;if(u.auth){var fr=u.auth.username||"",lr=u.auth.password?unescape(encodeURIComponent(u.auth.password)):"";q.Authorization="Basic "+btoa(fr+":"+lr)}var H=n(u.baseURL,u.url);l.open(u.method.toUpperCase(),i(H,u.params,u.paramsSerializer),!0),l.timeout=u.timeout;function Re(){if(!!l){var y="getAllResponseHeaders"in l?a(l.getAllResponseHeaders()):null,P=!L||L==="text"||L==="json"?l.responseText:l.response,A={data:P,status:l.status,statusText:l.statusText,headers:y,config:u,request:l};r(function(V){ur(V),Ee()},function(V){C(V),Ee()},A),l=null}}if("onloadend"in l?l.onloadend=Re:l.onreadystatechange=function(){!l||l.readyState!==4||l.status===0&&!(l.responseURL&&l.responseURL.indexOf("file:")===0)||setTimeout(Re)},l.onabort=function(){!l||(C(new f("Request aborted",f.ECONNABORTED,u,l)),l=null)},l.onerror=function(){C(new f("Network Error",f.ERR_NETWORK,u,l,l)),l=null},l.ontimeout=function(){var P=u.timeout?"timeout of "+u.timeout+"ms exceeded":"timeout exceeded",A=u.transitional||o;u.timeoutErrorMessage&&(P=u.timeoutErrorMessage),C(new f(P,A.clarifyTimeoutError?f.ETIMEDOUT:f.ECONNABORTED,u,l)),l=null},e.isStandardBrowserEnv()){var ye=(u.withCredentials||s(H))&&u.xsrfCookieName?t.read(u.xsrfCookieName):void 0;ye&&(q[u.xsrfHeaderName]=ye)}"setRequestHeader"in l&&e.forEach(q,function(P,A){typeof U>"u"&&A.toLowerCase()==="content-type"?delete q[A]:l.setRequestHeader(A,P)}),e.isUndefined(u.withCredentials)||(l.withCredentials=!!u.withCredentials),L&&L!=="json"&&(l.responseType=u.responseType),typeof u.onDownloadProgress=="function"&&l.addEventListener("progress",u.onDownloadProgress),typeof u.onUploadProgress=="function"&&l.upload&&l.upload.addEventListener("progress",u.onUploadProgress),(u.cancelToken||u.signal)&&(x=function(y){!l||(C(!y||y&&y.type?new d:y),l.abort(),l=null)},u.cancelToken&&u.cancelToken.subscribe(x),u.signal&&(u.signal.aborted?x():u.signal.addEventListener("abort",x))),U||(U=null);var J=c(H);if(J&&["http","https","file"].indexOf(J)===-1){C(new f("Unsupported protocol "+J+":",f.ERR_BAD_REQUEST,u));return}l.send(U)})},G}var Z,Ne;function Qr(){return Ne||(Ne=1,Z=null),Z}var p=m,_e=jr,De=D,Yr=Ze,Gr=er,Zr={"Content-Type":"application/x-www-form-urlencoded"};function Ue(e,r){!p.isUndefined(e)&&p.isUndefined(e["Content-Type"])&&(e["Content-Type"]=r)}function et(){var e;return(typeof XMLHttpRequest<"u"||typeof process<"u"&&Object.prototype.toString.call(process)==="[object process]")&&(e=ge()),e}function rt(e,r,t){if(p.isString(e))try{return(r||JSON.parse)(e),p.trim(e)}catch(i){if(i.name!=="SyntaxError")throw i}return(t||JSON.stringify)(e)}var k={transitional:Yr,adapter:et(),transformRequest:[function(r,t){if(_e(t,"Accept"),_e(t,"Content-Type"),p.isFormData(r)||p.isArrayBuffer(r)||p.isBuffer(r)||p.isStream(r)||p.isFile(r)||p.isBlob(r))return r;if(p.isArrayBufferView(r))return r.buffer;if(p.isURLSearchParams(r))return Ue(t,"application/x-www-form-urlencoded;charset=utf-8"),r.toString();var i=p.isObject(r),n=t&&t["Content-Type"],a;if((a=p.isFileList(r))||i&&n==="multipart/form-data"){var s=this.env&&this.env.FormData;return Gr(a?{"files[]":r}:r,s&&new s)}else if(i||n==="application/json")return Ue(t,"application/json"),rt(r);return r}],transformResponse:[function(r){var t=this.transitional||k.transitional,i=t&&t.silentJSONParsing,n=t&&t.forcedJSONParsing,a=!i&&this.responseType==="json";if(a||n&&p.isString(r)&&r.length)try{return JSON.parse(r)}catch(s){if(a)throw s.name==="SyntaxError"?De.from(s,De.ERR_BAD_RESPONSE,this,null,this.response):s}return r}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Qr()},validateStatus:function(r){return r>=200&&r<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};p.forEach(["delete","get","head"],function(r){k.headers[r]={}});p.forEach(["post","put","patch"],function(r){k.headers[r]=p.merge(Zr)});var me=k,tt=m,nt=me,it=function(r,t,i){var n=this||nt;return tt.forEach(i,function(s){r=s.call(n,r,t)}),r},ee,qe;function tr(){return qe||(qe=1,ee=function(r){return!!(r&&r.__CANCEL__)}),ee}var Le=m,re=it,at=tr(),st=me,ot=I();function te(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new ot}var ut=function(r){te(r),r.headers=r.headers||{},r.data=re.call(r,r.data,r.headers,r.transformRequest),r.headers=Le.merge(r.headers.common||{},r.headers[r.method]||{},r.headers),Le.forEach(["delete","get","head","post","put","patch","common"],function(n){delete r.headers[n]});var t=r.adapter||st.adapter;return t(r).then(function(n){return te(r),n.data=re.call(r,n.data,n.headers,r.transformResponse),n},function(n){return at(n)||(te(r),n&&n.response&&(n.response.data=re.call(r,n.response.data,n.response.headers,r.transformResponse))),Promise.reject(n)})},E=m,nr=function(r,t){t=t||{};var i={};function n(c,h){return E.isPlainObject(c)&&E.isPlainObject(h)?E.merge(c,h):E.isPlainObject(h)?E.merge({},h):E.isArray(h)?h.slice():h}function a(c){if(E.isUndefined(t[c])){if(!E.isUndefined(r[c]))return n(void 0,r[c])}else return n(r[c],t[c])}function s(c){if(!E.isUndefined(t[c]))return n(void 0,t[c])}function o(c){if(E.isUndefined(t[c])){if(!E.isUndefined(r[c]))return n(void 0,r[c])}else return n(void 0,t[c])}function f(c){if(c in t)return n(r[c],t[c]);if(c in r)return n(void 0,r[c])}var d={url:s,method:s,data:s,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,responseEncoding:o,validateStatus:f};return E.forEach(Object.keys(r).concat(Object.keys(t)),function(h){var u=d[h]||a,R=u(h);E.isUndefined(R)&&u!==f||(i[h]=R)}),i},ne,Be;function ir(){return Be||(Be=1,ne={version:"0.27.2"}),ne}var ft=ir().version,O=D,ve={};["object","boolean","number","function","string","symbol"].forEach(function(e,r){ve[e]=function(i){return typeof i===e||"a"+(r<1?"n ":" ")+e}});var Fe={};ve.transitional=function(r,t,i){function n(a,s){return"[Axios v"+ft+"] Transitional option '"+a+"'"+s+(i?". "+i:"")}return function(a,s,o){if(r===!1)throw new O(n(s," has been removed"+(t?" in "+t:"")),O.ERR_DEPRECATED);return t&&!Fe[s]&&(Fe[s]=!0,console.warn(n(s," has been deprecated since v"+t+" and will be removed in the near future"))),r?r(a,s,o):!0}};function lt(e,r,t){if(typeof e!="object")throw new O("options must be an object",O.ERR_BAD_OPTION_VALUE);for(var i=Object.keys(e),n=i.length;n-- >0;){var a=i[n],s=r[a];if(s){var o=e[a],f=o===void 0||s(o,a,e);if(f!==!0)throw new O("option "+a+" must be "+f,O.ERR_BAD_OPTION_VALUE);continue}if(t!==!0)throw new O("Unknown option "+a,O.ERR_BAD_OPTION)}}var ct={assertOptions:lt,validators:ve},ar=m,dt=Ke,$e=Fr,je=ut,M=nr,ht=rr,sr=ct,g=sr.validators;function _(e){this.defaults=e,this.interceptors={request:new $e,response:new $e}}_.prototype.request=function(r,t){typeof r=="string"?(t=t||{},t.url=r):t=r||{},t=M(this.defaults,t),t.method?t.method=t.method.toLowerCase():this.defaults.method?t.method=this.defaults.method.toLowerCase():t.method="get";var i=t.transitional;i!==void 0&&sr.assertOptions(i,{silentJSONParsing:g.transitional(g.boolean),forcedJSONParsing:g.transitional(g.boolean),clarifyTimeoutError:g.transitional(g.boolean)},!1);var n=[],a=!0;this.interceptors.request.forEach(function(R){typeof R.runWhen=="function"&&R.runWhen(t)===!1||(a=a&&R.synchronous,n.unshift(R.fulfilled,R.rejected))});var s=[];this.interceptors.response.forEach(function(R){s.push(R.fulfilled,R.rejected)});var o;if(!a){var f=[je,void 0];for(Array.prototype.unshift.apply(f,n),f=f.concat(s),o=Promise.resolve(t);f.length;)o=o.then(f.shift(),f.shift());return o}for(var d=t;n.length;){var c=n.shift(),h=n.shift();try{d=c(d)}catch(u){h(u);break}}try{o=je(d)}catch(u){return Promise.reject(u)}for(;s.length;)o=o.then(s.shift(),s.shift());return o};_.prototype.getUri=function(r){r=M(this.defaults,r);var t=ht(r.baseURL,r.url);return dt(t,r.params,r.paramsSerializer)};ar.forEach(["delete","get","head","options"],function(r){_.prototype[r]=function(t,i){return this.request(M(i||{},{method:r,url:t,data:(i||{}).data}))}});ar.forEach(["post","put","patch"],function(r){function t(i){return function(a,s,o){return this.request(M(o||{},{method:r,headers:i?{"Content-Type":"multipart/form-data"}:{},url:a,data:s}))}}_.prototype[r]=t(),_.prototype[r+"Form"]=t(!0)});var pt=_,ie,Ie;function mt(){if(Ie)return ie;Ie=1;var e=I();function r(t){if(typeof t!="function")throw new TypeError("executor must be a function.");var i;this.promise=new Promise(function(s){i=s});var n=this;this.promise.then(function(a){if(!!n._listeners){var s,o=n._listeners.length;for(s=0;s<o;s++)n._listeners[s](a);n._listeners=null}}),this.promise.then=function(a){var s,o=new Promise(function(f){n.subscribe(f),s=f}).then(a);return o.cancel=function(){n.unsubscribe(s)},o},t(function(s){n.reason||(n.reason=new e(s),i(n.reason))})}return r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.prototype.subscribe=function(i){if(this.reason){i(this.reason);return}this._listeners?this._listeners.push(i):this._listeners=[i]},r.prototype.unsubscribe=function(i){if(!!this._listeners){var n=this._listeners.indexOf(i);n!==-1&&this._listeners.splice(n,1)}},r.source=function(){var i,n=new r(function(s){i=s});return{token:n,cancel:i}},ie=r,ie}var ae,ke;function vt(){return ke||(ke=1,ae=function(r){return function(i){return r.apply(null,i)}}),ae}var se,Me;function Et(){if(Me)return se;Me=1;var e=m;return se=function(t){return e.isObject(t)&&t.isAxiosError===!0},se}var He=m,Rt=We,F=pt,yt=nr,wt=me;function or(e){var r=new F(e),t=Rt(F.prototype.request,r);return He.extend(t,F.prototype,r),He.extend(t,r),t.create=function(n){return or(yt(e,n))},t}var v=or(wt);v.Axios=F;v.CanceledError=I();v.CancelToken=mt();v.isCancel=tr();v.VERSION=ir().version;v.toFormData=er;v.AxiosError=D;v.Cancel=v.CanceledError;v.all=function(r){return Promise.all(r)};v.spread=vt();v.isAxiosError=Et();fe.exports=v;fe.exports.default=v;(function(e){e.exports=fe.exports})(Ve);const bt=dr(Ve.exports),ue=e=>{pr({message:e})},Je=()=>{we.replace({path:"/login",query:{redirect:we.currentRoute.fullPath}})},Ot=(e,r)=>{switch(e){case 401:Je();break;case 403:ue("\u767B\u5F55\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55"),localStorage.removeItem("token"),setTimeout(()=>{Je()},3*1e3);break;case 404:ue("\u8BF7\u6C42\u7684\u8D44\u6E90\u4E0D\u5B58\u5728");break;default:console.log(r)}};var b=bt.create({timeout:1e3*12});b.defaults.baseURL="http://localhost:6001";b.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded";b.interceptors.request.use(e=>{const r=hr.getItem("token");return r&&(e.headers.token=r),e},e=>Promise.error(e));b.interceptors.response.use(e=>e.data.data?e.data:(ue(e.data.message),Promise.reject()),e=>{const{response:r}=e;if(r)return Ot(r.status,r.data.message),Promise.reject(r);if(window.navigator.onLine)return Promise.reject(e)});function St(e){return b.post("/login",e)}function Ct(e){return b.post("/register",e)}function xt(e){return b.get("/search",{params:e})}function Pt(e){return b.post("/message",e)}function Tt(e){return b.get("/message")}export{Tt as g,St as l,Pt as m,Ct as r,xt as s};
