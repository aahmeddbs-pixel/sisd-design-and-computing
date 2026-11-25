/* SEAL: opens content that was locked by tools/seal.py.
   The content is scrambled (AES-256) with a key K. K is locked once for each allowed login.
   Nothing readable is in the page until the right login is typed. */
var SEAL = (function(){
"use strict";
var ITER = 150000, TE = new TextEncoder(), TD = new TextDecoder();
function unb64(s){ return Uint8Array.from(atob(s), function(c){ return c.charCodeAt(0); }); }
function b64(u8){ var s = ""; for (var i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s); }
function secret(user, pw){ var c = function(s){ return String(s || "").replace(/\s+/g, "").toLowerCase(); }; return "seal|" + c(user) + "|" + c(pw); }
async function kek(sec, salt){
  var base = await crypto.subtle.importKey("raw", TE.encode(sec), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey({ name:"PBKDF2", hash:"SHA-256", salt:salt, iterations:ITER }, base, { name:"AES-GCM", length:256 }, false, ["encrypt", "decrypt"]);
}
/* K from one wrap and one secret, or null */
async function unwrap(w, sec){
  try { var k = await kek(sec, unb64(w.s)); return new Uint8Array(await crypto.subtle.decrypt({ name:"AES-GCM", iv:unb64(w.i) }, k, unb64(w.c))); }
  catch(e){ return null; }
}
async function unwrapAny(wraps, sec){ for (var i = 0; i < (wraps || []).length; i++){ var K = await unwrap(wraps[i], sec); if (K) return K; } return null; }
async function wrap(K, sec){
  var salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12)), k = await kek(sec, salt);
  return { s:b64(salt), i:b64(iv), c:b64(new Uint8Array(await crypto.subtle.encrypt({ name:"AES-GCM", iv:iv }, k, K))) };
}
/* the readable text inside a box, or throws */
async function open(K, bx){
  var key = await crypto.subtle.importKey("raw", K, "AES-GCM", false, ["decrypt"]);
  var z = new Uint8Array(await crypto.subtle.decrypt({ name:"AES-GCM", iv:unb64(bx.i) }, key, unb64(bx.c)));
  var out = await new Response(new Blob([z]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer();
  return TD.decode(out);
}
/* remember K for this tab (and on this computer only if asked) */
function keep(site, K, remember){ try { sessionStorage.setItem("seal_" + site, b64(K)); if (remember) localStorage.setItem("seal_" + site, b64(K)); } catch(e){} }
function kept(site){ var v = null; try { v = sessionStorage.getItem("seal_" + site) || localStorage.getItem("seal_" + site); } catch(e){} return v ? unb64(v) : null; }
function forget(site){ try { sessionStorage.removeItem("seal_" + site); localStorage.removeItem("seal_" + site); } catch(e){} }
/* run sealed script files in order, as ordinary page scripts */
function run(files){ files.forEach(function(f){ var s = document.createElement("script"); s.textContent = f[1] + "\n//# sourceURL=sealed/" + f[0]; document.head.appendChild(s); }); }
return { secret:secret, unwrap:unwrap, unwrapAny:unwrapAny, wrap:wrap, open:open, keep:keep, kept:kept, forget:forget, run:run, b64:b64, unb64:unb64,
  ok: !!(window.crypto && crypto.subtle && typeof DecompressionStream === "function") };
})();
