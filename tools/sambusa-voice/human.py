"""Sambusa: real human voices from Wikimedia Commons (free licences, credited on the page).
English words: Shtooka Project recordings by Judith Franck, a woman from London ("En-uk-<word>.ogg", CC BY 3.0),
then other British female recordings, then Lingua Libre speakers. Swahili fruit words: Lingua Libre speakers (swa).
Each recording is trimmed, levelled and placed into the videos at the cue times (videos.js) over the music bed,
and saved for the picture cards (normal and a gently slowed copy). Writes uk/baby/credits.json and a report."""
import json, os, re, subprocess, sys, time, urllib.parse, urllib.request
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
BABY = os.path.join(ROOT, "uk", "baby"); TOOLS = os.path.join(ROOT, "tools", "sambusa-voice"); BEDS = os.path.join(TOOLS, "beds")
CLIPS = os.path.join(TOOLS, "clips"); os.makedirs(CLIPS, exist_ok=True); os.makedirs(os.path.join(BABY, "words"), exist_ok=True)
SR = 44100; UA = "SambusaBabyWords/1.0 (https://github.com/aahmeddbs-pixel/sisd-design-and-computing; educational)"
API = "https://commons.wikimedia.org/w/api.php"

def get(url, binary=False):
    for k in range(4):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=40) as r:
                d = r.read(); return d if binary else json.loads(d.decode("utf-8"))
        except Exception as e:
            print("retry", url[:120], e, flush=True); time.sleep(3 + 4 * k)
    return None
def api(**p):
    p.update(format="json", formatversion="2"); return get(API + "?" + urllib.parse.urlencode(p))
def strip_html(s): return re.sub(r"<[^>]+>", "", s or "").strip()

def info(titles):
    """imageinfo for File: titles -> {title: dict(url, author, licence, desc, page)}"""
    out = {}
    for i in range(0, len(titles), 40):
        r = api(action="query", titles="|".join(titles[i:i + 40]), prop="imageinfo", iiprop="url|extmetadata")
        for pg in (r or {}).get("query", {}).get("pages", []):
            if pg.get("missing") or not pg.get("imageinfo"): continue
            ii = pg["imageinfo"][0]; m = ii.get("extmetadata", {})
            out[pg["title"]] = dict(url=ii["url"], page=ii.get("descriptionurl", ""), author=strip_html(m.get("Artist", {}).get("value", "")),
                                   licence=strip_html(m.get("LicenseShortName", {}).get("value", "")), desc=strip_html(m.get("ImageDescription", {}).get("value", "")))
    return out
def search(q, limit=50):
    r = api(action="query", list="search", srsearch=q, srnamespace="6", srlimit=str(limit))
    return [x["title"] for x in (r or {}).get("query", {}).get("search", [])]

def find_en(w):
    cands = [f"File:En-uk-{w}.ogg", f"File:En-uk-{w}.oga", f"File:En-uk-{w.capitalize()}.ogg", f"File:En-gb-{w}.ogg"]
    I = info(cands)
    for t in cands:      # 1. Judith (Shtooka, London, female)
        if t in I and re.search(r"judith|shtooka", I[t]["author"] + I[t]["desc"], re.I): return t, I[t], "Judith (London)"
    for t in cands:      # 2. other British recordings described as a female voice
        if t in I and re.search(r"female", I[t]["desc"], re.I): return t, I[t], "British female"
    ll = [t for t in search(f'intitle:"LL-Q1860 (eng)" intitle:"{w}"') if re.fullmatch(r"File:LL-Q1860 \(eng\)-[^-]+-" + re.escape(w) + r"\.wav", t, re.I)]
    if ll:
        I = info(ll[:5]); t = next((t for t in ll if t in I), None)
        if t: return t, I[t], "Lingua Libre (English)"
    for t in cands:
        if t in I: return t, I[t], "British (other)"
    return None, None, None

def find_sw(w):
    ll = [t for t in search(f'intitle:"LL-Q7838 (swa)" intitle:"{w}"') if re.fullmatch(r"File:LL-Q7838 \(swa\)-[^-]+-" + re.escape(w) + r"\.(wav|ogg|oga)", t, re.I)]
    if not ll: ll = [t for t in search(f'"(swa)" {w}') if re.search(r"-" + re.escape(w) + r"\.(wav|ogg|oga)$", t, re.I)]
    if ll:
        I = info(ll[:8]); t = next((t for t in ll if t in I), None)
        if t: return t, I[t], "Lingua Libre (Swahili)"
    return None, None, None

