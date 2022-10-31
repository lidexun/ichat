function u(e,n=300){let t=null;return function(...i){let o=this;t&&clearTimeout(t),t=setTimeout(function(){e.apply(o,i)},n)}}export{u as d};
