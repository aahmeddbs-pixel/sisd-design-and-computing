"""Sambusa voice: records a warm, natural female voice (Kokoro-82M, Apache-2.0, voice af_heart) for every line
of the Sambusa baby videos and mixes it into the mp4s at the exact cue times, over the music and sound effects.
Also records each picture-card word (normal and slow). Runs on GitHub Actions (.github/workflows/sambusa-voice.yml).
Safe to run again: the video picture is reused and the music bed comes from tools/sambusa-voice/beds."""
import json, os, re, subprocess, sys
import numpy as np
import soundfile as sf
from kokoro import KPipeline

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
BABY = os.path.join(ROOT, "uk", "baby"); BEDS = os.path.join(ROOT, "tools", "sambusa-voice", "beds")
SR = 44100; VOICE = "af_heart"; BASE_SPEED = 0.82
pipe = KPipeline(lang_code="a")

def tts(text, speed):
    parts = [a for _, _, a in pipe(text, voice=VOICE, speed=speed)]
    a = np.concatenate([np.asarray(p, dtype=np.float32) for p in parts]) if parts else np.zeros(100, np.float32)
    a = np.interp(np.arange(int(len(a) * SR / 24000)) * 24000 / SR, np.arange(len(a)), a).astype(np.float32)
    idx = np.where(np.abs(a) > 0.01)[0]                       # trim silence at both ends
    if len(idx): a = a[max(0, idx[0] - 600): idx[-1] + 2000]
    return a / max(1e-6, np.abs(a).max()) * 0.92

def fit(text, room):
    """say it gently; speed up a little only if it would run into the next line"""
    sp = BASE_SPEED; a = tts(text, sp)
    if room and len(a) / SR > room:
        sp = min(1.2, sp * (len(a) / SR) / room); a = tts(text, sp)
    return a

def decode(path):
    raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", path, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32).copy()

js = open(os.path.join(BABY, "videos.js"), encoding="utf-8").read()
VIDEOS = json.loads(js[js.index("= ") + 2: js.rstrip().rindex(";")])
SPOKEN = {"inj": "inge", "pull": "pull", "ee": "ee", "nah": "nah", "bah": "bah"}

for v in VIDEOS:
    bed = decode(os.path.join(BEDS, v["id"] + ".m4a")) * 0.55
    voice = np.zeros(len(bed) + SR * 5, np.float32)
    cues = v["cues"]
    for i, (t, text) in enumerate(cues):
        nxt = cues[i + 1][0] if i + 1 < len(cues) else v["dur"]
        say = SPOKEN.get(text, text)
        if re.fullmatch(r"[a-z]{1,6}", say) and len(cues) > 1:      # a single clapped syllable: say it clearly
            say = say.capitalize() + "!"
        a = fit(say, max(0.5, nxt - t - 0.12))
        o = int(t * SR); voice[o:o + len(a)] += a
        print(v["id"], t, repr(text), round(len(a) / SR, 2), "s", flush=True)
    mix = bed + voice[:len(bed)] * 0.95
    mix = np.clip(mix, -1, 1)
    wav = os.path.join(BABY, "_" + v["id"] + ".wav"); sf.write(wav, mix, SR)
    src = os.path.join(BABY, v["id"] + ".mp4"); tmp = os.path.join(BABY, "_" + v["id"] + ".tmp.mp4")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", src, "-i", wav, "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "128k", "-shortest", "-movflags", "+faststart", tmp], check=True)
    os.replace(tmp, src); os.remove(wav)

# picture cards: word + short phrase, and the word said slowly twice
WORDS = json.load(open(os.path.join(ROOT, "tools", "sambusa-voice", "words.json"), encoding="utf-8"))
os.makedirs(os.path.join(BABY, "words"), exist_ok=True)
for w, phrase in WORDS:
    for name, text, sp in [(w, f"{w}! {phrase}.", BASE_SPEED), (w + "-slow", f"{w}... {w}.", 0.65)]:
        a = tts(text, sp); wav = os.path.join(BABY, "words", "_t.wav"); sf.write(wav, a, SR)
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", wav, "-ac", "1", "-b:a", "64k", os.path.join(BABY, "words", name + ".mp3")], check=True)
        os.remove(wav)
json.dump({"voice": "Kokoro " + VOICE, "videos": [v["id"] for v in VIDEOS], "words": len(WORDS)}, open(os.path.join(BABY, "voice.json"), "w"))
print("done")
