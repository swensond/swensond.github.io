var e=`anime-watch-tool`,t=`kv`,n=1,r=null;function i(){return r||(r=new Promise((r,i)=>{let a=indexedDB.open(e,n);a.onupgradeneeded=()=>{let e=a.result;e.objectStoreNames.contains(t)||e.createObjectStore(t,{keyPath:`key`})},a.onsuccess=()=>r(a.result),a.onerror=()=>i(a.error??Error(`IndexedDB open failed`))}),r)}async function a(e,n){try{let r=await i();return await new Promise((i,a)=>{let o=n(r.transaction(t,e).objectStore(t));o.onsuccess=()=>i(o.result),o.onerror=()=>a(o.error??Error(`IndexedDB request failed`))})}catch{return null}}async function o(e){return(await a(`readonly`,t=>t.get(e)))?.value}async function s(e){let t=await a(`readonly`,t=>t.getAll(e)),n=new Map;for(let e of t??[])n.set(e.key,e.value);return n}async function c(e,t){await a(`readwrite`,n=>n.put({key:e,value:t}))}async function l(e){if(e.length!==0)try{let n=await i();await new Promise((r,i)=>{let a=n.transaction(t,`readwrite`),o=a.objectStore(t);for(let t of e)o.delete(t);a.oncomplete=()=>r(),a.onerror=()=>i(a.error??Error(`IndexedDB delete failed`)),a.onabort=()=>i(a.error??Error(`IndexedDB delete aborted`))})}catch{}}async function u(e){return(await a(`readonly`,t=>{let n=e?IDBKeyRange.bound(e,e+`￿`):void 0;return t.getAllKeys(n)})??[]).map(String)}var ee=`https://graphql.anilist.co`,d=`
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
`,f=`
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
`,p=`
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
        ${d}
        ${f}
      }
    }
  }
`,m=`
  query Watched($ids: [Int], $page: Int) {
    Page(page: $page, perPage: 50) {
      pageInfo {
        hasNextPage
        currentPage
      }
      media(id_in: $ids, type: ANIME) {
        ${d}
      }
    }
  }
`,h=`
  query GenreRecommendations($genres: [String], $page: Int) {
    Page(page: $page, perPage: 50) {
      pageInfo {
        hasNextPage
        currentPage
      }
      media(genre_in: $genres, type: ANIME, sort: [SCORE_DESC, POPULARITY_DESC], isAdult: false) {
        ${d}
        ${f}
      }
    }
  }
`,g=`
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
          ${d}
        }
      }
    }
  }
`,_=[`WINTER`,`SPRING`,`SUMMER`,`FALL`],v={WINTER:`Winter`,SPRING:`Spring`,SUMMER:`Summer`,FALL:`Fall`};function y(e=new Date){let t=e.getMonth()+1;return{season:t<=3?`WINTER`:t<=6?`SPRING`:t<=9?`SUMMER`:`FALL`,seasonYear:e.getFullYear()}}function b(e,t){return`${v[e]} ${t}`}function te(e,t,n){let r=_.indexOf(e)+n;return{season:_[(r%4+4)%4],seasonYear:t+Math.floor(r/4)}}async function x(e,t){let n=null;for(let r=1;r<=3;r++){let i=await fetch(ee,{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({query:e,variables:t})});if(i.status===429)throw Error(`AniList request failed (429 Too Many Requests)`);try{if(i.status===500||i.status===502){let e=Number(i.headers.get(`Retry-After`));await S((Number.isFinite(e)?e:2)*1e3*r),n=Error(`AniList request failed (${i.status})`);continue}if(!i.ok)throw Error(`AniList request failed (${i.status})`);let e=await i.json();if(e.errors?.length)throw Error(e.errors[0].message);if(!e.data)throw Error(`AniList returned no data`);return e.data}catch(e){n=e instanceof Error?e:Error(String(e)),await S(500*r)}}throw n??Error(`AniList request failed`)}function S(e){return new Promise(t=>setTimeout(t,e))}async function C(e,t,n=1){let r=await x(p,{season:e,seasonYear:t,page:n});for(let e of r.Page.media)z(e);return r.Page}var w=`anime-watch-tool.anilist.v8`,T=360*60*1e3,E=new Map;function D(e,t){return`${w}.season.${t}.${e}`}async function O(e,t=T){let n=Date.now(),r=E.get(e);if(r&&n-r.cachedAt<t)return r.page;let i;try{i=await o(e)}catch{return null}if(i&&i.page){let r=i;if(n-r.cachedAt<t)return E.set(e,r),r.page}return null}async function k(e,t){let n={cachedAt:Date.now(),page:t};E.set(e,n);try{await c(e,n)}catch{}}async function ne(e,t=T){let n=Date.now(),r=new Map,i=[];for(let a of e){let e=E.get(a);e&&n-e.cachedAt<t?r.set(a,e.page):i.push(a)}if(i.length>0)try{let e=await s(i);for(let[i,a]of e){let e=a;e?.page&&n-e.cachedAt<t&&(E.set(i,e),r.set(i,e.page))}}catch{}return r}async function A(e){for(let t of E.keys())t.startsWith(e)&&E.delete(t);try{let t=await u(e);t.length>0&&await l(t)}catch{}}var j=new Map,M=typeof location<`u`&&new URLSearchParams(location.search).has(`cacheDebug`);function N(e,t,n){M&&console.debug(`[cache] ${e}`,t,n??``)}async function P(e,t,n,r){let i=await O(e,t);if(i){if(!r||r(i))return N(`hit`,e),i;N(`reject`,e,`cached value has stale shape - refetching`),E.delete(e)}else N(`miss`,e);let a=j.get(e);if(a)return N(`in-flight share`,e),a;let o=n().then(async t=>(await k(e,t),N(`write`,e),j.delete(e),t)).catch(t=>{throw N(`error`,e,t instanceof Error?t.message:String(t)),j.delete(e),t});return j.set(e,o),o}function F(e,t){A(D(e,t))}function I(){A(`${w}.genres.`)}var L=`
  query Media($id: Int) {
    Media(id: $id, type: ANIME) {
      ${d}
      ${f}
    }
  }
`;function R(e){return`${w}.media.${e}`}function z(e){k(R(e.id),e)}function B(e){return e?.relations?.edges!==void 0}async function V(e){return P(R(e),T,async()=>{let t=await x(L,{id:e});if(!t.Media)throw Error(`Media not found`);return t.Media},B)}async function H(){let e=`${w}.media.`,t=[];for(let[n,r]of E)n.startsWith(e)&&(B(r.page)||t.push(n));for(let e of t)E.delete(e);try{let t=await u(e);if(t.length===0)return;let n=await s(t),r=[];for(let[e,t]of n)B(t?.page)||r.push(e);r.length>0&&await l(r)}catch{}}async function U(e,t){return P(D(e,t),T,()=>C(e,t))}async function W(e,t,n){return n<=1?U(e,t):P(`${D(e,t)}.p${n}`,T,()=>C(e,t,n))}async function G(e){if(e.length===0)return[];let t=[],n=new Set,r=1,i=!0;for(;i&&r<=20;){let a=await x(m,{ids:e,page:r});for(let e of a.Page.media)n.has(e.id)||(n.add(e.id),t.push(e));if(i=a.Page.pageInfo.hasNextPage,a.Page.media.length===0)break;r++}return t}async function K(e){if(e.length===0)return[];let t=Y(e),n=await O(t,T);if(n)return n.media;let r=j.get(t);if(r)return await r;let i=(async()=>{let n=await ne(e.map(e=>R(e))),r=e.filter(e=>!n.has(R(e))),i=r.length>0?await G(r):[],a=new Map;for(let[e,t]of n){let n=Number(e.slice(e.lastIndexOf(`.`)+1));Number.isNaN(n)||a.set(n,t)}for(let e of i)a.set(e.id,e);let o=e.map(e=>a.get(e)).filter(e=>e!==void 0);return await k(t,{pageInfo:{hasNextPage:!1,currentPage:1},media:o}),o})().finally(()=>j.delete(t));return j.set(t,i),i}async function q(e,t=1){return e.length===0?{pageInfo:{hasNextPage:!1,currentPage:1},media:[]}:P(`${w}.genres.${t}.${[...e].sort().join(`,`)}`,T,async()=>{let n=await x(h,{genres:e,page:t});for(let e of n.Page.media)z(e);return n.Page})}function re(e,t){e.length!==0&&k(Y(e),{pageInfo:{hasNextPage:!1,currentPage:1},media:t})}function J(e){if(e.length===0)return;let t=Y(e);E.delete(t);for(let t of e)E.delete(R(t));A(`${w}.watched.`),A(`${w}.media.`)}function Y(e){return`${w}.watched.${[...e].sort((e,t)=>e-t).join(`,`)}`}var X=1488*60*60*1e3,ie=1536*60*60*1e3,ae=1440*60*1e3;async function Z(e,t,n){if(e.length===0||n<=t)return[];let r=[],i=1,a=!0;for(;a&&i<=20;){let o=await x(g,{ids:e,from:t,to:n,page:i});if(r.push(...o.Page.airingSchedules),a=o.Page.pageInfo.hasNextPage,o.Page.airingSchedules.length===0)break;i++}return r}async function oe(e,t,n){return P($(e,t),ae,()=>Z(e,t,n))}function se(e,t,n){e.length!==0&&k($(e,t),n)}function Q(e,t){if(e.length===0)return;let n=$(e,t);E.delete(n),A(`${w}.calendar.`)}function $(e,t){let n=new Date(t*1e3).toISOString().slice(0,10);return`${w}.calendar.${[...e].sort((e,t)=>e-t).join(`,`)}.${n}`}function ce(e){switch(e){case`RELEASING`:return{text:`Airing`,className:`b-air`};case`NOT_YET_RELEASED`:return{text:`Upcoming`,className:`b-new`};case`FINISHED`:return{text:`Finished`,className:`b-done`};case`CANCELLED`:return{text:`Cancelled`,className:`b-hold`};case`HIATUS`:return{text:`Hiatus`,className:`b-hold`};default:return{text:e??`Unknown`,className:`b-unknown`}}}function le(e){switch(e){case`TV`:return`TV`;case`TV_SHORT`:return`TV Short`;case`MOVIE`:return`Movie`;case`OVA`:return`OVA`;case`ONA`:return`ONA`;case`SPECIAL`:return`Special`;case`MUSIC`:return`Music`;default:return e??`-`}}function ue(e){switch(e){case`ORIGINAL`:return`Original`;case`MANGA`:return`Manga`;case`LIGHT_NOVEL`:return`Light Novel`;case`NOVEL`:return`Novel`;case`ONE_SHOT`:return`One-shot`;case`GAME`:return`Game`;case`VISUAL_NOVEL`:return`Visual Novel`;case`WEB_MANGA`:return`Web Manga`;case`OTHER`:return`Other`;default:return e??`-`}}function de(e){return e.studios.nodes.map(e=>e.name).join(`, `)||`Unknown`}function fe(e,t=new Set){let n=(e.relations?.edges??[]).find(e=>e.relationType===`PREQUEL`&&e.node.type===`ANIME`);return n&&t.has(n.node.id)?{isContinuation:!0,label:`Sequel to ${n.node.title.english??n.node.title.romaji}`,targetId:n.node.id}:{isContinuation:!1,label:null,targetId:null}}function pe(e){if(!e?.year)return`-`;let t=e.month??1,n=e.day??1;return new Date(e.year,t-1,n).toLocaleDateString(void 0,{year:`numeric`,month:`short`,day:`numeric`})}function me(e){let t=e.nextAiringEpisode;if(!t)return{text:``,at:null};let n=Math.max(t.timeUntilAiring,0),r=Math.floor(n/86400),i=Math.floor(n%86400/3600),a=Math.floor(n%3600/60);return{text:r>0?`Ep ${t.episode} in ${r}d ${i}h`:i>0?`Ep ${t.episode} in ${i}h ${a}m`:`Ep ${t.episode} in ${a}m`,at:new Date(t.airingAt*1e3).toLocaleString(void 0,{weekday:`short`,month:`short`,day:`numeric`,hour:`numeric`,minute:`2-digit`})}}function he(e){return e.title.romaji??e.title.native??`Anime #${e.id}`}export{re as C,ce as D,ue as E,de as O,se as S,te as T,W as _,F as a,H as b,pe as c,me as d,le as f,U as g,V as h,I as i,Z as l,q as m,X as n,J as o,oe as p,Q as r,y as s,ie as t,G as u,K as v,b as w,fe as x,he as y};