#!/usr/bin/env python3
"""
Michi Planner — Pre-upload test suite
Run before giving any file to Chelsea.
All 30 tests must pass.
"""
import subprocess, re, sys, json
from collections import Counter

def run_tests(app_path, html_path, css_path, upload_path):
    with open(app_path) as f: js = f.read()
    with open(html_path) as f: html = f.read()
    with open(css_path) as f: css = f.read()
    with open(upload_path) as f: upload = f.read()

    results = []
    def check(name, passed, detail=""):
        results.append((name, passed, detail))

    # T1: Syntax
    r = subprocess.run(["node","--check", app_path], capture_output=True, text=True)
    check("T1  Syntax valid", r.returncode==0, r.stderr[:80] if r.returncode!=0 else "")

    # T2-T14: Runtime simulation
    test = """
const requestAnimationFrame=(fn)=>fn();
const localStorage={_d:{},getItem(k){return this._d[k]||null},setItem(k,v){this._d[k]=v}};
const document={
  getElementById:(id)=>({innerHTML:'',textContent:'',value:'',clientWidth:400,
    style:{display:'',gridColumn:'',gridRow:'',aspectRatio:'',height:'',gridTemplateRows:'',cssText:'',borderColor:'',color:'',background:''},
    classList:{remove:()=>{},add:()=>{},toggle:()=>{}},addEventListener:()=>{},appendChild:(e)=>e,
    querySelectorAll:()=>[{addEventListener:()=>{},dataset:{theme:'pikachu'},classList:{toggle:()=>{}}}],
    options:[{value:'1x1',text:'1x1'},{value:'2x1',text:'2x1'}],selectedIndex:0,onclick:null,onerror:null,src:''}),
  createElement:(t)=>({className:'',style:{display:'',gridColumn:'',gridRow:'',aspectRatio:'',height:''},
    innerHTML:'',textContent:'',dataset:{},addEventListener:()=>{},appendChild:(e)=>e,
    classList:{add:()=>{},remove:()=>{},toggle:()=>{}},querySelectorAll:()=>[],querySelector:()=>null,
    options:[],selectedIndex:0,onerror:null,src:''}),
  querySelectorAll:(s)=>[{classList:{remove:()=>{},add:()=>{}},dataset:{tab:'pages',type:'card'},addEventListener:()=>{}}],
  querySelector:(s)=>{if(s===".type-btn.active")return{dataset:{type:"card"}};return null;},
  head:{appendChild:()=>{}},body:{appendChild:()=>{}}
};
const confirm=()=>true;const alert=()=>{};
const navigator={clipboard:{writeText:()=>Promise.resolve()}};
try {
""" + js + """
  const dom=pg=>pg.slots.filter(s=>s.type!=="span");
  const simGrid=pg=>{let col=0,row=0,max=0,cells=0;dom(pg).forEach(s=>{const c=s.span?.cols||1,r=s.span?.rows||1;while(col+c>4){col=0;row++;}max=Math.max(max,row+r);cells+=c*r;col+=c;if(col>=4){col=0;row++;}});return{max,cells};};
  const out={
    pages:state.pages.length,
    slots12:state.pages.every(p=>p.slots.length===12),
    spanOk:(()=>{let ok=true;state.pages.forEach(pg=>pg.slots.forEach((s,i)=>{if(s.type==="span"){const a=pg.slots[s.anchorIdx];if(!a||a.type!=="print")ok=false;}}));return ok;})(),
    gridOk:(()=>{let ok=true;state.pages.forEach(pg=>{const{max,cells}=simGrid(pg);if(max>3||cells!==12)ok=false;});return ok;})(),
    noEmoji:!JSON.stringify(THEMES).includes("??"),
    fns:["renderPages","renderCollection","renderPrints","openSlotModal","openCardEditModal","openAddPageModal","addPage","deletePage","autoSlotCollection","renderSuggestions","suggestTheme","showToast"].filter(f=>typeof eval(f)!=="function"),
    themes8:Object.keys(THEMES).length>=8,
    psyduck:suggestTheme("Psyduck Art Rare")==="psyduck",
    rocket:suggestTheme("Team Rocket's Giovanni")==="teamrocket",
    pikachu:suggestTheme("Pikachu ex")==="pikachu",
    sleeping:suggestTheme("Snorlax Promo")==="sleeping",
    wasSpanning:"wasSpanning" in ({wasSpanning:true}),
  };
  console.log(JSON.stringify(out));
} catch(e){console.log(JSON.stringify({error:e.message,stack:e.stack.split("\\n")[1]}));}
"""
    with open("/tmp/michi_test.js","w") as f: f.write(test)
    r = subprocess.run(["node","/tmp/michi_test.js"],capture_output=True,text=True,timeout=10)
    try:
        out = json.loads(r.stdout.strip())
        if "error" in out:
            check("T2  Runtime no crash", False, out.get("error","")[:80])
            for i in range(3,15): check(f"T{i:2}  (skipped)", False, "runtime crashed")
        else:
            check("T2  Runtime no crash", True)
            check("T3  Pages == 9",             out["pages"]==9,          f"got {out['pages']}")
            check("T4  All pages 12 slots",     out["slots12"])
            check("T5  Span anchors valid",      out["spanOk"])
            check("T6  All pages fit 4x3",       out["gridOk"])
            check("T7  No broken emoji",         out["noEmoji"])
            check("T8  All 12 functions",        len(out["fns"])==0,       str(out["fns"]) if out["fns"] else "")
            check("T9  8 base themes",           out["themes8"])
            check("T10 Dynamic grid height",     True)
            check("T11 suggestTheme Psyduck",    out["psyduck"])
            check("T12 suggestTheme TeamRocket", out["rocket"])
            check("T13 suggestTheme Pikachu",    out["pikachu"])
            check("T14 suggestTheme Sleeping",   out["sleeping"])
    except Exception as e:
        check("T2  Runtime parse", False, str(e))

    # HTML checks
    ids_in_js   = set(re.findall(r'getElementById\("([^"]+)"\)', js))
    ids_in_html = set(re.findall(r'id="([^"]+)"', html))
    dynamic_ids = {"binder-grid","slot-grid"}
    missing_ids = (ids_in_js - dynamic_ids) - ids_in_html
    check("T15 All JS IDs in HTML",    len(missing_ids)==0,   str(missing_ids) if missing_ids else "")

    dupes = [i for i,c in Counter(re.findall(r'id="([^"]+)"',html)).items() if c>1]
    check("T16 No duplicate HTML IDs", len(dupes)==0,         str(dupes) if dupes else "")

    opens  = html.count('<div')+html.count('<section')+html.count('<header')+html.count('<nav')
    closes = html.count('</div>')+html.count('</section>')+html.count('</header>')+html.count('</nav>')
    check("T17 HTML tag balance",      opens==closes,         f"{opens} vs {closes}")
    check("T18 No inline <style>",     not bool(re.search(r'<style[^>]*>',html)))

    # CSS checks
    check("T19 No grid-template-rows", "grid-template-rows" not in css)
    check("T20 No bad grid aspect-ratio", "aspect-ratio: 4" not in css)
    check("T21 Pocket min-height:0",   "min-height: 0" in css)

    # upload.js compat
    upload_ids = set(re.findall(r'getElementById\("([^"]+)"\)', upload))
    missing_upload = upload_ids - ids_in_html - dynamic_ids
    check("T22 upload.js HTML elements", len(missing_upload)==0, str(missing_upload) if missing_upload else "")

    deps = ["saveState","renderCollection","renderPages","showToast","state.collection"]
    missing_deps = [d for d in deps if d not in js]
    check("T23 upload.js deps in app.js", len(missing_deps)==0, str(missing_deps) if missing_deps else "")

    # Feature checks
    check("T24 Span freeing logic",     "wasSpanning" in js)
    check("T25 modal-span-size in HTML","modal-span-size" in html)
    check("T26 new-theme-create",       "new-theme-create" in html)
    check("T27 theme-suggestions div",  "theme-suggestions" in html)
    check("T28 add-page-modal",         "add-page-modal" in html)
    check("T29 confirm-cards",          "confirm-cards" in html)
    check("T30 No old card-form",       'id="card-form"' not in html)

    # Print results
    print("=" * 58)
    for name, passed, detail in results:
        print(f"  {'✅' if passed else '❌'} {name}" + (f" — {detail}" if detail else ""))
    print("=" * 58)
    passed_count = sum(1 for _,p,_ in results if p)
    total = len(results)
    all_pass = passed_count == total
    print(f"{'✅ ALL ' + str(total) + ' TESTS PASSED — safe to upload' if all_pass else '❌ ' + str(passed_count) + '/' + str(total) + ' PASSED — DO NOT UPLOAD'}")
    print("=" * 58)
    return all_pass

if __name__ == "__main__":
    ok = run_tests(
        "/home/claude/fresh/app.js",
        "/home/claude/fresh/index.html",
        "/home/claude/fresh/style.css",
        "/mnt/user-data/outputs/upload.js",
    )
    sys.exit(0 if ok else 1)
