try{self["workbox:core:7.2.0"]&&_()}catch{}const U=(a,...e)=>{let t=a;return e.length>0&&(t+=` :: ${JSON.stringify(e)}`),t},E=U;class f extends Error{constructor(e,t){const s=E(e,t);super(s),this.name=e,this.details=t}}const O=new Set,d={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:typeof registration<"u"?registration.scope:""},R=a=>[d.prefix,a,d.suffix].filter(e=>e&&e.length>0).join("-"),z=a=>{for(const e of Object.keys(d))a(e)},C={updateDetails:a=>{z(e=>{typeof a[e]=="string"&&(d[e]=a[e])})},getGoogleAnalyticsName:a=>a||R(d.googleAnalytics),getPrecacheName:a=>a||R(d.precache),getPrefix:()=>d.prefix,getRuntimeName:a=>a||R(d.runtime),getSuffix:()=>d.suffix};function S(a,e){const t=new URL(a);for(const s of e)t.searchParams.delete(s);return t.href}async function L(a,e,t,s){const c=S(e.url,t);if(e.url===c)return a.match(e,s);const n=Object.assign(Object.assign({},s),{ignoreSearch:!0}),o=await a.keys(e,n);for(const r of o){const i=S(r.url,t);if(c===i)return a.match(r,s)}}let g;function D(){if(g===void 0){const a=new Response("");if("body"in a)try{new Response(a.body),g=!0}catch{g=!1}g=!1}return g}class I{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}async function M(){for(const a of O)await a()}const F=a=>new URL(String(a),location.href).href.replace(new RegExp(`^${location.origin}`),"");function q(a){return new Promise(e=>setTimeout(e,a))}async function j(a,e){let t=null;if(a.url&&(t=new URL(a.url).origin),t!==self.location.origin)throw new f("cross-origin-copy-response",{origin:t});const s=a.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},o=D()?s.body:await s.blob();return new Response(o,n)}function A(){self.addEventListener("activate",()=>self.clients.claim())}try{self["workbox:precaching:7.2.0"]&&_()}catch{}try{self["workbox:strategies:7.2.0"]&&_()}catch{}function b(a){return typeof a=="string"?new Request(a):a}class H{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new I,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const s of this._plugins)this._pluginStateMap.set(s,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:t}=this;let s=b(e);if(s.mode==="navigate"&&t instanceof FetchEvent&&t.preloadResponse){const o=await t.preloadResponse;if(o)return o}const c=this.hasCallback("fetchDidFail")?s.clone():null;try{for(const o of this.iterateCallbacks("requestWillFetch"))s=await o({request:s.clone(),event:t})}catch(o){if(o instanceof Error)throw new f("plugin-error-request-will-fetch",{thrownErrorMessage:o.message})}const n=s.clone();try{let o;o=await fetch(s,s.mode==="navigate"?void 0:this._strategy.fetchOptions);for(const r of this.iterateCallbacks("fetchDidSucceed"))o=await r({event:t,request:n,response:o});return o}catch(o){throw c&&await this.runCallbacks("fetchDidFail",{error:o,event:t,originalRequest:c.clone(),request:n.clone()}),o}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=b(e);let s;const{cacheName:c,matchOptions:n}=this._strategy,o=await this.getCacheKey(t,"read"),r=Object.assign(Object.assign({},n),{cacheName:c});s=await caches.match(o,r);for(const i of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await i({cacheName:c,matchOptions:n,cachedResponse:s,request:o,event:this.event})||void 0;return s}async cachePut(e,t){const s=b(e);await q(0);const c=await this.getCacheKey(s,"write");if(!t)throw new f("cache-put-with-no-response",{url:F(c.url)});const n=await this._ensureResponseSafeToCache(t);if(!n)return!1;const{cacheName:o,matchOptions:r}=this._strategy,i=await self.caches.open(o),h=this.hasCallback("cacheDidUpdate"),u=h?await L(i,c.clone(),["__WB_REVISION__"],r):null;try{await i.put(c,h?n.clone():n)}catch(l){if(l instanceof Error)throw l.name==="QuotaExceededError"&&await M(),l}for(const l of this.iterateCallbacks("cacheDidUpdate"))await l({cacheName:o,oldResponse:u,newResponse:n.clone(),request:c,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let c=e;for(const n of this.iterateCallbacks("cacheKeyWillBeUsed"))c=b(await n({mode:t,request:c,event:this.event,params:this.params}));this._cacheKeys[s]=c}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if(typeof t[e]=="function"){const s=this._pluginStateMap.get(t);yield n=>{const o=Object.assign(Object.assign({},n),{state:s});return t[e](o)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const c of this.iterateCallbacks("cacheWillUpdate"))if(t=await c({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&t.status!==200&&(t=void 0),t}}class x{constructor(e={}){this.cacheName=C.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s=typeof e.request=="string"?new Request(e.request):e.request,c="params"in e?e.params:void 0,n=new H(this,{event:t,request:s,params:c}),o=this._getResponse(n,s,t),r=this._awaitComplete(o,n,s,t);return[o,r]}async _getResponse(e,t,s){await e.runCallbacks("handlerWillStart",{event:s,request:t});let c;try{if(c=await this._handle(t,e),!c||c.type==="error")throw new f("no-response",{url:t.url})}catch(n){if(n instanceof Error){for(const o of e.iterateCallbacks("handlerDidError"))if(c=await o({error:n,event:s,request:t}),c)break}if(!c)throw n}for(const n of e.iterateCallbacks("handlerWillRespond"))c=await n({event:s,request:t,response:c});return c}async _awaitComplete(e,t,s,c){let n,o;try{n=await e}catch{}try{await t.runCallbacks("handlerDidRespond",{event:c,request:s,response:n}),await t.doneWaiting()}catch(r){r instanceof Error&&(o=r)}if(await t.runCallbacks("handlerDidComplete",{event:c,request:s,response:n,error:o}),t.destroy(),o)throw o}}class p extends x{constructor(e={}){e.cacheName=C.getPrecacheName(e.cacheName),super(e),this._fallbackToNetwork=e.fallbackToNetwork!==!1,this.plugins.push(p.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&t.event.type==="install"?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let s;const c=t.params||{};if(this._fallbackToNetwork){const n=c.integrity,o=e.integrity,r=!o||o===n;s=await t.fetch(new Request(e,{integrity:e.mode!=="no-cors"?o||n:void 0})),n&&r&&e.mode!=="no-cors"&&(this._useDefaultCacheabilityPluginIfNeeded(),await t.cachePut(e,s.clone()))}else throw new f("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return s}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();const s=await t.fetch(e);if(!await t.cachePut(e,s.clone()))throw new f("bad-precaching-response",{url:e.url,status:s.status});return s}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,c]of this.plugins.entries())c!==p.copyRedirectedCacheableResponsesPlugin&&(c===p.defaultPrecacheCacheabilityPlugin&&(e=s),c.cacheWillUpdate&&t++);t===0?this.plugins.push(p.defaultPrecacheCacheabilityPlugin):t>1&&e!==null&&this.plugins.splice(e,1)}}p.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate({response:a}){return!a||a.status>=400?null:a}};p.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate({response:a}){return a.redirected?await j(a):a}};try{self["workbox:routing:7.2.0"]&&_()}catch{}const P="GET",k=a=>a&&typeof a=="object"?a:{handle:a};class m{constructor(e,t,s=P){this.handler=k(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=k(e)}}class T extends m{constructor(e,t,s){const c=({url:n})=>{const o=e.exec(n.href);if(o&&!(n.origin!==location.origin&&o.index!==0))return o.slice(1)};super(c,t,s)}}class K{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&e.data.type==="CACHE_URLS"){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(c=>{typeof c=="string"&&(c=[c]);const n=new Request(...c);return this.handleRequest({request:n,event:e})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const c=s.origin===location.origin,{params:n,route:o}=this.findMatchingRoute({event:t,request:e,sameOrigin:c,url:s});let r=o&&o.handler;const i=e.method;if(!r&&this._defaultHandlerMap.has(i)&&(r=this._defaultHandlerMap.get(i)),!r)return;let h;try{h=r.handle({url:s,request:e,event:t,params:n})}catch(l){h=Promise.reject(l)}const u=o&&o.catchHandler;return h instanceof Promise&&(this._catchHandler||u)&&(h=h.catch(async l=>{if(u)try{return await u.handle({url:s,request:e,event:t,params:n})}catch(v){v instanceof Error&&(l=v)}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw l})),h}findMatchingRoute({url:e,sameOrigin:t,request:s,event:c}){const n=this._routes.get(s.method)||[];for(const o of n){let r;const i=o.match({url:e,sameOrigin:t,request:s,event:c});if(i)return r=i,(Array.isArray(r)&&r.length===0||i.constructor===Object&&Object.keys(i).length===0||typeof i=="boolean")&&(r=void 0),{route:o,params:r}}return{}}setDefaultHandler(e,t=P){this._defaultHandlerMap.set(t,k(e))}setCatchHandler(e){this._catchHandler=k(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new f("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new f("unregister-route-route-not-registered")}}let w;const B=()=>(w||(w=new K,w.addFetchListener(),w.addCacheListener()),w);function y(a,e,t){let s;if(typeof a=="string"){const n=new URL(a,location.href),o=({url:r})=>r.href===n.href;s=new m(o,e,t)}else if(a instanceof RegExp)s=new T(a,e,t);else if(typeof a=="function")s=new m(a,e,t);else if(a instanceof m)s=a;else throw new f("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});return B().registerRoute(s),s}const G="-precache-",$=async(a,e=G)=>{const s=(await self.caches.keys()).filter(c=>c.includes(e)&&c.includes(self.registration.scope)&&c!==a);return await Promise.all(s.map(c=>self.caches.delete(c))),s};function J(){self.addEventListener("activate",a=>{const e=C.getPrecacheName();a.waitUntil($(e).then(t=>{}))})}class Q extends x{async _handle(e,t){let s=await t.cacheMatch(e),c;if(!s)try{s=await t.fetchAndCachePut(e)}catch(n){n instanceof Error&&(c=n)}if(!s)throw new f("no-response",{url:e.url,error:c});return s}}const V={cacheWillUpdate:async({response:a})=>a.status===200||a.status===0?a:null};class X extends x{constructor(e={}){super(e),this.plugins.some(t=>"cacheWillUpdate"in t)||this.plugins.unshift(V)}async _handle(e,t){const s=t.fetchAndCachePut(e).catch(()=>{});t.waitUntil(s);let c=await t.cacheMatch(e),n;if(!c)try{c=await s}catch(o){o instanceof Error&&(n=o)}if(!c)throw new f("no-response",{url:e.url,error:n});return c}}try{self["workbox:cacheable-response:7.2.0"]&&_()}catch{}class Y{constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(e){let t=!0;return this._statuses&&(t=this._statuses.includes(e.status)),this._headers&&t&&(t=Object.keys(this._headers).some(s=>e.headers.get(s)===this._headers[s])),t}}class W{constructor(e){this.cacheWillUpdate=async({response:t})=>this._cacheableResponse.isResponseCacheable(t)?t:null,this._cacheableResponse=new Y(e)}}console.log("%c Service Worker Starting ⚙️","background: #222; color: #bada55; font-size: 20px; padding: 10px;");self.skipWaiting();A();J();self.clients.matchAll().then(a=>{console.log("%c Service Worker: Found clients:","background: #222; color: #bada55; font-size: 16px;",a.length),a.forEach(e=>{e.postMessage({type:"GET_SW_PARAMS"})})});console.log("%c Service Worker: Initialization complete ✅","background: #222; color: #bada55; font-size: 16px;");self.addEventListener("fetch",a=>{console.log("%c Service Worker: Intercepted request:","background: #222; color: #bada55; font-size: 16px;",{url:a.request.url,method:a.request.method,mode:a.request.mode,destination:a.request.destination,headers:Object.fromEntries(a.request.headers.entries())})});const N=async({request:a,url:e})=>{console.log("%c Service Worker: Handling request for:","background: #222; color: #bada55; font-size: 16px;",{url:e.toString(),method:a.method,mode:a.mode,destination:a.destination});const t="js-css-cache";console.log("%c Service Worker: Opening cache:","background: #222; color: #bada55; font-size: 16px;",t);const s=await caches.open(t),c=await s.match(a);console.log("%c Service Worker: Cache match result:","background: #222; color: #bada55; font-size: 16px;",c?"Found":"Not found"),console.log("%c Service Worker: Starting network request","background: #222; color: #bada55; font-size: 16px;");const n=await caches.open("webviewPath"),o=await n.keys(),r=o.length>0?await n.match(o[0]):null,i=r?await r.text():null;i&&fetch(`${i}/${e.toString().replace("https://rodmastro32.github.io/test-cache/","")}`).then(l=>(console.log("%c Service Worker: fileFetch Network request successful","background: #222; color: #bada55; font-size: 16px;"),l)).catch(()=>console.log("%c fileFetch failed","background: #222; color: #ff4444; font-size: 16px;"));const h=fetch(a).then(u=>{console.log("%c Service Worker: Network request successful","background: #222; color: #bada55; font-size: 16px;");const l=u.clone();return s.put(a,l),console.log("%c Service Worker: Updated cache with new response","background: #222; color: #bada55; font-size: 16px;"),u}).catch(u=>{if(console.error("%c Service Worker: Network request failed:","background: #222; color: #ff4444; font-size: 16px;",u),!c)throw u;return console.log("%c Service Worker: Falling back to cached response","background: #222; color: #bada55; font-size: 16px;"),c});return c?(console.log("%c Service Worker: Returning cached response immediately","background: #222; color: #bada55; font-size: 16px;"),h.catch(()=>console.log("%c Service Worker: Background cache update failed","background: #222; color: #ff4444; font-size: 16px;")),c):(console.log("%c Service Worker: No cache found, waiting for network response","background: #222; color: #bada55; font-size: 16px;"),h)};y(({request:a})=>a.destination==="script",N);console.log("%c Service Worker: Registered route for script files","background: #222; color: #bada55; font-size: 16px;");y(({request:a})=>a.destination==="style",N);console.log("%c Service Worker: Registered route for style files","background: #222; color: #bada55; font-size: 16px;");y(({request:a})=>a.destination==="image",new Q({cacheName:"images-cache",plugins:[new W({statuses:[0,200]})]}));console.log("%c Service Worker: Registered route for image files","background: #222; color: #bada55; font-size: 16px;");y(({request:a})=>a.mode==="navigate",new X({cacheName:"pages-cache",plugins:[new W({statuses:[0,200]})]}));console.log("%c Service Worker: Registered route for navigation requests","background: #222; color: #bada55; font-size: 16px;");self.addEventListener("install",async()=>{const e=new URL(self.location.href).searchParams.get("path");if(e){const t=decodeURIComponent(e);console.log("%c Service Worker: Installing with webviewPath:","background: #222; color: #bada55; font-size: 16px;",t);const s=await caches.open("webviewPath"),c=new Request(t),n=new Response(t);await s.put(c,n);const o=await s.keys();console.log("%c Service Worker: Cache keys after storage:","background: #222; color: #bada55; font-size: 16px;",o.map(i=>i.url));const r=await s.match(c);console.log("%c Service Worker: Cache match result:","background: #222; color: #bada55; font-size: 16px;",r?await r.text():"No match found")}else console.log("%c Service Worker: No _param found in URL","background: #222; color: #ff4444; font-size: 16px;")});self.addEventListener("message",a=>{console.log("%c Service Worker: Received message:","background: #222; color: #bada55; font-size: 16px;",a.data),a.data&&a.data.type==="SKIP_WAITING"&&(console.log("%c Service Worker: Skipping waiting","background: #222; color: #bada55; font-size: 16px;"),self.skipWaiting())});