def load(path):
    """decode, trim silence, level"""
    raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", path, "-af", "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.03,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse",
                          "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
    a = np.frombuffer(raw, dtype=np.float32).copy()
    fade = min(len(a) // 4, int(SR * 0.02)); a[:fade] *= np.linspace(0, 1, fade); a[-fade:] *= np.linspace(1, 0, fade)
    return a / max(1e-6, np.abs(a).max()) * 0.9

def main():
  WORDS = json.load(open(os.path.join(TOOLS, "words.json"), encoding="utf-8"))
  keys = [("sw:" + x[0][3:]) if x[0].startswith("sw-") else x[0] for x in WORDS]
  global report
  clips, credits = {}, []
  for k in keys:
      w = k[3:] if k.startswith("sw:") else k
      t, I, kind = find_sw(w) if k.startswith("sw:") else find_en(w)
      if not t: report.append(f"MISSING {k}"); continue
      ext = os.path.splitext(t)[1]; local = os.path.join(CLIPS, re.sub(r"[^a-z0-9]+", "_", k.lower()) + ext)
      data = get(I["url"], binary=True)
      if not data: report.append(f"DOWNLOAD FAILED {k} {t}"); continue
      open(local, "wb").write(data)
      try: clips[k] = load(local)
      except Exception as e: report.append(f"DECODE FAILED {k} {e}"); continue
      credits.append(dict(word=w, lang="sw" if k.startswith("sw:") else "en", file=t[5:], page=I["page"], author=I["author"][:120], licence=I["licence"], voice=kind))
      report.append(f"OK {k:14s} {kind:24s} {t[5:]}  [{I['licence']}] {I['author'][:60]}")
      time.sleep(0.3)
  print("\n".join(report), flush=True)

  # picture cards: the recording, and a gently slowed copy (same voice, same pitch)
  for x in WORDS:
      k = ("sw:" + x[0][3:]) if x[0].startswith("sw-") else x[0]
      for f in (x[0] + ".mp3", x[0] + "-slow.mp3"):
          p = os.path.join(BABY, "words", f)
          if os.path.exists(p): os.remove(p)
      if k not in clips: continue
      wav = os.path.join(CLIPS, "_t.wav"); import soundfile as sf; sf.write(wav, clips[k], SR)
      subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", wav, "-ac", "1", "-b:a", "64k", os.path.join(BABY, "words", x[0] + ".mp3")], check=True)
      subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", wav, "-af", "atempo=0.75,apad=pad_dur=0.2", "-ac", "1", "-b:a", "64k", os.path.join(BABY, "words", x[0] + "-slow.mp3")], check=True)
      os.remove(wav)

  # videos: music bed + the real word recordings at the cue times
  js = open(os.path.join(BABY, "videos.js"), encoding="utf-8").read()
  VIDEOS = json.loads(js[js.index("= ") + 2: js.rstrip().rindex(";")])
  for v in VIDEOS:
      raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", os.path.join(BEDS, v["id"] + ".m4a"), "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
      bed = np.frombuffer(raw, dtype=np.float32).copy() * 0.6
      voice = np.zeros(len(bed) + SR * 4, np.float32)
      for t, k in v["cues"]:
          if k in clips: o = int(t * SR); voice[o:o + len(clips[k])] += clips[k]
      mix = np.clip(bed + voice[:len(bed)], -1, 1)
      wav = os.path.join(BABY, "_" + v["id"] + ".wav"); import soundfile as sf; sf.write(wav, mix, SR)
      src = os.path.join(BABY, v["id"] + ".mp4"); tmp = os.path.join(BABY, "_" + v["id"] + ".tmp.mp4")
      subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", src, "-i", wav, "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "128k", "-shortest", "-movflags", "+faststart", tmp], check=True)
      os.replace(tmp, src); os.remove(wav)

  json.dump(credits, open(os.path.join(BABY, "credits.json"), "w"), ensure_ascii=False, indent=0)
  open(os.path.join(TOOLS, "report.txt"), "w").write("\n".join(report) + "\n")
  for f in os.listdir(CLIPS): os.remove(os.path.join(CLIPS, f))
  os.rmdir(CLIPS)
  for f in ("voice.json",):
      if os.path.exists(os.path.join(BABY, f)): os.remove(os.path.join(BABY, f))
  print("done", len(clips), "of", len(keys))

report = []
if __name__ == "__main__":
    import traceback
    try: main()
    except Exception:
        report.append("CRASH\n" + traceback.format_exc())
        open(os.path.join(TOOLS, "report.txt"), "w").write("\n".join(report) + "\n"); print(report[-1]); sys.exit(1)
