import e from "./Button.module.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/Button/Button.tsx
var n = (n) => /* @__PURE__ */ t("button", {
	...n,
	className: `${e.button} ${n.className ?? ""}`
});
//#endregion
export { n as Button };
