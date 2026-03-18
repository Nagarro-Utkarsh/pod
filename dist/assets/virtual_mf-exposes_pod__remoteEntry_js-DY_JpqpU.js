const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Button-Bl_Zq3UQ.js","assets/jsx-runtime-f_Am5jGJ.js","assets/rolldown-runtime-BjWfMKpL.js","assets/Button-cMxCgYHc.css","assets/Input-BAGP8B0K.js","assets/Input-B4jteI7g.css"])))=>i.map(i=>d[i]);
import { t as __vitePreload } from "./preload-helper-DgxWz94Y.js";
//#region virtual:mf-exposes:pod__remoteEntry_js
var virtual_mf_exposes_pod__remoteEntry_js_default = {
	"./Button": async () => {
		const importModule = await __vitePreload(() => import("./Button-Bl_Zq3UQ.js"), __vite__mapDeps([0,1,2,3]));
		const exportModule = {};
		Object.assign(exportModule, importModule);
		Object.defineProperty(exportModule, "__esModule", {
			value: true,
			enumerable: false
		});
		return exportModule;
	},
	"./Input": async () => {
		const importModule = await __vitePreload(() => import("./Input-BAGP8B0K.js"), __vite__mapDeps([4,1,2,5]));
		const exportModule = {};
		Object.assign(exportModule, importModule);
		Object.defineProperty(exportModule, "__esModule", {
			value: true,
			enumerable: false
		});
		return exportModule;
	}
};
//#endregion
export { virtual_mf_exposes_pod__remoteEntry_js_default as t };
