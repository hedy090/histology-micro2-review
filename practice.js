// Practice answers + familiarity marks. Loaded after data.js, pathology.js and kaogu.js.
// Everything is saved in this browser's localStorage (works offline from file://).

// ── Storage ──
const PR = {
  get(k, d) { try { const v = localStorage.getItem("histo:" + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem("histo:" + k, JSON.stringify(v)); } catch {} },
};

// ── Familiarity ──
const FAM_LEVELS = [
  { v: 1, label: "Unfamiliar", icon: "😕", color: "#e06c5a" },
  { v: 2, label: "Learning", icon: "🤔", color: "#e0a83a" },
  { v: 3, label: "Familiar", icon: "✅", color: "#3f9e63" },
];
let FAM = PR.get("fam", {});
const famOf = id => FAM[id] || 0;
function setFam(id, v) {
  if (FAM[id] === v) delete FAM[id]; else FAM[id] = v; // clicking the active level clears it
  PR.set("fam", FAM);
  document.querySelectorAll(`[data-fam-for="${id}"] button`).forEach(b => b.classList.toggle("on", +b.dataset.fam === famOf(id)));
  document.querySelectorAll(`.fam-dot[data-id="${id}"]`).forEach(d => { d.style.background = famColor(id); d.title = famLabel(id); });
  updateFamCounts();
}
const famColor = id => (FAM_LEVELS.find(l => l.v === famOf(id)) || {}).color || "transparent";
const famLabel = id => (FAM_LEVELS.find(l => l.v === famOf(id)) || { label: "Not marked" }).label;
function famPicker(id) {
  return `<div class="fam" data-fam-for="${id}"><span class="fam-title">Familiarity</span>${FAM_LEVELS.map(l =>
    `<button data-fam="${l.v}" class="${famOf(id) === l.v ? "on" : ""}" style="--c:${l.color}">${l.icon} ${l.label}</button>`).join("")}</div>`;
}
const famDot = id => `<span class="fam-dot" data-id="${id}" title="${famLabel(id)}" style="background:${famColor(id)}"></span>`;
function famCounts(ids) {
  const c = { 0: 0, 1: 0, 2: 0, 3: 0 };
  ids.forEach(id => c[famOf(id)]++);
  return `${FAM_LEVELS.slice().reverse().map(l => `${l.icon} ${l.label} <b>${c[l.v]}</b>`).join(" · ")} · Not marked <b>${c[0]}</b>`;
}
function updateFamCounts() {
  const a = document.getElementById("fam-count-atlas"), p = document.getElementById("fam-count-path");
  if (a) a.innerHTML = famCounts(ORGANS.map(o => o.id));
  if (p) p.innerHTML = famCounts((window.PATH_VISIBLE || PATHO).map(x => x.id));
}
document.addEventListener("click", e => {
  const b = e.target.closest("[data-fam-for] button");
  if (!b) return;
  e.stopPropagation();
  setFam(b.closest("[data-fam-for]").dataset.famFor, +b.dataset.fam);
});

// ── Answer matching (organ & diagnosis only; descriptions are self-checked) ──
const STOP = new Set(["the", "of", "and", "with", "a", "an", "in", "to", "or", "type"]);
const normTokens = s => String(s).toLowerCase()
  .replace(/[’'`]/g, "").replace(/[^a-z0-9]+/g, " ").trim().split(" ")
  .filter(t => t && !STOP.has(t)).map(t => t.length > 4 ? t.replace(/(es|s)$/, "") : t);
function lev(a, b) {
  const m = a.length, n = b.length, d = Array.from({ length: m + 1 }, (_, i) => [i]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m][n];
}
// returns 0 = no, 1 = exact token, 2 = near-miss spelling
function tokEq(u, t) {
  if (u === t) return 1;
  const tol = t.length >= 9 ? 2 : t.length >= 5 ? 1 : 0;
  return tol && Math.abs(u.length - t.length) <= tol && lev(u, t) <= tol ? 2 : 0;
}
// accepted: [[text, kind]] where kind = "full" | "partial: <note>"
// strict: extra words in the answer (e.g. "heart valve" when the answer is "heart") downgrade to partly right
function judge(input, accepted, strict = false) {
  const inT = normTokens(input);
  if (!inT.length) return { status: "empty" };
  let best = { status: "wrong", ratio: 0 };
  for (const [text, kind] of accepted) {
    const accT = normTokens(text);
    if (!accT.length) continue;
    let hits = 0, typo = false;
    for (const t of accT) {
      const r = Math.max(0, ...inT.map(u => tokEq(u, t)));
      if (r) hits++;
      if (r === 2) typo = true;
    }
    const ratio = hits / accT.length;
    const extra = strict ? inT.filter(u => !accT.some(t => tokEq(u, t))) : [];
    if (ratio === 1 && extra.length && kind.startsWith("full")) {
      if (1.4 > best.ratio) best = { status: "partial", note: `Extra words not in the answer: “${extra.join(" ")}”`, typo, ratio: 1.4 };
    } else if (ratio === 1) {
      const res = kind.startsWith("full") ? { status: "correct", typo, note: kind.replace(/^full:? ?/, "") || undefined, ratio: kind === "full" ? 2 : 1.9 } : { status: "partial", note: kind.replace(/^partial: ?/, ""), typo, ratio: 1.5 + Math.min(accT.length, 9) * 0.01 }; // longer (more specific) match wins
      if (res.ratio > best.ratio) best = res;
    } else if (ratio >= 0.5 && ratio > best.ratio && best.ratio < 1.5) {
      best = { status: "partial", note: "Some of the words match — check the full term", ratio };
    }
  }
  return best;
}

// Extra accepted wording beyond what is in the answer data.
const ORGAN_SYNONYMS = {
  "large intestine": ["colon", "large bowel"], colon: ["large intestine", "large bowel"],
  brain: ["cerebrum", "central nervous system", "cns"], cerebrum: ["brain", "central nervous system", "cns"],
  "heart valve": ["aortic valve", "mitral valve", "cardiac valve"], "aortic valve": ["heart valve"],
  "maxillary sinus": ["nasal cavity", "paranasal sinus", "sinonasal tract", "sinus"],
  anus: ["anal canal", "anorectal junction"], "oral cavity": ["mouth", "mouth floor", "floor of mouth"],
  "skin, thigh": ["skin"], stomach: ["gastric"],
  "sinonasal tract": ["nasal cavity", "paranasal sinus", "sinus", "respiratory tract"],
};
// Organ answers that are written as sentences in the data.
const ORGAN_EXTRA = {
  "p-herpes": ["oral cavity", "mouth floor", "skin"], "p-endocarditis": ["heart valve", "aortic valve", "mitral valve"],
  "p-cmv-gi": ["large intestine", "colon", "small intestine"],
  "p-pa0207": ["large intestine", "colon"], "p-pa0249": ["colon", "large intestine"], "p-pa0055": ["small intestine", "ileum"], "p-pa0279": ["stomach"], "p-pa0260": ["nasopharynx"],
  "p-pa0104": ["uterus", "uterine corpus", "myometrium"], "p-pa0336": ["soft tissue", "pericardium", "pericardial soft tissue"], "p-pa0195": ["soft tissue", "skin"], "p-pa0100": ["skin", "vulva"], "p-pa0002": ["heart", "left atrium"], "p-pa0340": ["artery", "carotid artery"], "p-pa0171": ["heart", "myocardium"],
  "p-pa0264": ["nasal cavity", "nasal mucosa", "nose", "sinonasal tract"], "p-pa0305": ["adrenal", "adrenal gland"], "p-pa0289": ["kidney", "soft tissue"],
  "p-thyroid-nh": ["thyroid", "thyroid gland"],
  "p-adrenal-nh": ["adrenal", "adrenal gland", "adrenal cortex"],
  "p-condyloma-uro": ["urogenital tract", "urinary bladder", "bladder", "urethra", "urinary tract", "genitourinary tract"],
  "p-sinusitis": ["maxillary sinus", "nasal cavity", "paranasal sinus", "sinonasal tract"],
};
const DX_EXTRA = {
  "p-bph": ["benign prostatic hyperplasia", "prostatic hyperplasia"],
  "p-stromal-bph": ["nodular hyperplasia", "benign prostatic hyperplasia", "prostatic hyperplasia", "stromal nodular hyperplasia"],
  "p-steatosis": ["fatty change", "fatty liver"], "p-nevus": ["melanocytic nevus", "intradermal nevus"],
  "p-cmv": ["cytomegalovirus infection", "cytomegalovirus colitis"],
  "p-pcp": ["pneumocystis pneumonia"], "p-mi-remote": ["healed myocardial infarction", "old myocardial infarction"],
  "p-kidney-infarct": ["renal infarct", "infarct", "infarction"], "p-caseating": ["caseous granulomatous inflammation"],
  "p-herpes": ["herpes infection", "herpesvirus infection"], "p-gastric-ulcer": ["chronic peptic ulcer", "chronic gastric ulcer"],
  "p-nutmeg": ["centrilobular congestion", "chronic passive congestion of liver"], "p-cardiac-sclerosis": ["congestive hepatic fibrosis"],
  "p-encephalomalacia": ["liquefactive necrosis"],
  "p-pa0030": ["amyloidosis", "amyloid deposition"], "p-pa0195": ["neurofibroma", "plexiform neurofibroma", "diffuse neurofibroma"], "p-pa0226": ["rhabdomyosarcoma, embryonal type"], "p-pa0100": ["malignant melanoma"], "p-pa0285": ["mature cystic teratoma", "dermoid cyst"], "p-pa0002": ["myxoma"], "p-pa0197": ["rheumatic pancarditis", "rheumatic carditis", "rheumatic heart disease"], "p-pa0171": ["cardiac amyloidosis"], "p-pa0207": ["familial adenomatous polyposis", "tubular adenoma", "multiple tubular adenomas", "adenomatous polyposis"], "p-pa0260": ["nasopharyngeal carcinoma", "non-keratinizing squamous cell carcinoma"], "p-pa0279": ["signet-ring cell carcinoma", "adenocarcinoma, diffuse type", "diffuse type adenocarcinoma"], "p-pa0055": ["neuroendocrine tumor", "carcinoid tumor"], "p-pa0338": ["HSIL", "CIN 3", "high-grade squamous intraepithelial lesion"], "p-pa0337": ["HSIL", "CIN 2", "high-grade squamous intraepithelial lesion"], "p-pa0061": ["acute rejection", "acute T-cell-mediated rejection", "T-cell-mediated rejection"],
  "p-pa0284": ["chronic rejection", "chronic active rejection", "chronic active T-cell-mediated rejection"], "p-pa0289": ["Wilms tumor", "nephroblastoma"],
  "p-cmv-gi": ["cytomegalovirus infection", "cytomegalovirus colitis", "cytomegalovirus enteritis", "cytomegalovirus enterocolitis"],
  "p-malaria-spleen": ["malaria", "malarial pigment", "hemozoin", "malaria pigment deposition", "malarial splenomegaly"],
};
// Accepted but should be written in full on the exam; or only partly right.
const DX_NOTE = {
  "p-atn": [["ATN", "abbr"]], "p-bph": [["BPH", "abbr"]], "p-stromal-bph": [["BPH", "abbr"]], "p-pcp": [["PJP", "abbr"], ["PCP", "abbr"]],
  "p-mi-remote": [["MI", "abbr"]], "p-endocarditis": [["IE", "abbr"]],
  "p-cmv-gi": [["CMV infection", "abbr"], ["CMV colitis", "abbr"], ["CMV enteritis", "abbr"]],
  "p-cmv": [["CMV infection", "abbr"], ["CMV nephritis", "abbr"], ["CMV colitis", "abbr"]],
  "p-herpes": [["HSV infection", "partial: Histology can't tell HSV from VZV — write \"herpes virus infection\""], ["herpes simplex", "partial: Histology can't tell HSV from VZV — write \"herpes virus infection\""]],
};
const splitAlts = s => String(s).split(/\s*(?:\/|;|\bor\b)\s*/i).map(x => x.replace(/\(.*?\)/g, "").trim()).filter(Boolean);

function acceptedOrgans(item) {
  if (!item.answer) { // histology organ card, e.g. "Stomach – fundus / body", "Pharyngeal tonsil (adenoid)"
    const name = item.name, out = [];
    const base = name.replace(/\(.*?\)/g, "").replace(/\s+/g, " ").trim();
    out.push([base, "full"], [name.replace(/[()]/g, " "), "full"]);
    const tailParen = name.match(/\(([^)]+)\)\s*$/);
    if (tailParen) out.push([tailParen[1], "full"]);
    const [head, tail] = base.split(/\s[–—]\s/);
    if (tail) {
      tail.split(/\s*\/\s*/).forEach(t => out.push([`${head} ${t}`, "full"]));
      out.push([head, "partial: Right organ — be more specific"]);
    }
    return out;
  }
  const set = new Set([item.organ, ...(ORGAN_EXTRA[item.id] || []), ...splitAlts(item.answer.organ.split(/\s—\s/)[0]), ...(KAOGU_HITS[item.id] || []).filter(h => h.organ && !(h.ex && h.swapped)).flatMap(h => splitAlts(h.organ))]);
  const partial = [];
  for (const a of KAOGU_ANSWERS[item.id] || []) if (!a.sample && !a.swapped && !kgShared(a)) for (const [t, pts] of a.organ) {
    const n = kgPoints(a, pts, 2);
    for (const alt of splitAlts(kgClean(t))) {
      if (/still credited/i.test(t)) partial.push([alt, `partial: Year ${a.y}: credited, but officially wrong`]);
      else if (n >= 2) set.add(alt);
      else if (n > 0) partial.push([alt, `partial: ${kgPartialMsg(a, pts, n, 2)}`]);
    }
  }
  [...set].forEach(o => (ORGAN_SYNONYMS[o.toLowerCase()] || []).forEach(x => set.add(x)));
  return [...[...set].map(x => [x, "full"]), ...partial];
}
// Past-exam points: years 09/10 give points ("2", "5"); year 07 gives deductions ("full", "-1") from the part's maximum.
const kgPoints = (a, v, max) => a.deduct ? (v === "full" ? max : /^-\d/.test(v) ? max + parseInt(v) : NaN) : parseInt(v);
const kgPartialMsg = (a, v, n, max) => a.deduct ? `Year ${a.y}: ${v.replace("-", "−")} point${v === "-1" ? "" : "s"} (${n} of ${max})` : `Partial credit in year ${a.y} (${v} of ${max} points)`;
// Answers shown on several cards (double diagnoses) or attached only for reference don't feed the checker.
const kgShared = a => a.refOnly || (a.ids && a.ids.length > 1);
const kgClean = t => t.replace(/\s*\((no deduction[^)]*|cross section[^)]*|respiratory epithelium[^)]*)\)/gi, "");
function acceptedDx(item) {
  const out = [...splitAlts(item.dx.replace(/^\(1\)\s*|\(2\)\s*/g, "")), ...splitAlts(item.answer.dx), ...(DX_EXTRA[item.id] || [])].map(x => [x, "full"]);
  for (const [t, kind] of DX_NOTE[item.id] || []) out.push([t, kind === "abbr" ? "full: Abbreviation — write it out in full on the exam" : kind]);
  for (const a of KAOGU_ANSWERS[item.id] || []) if (!a.sample && !kgShared(a)) for (const [t, pts] of a.dx) {
    const n = kgPoints(a, pts, 5);
    if (/^…or /.test(t) || !(n > 0)) continue; // 0 or negative points = not an accepted answer
    if (a.deduct && /^\(2\)/.test(t)) continue; // optional second diagnosis, not an answer for this card
    for (const alt of splitAlts(kgClean(t).replace(/^\(\d\)\s*/, "")))
      out.push([alt, /still credited/i.test(t) ? `partial: Year ${a.y}: credited, but officially wrong` : n >= 5 ? "full" : `partial: ${kgPartialMsg(a, pts, n, 5)}`]);
  }
  return out;
}

