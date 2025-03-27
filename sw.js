try{self["workbox:core:7.2.0"]&&_()}catch{}const E=(s,...e)=>{let t=s;return e.length>0&&(t+=` :: ${JSON.stringify(e)}`),t},O=E;class l extends Error{constructor(e,t){const a=O(e,t);super(a),this.name=e,this.details=t}}const L=new Set,f={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:typeof registration<"u"?registration.scope:""},C=s=>[f.prefix,s,f.suffix].filter(e=>e&&e.length>0).join("-"),z=s=>{for(const e of Object.keys(f))s(e)},x={updateDetails:s=>{z(e=>{typeof s[e]=="string"&&(f[e]=s[e])})},getGoogleAnalyticsName:s=>s||C(f.googleAnalytics),getPrecacheName:s=>s||C(f.precache),getPrefix:()=>f.prefix,getRuntimeName:s=>s||C(f.runtime),getSuffix:()=>f.suffix};function P(s,e){const t=new URL(s);for(const a of e)t.searchParams.delete(a);return t.href}async function D(s,e,t,a){const c=P(e.url,t);if(e.url===c)return s.match(e,a);const o=Object.assign(Object.assign({},a),{ignoreSearch:!0}),r=await s.keys(e,o);for(const n of r){const i=P(n.url,t);if(c===i)return s.match(n,a)}}let w;function I(){if(w===void 0){const s=new Response("");if("body"in s)try{new Response(s.body),w=!0}catch{w=!1}w=!1}return w}class M{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}async function F(){for(const s of L)await s()}const j=s=>new URL(String(s),location.href).href.replace(new RegExp(`^${location.origin}`),"");function q(s){return new Promise(e=>setTimeout(e,s))}async function A(s,e){let t=null;if(s.url&&(t=new URL(s.url).origin),t!==self.location.origin)throw new l("cross-origin-copy-response",{origin:t});const a=s.clone(),o={headers:new Headers(a.headers),status:a.status,statusText:a.statusText},r=I()?a.body:await a.blob();return new Response(r,o)}function H(){self.addEventListener("activate",()=>self.clients.claim())}try{self["workbox:precaching:7.2.0"]&&_()}catch{}try{self["workbox:strategies:7.2.0"]&&_()}catch{}function m(s){return typeof s=="string"?new Request(s):s}class T{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new M,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const a of this._plugins)this._pluginStateMap.set(a,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:t}=this;let a=m(e);if(a.mode==="navigate"&&t instanceof FetchEvent&&t.preloadResponse){const r=await t.preloadResponse;if(r)return r}const c=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const r of this.iterateCallbacks("requestWillFetch"))a=await r({request:a.clone(),event:t})}catch(r){if(r instanceof Error)throw new l("plugin-error-request-will-fetch",{thrownErrorMessage:r.message})}const o=a.clone();try{let r;r=await fetch(a,a.mode==="navigate"?void 0:this._strategy.fetchOptions);for(const n of this.iterateCallbacks("fetchDidSucceed"))r=await n({event:t,request:o,response:r});return r}catch(r){throw c&&await this.runCallbacks("fetchDidFail",{error:r,event:t,originalRequest:c.clone(),request:o.clone()}),r}}async fetchAndCachePut(e){const t=await this.fetch(e),a=t.clone();return this.waitUntil(this.cachePut(e,a)),t}async cacheMatch(e){const t=m(e);let a;const{cacheName:c,matchOptions:o}=this._strategy,r=await this.getCacheKey(t,"read"),n=Object.assign(Object.assign({},o),{cacheName:c});a=await caches.match(r,n);for(const i of this.iterateCallbacks("cachedResponseWillBeUsed"))a=await i({cacheName:c,matchOptions:o,cachedResponse:a,request:r,event:this.event})||void 0;return a}async cachePut(e,t){const a=m(e);await q(0);const c=await this.getCacheKey(a,"write");if(!t)throw new l("cache-put-with-no-response",{url:j(c.url)});const o=await this._ensureResponseSafeToCache(t);if(!o)return!1;const{cacheName:r,matchOptions:n}=this._strategy,i=await self.caches.open(r),u=this.hasCallback("cacheDidUpdate"),p=u?await D(i,c.clone(),["__WB_REVISION__"],n):null;try{await i.put(c,u?o.clone():o)}catch(h){if(h instanceof Error)throw h.name==="QuotaExceededError"&&await F(),h}for(const h of this.iterateCallbacks("cacheDidUpdate"))await h({cacheName:r,oldResponse:p,newResponse:o.clone(),request:c,event:this.event});return!0}async getCacheKey(e,t){const a=`${e.url} | ${t}`;if(!this._cacheKeys[a]){let c=e;for(const o of this.iterateCallbacks("cacheKeyWillBeUsed"))c=m(await o({mode:t,request:c,event:this.event,params:this.params}));this._cacheKeys[a]=c}return this._cacheKeys[a]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const a of this.iterateCallbacks(e))await a(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if(typeof t[e]=="function"){const a=this._pluginStateMap.get(t);yield o=>{const r=Object.assign(Object.assign({},o),{state:a});return t[e](r)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,a=!1;for(const c of this.iterateCallbacks("cacheWillUpdate"))if(t=await c({request:this.request,response:t,event:this.event})||void 0,a=!0,!t)break;return a||t&&t.status!==200&&(t=void 0),t}}class v{constructor(e={}){this.cacheName=x.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,a=typeof e.request=="string"?new Request(e.request):e.request,c="params"in e?e.params:void 0,o=new T(this,{event:t,request:a,params:c}),r=this._getResponse(o,a,t),n=this._awaitComplete(r,o,a,t);return[r,n]}async _getResponse(e,t,a){await e.runCallbacks("handlerWillStart",{event:a,request:t});let c;try{if(c=await this._handle(t,e),!c||c.type==="error")throw new l("no-response",{url:t.url})}catch(o){if(o instanceof Error){for(const r of e.iterateCallbacks("handlerDidError"))if(c=await r({error:o,event:a,request:t}),c)break}if(!c)throw o}for(const o of e.iterateCallbacks("handlerWillRespond"))c=await o({event:a,request:t,response:c});return c}async _awaitComplete(e,t,a,c){let o,r;try{o=await e}catch{}try{await t.runCallbacks("handlerDidRespond",{event:c,request:a,response:o}),await t.doneWaiting()}catch(n){n instanceof Error&&(r=n)}if(await t.runCallbacks("handlerDidComplete",{event:c,request:a,response:o,error:r}),t.destroy(),r)throw r}}class d extends v{constructor(e={}){e.cacheName=x.getPrecacheName(e.cacheName),super(e),this._fallbackToNetwork=e.fallbackToNetwork!==!1,this.plugins.push(d.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const a=await t.cacheMatch(e);return a||(t.event&&t.event.type==="install"?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let a;const c=t.params||{};if(this._fallbackToNetwork){const o=c.integrity,r=e.integrity,n=!r||r===o;a=await t.fetch(new Request(e,{integrity:e.mode!=="no-cors"?r||o:void 0})),o&&n&&e.mode!=="no-cors"&&(this._useDefaultCacheabilityPluginIfNeeded(),await t.cachePut(e,a.clone()))}else throw new l("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return a}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();const a=await t.fetch(e);if(!await t.cachePut(e,a.clone()))throw new l("bad-precaching-response",{url:e.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[a,c]of this.plugins.entries())c!==d.copyRedirectedCacheableResponsesPlugin&&(c===d.defaultPrecacheCacheabilityPlugin&&(e=a),c.cacheWillUpdate&&t++);t===0?this.plugins.push(d.defaultPrecacheCacheabilityPlugin):t>1&&e!==null&&this.plugins.splice(e,1)}}d.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate({response:s}){return!s||s.status>=400?null:s}};d.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate({response:s}){return s.redirected?await A(s):s}};try{self["workbox:routing:7.2.0"]&&_()}catch{}const W="GET",y=s=>s&&typeof s=="object"?s:{handle:s};class k{constructor(e,t,a=W){this.handler=y(t),this.match=e,this.method=a}setCatchHandler(e){this.catchHandler=y(e)}}class K extends k{constructor(e,t,a){const c=({url:o})=>{const r=e.exec(o.href);if(r&&!(o.origin!==location.origin&&r.index!==0))return r.slice(1)};super(c,t,a)}}class B{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,a=this.handleRequest({request:t,event:e});a&&e.respondWith(a)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&e.data.type==="CACHE_URLS"){const{payload:t}=e.data,a=Promise.all(t.urlsToCache.map(c=>{typeof c=="string"&&(c=[c]);const o=new Request(...c);return this.handleRequest({request:o,event:e})}));e.waitUntil(a),e.ports&&e.ports[0]&&a.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const a=new URL(e.url,location.href);if(!a.protocol.startsWith("http"))return;const c=a.origin===location.origin,{params:o,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:c,url:a});let n=r&&r.handler;const i=e.method;if(!n&&this._defaultHandlerMap.has(i)&&(n=this._defaultHandlerMap.get(i)),!n)return;let u;try{u=n.handle({url:a,request:e,event:t,params:o})}catch(h){u=Promise.reject(h)}const p=r&&r.catchHandler;return u instanceof Promise&&(this._catchHandler||p)&&(u=u.catch(async h=>{if(p)try{return await p.handle({url:a,request:e,event:t,params:o})}catch(S){S instanceof Error&&(h=S)}if(this._catchHandler)return this._catchHandler.handle({url:a,request:e,event:t});throw h})),u}findMatchingRoute({url:e,sameOrigin:t,request:a,event:c}){const o=this._routes.get(a.method)||[];for(const r of o){let n;const i=r.match({url:e,sameOrigin:t,request:a,event:c});if(i)return n=i,(Array.isArray(n)&&n.length===0||i.constructor===Object&&Object.keys(i).length===0||typeof i=="boolean")&&(n=void 0),{route:r,params:n}}return{}}setDefaultHandler(e,t=W){this._defaultHandlerMap.set(t,y(e))}setCatchHandler(e){this._catchHandler=y(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new l("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new l("unregister-route-route-not-registered")}}let b;const G=()=>(b||(b=new B,b.addFetchListener(),b.addCacheListener()),b);function R(s,e,t){let a;if(typeof s=="string"){const o=new URL(s,location.href),r=({url:n})=>n.href===o.href;a=new k(r,e,t)}else if(s instanceof RegExp)a=new K(s,e,t);else if(typeof s=="function")a=new k(s,e,t);else if(s instanceof k)a=s;else throw new l("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});return G().registerRoute(a),a}const $="-precache-",J=async(s,e=$)=>{const a=(await self.caches.keys()).filter(c=>c.includes(e)&&c.includes(self.registration.scope)&&c!==s);return await Promise.all(a.map(c=>self.caches.delete(c))),a};function Q(){self.addEventListener("activate",s=>{const e=x.getPrecacheName();s.waitUntil(J(e).then(t=>{}))})}class V extends v{async _handle(e,t){let a=await t.cacheMatch(e),c;if(!a)try{a=await t.fetchAndCachePut(e)}catch(o){o instanceof Error&&(c=o)}if(!a)throw new l("no-response",{url:e.url,error:c});return a}}const X={cacheWillUpdate:async({response:s})=>s.status===200||s.status===0?s:null};class Y extends v{constructor(e={}){super(e),this.plugins.some(t=>"cacheWillUpdate"in t)||this.plugins.unshift(X)}async _handle(e,t){const a=t.fetchAndCachePut(e).catch(()=>{});t.waitUntil(a);let c=await t.cacheMatch(e),o;if(!c)try{c=await a}catch(r){r instanceof Error&&(o=r)}if(!c)throw new l("no-response",{url:e.url,error:o});return c}}try{self["workbox:cacheable-response:7.2.0"]&&_()}catch{}class Z{constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(e){let t=!0;return this._statuses&&(t=this._statuses.includes(e.status)),this._headers&&t&&(t=Object.keys(this._headers).some(a=>e.headers.get(a)===this._headers[a])),t}}class N{constructor(e){this.cacheWillUpdate=async({response:t})=>this._cacheableResponse.isResponseCacheable(t)?t:null,this._cacheableResponse=new Z(e)}}let g=null;console.log("%c Service Worker Starting ⚙️","background: #222; color: #bada55; font-size: 20px; padding: 10px;");self.skipWaiting();H();Q();self.clients.matchAll().then(s=>{console.log("%c Service Worker: Found clients:","background: #222; color: #bada55; font-size: 16px;",s.length),s.forEach(e=>{e.postMessage({type:"GET_SW_PARAMS"})})});console.log("%c Service Worker: Initialization complete ✅","background: #222; color: #bada55; font-size: 16px;");self.addEventListener("fetch",s=>{console.log("%c Service Worker: Intercepted request:","background: #222; color: #bada55; font-size: 16px;",{url:s.request.url,method:s.request.method,mode:s.request.mode,destination:s.request.destination,headers:Object.fromEntries(s.request.headers.entries())})});const U=async({request:s,url:e})=>{console.log("%c Service Worker: Handling request for:","background: #222; color: #bada55; font-size: 16px;",{url:e.toString(),method:s.method,mode:s.mode,destination:s.destination,webviewPath:g});const t="js-css-cache";console.log("%c Service Worker: Opening cache:","background: #222; color: #bada55; font-size: 16px;",t);const a=await caches.open(t),c=await a.match(s);console.log("%c Service Worker: Cache match result:","background: #222; color: #bada55; font-size: 16px;",c?"Found":"Not found"),console.log("%c Service Worker: Starting network request","background: #222; color: #bada55; font-size: 16px;"),console.log("%c Service Worker: webviewPath","background: #222; color: #bada55; font-size: 16px;",g),g&&fetch(`${g}/${e.toString().replace("https://rodmastro32.github.io/test-cache/","")}`).then(n=>(console.log("%c Service Worker: fileFetch Network request successful","background: #222; color: #bada55; font-size: 16px;"),n)).catch(()=>console.log("%c fileFetch failed","background: #222; color: #ff4444; font-size: 16px;"));const o=fetch(s).then(r=>{console.log("%c Service Worker: Network request successful","background: #222; color: #bada55; font-size: 16px;");const n=r.clone();return a.put(s,n),console.log("%c Service Worker: Updated cache with new response","background: #222; color: #bada55; font-size: 16px;"),r}).catch(r=>{if(console.error("%c Service Worker: Network request failed:","background: #222; color: #ff4444; font-size: 16px;",r),!c)throw r;return console.log("%c Service Worker: Falling back to cached response","background: #222; color: #bada55; font-size: 16px;"),c});return c?(console.log("%c Service Worker: Returning cached response immediately","background: #222; color: #bada55; font-size: 16px;"),o.catch(()=>console.log("%c Service Worker: Background cache update failed","background: #222; color: #ff4444; font-size: 16px;")),c):(console.log("%c Service Worker: No cache found, waiting for network response","background: #222; color: #bada55; font-size: 16px;"),o)};R(({request:s})=>s.destination==="script",U);console.log("%c Service Worker: Registered route for script files","background: #222; color: #bada55; font-size: 16px;");R(({request:s})=>s.destination==="style",U);console.log("%c Service Worker: Registered route for style files",g,"background: #222; color: #bada55; font-size: 16px;");R(({request:s})=>s.destination==="image",new V({cacheName:"images-cache",plugins:[new N({statuses:[0,200]})]}));console.log("%c Service Worker: Registered route for image files","background: #222; color: #bada55; font-size: 16px;");R(({request:s})=>s.mode==="navigate",new Y({cacheName:"pages-cache",plugins:[new N({statuses:[0,200]})]}));console.log("%c Service Worker: Registered route for navigation requests","background: #222; color: #bada55; font-size: 16px;");self.addEventListener("install",()=>{const e=new URL(self.location.href).searchParams.get("path");e&&(g=decodeURIComponent(e),console.log("%c Service Worker: Initial path from URL:","background: #222; color: #bada55; font-size: 16px;",g))});self.addEventListener("message",s=>{console.log("%c Service Worker: Received message:","background: #222; color: #bada55; font-size: 16px;",s.data),s.data&&s.data.type==="SKIP_WAITING"&&(console.log("%c Service Worker: Skipping waiting","background: #222; color: #bada55; font-size: 16px;"),self.skipWaiting())});
