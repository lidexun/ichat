function c(t){var e=new Date;t&&(e=new Date(t*1e3));var n=e.getFullYear(),a=e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1,r=e.getDate()<10?"0"+e.getDate():e.getDate(),o=e.getHours()<10?"0"+e.getHours():e.getHours(),g=e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes();return e.getSeconds()<10?""+e.getSeconds():e.getSeconds(),n+"-"+a+"-"+r+" "+o+":"+g}function s(t){const e=t;return e.contentCopy=t.content,e.content=e.content.replace(/&amp;/g," ").replace(/&nbsp;/g," ").replace(/<br\/>/g," "),e.addtime=c(t.createTime),e.timestamp=t.createTime,e}export{c as d,s as t};