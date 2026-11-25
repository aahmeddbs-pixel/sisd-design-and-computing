/* Study Plus (IB) and Study Plus UK: opening the locked questions.
   One key opens both sites. It is unlocked by:
   - the family login (Mahaira20), typed on the Study Plus UK sign-in, or
   - Mikaeel's own sign-in (Computer Science / Design): the key is saved online, locked with his own secret,
     the first time he opens Study Plus (he types the family login once, on any computer). After that it opens by itself.
   The key is kept for this browser tab only. */
var SPBOOT = (function(){
"use strict";
var SITE = "sp";
async function hex(t){ var d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t)); return Array.from(new Uint8Array(d)).map(function(v){ return v.toString(16).padStart(2, "0"); }).join(""); }
/* Mikaeel (or the test account), signed in through Computer Science or Design */
function mik(){
  if (!window.SDC) return null;
  var G = SDC.gate(), W = G && (G.acct || G.who);
  return W && SDC.studyPlusOK(W) ? { G:G, W:W } : null;
}
/* the same secrets Study Plus already uses to lock his saved progress */
async function secrets(m){
  var L = m.G.link || {}, out = [];
  var A = Object.assign({ course:"study" }, m.G.acct || {}, { name: m.W.name || "", email: m.W.email || "" });
  var em = String((L.design && L.design.email) || (SDC.studyPlusEmail ? SDC.studyPlusEmail(A) : "") || A.email || "").toLowerCase();
  var dk = (L.cs && L.cs.dk) || (m.G.acct && m.G.acct.dk) || "";
  if (dk && em) out.push("cs" + (await hex("sdc-cs-design|" + em + "|" + dk)).slice(0, 40));
  if (L.design && L.design.pw) out.push(String(L.design.pw));
  return out.filter(function(v, i){ return out.indexOf(v) === i; });
}
async function rowId(s){ return (await hex("seal-sp-id|" + s)).slice(0, 32); }
async function fromRows(secs){
  for (var i = 0; i < secs.length; i++){
    var rows = [];
    try { rows = await Promise.race([SDC.rows("K", await rowId(secs[i]), 5), new Promise(function(r){ setTimeout(function(){ r([]); }, 9000); })]) || []; } catch(e){ rows = []; }
    for (var j = 0; j < rows.length; j++){ try { var K = await SEAL.unwrap(JSON.parse(rows[j].text), "seal-mik|" + secs[i]); if (K) return K; } catch(e){} }
  }
  return null;
}
async function saveRows(K, secs){
  for (var i = 0; i < secs.length; i++){ try { SDC.sendRow("K", await rowId(secs[i]), JSON.stringify(await SEAL.wrap(K, "seal-mik|" + secs[i]))); } catch(e){} }
  try { SDC.flush(); } catch(e){}
}
/* first time only: the family login, in a small card over the page */
function ask(wraps, first){
  return new Promise(function(done){
    var bg = document.createElement("div");
    bg.setAttribute("style", "position:fixed;inset:0;z-index:2147483600;background:rgba(15,28,51,.6);display:flex;align-items:center;justify-content:center;padding:16px;font:16px Arial,Helvetica,sans-serif");
    bg.innerHTML = '<form style="background:#fff;color:#1B2D4E;border-radius:14px;max-width:380px;width:100%;padding:22px;box-shadow:0 10px 30px rgba(0,0,0,.3)" autocomplete="off">'
      + '<div style="font-weight:800;color:#DC2B3E;letter-spacing:.04em;font-size:12px">STUDY PLUS</div>'
      + '<h2 style="margin:6px 0 8px;font-size:22px">Unlock Study Plus</h2>'
      + '<p style="margin:0 0 12px;color:#4a5a73;font-size:14px">' + (first ? 'Hi ' + String(first).replace(/[<>&"]/g, "") + '! This is needed <b>once only</b>. Type the family login (ask Mr. Ahmed). After this, Study Plus opens by itself when you sign in.' : 'Type the family login.') + '</p>'
      + '<label style="display:block;font-weight:700;margin:8px 0 4px">Username<input name="u" autocapitalize="off" spellcheck="false" style="display:block;width:100%;box-sizing:border-box;font:inherit;padding:10px;border:1px solid #c5cedd;border-radius:8px;margin-top:4px"></label>'
      + '<label style="display:block;font-weight:700;margin:8px 0 4px">Password<input name="p" type="password" style="display:block;width:100%;box-sizing:border-box;font:inherit;padding:10px;border:1px solid #c5cedd;border-radius:8px;margin-top:4px"></label>'
      + '<div data-e style="color:#c0262f;font-weight:700;min-height:1.3em;margin-top:8px;font-size:14px"></div>'
      + '<button style="margin-top:8px;width:100%;font:800 16px Arial,Helvetica,sans-serif;padding:12px;border:0;border-radius:10px;background:#DC2B3E;color:#fff;cursor:pointer">Unlock</button>'
      + '<button type="button" data-x style="margin-top:8px;width:100%;font:700 14px Arial,Helvetica,sans-serif;padding:10px;border:1px solid #c5cedd;border-radius:10px;background:#fff;color:#1B2D4E;cursor:pointer">Not now</button></form>';
    document.body.appendChild(bg);
    var f = bg.querySelector("form"), e = bg.querySelector("[data-e]");
    f.u.focus();
    bg.querySelector("[data-x]").onclick = function(){ bg.remove(); done(null); };
    f.onsubmit = async function(ev){
      ev.preventDefault(); e.textContent = "Checking…";
      var K = await SEAL.unwrapAny(wraps, SEAL.secret(f.u.value, f.p.value));
      if (!K){ e.textContent = "That username or password isn't right."; f.p.value = ""; return; }
      bg.remove(); done(K);
    };
  });
}
/* the key for Mikaeel: kept in this tab, else from his saved copy online, else (first time) the family login once */
async function mikKey(wraps){
  var m = mik(); if (!m) return null;
  var K = SEAL.kept(SITE); if (K) return K;
  var secs = await secrets(m);
  K = await fromRows(secs);
  if (!K){ K = await ask(wraps, String(m.W.name || "").split(/\s+/)[0]); if (K && secs.length) await saveRows(K, secs); }
  if (K) SEAL.keep(SITE, K, false);
  return K;
}
/* open a sealed bundle with K and run its files; true when done */
async function load(bundle, K){
  try { SEAL.run(JSON.parse(await SEAL.open(K, bundle.b))); return true; } catch(e){ SEAL.forget(SITE); return false; }
}
return { SITE:SITE, mik:mik, mikKey:mikKey, load:load, ask:ask };
})();
