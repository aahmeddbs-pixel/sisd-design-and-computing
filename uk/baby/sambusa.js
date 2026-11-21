/* Sambusa: a little section for a 1-year-old, separate from KS3 and KS4.
   Original videos starring Sambusa (a friendly samosa) teach first words and fruits slowly, with repetition,
   syllable claps, a "your turn" pause and a celebration. The video carries music and sound effects; the words
   are spoken by this device's voice exactly in time with the video, so it works on any phone or laptop.
   Below the videos, picture cards say the word when tapped. */
(function(){
"use strict";
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
const WORDS = [
  ["Fruits", [["🍎","apple","A red apple"],["🍌","banana","A yellow banana"],["🍊","orange","An orange"],["🍇","grapes","Purple grapes"],["🍓","strawberry","A red strawberry"],["🥭","mango","A mango"],["🍉","watermelon","Watermelon"],["🍐","pear","A green pear"],["🍒","cherry","Cherries"],["🍍","pineapple","A pineapple"],["🥝","kiwi","A kiwi"],["🍑","peach","A peach"]]],
  ["First words", [["👋","hi","Wave hi!"],["👩","mama","Mama"],["👨","dada","Dada"],["👶","baby","Baby"],["🥛","milk","Milk"],["💧","water","Water"],["⚽","ball","Ball"],["🍪","more","More, please!"],["🤗","hug","A big hug"],["👟","shoes","Shoes"],["📖","book","Book"],["🛁","bath","Bath time"]]],
  ["Animals", [["🐶","dog","The dog says woof woof"],["🐱","cat","The cat says meow"],["🐮","cow","The cow says moo"],["🦆","duck","The duck says quack quack"],["🐑","sheep","The sheep says baa"],["🐔","chicken","The chicken says cluck cluck"],["🐟","fish","Fish"],["🐦","bird","The bird says tweet tweet"]]]];

/* Swahili fruit words, as said in Mombasa. [emoji, Swahili] */
const SWW = [
  ["Matunda", [["🍌","ndizi"],["🥭","embe"],["🍊","chungwa"],["🍍","nanasi"],["🍉","tikiti"],["🥥","nazi"],["🍇","zabibu"],["🍎","tufaha"]]]];
const swId = w => "sw-" + w.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");

let voice = null, clip0 = null;
function pickVoice(){
  try { const L = speechSynthesis.getVoices(); if (!L.length) return;
    const want = ["Google UK English Female", "Samantha", "Serena", "Karen", "Moira", "Tessa", "Microsoft Libby", "Microsoft Sonia", "Microsoft Aria", "Microsoft Jenny", "Google US English"];
    voice = want.map(n => L.find(v => v.name.indexOf(n) === 0)).find(Boolean) || L.find(v => /^en-GB/i.test(v.lang)) || L.find(v => /^en/i.test(v.lang)) || null; } catch(e){}
}
try { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; } catch(e){}
function speak(text, slow){
  try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); if (voice) u.voice = voice; u.lang = voice ? voice.lang : "en-GB"; u.rate = slow ? .7 : .85; u.pitch = 1.25; speechSynthesis.speak(u); } catch(e){}
}
function hush(){ try { speechSynthesis.cancel(); } catch(e){} try { if (clip0) clip0.pause(); } catch(e){} }

/* speak each cue as the video passes it; skip cues jumped over by seeking */
function wire(video, cues, toggle){
  let last = 0, on = true;
  const upd = () => { toggle.textContent = on ? "🔊 Sambusa's voice: on" : "🔇 Sambusa's voice: off"; toggle.setAttribute("aria-pressed", on); };
  toggle.onclick = () => { on = !on; if (!on) hush(); upd(); }; upd();
  video.addEventListener("timeupdate", () => { const t = video.currentTime;
    if (t < last || t - last > 1.5){ last = t; return; }
    if (on) for (const c of cues) if (c[0] > last && c[0] <= t + 0.05){ speak(c[1]); }
    last = t; });
  video.addEventListener("seeking", () => { last = video.currentTime; hush(); });
  video.addEventListener("pause", hush); video.addEventListener("ended", hush);
  video.addEventListener("play", () => { last = video.currentTime - 0.01; });
}

