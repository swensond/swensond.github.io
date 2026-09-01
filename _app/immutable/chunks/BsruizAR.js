import{A as e,F as t,I as n,L as r,M as i,R as a,W as o,Y as s,d as c,dt as l,et as u,i as d,mt as f,p,tt as m,u as h,ut as g,v as _}from"./DeZNBu9W.js";import"./xihTtKlq.js";var v=i(`<div><input type="text" class="
      input-compact
      text-right
      tabular-nums
      pr-6
    "/></div>`);function y(t,i){l(i,!0);let y=d(i,`placeholder`,3,``),b=d(i,`class`,3,``),x=m(!1);function S(e){return Number(e||0).toLocaleString()}function C(e){return Number(e.replace(/,/g,``))||0}function w(e){let t=e.currentTarget,n=C(t.value);i.min!==void 0&&(n=Math.max(i.min,n)),i.max!==void 0&&(n=Math.min(i.max,n)),i.onchange?.(n)}var T=v(),E=s(T);h(E),f(T),o(e=>{_(T,1,`relative ${b()}`),c(E,`id`,i.id),p(E,e),c(E,`placeholder`,y())},[()=>a(x)?i.value:S(i.value)]),r(`focus`,E,()=>u(x,!0)),r(`blur`,E,()=>u(x,!1)),n(`input`,E,w),n(`keydown`,E,function(...e){i.onkeydown?.apply(this,e)}),e(t,T),g()}t([`input`,`keydown`]);export{y as t};