const verdictHTML = (label, input, res, answerText) => {
  const map = { correct: ["✓", "ok", "Correct"], partial: ["≈", "part", "Partly right"], wrong: ["✗", "bad", "Not matching"], empty: ["–", "none", "Not answered"] };
  const [sym, cls, word] = map[res.status];
  const extra = [res.note, res.typo ? "Check the spelling — a misspelled diagnosis costs −1 to −3" : ""].filter(Boolean).join(" · ");
  return `<tr><td>${label}</td><td><span class="vd ${cls}">${sym} ${word}</span> ${input ? `“${esc(input)}”` : ""}${extra ? `<div class="vd-note">${esc(extra)}</div>` : ""}
    ${res.status !== "correct" ? `<div class="vd-ans">Answer: ${esc(answerText)}</div>` : ""}</td></tr>`;
};

// Result panel shown after checking (pathology: organ + diagnosis judged, description self-compared;
// histology: organ judged in picture mode, features self-compared).
function resultHTML(item, typed) {
  const isPath = !!item.answer;
  let rows = "";
  if (typed.organ != null) rows += verdictHTML("器官 Organ", typed.organ, judge(typed.organ, acceptedOrgans(item), true), isPath ? item.answer.organ : item.name);
  if (typed.dx != null) rows += verdictHTML("診斷 Diagnosis", typed.dx, judge(typed.dx, acceptedDx(item)), item.answer.dx);
  const official = isPath ? item.answer.desc : item.features;
  const desc = typed.desc != null ? `<div class="cmp-desc"><div><p class="label key">Your ${isPath ? "description" : "features"}</p><div class="mine">${typed.desc.trim() ? esc(typed.desc).replace(/\n/g, "<br>") : "<i>(nothing written)</i>"}</div></div>
      <div><p class="label key">Official ${isPath ? "description (描述)" : "key features"}</p><ol>${official.map(d => `<li>${md(d)}</li>`).join("")}</ol></div></div>
      <div class="vd-note">Descriptions aren't auto-graded — compare yourself. Remember: listing findings that aren't on the slide costs −1 each.</div>` : "";
  return `<div class="result">${rows ? `<table class="grade">${rows}</table>` : ""}${desc}</div>`;
}

