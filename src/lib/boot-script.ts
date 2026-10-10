import { LANG_STORAGE_KEY, THEME_STORAGE_KEY } from "./storage-keys";

/**
 * Runs synchronously in <head> before first paint. Sets on <html>:
 *  - data-theme: stored choice, otherwise the system preference (kept in sync)
 *  - lang: "bn" if the visitor chose Bangla earlier
 *  - data-os: "mac" | "windows" (decides which download button is primary)
 *  - data-mobile: present on phones/tablets (shows the "open on your computer" note)
 * Also exposed as window.__medidesk.apply() so React can re-apply it
 * (React's dev-mode Strict remount clears attributes on <html>).
 */
export const bootScript = `(function(){
var d=document.documentElement;
function theme(){var s=null;try{s=localStorage.getItem("${THEME_STORAGE_KEY}")}catch(e){}
d.setAttribute("data-theme",s==="dark"||s==="light"?s:(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"))}
function apply(){theme();
try{if(localStorage.getItem("${LANG_STORAGE_KEY}")==="bn")d.lang="bn"}catch(e){}
var n=navigator,ua=n.userAgent||"",uad=n.userAgentData,p=(uad&&uad.platform)||n.platform||"";
var ios=/iPhone|iPad|iPod/.test(ua)||(/Mac/.test(p)&&n.maxTouchPoints>1);
var mac=ios||/mac/i.test(p)||/Macintosh|Mac OS X/.test(ua);
d.setAttribute("data-os",mac?"mac":"windows");
if(ios||(uad&&uad.mobile)||/Android|Mobi/i.test(ua))d.setAttribute("data-mobile","");}
apply();
try{matchMedia("(prefers-color-scheme: dark)").addEventListener("change",theme)}catch(e){}
window.__medidesk={apply:apply};
})();`;
