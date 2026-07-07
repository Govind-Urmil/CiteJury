from pathlib import Path
import re, sys

ROOT=Path(__file__).resolve().parents[1]
errors=[]

required=[
"index.html","trust.html","privacy.html","terms.html","robots.txt","sitemap.xml",
"assets/css/style.css","assets/js/app.js","assets/js/citation-engine.js",
"docs/PROJECT_CONTEXT.md","docs/EP-LEDGER.md"
]
for item in required:
    if not (ROOT/item).exists(): errors.append(f"Missing required file: {item}")

html_files=list(ROOT.glob("*.html"))+list((ROOT/"guides").glob("*.html"))
for page in html_files:
    text=page.read_text(encoding="utf-8")
    for href in re.findall(r'href=["\']([^"\']+)["\']',text):
        if href.startswith(("http://","https://","mailto:","#")): continue
        target=href.split("#")[0].split("?")[0]
        if not target: continue
        resolved=(page.parent/target).resolve()
        if not resolved.exists(): errors.append(f"Broken local link: {page.relative_to(ROOT)} -> {href}")

engine=(ROOT/"assets/js/citation-engine.js").read_text(encoding="utf-8")
for token in ["CiteJuryCitationEngine","generate","validate","normalize"]:
    if token not in engine: errors.append(f"Citation engine contract missing: {token}")

if errors:
    print("\n".join(f"FAIL: {e}" for e in errors))
    sys.exit(1)
print(f"PASS: {len(html_files)} HTML files checked; required files and local links verified.")