// ── Practice box in the database (Pathology cards: organ/dx/description; Atlas cards: organ features) ──
const drafts = PR.get("drafts", {});
const saveDraft = (id, field, v) => { (drafts[id] = drafts[id] || {})[field] = v; PR.set("drafts", drafts); };
const draft = (id, f) => (drafts[id] || {})[f] || "";
const revealed = new Set();

function practiceBox(item) {
  const id = item.id, isPath = !!item.answer;
  const fields = isPath
    ? `<label>器官 Organ<input data-pf="organ" value="${esc(draft(id, "organ"))}" placeholder="e.g. Kidney" autocomplete="off"></label>
       <label>診斷 Diagnosis<input data-pf="dx" value="${esc(draft(id, "dx"))}" placeholder="e.g. Acute tubular necrosis" autocomplete="off"></label>
       <label class="wide">描述 Description<textarea data-pf="desc" rows="4" placeholder="1. …&#10;2. …">${esc(draft(id, "desc"))}</textarea></label>`
    : `<label class="wide">Key identifying features (from memory)<textarea data-pf="desc" rows="3" placeholder="What would make you call this organ?">${esc(draft(id, "desc"))}</textarea></label>`;
  return `<details class="practice" data-practice="${id}" ${draft(id, "open") ? "open" : ""}><summary>✍️ Practice — write your answer${isPath ? " (organ, diagnosis, description)" : ""}</summary>
    <div class="pf-grid">${fields}</div>
    <div class="pf-actions"><button class="primary" data-pcheck>Check</button><button data-pclear>Clear</button><span class="vd-note">Saved automatically in this browser.</span></div>
    <div class="pf-result"></div></details>`;
}
document.addEventListener("input", e => {
  const f = e.target.closest("[data-practice] [data-pf]");
  if (f) saveDraft(f.closest("[data-practice]").dataset.practice, f.dataset.pf, f.value);
});
document.addEventListener("toggle", e => {
  if (e.target.matches && e.target.matches("details[data-practice]")) saveDraft(e.target.dataset.practice, "open", e.target.open);
}, true);
document.addEventListener("click", e => {
  const box = e.target.closest("[data-practice]");
  if (!box) return;
  const id = box.dataset.practice, item = findItem(id);
  if (e.target.closest("[data-pcheck]")) {
    const typed = { desc: draft(id, "desc") };
    if (item.answer) { typed.organ = draft(id, "organ"); typed.dx = draft(id, "dx"); }
    box.querySelector(".pf-result").innerHTML = resultHTML(item, typed);
    revealCard(id);
  } else if (e.target.closest("[data-pclear]")) {
    delete drafts[id]; PR.set("drafts", drafts);
    box.querySelectorAll("[data-pf]").forEach(f => f.value = "");
    box.querySelector(".pf-result").innerHTML = "";
  }
});

