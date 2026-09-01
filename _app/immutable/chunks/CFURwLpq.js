var e=null;function t(){return e||(e=new Promise((e,t)=>{let n=indexedDB.open(`anime-watch-tool`,1);n.onupgradeneeded=()=>{let e=n.result;e.objectStoreNames.contains(`kv`)||e.createObjectStore(`kv`,{keyPath:`key`})},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error??Error(`IndexedDB open failed`))}),e)}async function n(e,n){try{let r=await t();return await new Promise((t,i)=>{let a=n(r.transaction(`kv`,e).objectStore(`kv`));a.onsuccess=()=>t(a.result),a.onerror=()=>i(a.error??Error(`IndexedDB request failed`))})}catch{return null}}async function r(e){return(await n(`readonly`,t=>t.get(e)))?.value}async function i(e){let t=await n(`readonly`,t=>t.getAll(e)),r=new Map;for(let e of t??[])r.set(e.key,e.value);return r}async function a(e,t){await n(`readwrite`,n=>n.put({key:e,value:t}))}async function o(e){if(e.length!==0)try{let n=await t();await new Promise((t,r)=>{let i=n.transaction(`kv`,`readwrite`),a=i.objectStore(`kv`);for(let t of e)a.delete(t);i.oncomplete=()=>t(),i.onerror=()=>r(i.error??Error(`IndexedDB delete failed`)),i.onabort=()=>r(i.error??Error(`IndexedDB delete aborted`))})}catch{}}async function s(e){return(await n(`readonly`,t=>{let n=e?IDBKeyRange.bound(e,e+`￿`):void 0;return t.getAllKeys(n)})??[]).map(String)}var c=`
        id
        idMal
        title {
          romaji
          english
          native
        }
        coverImage {
          extraLarge
          large
          color
        }
        bannerImage
        description
        format
        episodes
        duration
        status
        averageScore
        popularity
        genres
        studios(isMain: true) {
          nodes {
            name
          }
        }
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        nextAiringEpisode {
          episode
          airingAt
          timeUntilAiring
        }
        trailer {
          id
          site
          thumbnail
        }
        source
        isAdult
`,l=`
        relations {
          edges {
            relationType
            node {
              id
              type
              format
              status
              title {
                romaji
                english
                native
              }
              coverImage {
                large
                color
              }
              startDate {
                year
                month
                day
              }
              averageScore
              popularity
              nextAiringEpisode {
                episode
                airingAt
              }
            }
          }
        }
`,u=`
  query Season($season: MediaSeason, $seasonYear: Int, $page: Int) {
    Page(page: $page, perPage: 50) {
      pageInfo {
        hasNextPage
        currentPage
      }
      media(
        season: $season
        seasonYear: $seasonYear
        type: ANIME
        sort: [POPULARITY_DESC]
        isAdult: false
      ) {
        ${c}
        ${l}
      }
    }
  }
`,d=`
  query Watched($ids: [Int], $page: Int) {
    Page(page: $page, perPage: 50) {
      pageInfo {
        hasNextPage
        currentPage
      }
      media(id_in: $ids, type: ANIME) {
        ${c}
      }
    }
  }
`,f=`
  query GenreRecommendations($genres: [String], $page: Int) {
    Page(page: $page, perPage: 50) {
      pageInfo {
        hasNextPage
        currentPage
      }
      media(genre_in: $genres, type: ANIME, sort: [SCORE_DESC, POPULARITY_DESC], isAdult: false) {
        ${c}
        ${l}
      }
    }
  }
`,ee=`
  query Calendar($ids: [Int], $from: Int, $to: Int, $page: Int) {
    Page(page: $page, perPage: 50) {
      pageInfo {
        hasNextPage
        currentPage
      }
      airingSchedules(
        mediaId_in: $ids
        airingAt_greater: $from
        airingAt_lesser: $to
        sort: TIME
      ) {
        id
        episode
        airingAt
        media {
          ${c}
        }
      }
    }
  }
`,p=[`WINTER`,`SPRING`,`SUMMER`,`FALL`],te={WINTER:`Winter`,SPRING:`Spring`,SUMMER:`Summer`,FALL:`Fall`};function m(e=new Date){let t=e.getMonth()+1;return{season:t<=3?`WINTER`:t<=6?`SPRING`:t<=9?`SUMMER`:`FALL`,seasonYear:e.getFullYear()}}function h(e,t){return`${te[e]} ${t}`}function g(e,t,n){let r=p.indexOf(e)+n;return{season:p[(r%4+4)%4],seasonYear:t+Math.floor(r/4)}}async function _(e,t){let n=null;for(let r=1;r<=3;r++){let i=await fetch(`https://graphql.anilist.co`,{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({query:e,variables:t})});if(i.status===429)throw Error(`AniList request failed (429 Too Many Requests)`);try{if(i.status===500||i.status===502){let e=Number(i.headers.get(`Retry-After`));await v((Number.isFinite(e)?e:2)*1e3*r),n=Error(`AniList request failed (${i.status})`);continue}if(!i.ok)throw Error(`AniList request failed (${i.status})`);let e=await i.json();if(e.errors?.length)throw Error(e.errors[0].message);if(!e.data)throw Error(`AniList returned no data`);return e.data}catch(e){n=e instanceof Error?e:Error(String(e)),await v(500*r)}}throw n??Error(`AniList request failed`)}function v(e){return new Promise(t=>setTimeout(t,e))}async function y(e,t,n=1){let r=await _(u,{season:e,seasonYear:t,page:n});for(let e of r.Page.media)I(e);return r.Page}var b=`anime-watch-tool.anilist.v8`,x=216e5,S=new Map;function C(e,t){return`${b}.season.${t}.${e}`}async function w(e,t=x){let n=Date.now(),i=S.get(e);if(i&&n-i.cachedAt<t)return i.page;let a;try{a=await r(e)}catch{return null}if(a&&a.page){let r=a;if(n-r.cachedAt<t)return S.set(e,r),r.page}return null}async function T(e,t){let n={cachedAt:Date.now(),page:t};S.set(e,n);try{await a(e,n)}catch{}}async function E(e,t=x){let n=Date.now(),r=new Map,a=[];for(let i of e){let e=S.get(i);e&&n-e.cachedAt<t?r.set(i,e.page):a.push(i)}if(a.length>0)try{let e=await i(a);for(let[i,a]of e){let e=a;e?.page&&n-e.cachedAt<t&&(S.set(i,e),r.set(i,e.page))}}catch{}return r}async function D(e){for(let t of S.keys())t.startsWith(e)&&S.delete(t);try{let t=await s(e);t.length>0&&await o(t)}catch{}}var O=new Map,k=typeof location<`u`&&new URLSearchParams(location.search).has(`cacheDebug`);function A(e,t,n){k&&console.debug(`[cache] ${e}`,t,n??``)}async function j(e,t,n,r){let i=await w(e,t);if(i){if(!r||r(i))return A(`hit`,e),i;A(`reject`,e,`cached value has stale shape - refetching`),S.delete(e)}else A(`miss`,e);let a=O.get(e);if(a)return A(`in-flight share`,e),a;let o=n().then(async t=>(await T(e,t),A(`write`,e),O.delete(e),t)).catch(t=>{throw A(`error`,e,t instanceof Error?t.message:String(t)),O.delete(e),t});return O.set(e,o),o}function M(e,t){D(C(e,t))}function N(){D(`${b}.genres.`)}var P=`
  query Media($id: Int) {
    Media(id: $id, type: ANIME) {
      ${c}
      ${l}
    }
  }
`;function F(e){return`${b}.media.${e}`}function I(e){T(F(e.id),e)}function L(e){return e?.relations?.edges!==void 0}async function R(e){return j(F(e),x,async()=>{let t=await _(P,{id:e});if(!t.Media)throw Error(`Media not found`);return t.Media},L)}async function z(){let e=`${b}.media.`,t=[];for(let[n,r]of S)n.startsWith(e)&&(L(r.page)||t.push(n));for(let e of t)S.delete(e);try{let t=await s(e);if(t.length===0)return;let n=await i(t),r=[];for(let[e,t]of n)L(t?.page)||r.push(e);r.length>0&&await o(r)}catch{}}async function B(e,t){return j(C(e,t),x,()=>y(e,t))}async function V(e,t,n){return n<=1?B(e,t):j(`${C(e,t)}.p${n}`,x,()=>y(e,t,n))}async function H(e){if(e.length===0)return[];let t=[],n=new Set,r=1,i=!0;for(;i&&r<=20;){let a=await _(d,{ids:e,page:r});for(let e of a.Page.media)n.has(e.id)||(n.add(e.id),t.push(e));if(i=a.Page.pageInfo.hasNextPage,a.Page.media.length===0)break;r++}return t}async function U(e){if(e.length===0)return[];let t=q(e),n=await w(t,x);if(n)return n.media;let r=O.get(t);if(r)return await r;let i=(async()=>{let n=await E(e.map(e=>F(e))),r=e.filter(e=>!n.has(F(e))),i=r.length>0?await H(r):[],a=new Map;for(let[e,t]of n){let n=Number(e.slice(e.lastIndexOf(`.`)+1));Number.isNaN(n)||a.set(n,t)}for(let e of i)a.set(e.id,e);let o=e.map(e=>a.get(e)).filter(e=>e!==void 0);return await T(t,{pageInfo:{hasNextPage:!1,currentPage:1},media:o}),o})().finally(()=>O.delete(t));return O.set(t,i),i}async function W(e,t=1){return e.length===0?{pageInfo:{hasNextPage:!1,currentPage:1},media:[]}:j(`${b}.genres.${t}.${[...e].sort().join(`,`)}`,x,async()=>{let n=await _(f,{genres:e,page:t});for(let e of n.Page.media)I(e);return n.Page})}function G(e,t){e.length!==0&&T(q(e),{pageInfo:{hasNextPage:!1,currentPage:1},media:t})}function K(e){if(e.length===0)return;let t=q(e);S.delete(t);for(let t of e)S.delete(F(t));D(`${b}.watched.`),D(`${b}.media.`)}function q(e){return`${b}.watched.${[...e].sort((e,t)=>e-t).join(`,`)}`}var J=53568e5,Y=55296e5,X=864e5;async function Z(e,t,n){if(e.length===0||n<=t)return[];let r=[],i=1,a=!0;for(;a&&i<=20;){let o=await _(ee,{ids:e,from:t,to:n,page:i});if(r.push(...o.Page.airingSchedules),a=o.Page.pageInfo.hasNextPage,o.Page.airingSchedules.length===0)break;i++}return r}async function Q(e,t,n){return j($(e,t),X,()=>Z(e,t,n))}function ne(e,t,n){e.length!==0&&T($(e,t),n)}function re(e,t){if(e.length===0)return;let n=$(e,t);S.delete(n),D(`${b}.calendar.`)}function $(e,t){let n=new Date(t*1e3).toISOString().slice(0,10);return`${b}.calendar.${[...e].sort((e,t)=>e-t).join(`,`)}.${n}`}function ie(e){switch(e){case`RELEASING`:return{text:`Airing`,className:`b-air`};case`NOT_YET_RELEASED`:return{text:`Upcoming`,className:`b-new`};case`FINISHED`:return{text:`Finished`,className:`b-done`};case`CANCELLED`:return{text:`Cancelled`,className:`b-hold`};case`HIATUS`:return{text:`Hiatus`,className:`b-hold`};default:return{text:e??`Unknown`,className:`b-unknown`}}}function ae(e){switch(e){case`TV`:return`TV`;case`TV_SHORT`:return`TV Short`;case`MOVIE`:return`Movie`;case`OVA`:return`OVA`;case`ONA`:return`ONA`;case`SPECIAL`:return`Special`;case`MUSIC`:return`Music`;default:return e??`-`}}function oe(e){switch(e){case`ORIGINAL`:return`Original`;case`MANGA`:return`Manga`;case`LIGHT_NOVEL`:return`Light Novel`;case`NOVEL`:return`Novel`;case`ONE_SHOT`:return`One-shot`;case`GAME`:return`Game`;case`VISUAL_NOVEL`:return`Visual Novel`;case`WEB_MANGA`:return`Web Manga`;case`OTHER`:return`Other`;default:return e??`-`}}function se(e){return e.studios.nodes.map(e=>e.name).join(`, `)||`Unknown`}function ce(e,t=new Set){let n=(e.relations?.edges??[]).find(e=>e.relationType===`PREQUEL`&&e.node.type===`ANIME`);return n&&t.has(n.node.id)?{isContinuation:!0,label:`Sequel to ${n.node.title.english??n.node.title.romaji}`,targetId:n.node.id}:{isContinuation:!1,label:null,targetId:null}}function le(e){if(!e?.year)return`-`;let t=e.month??1,n=e.day??1;return new Date(e.year,t-1,n).toLocaleDateString(void 0,{year:`numeric`,month:`short`,day:`numeric`})}function ue(e){let t=e.nextAiringEpisode;if(!t)return{text:``,at:null};let n=Math.max(t.timeUntilAiring,0),r=Math.floor(n/86400),i=Math.floor(n%86400/3600),a=Math.floor(n%3600/60);return{text:r>0?`Ep ${t.episode} in ${r}d ${i}h`:i>0?`Ep ${t.episode} in ${i}h ${a}m`:`Ep ${t.episode} in ${a}m`,at:new Date(t.airingAt*1e3).toLocaleString(void 0,{weekday:`short`,month:`short`,day:`numeric`,hour:`numeric`,minute:`2-digit`})}}function de(e){return e.title.romaji??e.title.native??`Anime #${e.id}`}export{G as C,ie as D,oe as E,se as O,ne as S,g as T,V as _,M as a,z as b,le as c,ue as d,ae as f,B as g,R as h,N as i,Z as l,W as m,J as n,K as o,Q as p,re as r,m as s,Y as t,H as u,U as v,h as w,ce as x,de as y};