function render(app, back){
  const V = window.SAMBUSA_VIDEOS || [];
  app.innerHTML = `<button class="back" id="bk">← Home</button>
  <div class="card stack sambusa" style="border-top:6px solid #F0B040">
    <div><div class="eyebrow">Sambusa · for little ones</div><h1>🥟 Sambusa: first words and fruits</h1>
      <p class="muted">Short, slow, happy videos for a 1-year-old. Sambusa shows a picture, says the word, claps it out, then pauses: <b>"Your turn!"</b> Say the word together, then cheer! Turn the sound up so your little one can hear Sambusa's friendly voice and copy the words.</p></div>
    <div class="sbtips"><b>Tips for grown-ups</b><ul><li>Watch together and copy Sambusa: point, say the word, clap the beats.</li><li>In the "Your turn!" pause, wait and smile. Any sound or babble is a great try: cheer it!</li><li>A few minutes at a time is plenty. Repeat favourites: babies learn by repetition.</li><li>Then use the real thing: hold up a real banana and say "banana".</li></ul></div>
    ${V.map((v, i) => `<div class="sbvid"><h2>${{ "sambusa-fruits":"🍎", "sambusa-first-words":"👋", "sambusa-peekaboo":"🙈", "sambusa-animals":"🐶", "sambusa-swahili":"🇰🇪" }[v.id] || "🎬"} ${esc(v.title)}</h2><p class="muted small">${esc(v.desc)} · ${Math.round(v.dur / 60)} min</p>
      <video controls preload="none" playsinline poster="uk/baby/${esc(v.id)}.jpg" src="uk/baby/${esc(v.id)}.mp4" data-i="${i}"></video>
</div>`).join("")}
    <div class="lsec"><h2>👆 Tap and say</h2><p class="muted small">Tap a picture to hear the word. Tap again to hear it slowly.</p>
      ${WORDS.map(([g, L]) => `<h3 style="margin-top:12px">${esc(g)}</h3><div class="sbcards">${L.map(w => `<button class="sbcard" type="button" data-f="${esc(w[1])}" data-w="${esc(w[1])}" data-x="${esc(w[2])}"><span class="e">${w[0]}</span><span>${esc(w[1])}</span></button>`).join("")}</div>`).join("")}</div>
    <div class="lsec" id="swahili"><h2>🇰🇪 Swahili fruits</h2>
      <p class="muted small">Fruit words in Swahili, said the Mombasa way. Watch the "Swahili Fruits" video above, then tap a card to hear the word. Tap again to hear it slowly.</p>
      ${SWW.map(([g, L]) => `<div class="sbcards">${L.map(w => `<button class="sbcard" type="button" data-f="${esc(swId(w[1]))}" data-w="${esc(w[1])}" data-x="${esc(w[1])}"><span class="e">${w[0]}</span><span>${esc(w[1])}</span></button>`).join("")}</div>`).join("")}</div>
  </div>`;
  app.querySelector("#bk").onclick = () => { hush(); back(); };
  app.querySelectorAll("video").forEach(vd => vd.addEventListener("play", () => { hush(); app.querySelectorAll("video").forEach(o => { if (o !== vd) o.pause(); }); }));
  const tapped = {}; let clip = null;
  app.querySelectorAll(".sbcard").forEach(b => b.onclick = () => { const w = b.dataset.w, n = tapped[w] = (tapped[w] || 0) + 1;
    b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop");
    /* the recorded voice (same lady as the videos); the device's voice only if the recording can't play */
    const slow = n % 2 === 0; hush();
    clip = clip0 = new Audio("uk/baby/words/" + encodeURIComponent(b.dataset.f) + (slow ? "-slow" : "") + ".mp3");
    clip.play().catch(() => speak(slow ? w + "." : b.dataset.x.toLowerCase().indexOf(w) >= 0 ? b.dataset.x + "." : w + "! " + b.dataset.x + ".", slow)); });
}
window.SAMBUSA = { render, hush, WORDS, SWW, swId };
})();
