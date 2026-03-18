import e from "./Input.module.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/Input/Input.tsx
var n = (n) => /* @__PURE__ */ t("input", {
	...n,
	className: `${e.input} ${n.className ?? ""}`
});
//#endregion
export { n as Input };