// ── Practice mode: hide answers in the database until checked / revealed ──
let practiceMode = PR.get("practiceMode", false);
function revealCard(id) {
  revealed.add(id);
  document.querySelectorAll(`[data-hide-for="${id}"]`).forEach(el => el.classList.remove("hidden-ans"));
  const btn = document.querySelector(`[data-reveal="${id}"]`);
  if (btn) btn.remove();
}
const hideCls = id => practiceMode && !revealed.has(id) ? "hidden-ans" : "";
const revealBtn = id => practiceMode && !revealed.has(id) ? `<button class="reveal-btn" data-reveal="${id}">👁 Show answer</button>` : "";
document.addEventListener("click", e => {
  const b = e.target.closest("[data-reveal]");
  if (b) revealCard(b.dataset.reveal);
});

// ── Highlights (per card; shown in the Atlas, the Pathology tab and on the flashcard back) ──
let HL = PR.get("hl", {});       // { id: ["highlighted phrase", …] }
// Highlights are stored as phrases and re-applied to every element marked data-hl-scope="<id>".
const INLINE = new Set(["B", "STRONG", "I", "EM", "SPAN", "A", "MARK", "SUB", "SUP", "CODE", "SMALL"]);
const blockOf = n => { let e = n.parentElement; while (e && INLINE.has(e.tagName)) e = e.parentElement; return e; };
const normWS = s => s.replace(/\s+/g, " ").trim();
function textMap(scope) { // concatenated, whitespace-collapsed text of the scope + where each character came from
  const w = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, { acceptNode: n =>
    n.parentElement.closest("textarea, input, button, summary, .fam, .hl-hint, .hl-skip") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
  let text = "", map = [], prevBlock = null, n;
  const push = (ch, node, off) => { if (ch === " " && (!text || text.endsWith(" "))) return; text += ch; map.push(node ? [node, off] : null); };
  while ((n = w.nextNode())) {
    const b = blockOf(n);
    if (prevBlock && b !== prevBlock) push(" ", null);
    prevBlock = b;
    for (let i = 0; i < n.data.length; i++) push(/\s/.test(n.data[i]) ? " " : n.data[i], n, i);
  }
  return { text: text.toLowerCase(), map };
}
function wrapRange(map, s, e, phrase) {
  const parts = []; // contiguous [node, from, to) pieces
  for (let i = s; i < e; i++) {
    const m = map[i]; if (!m) continue;
    const last = parts[parts.length - 1];
    if (last && last[0] === m[0] && last[2] === m[1]) last[2] = m[1] + 1; else parts.push([m[0], m[1], m[1] + 1]);
  }
  for (const [node, a, b] of parts.reverse()) {
    if (!node.data.slice(a, b).trim()) continue;
    const mid = node.splitText(a); mid.splitText(b - a);
    const mk = document.createElement("mark"); mk.className = "hl"; mk.dataset.hl = phrase; mk.title = "Click to remove this highlight";
    mid.parentNode.replaceChild(mk, mid); mk.appendChild(mid);
  }
}
function applyHL(scope) {
  scope.querySelectorAll("mark.hl").forEach(m => m.replaceWith(...m.childNodes));
  scope.normalize();
  for (const phrase of HL[scope.dataset.hlScope] || []) {
    const { text, map } = textMap(scope), p = normWS(phrase).toLowerCase(), hits = [];
    for (let i = text.indexOf(p); i >= 0 && p; i = text.indexOf(p, i + p.length)) hits.push(i);
    hits.reverse().forEach(i => wrapRange(map, i, i + p.length, phrase));
  }
  scope.dataset.hlDone = "1";
}
const refreshHL = id => document.querySelectorAll(`[data-hl-scope="${id}"]`).forEach(applyHL);
new MutationObserver(() => document.querySelectorAll("[data-hl-scope]:not([data-hl-done])").forEach(applyHL))
  .observe(document.documentElement, { childList: true, subtree: true });

// Floating 🖍 button for a text selection inside a card; click a highlight to remove it.
const hlTool = document.createElement("div");
hlTool.className = "hl-tool"; hlTool.hidden = true;
document.addEventListener("DOMContentLoaded", () => document.body.appendChild(hlTool));
if (document.body) document.body.appendChild(hlTool);
function showTool(html, rect, onClick) {
  hlTool.innerHTML = html; hlTool.hidden = false;
  hlTool.style.left = Math.max(8, Math.min(innerWidth - 170, rect.left + rect.width / 2 - 70)) + "px";
  hlTool.style.top = Math.max(8, rect.top - 40) + "px";
  hlTool.onmousedown = e => e.preventDefault(); // keep the selection
  hlTool.onclick = e => { e.stopPropagation(); onClick(); hlTool.hidden = true; };
}
function onSelect() {
  const sel = getSelection();
  if (!sel || sel.isCollapsed || !sel.rangeCount) return;
  const r = sel.getRangeAt(0), a = r.startContainer, b = r.endContainer;
  const el = n => n.nodeType === 1 ? n : n.parentElement;
  const scope = el(a).closest("[data-hl-scope]");
  if (!scope || scope !== el(b).closest("[data-hl-scope]") || el(a).closest("textarea, input")) return;
  const phrase = normWS(sel.toString());
  if (phrase.length < 2) return;
  showTool(`<button>🖍 Highlight</button>`, r.getBoundingClientRect(), () => {
    const id = scope.dataset.hlScope;
    HL[id] = [...new Set([...(HL[id] || []), phrase])];
    PR.set("hl", HL); sel.removeAllRanges(); refreshHL(id);
  });
}
document.addEventListener("mouseup", e => { if (!e.target.closest(".hl-tool")) setTimeout(onSelect, 0); });
document.addEventListener("touchend", e => { if (!e.target.closest(".hl-tool")) setTimeout(onSelect, 300); });
document.addEventListener("mousedown", e => { if (!e.target.closest(".hl-tool")) hlTool.hidden = true; });
document.addEventListener("scroll", () => { hlTool.hidden = true; }, true);
document.addEventListener("click", e => {
  const m = e.target.closest("mark.hl");
  if (!m || !getSelection().isCollapsed) return;
  e.stopPropagation(); e.preventDefault(); // don't flip the flashcard / open the picture
  const id = m.closest("[data-hl-scope]").dataset.hlScope, phrase = m.dataset.hl;
  showTool(`<button>✕ Remove highlight</button>`, m.getBoundingClientRect(), () => {
    HL[id] = (HL[id] || []).filter(p => p !== phrase);
    if (!HL[id].length) delete HL[id];
    PR.set("hl", HL); refreshHL(id);
  });
}, true);
