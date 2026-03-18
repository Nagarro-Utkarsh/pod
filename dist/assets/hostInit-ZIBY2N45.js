const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["remoteEntry.js","assets/virtual_mf-REMOTE_ENTRY_ID_pod__remoteEntry_js-BY6aArxg.js","assets/rolldown-runtime-BjWfMKpL.js","assets/preload-helper-DgxWz94Y.js","assets/pod__loadShare__react__loadShare__.mjs-CkI7AMuw.js","assets/virtual_mf-exposes_pod__remoteEntry_js-DY_JpqpU.js"])))=>i.map(i=>d[i]);
import { t as __vitePreload } from "./preload-helper-DgxWz94Y.js";
//#region node_modules/__mf__virtual/pod__H_A_I__hostAutoInit__H_A_I__.js
var remoteEntryPromise = __vitePreload(() => import("../remoteEntry.js"), __vite__mapDeps([0,1,2,3,4,5]));
Promise.resolve(remoteEntryPromise).then((remoteEntry) => {
	return Promise.resolve(remoteEntry.__tla).then(remoteEntry.init).catch(remoteEntry.init);
});
//#endregion
