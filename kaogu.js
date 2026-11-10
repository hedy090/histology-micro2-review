// 考古 — past exam papers for Micro 1 (Exam 1-1), translated to English.
// Sources (copied into "pathology slides/"):
//   B11_micro_題目.pdf                       – year 11: organ ; diagnosis list
//   B11_114-1_Micro1_full-marks_answer.pdf   – year 11: a student's full-marks answer sheet (102/102)
//   B10_第一次micro考試答案及評分標準.pdf      – year 10: answers + grading points
//   B09_Exam-1-1-圖解參考答案.pdf             – year 09 (2023/10/03): illustrated answers + grading points + slide photos
//   b07 micro1 考試.pdf                      – year 07: answers with deductions (扣分)
//   b06 micro 1考試.pdf                      – year 06 (2020/10/21): teacher's reference answers + notes (no points)
//   Year 08: from the user's annotated notebook (no answer sheet).
// [n] = points awarded; [-1] = points deducted.

const KAOGU_YEARS = [
  { id: "12", color: "#9fa8f5", label: "Year 12", source: "B12 Micro 1 question list (from you) — topics and organs only, no answers. Not in your notebook, colour chosen here" },
  { id: "11", color: "#f28b82", label: "Year 11", source: "B11 question list + a student's full-marks answer sheet (114-1 Micro 1, 102/102)" },
  { id: "10", color: "#f6b26b", label: "Year 10", source: "B10 answers & grading criteria" },
  { id: "09", color: "#f1dc4a", label: "Year 09", source: "B09 illustrated answers (exam 2023/10/03)" },
  { id: "08", color: "#f4b6d2", label: "Year 08", source: "Notebook annotations" },
  { id: "07", color: "#c8c8c8", label: "Year 07", source: "B07 answers with deductions (+ notebook)" },
  { id: "06", color: "#a8d5a2", label: "Year 06", source: "B06 reference answers (exam 2020/10/21) — not in your notebook, colour chosen here" },
];

// Which exam-list diagnoses appeared in which year. organ = organ used in that exam (if known);
// swapped = organ differs from the teaching slide (換器官).
const KAOGU_HITS = {
  "p-atn": [{ y: "11", organ: "Kidney" }, { y: "08", organ: "Kidney" }],
  "p-mi-remote": [{ y: "12", organ: "Heart" }, { y: "10", organ: "Heart" }, { y: "09", organ: "Heart" }, { y: "06", organ: "Heart" }],
  "p-encephalomalacia": [{ y: "10", organ: "Brain / cerebrum" }],
  "p-caseating": [
    { y: "12", organ: "Lymph node", swapped: true }, { y: "11", organ: "Lymph node", swapped: true }, { y: "09", organ: "Lymph node", swapped: true },
    { y: "08", organ: "Lymph node", swapped: true }, { y: "07", organ: "Lymph node", swapped: true },
  ],
  "p-bph": [{ y: "07", organ: "Prostate" }],
  "p-nevus": [{ y: "12", organ: "Skin" }, { y: "10", organ: "Skin" }, { y: "09", organ: "Skin" }, { y: "07", organ: "Skin" }],
  "p-appendicitis": [{ y: "09", organ: "Appendix" }, { y: "08" }, { y: "07", organ: "Appendix" }, { y: "06", organ: "Appendix" }],
  "p-suture-granuloma": [{ y: "11", organ: "Thyroid gland", swapped: true }, { y: "07", organ: "Thyroid gland", swapped: true, double: true, double: true, note: "Double diagnosis with nodular hyperplasia (optional)" }],
  "p-hemorrhoid": [{ y: "08" }],
  "p-condyloma": [{ y: "12", organ: "Uterine cervix", swapped: true, makeup: true, variant: "碩", note: "Master's-program question only" }, { y: "09", organ: "Skin" }, { y: "08" }, { y: "06", organ: "Anorectum / anal canal", swapped: true }],
  "p-molluscum": [{ y: "10", organ: "Skin" }, { y: "06", organ: "Skin" }],
  "p-cmv": [{ y: "11", organ: "Large intestine", swapped: true }, { y: "10", organ: "Colon / large intestine", swapped: true }, { y: "06", organ: "Lung", swapped: true, double: true, note: "Double diagnosis with mucormycosis" }],
  "p-mucor": [{ y: "06", organ: "Lung", swapped: true, double: true, note: "Double diagnosis with CMV pneumonitis" }],
  "p-actinomycosis": [{ y: "12", organ: "Lung", swapped: true }, { y: "09", organ: "Sinonasal tract", swapped: true, double: true, note: "Double diagnosis with aspergillosis" }],
  "p-aspergillus": [{ y: "12", organ: "Sinonasal tract", swapped: true }, { y: "09", organ: "Sinonasal tract", swapped: true, double: true, note: "Double diagnosis with actinomycosis" }, { y: "07", organ: "Sinonasal tract", swapped: true }],
  "p-candida": [{ y: "08", organ: "Lung", swapped: true }],
  "p-crypto": [{ y: "11", organ: "Lung" }, { y: "10", organ: "Lung" }],
  "p-amebiasis": [{ y: "12", organ: "Colon", swapped: true }, { y: "11", organ: "Large intestine", swapped: true }, { y: "06", organ: "Colon", swapped: true }],
};

// Full question lists per year, in exam order.
const KAOGU_PAPERS = {
  "12": [
    ["Heart", "Myocardial infarction", "p-mi-remote"],
    ["Sinonasal tract", "Aspergillosis", "p-aspergillus", "Organ changed"],
    ["Lung", "Actinomycosis", "p-actinomycosis", "Organ changed"],
    ["Skin", "Intradermal nevus", "p-nevus"],
    ["Colon", "Amebiasis", "p-amebiasis", "Organ changed"],
    ["Lymph node", "Caseating granulomatous inflammation", "p-caseating", "Organ changed"],
    ["Uterine cervix", "Condyloma acuminatum", "p-condyloma", "碩 — master's-program question · organ changed"],
  ],
  "11": [
    ["Large intestine", "Cytomegalovirus infection", "p-cmv", "Organ changed"],
    ["Kidney", "Acute tubular necrosis", "p-atn"],
    ["Lymph node", "Caseous granulomatous inflammation", "p-caseating", "Organ changed"],
    ["Large intestine", "Amebiasis", "p-amebiasis", "Organ changed"],
    ["Lung", "Cryptococcosis", "p-crypto"],
    ["Thyroid gland", "Suture granuloma", "p-suture-granuloma", "Organ changed"],
  ],
  "10": [
    ["Colon / large intestine", "Cytomegalovirus infection / CMV colitis", "p-cmv", "Organ changed"],
    ["Brain / cerebrum", "Encephalomalacia", "p-encephalomalacia"],
    ["Heart", "Myocardial infarction", "p-mi-remote"],
    ["Skin", "Molluscum contagiosum", "p-molluscum"],
    ["Lung", "Cryptococcosis", "p-crypto"],
    ["Skin", "Intradermal (melanocytic) nevus", "p-nevus"],
  ],
  "09": [
    ["Skin", "Condyloma acuminatum", "p-condyloma"],
    ["Appendix", "Acute suppurative appendicitis", "p-appendicitis"],
    ["Heart", "Myocardial infarction", "p-mi-remote"],
    ["Lymph node", "Caseating granulomatous inflammation", "p-caseating", "Organ changed"],
    ["Skin", "Intradermal nevus", "p-nevus"],
    ["Nasal cavity & paranasal sinus", "(1) Aspergillosis (2) Actinomycosis", "p-aspergillus", "Double diagnosis · organ changed"],
  ],
  "08": [
    ["Kidney", "Acute tubular necrosis", "p-atn"],
    ["Lymph node", "Caseating granulomatous inflammation", "p-caseating", "Organ changed"],
    ["Appendix", "Acute suppurative appendicitis", "p-appendicitis"],
    ["Anus", "Hemorrhoid", "p-hemorrhoid"],
    ["Skin", "Condyloma acuminatum", "p-condyloma"],
    ["Lung", "Candidiasis", "p-candida", "Organ changed"],
  ],
  "07": [
    ["Prostate", "Nodular hyperplasia", "p-bph"],
    ["Appendix", "Acute suppurative appendicitis", "p-appendicitis"],
    ["Skin", "Intradermal nevus", "p-nevus"],
    ["Sinus / sinonasal tract / nasal cavity", "Aspergillosis", "p-aspergillus", "Organ changed"],
    ["Lymph node", "Caseating granulomatous inflammation", "p-caseating", "Organ changed"],
    ["Thyroid gland", "Suture granuloma (+ nodular hyperplasia, optional)", "p-suture-granuloma", "Organ changed"],
  ],
  "06": [
    ["Anorectum / anal canal / anal transition zone", "Condyloma acuminatum", "p-condyloma", "Organ changed"],
    ["Colon", "Amebiasis", "p-amebiasis", "Organ changed"],
    ["Skin", "Molluscum contagiosum", "p-molluscum"],
    ["Heart", "Myocardial infarction", "p-mi-remote"],
    ["Appendix", "Acute suppurative appendicitis", "p-appendicitis"],
    ["Lung", "(1) Mucormycosis (2) CMV pneumonitis", "p-mucor", "Double diagnosis · organ changed"],
  ],
};

// Official answers with grading points (years 09 and 10).
// organ/dx/desc: [text, points]; optional: "write or not" findings (no points); minus: penalised; notes: grader's comments.
const KAOGU_ANSWERS = {
  "p-condyloma": [{ y: "09", q: 1,
    organ: [["Skin", "2"]], dx: [["Condyloma acuminatum", "5"]],
    desc: [["Papillomatosis", "3"], ["Koilocytosis", "3"], ["Acanthosis / (diffuse) epidermal hyperplasia", "2"], ["Hyperkeratosis", "1"], ["Parakeratosis", "1"]],
    optional: ["Lymphocyte & neutrophil infiltration (focal)", "Bacterial clumps"],
  }],
  "p-appendicitis": [{ y: "09", q: 2,
    organ: [["Appendix", "2"], ["Colon (partial credit)", "1"], ["Large intestine (partial credit)", "1"]],
    dx: [["Acute suppurative appendicitis", "5"], ["Chronic ulcer (partial credit)", "2"]],
    desc: [["Transmural [1] neutrophilic infiltration [2], involving muscularis propria [3]", "6"], ["Mucosal ulceration / ulcer", "2"], ["Abscess", "2"]],
    optional: ["Hemorrhage", "Granulation tissue (focal)", "Fibrosis (focal)", "Fibrinous inflammation on the serosa (not obvious on this slide)", "Fat necrosis"],
    notes: ["Fat inside the appendix wall is NOT adipocytic metaplasia or steatosis/fatty change: the appendix had ruptured (clinical finding), so the normal mesoappendix fat was dragged into the inflammation → distorted structure, with appendix layers, mesoappendix, hemorrhage and inflammatory material mixed together; some areas show fat necrosis."],
  }],
  "p-mi-remote": [
    { y: "10", q: 3,
      organ: [["Heart", "2"], ["Heart valve", "0"]], dx: [["Myocardial infarction", "5"]],
      desc: [["Cardiomyocyte coagulative necrosis (only \"necrosis\" = 3)", "4"], ["Granulation tissue / capillary proliferation", "2"], ["(Interstitial) fibrosis / scar formation", "2"], ["Edema", "1"], ["Hemorrhage / hemosiderin deposition", "1"], ["Macrophage infiltration", "1"], ["Neutrophil infiltration (macrophage + neutrophil written only as \"inflammatory infiltration\" = 1)", "1"], ["Cardiomyocyte degeneration / cytoplasmic vacuolar change / bizarre nuclei", "1"]],
      zero: ["Fat necrosis / thrombosis / lipofuscin"],
      minus: ["Steatosis", "Granulomatous inflammation"],
    },
    { y: "09", q: 3,
      organ: [["Heart", "2"]], dx: [["Myocardial infarction", "5"]],
      desc: [["Cardiomyocyte coagulative necrosis", "6"], ["A mixed inflammatory infiltrate of histiocytes, lymphocytes [1] and neutrophils [1]", "2"], ["Granulation tissue", "2"]],
      optional: ["Fibrosis (focal, not obvious)", "Hemorrhage", "Hemosiderin / lipofuscin accumulation (pigment is mostly hemosiderin; some lipofuscin can't be excluded)"],
    },
  ],
  "p-caseating": [{ y: "09", q: 4,
    organ: [["Lymph node", "2"]], dx: [["Caseating granulomatous inflammation", "5"]],
    desc: [["Center: caseous necrosis", "3"], ["Periphery: (epithelioid) macrophages/histiocytes", "3"], ["Multinucleated giant cells / Langhans giant cells", "2"], ["Lymphocytes", "1"], ["Fibrosis", "1"]],
    optional: ["Fat necrosis (focal, in the adipose tissue around the lymph node)"],
    notes: ["Recognise lymph node: capsule, subcapsular sinus, germinal centres.",
      "The fat around the node is normal surrounding connective tissue — NOT adipocytic metaplasia or steatosis/fatty change.",
      "The inflammation broke through the lymph node capsule into the surrounding connective tissue."],
  }],
  "p-nevus": [
    { y: "10", q: 6,
      organ: [["Skin", "2"]],
      dx: [["Intradermal (melanocytic) nevus", "5"], ["Nevus (5 if the description says intradermal/dermis)", "3"], ["Epidermal nevus", "3"], ["Melanocyte hyperplasia", "2"], ["Fat necrosis", "-1"]],
      desc: [["Nests and cords [3] of melanocytes/nevus cells [3]", "6"], ["Melanin / brown-black pigment", "3"], ["Maturation with descent (larger/epithelioid cells superficially, smaller/neuroid cells at the base)", "1"], ["No cytological atypia", "1"], ["No deep mitosis", "1"]],
      zero: ["Inflammation / fibrosis"],
      minus: ["Adipocytic metaplasia (present on the teaching slide but NOT on this exam slide)"],
    },
    { y: "09", q: 5,
      organ: [["Skin", "2"]], dx: [["Intradermal nevus", "5"]],
      desc: [["Nests & cords [3] of proliferative melanocytes [3]", "6"], ["Melanin pigmentation", "4"]],
      optional: ["Maturation of descent", "No cytologic atypia"],
      notes: ["Skin recognised by sebaceous glands and hair follicles."],
    },
  ],
  "p-aspergillus": [{ y: "09", q: 6, double: "p-actinomycosis",
    organ: [["Respiratory tract / sinonasal tract / nasal cavity / paranasal sinus / trachea / bronchus / bronchiole", "2"]],
    dx: [["(1) Aspergillosis", "3"], ["(2) Actinomycosis (+2 bonus)", "2+2"], ["…or diagnosis/description mentions bacterial clumps / bacterial infection", "2"]],
    desc: [["Fungal hyphae [2] with septa [1] and acute-angle branching [1] — fungus total", "4"], ["Sulfur granules (and filamentous bacteria) (+2 bonus), or bacterial clumps / bacterial infection — bacteria total", "4+2"], ["A mixed inflammatory infiltrate of neutrophils/abscess [1], lymphocytes and plasma cells [1] — inflammation total", "2"]],
    notes: ["On this slide the sulfur granules looked atypical and there were filamentous bacteria not seen on the teaching slide, so writing \"bacterial clumps\" in the diagnosis or description earned the second diagnosis's points.",
      "Explicitly diagnosing actinomycosis: full diagnosis points + 2 bonus. Describing sulfur granules and/or filamentous bacteria: full bacteria description points + 2 bonus.",
      "Recognise sinonasal tract: respiratory epithelium, abundant submucosal vessels (± squamous metaplasia). Gram stain: Gram-positive filamentous bacteria."],
  }],
  "p-cmv": [{ y: "10", q: 1,
    organ: [["Colon / large intestine", "2"], ["Intestine", "1"]],
    dx: [["Cytomegalovirus infection / cytomegalovirus colitis", "5"], ["(Chronic) ulcer", "2"], ["Necrotizing enterocolitis", "0"]],
    desc: [["Viral inclusion (with description)", "5"], ["Ulcer / mucosal defect with ulcerative debris / necrotic debris / fibrinoid necrosis", "2"], ["(Acute and chronic) inflammation / mixed inflammatory infiltrate (neutrophils, eosinophils, lymphoplasma cells)", "2"], ["Granulation tissue / capillary proliferation", "2"], ["Fibrosis / scar formation", "1"], ["Congestion", "1"], ["Reactive / regenerative epithelial changes", "1"]],
    zero: ["Hemorrhage / microabscess / fibrinous inflammation at serosa / fat necrosis"],
    minus: ["Abscess / transmural necrosis / thrombus with organization / granulomatous tissue / Langhans giant cells"],
  }],
  "p-encephalomalacia": [{ y: "10", q: 2,
    organ: [["Brain / cerebrum / central nervous system", "2"]],
    dx: [["Encephalomalacia", "5"], ["Liquefactive necrosis", "5"], ["Brain ischemia", "3"]],
    desc: [["Liquefactive necrosis [5] / necrosis with edema or microcysts [5] / \"necrosis\" alone [2] / edema or microcysts without mentioning necrosis [1]", "5"], ["Macrophage infiltration / Gitter cells / lipid phagocytes [3]; epithelioid macrophages [2]", "3"], ["Reactive gliosis / astrocyte hypertrophy and proliferation", "3"], ["Lymphocyte infiltration (macrophages + lymphocytes written only as \"inflammatory infiltration\" = 1)", "1"], ["Calcification", "1"]],
    zero: ["Granulation tissue"],
    minus: ["Neutrophil infiltration / microabscess (the lecture summary says \"may be present\" — but NOT on this slide)", "Thrombosis / congestion / hemorrhoid", "Fibrosis"],
  }],
  "p-molluscum": [{ y: "10", q: 4,
    organ: [["Skin", "2"]], dx: [["Molluscum contagiosum", "5"], ["Molluscum", "3"]],
    desc: [["Molluscum bodies / Henderson-Patterson bodies (\"viral inclusion\" = 4; viral inclusion with a detailed correct description = 6; calling them intradermal or intranuclear = −1)", "6"], ["Cup-like lesion / crater", "4"], ["Epidermal hyperplasia / acanthosis", "2"]],
    zero: ["Hyperkeratosis / parakeratosis / hemorrhage / inflammation / ulcer / granulation tissue / lymphocyte infiltration"],
    minus: ["Koilocytosis / neutrophil infiltration / abscess / cartilage / anthracosis / fat change"],
  }],
  "p-crypto": [{ y: "10", q: 5,
    organ: [["Lung", "2"]],
    dx: [["Cryptococcosis", "5"], ["(Caseating/necrotizing) granulomatous inflammation", "2"], ["Fungal infection", "2"]],
    desc: [["Fungal yeasts (with description)", "5"], ["(Caseous) necrosis", "1"], ["Granulomatous inflammation / macrophages-histiocytes and multinucleated giant cells (giant cells only = 2)", "3"], ["Chronic inflammation / lymphocyte and plasma cell infiltration (granulomatous + chronic written only as \"inflammation\" = 1)", "2"], ["Fibrosis / interstitial thickening", "2"]],
    zero: ["Hemorrhage / anthracosis / intra-alveolar fibrin deposition / exudate / neutrophil infiltration / microabscess"],
    minus: ["Abscess", "Hyphae / pseudohyphae", "Bacterial clumps", "Granulation tissue", "Inclusion body"],
  }],
};

// Year 11: no official criteria — a student's handwritten answer sheet that scored full marks (102/102:
// each question organ 2 + diagnosis 5 + description 10). sample = true → shown as a model answer, and NOT
// used as an accepted-answer list by the practice checker.
const KAOGU_SAMPLE_11 = {
  "p-cmv": { q: 1, organ: "Intestine", dx: "Cytomegalovirus infection",
    desc: ["Infected cells: (1) cellular and nuclear enlargement; (2) large intranuclear inclusion with halo; (3) small intracytoplasmic inclusions (sketched: owl-eye cell)", "Mural hemorrhage"],
    notes: ["\"Intestine\" got the full 2 points here — in year 10 it only got 1 of 2 (\"colon / large intestine\" = 2). Write \"Large intestine\" to be safe.",
      "Only two findings, yet 10/10: a well-described viral inclusion carries most of the description points (year 10: 5 points)."] },
  "p-atn": { q: 2, organ: "Kidney", dx: "Acute tubular necrosis",
    desc: ["Coagulative necrosis of tubular cells with the original outlines preserved", "Nuclear changes: karyorrhexis, pyknosis and karyolysis can be found", "Glomerular cells remain normal"] },
  "p-caseating": { q: 3, organ: "Lymph node", dx: "Caseating granulomatous inflammation",
    desc: ["Center: caseous necrosis", "Periphery: granulomatous inflammation with plasma cells, epithelioid histiocytes and fibrosis"],
    notes: ["Full marks without listing giant cells or lymphocytes — center (caseous necrosis) + periphery (granulomatous inflammation) is the core."] },
  "p-amebiasis": { q: 4, organ: "Large intestine", dx: "Amebiasis",
    desc: ["Microorganisms with foamy cytoplasm, a round eccentric nucleus and ingested erythrocytes (sketched)", "Eosinophil infiltration", "Mucosal ulceration"] },
  "p-crypto": { q: 5, organ: "Lung", dx: "Cryptococcosis",
    desc: ["Numerous round to oval, thick-walled, refractile fungal yeasts (sketched)", "Neutrophil infiltration", "Fibrin deposits in the alveolar space", "Granulomatous inflammation with multinucleated giant cells, plasma cells and fibrosis"],
    notes: ["Neutrophils and intra-alveolar fibrin were worth 0 in year 10's criteria — not penalised here, but they don't add points either."] },
  "p-suture-granuloma": { q: 6, organ: "Thyroid gland", dx: "Suture granuloma",
    desc: ["Center: suture (sketched: suture material surrounded by giant cells)", "Periphery: granulomatous inflammation containing (1) multinucleated giant cells, (2) plasma cells, (3) epithelioid histiocytes, (4) fibrosis", "Granulation tissue with visible capillary proliferation"] },
};
for (const [pid, a] of Object.entries(KAOGU_SAMPLE_11))
  (KAOGU_ANSWERS[pid] = KAOGU_ANSWERS[pid] || []).unshift({ y: "11", q: a.q, sample: true,
    organ: [[a.organ, "2"]], dx: [[a.dx, "5"]], desc: a.desc.map(t => [t, ""]), descTotal: "10", notes: a.notes });

// Year 07 (B07): answers with deductions. "full" = full marks; "-n" = n points deducted for that answer.
// deduct = true → the checker reads these as deductions from the part's maximum (organ 2, diagnosis 5).
const KAOGU_07 = {
  "p-bph": { q: 1, organ: [["Prostate / prostate gland", "full"], ["Seminal vesicle (no deduction)", "full"], ["Epididymis", "-1"]],
    dx: [["Nodular hyperplasia / benign prostate hyperplasia", "full"]],
    desc: ["Low power: nodular appearance", "Gland proliferation with papillary protrusions", "Compressed stromal cells and glands between the nodules", "Glands lined by bilayered cells with inconspicuous nucleoli (benign epithelium)"],
    optional: ["Corpora amylacea"] },
  "p-appendicitis": { q: 2, organ: [["Appendix", "full"], ["Large intestine", "-1"]],
    dx: [["Acute suppurative appendicitis", "full"], ["Acute appendicitis", "-1"], ["Ulcer", "-3"], ["Chronic inflammation", "-4"]],
    desc: ["Neutrophil infiltration in the muscularis propria, with microabscess / abscess formation", "Ulcer present"],
    optional: ["Serosal fibrinopurulent reaction", "Fat necrosis"] },
  "p-nevus": { q: 3, organ: [["Skin", "full"]],
    dx: [["Intradermal nevus", "full"], ["Nevus", "-1"], ["Compound nevus", "-2"], ["Melanocyte", "-3"]],
    desc: ["Nests of melanocytes (polygonal cells) from the superficial to the deep dermis, with maturation; melanin pigment present"],
    optional: ["Without a junctional component", "Hemorrhage / congestion"] },
  "p-aspergillus": { q: 4, organ: [["Sinus / sinonasal tract / nasal cavity", "full"], ["Respiratory tract / bronchus / lung", "-1"]],
    dx: [["Aspergillosis / aspergilloma", "full"], ["Fungal infection", "-2"], ["Other fungus", "-3"], ["Chronic sinusitis", "-3"]],
    desc: ["Aggregates of fungal hyphae: uniform, narrow width, with septa and acute-angle branching", "Sinusitis: mixed inflammatory cell infiltration, edematous change, thickened basement membrane"] },
  "p-caseating": { q: 5, organ: [["Lymph node", "full"], ["Spleen / thymus", "-1"]],
    dx: [["Caseating granulomatous inflammation", "full"], ["Granulomatous inflammation", "-1"], ["Caseating necrosis", "-1"], ["Chronic inflammation", "-2"], ["Other necrosis", "-4"]],
    desc: ["Granulomatous inflammation: aggregates of epithelioid histiocytes / macrophages", "Multinucleated giant cells present", "Caseating necrosis: amorphous, structureless, eosinophilic necrosis with granular debris"] },
  "p-suture-granuloma": { q: 6, organ: [["Thyroid", "full"], ["Soft tissue", "-1"]],
    dx: [["(1) Suture granuloma", "full"], ["Foreign body granuloma", "-1"], ["Granulomatous inflammation", "-2"], ["Chronic inflammation", "-3"], ["(2) Nodular hyperplasia (no deduction if omitted)", "full"]],
    desc: ["Granulomatous inflammation: aggregates of epithelioid histiocytes / macrophages", "Multinucleated giant cells present", "Suture present"],
    optional: ["Some lymphoplasma cell infiltration", "Fibroblast proliferation", "Nodular hyperplasia: multinodular thyroid with variable-sized follicles", "Fat necrosis"] },
};
const KAOGU_07_NOTES = ["Each finding written that is NOT on the slide: −1.", "Wrong diagnosis but a description that overlaps: partial credit at the grader's discretion."];
for (const [pid, a] of Object.entries(KAOGU_07))
  (KAOGU_ANSWERS[pid] = KAOGU_ANSWERS[pid] || []).push({ y: "07", deduct: true, label: "official answer & deductions", ...a,
    desc: a.desc.map(t => [t, ""]), notes: KAOGU_07_NOTES });

// Year 06 (B06): the teacher's reference answers + notes. No point values, except where stated.
const KAOGU_06 = {
  "p-condyloma": { q: 1, organ: [["Anorectum / anal canal / anal transition zone", "✓"], ["Skin", "1"]],
    dx: [["Condyloma acuminatum", "✓"]],
    desc: ["A papillary lesion with foci of koilocytosis, hyperkeratosis and acanthosis", "Infiltration of lymphocytes, plasma cells and neutrophils"],
    notes: ["\"Skin\" scored only 1 point: beyond the squamous lining there is a small area of COLUMNAR lining → anal transition zone.",
      "The first three findings (koilocytosis, hyperkeratosis, acanthosis) help the diagnosis and carry more points; the tissue reaction carries fewer.",
      "Full wording for the inflammation: neutrophil infiltration in the epithelium, and lymphocyte & plasma cell infiltration in the dermis."] },
  "p-amebiasis": { q: 2, organ: [["Colon (cross section of colon)", "✓"]], dx: [["Amebiasis", "✓"]],
    desc: ["Microorganisms / trophozoites: round shape, foamy cytoplasm (containing engulfed RBCs), round nuclei, chromatin margination, central karyosome — consistent with amebiasis", "Mixed inflammatory infiltrate"],
    notes: ["An ulcer (with fibrin and acute inflammation) is also on this slide, but leaving it out was not penalised."] },
  "p-molluscum": { q: 3, organ: [["Skin", "✓"]], dx: [["Molluscum contagiosum", "✓"]],
    desc: ["Hyperplastic epidermis with a crater", "Keratinocytes with cytoplasmic viral inclusions (molluscum bodies)"],
    notes: ["Some students called vacuolated cells koilocytes — they are just normal keratinocytes.", "The blue area at the edge is an artifact."] },
  "p-mi-remote": { q: 4, organ: [["Heart", "✓"]], dx: [["Myocardial infarction", "✓"]],
    desc: ["Foci of coagulative necrosis of the myocardium", "Fibrosis / scar formation", "Lymphocyte-predominant infiltrate, small foci of granulation tissue"],
    notes: ["The blue material among the cardiomyocytes is lymphocyte infiltration, not cardiomyocyte nuclei.",
      "Neutrophils are also present, but chronic inflammation predominates. This is a late lesion → more collagen; granulation tissue less obvious."] },
  "p-appendicitis": { q: 5, organ: [["Appendix", "✓"]], dx: [["Acute suppurative appendicitis", "✓"]],
    desc: ["Neutrophil infiltration in the muscularis propria (and the whole appendiceal wall) with abscess formation", "Peritoneum: fibrin deposition and neutrophil infiltration (fibrinopurulent inflammation)"],
    notes: ["Ulcer + acute inflammation → appendicitis; abscess + pus → \"suppurative\"."] },
  "p-mucor": { q: 6, double: "p-cmv", organ: [["Lung (respiratory epithelium present)", "✓"]],
    dx: [["(1) Mucormycosis", "½"], ["(2) CMV pneumonitis", "½"]],
    desc: ["Fungal hyphae with rare septa and variable width, consistent with mucormycosis — accompanied by infarction; focally surrounded by acute inflammation, granulation tissue and fibrosis",
      "Viable lung parenchyma: scattered enlarged pneumocytes with large intranuclear inclusions (some owl's-eye-like), consistent with CMV infection"],
    notes: ["Double diagnosis: writing only one of the two earns half the diagnosis points.",
      "Teacher's demo slide: grossly, the cell shadows are dead lung (infarction) with heavy inflammatory infiltrate; fungus inside vessels = angioinvasive fungus.",
      "Fibrosis and granulation tissue are also present; leaving them out was not penalised.",
      "The CMV tissue reaction is less obvious here, so it carries fewer points."] },
};
for (const [pid, a] of Object.entries(KAOGU_06)) {
  const e = { y: "06", label: "teacher's reference answer", ...a, desc: a.desc.map(t => [t, ""]) };
  for (const id of [pid, a.double].filter(Boolean)) (KAOGU_ANSWERS[id] = KAOGU_ANSWERS[id] || []).push(e);
}
KAOGU_ANSWERS["p-actinomycosis"] = KAOGU_ANSWERS["p-aspergillus"].filter(a => a.double === "p-actinomycosis");

// Year-09 illustrated answer pages (photos of the actual exam slides), attached to the matching cards.
const KAOGU_IMAGES = {
  "p-condyloma": [[3, "Papillomatosis, acanthosis"], [4, "Hyperkeratosis & parakeratosis (+ bacterial clumps)"], [5, "Hyperkeratosis & parakeratosis"], [6, "Koilocytosis"], [7, "Koilocytosis"], [8, "Answer & grading"]].map(([p, c]) => [`B09 Q1 condyloma p${String(p).padStart(2, "0")}.jpg`, c]),
  "p-appendicitis": [[9, "Mesoappendix around the appendix"], [10, "Fat in the wall – ruptured appendix, NOT adipocytic metaplasia"], [11, "Ulcer"], [12, "Transmural neutrophilic infiltration involving muscularis propria; abscess"], [13, "Abscess"], [14, "Neutrophils in the muscularis propria"], [15, "Answer & grading"]].map(([p, c]) => [`B09 Q2 appendicitis p${String(p).padStart(2, "0")}.jpg`, c]),
  "p-mi-remote": [[16, "Low power"], [17, "Hemosiderin, myocardium"], [18, "Coagulative necrosis of cardiomyocytes, hemorrhage, hemosiderin"], [19, "Coagulative necrosis; neutrophils + lymphocytes + histiocytes; granulation tissue"], [20, "Granulation tissue: loose ECM + capillaries + inflammatory cells"], [21, "Fibrosis"], [22, "Answer & grading"]].map(([p, c]) => [`B09 Q3 myocardial infarction p${String(p).padStart(2, "0")}.jpg`, c]),
  "p-caseating-ln": [[23, "Lymph node – surrounding fat is normal (not adipocytic metaplasia); inflammation breaks through the capsule"], [24, "Capsule, subcapsular sinus, germinal centres"], [25, "Multinucleated giant cells, some Langhans type"], [26, "Caseous necrosis, multinucleated giant cells"], [27, "Caseous necrosis, histiocytes, lymphocytes, fibrosis"], [28, "Focal fat necrosis (no obvious saponification yet) in the fat around the node"], [29, "Answer & grading"]].map(([p, c]) => [`B09 Q4 lymph node caseating granuloma p${String(p).padStart(2, "0")}.jpg`, c]),
  "p-nevus": [[30, "Low power"], [31, "Sebaceous gland, hair follicle → skin"], [32, "Nests & cords of proliferative melanocytes"], [33, "Melanin; maturation of descent – larger epithelioid, smaller lymphocytoid"], [34, "Spindle 'neuroid' cells – maturation of descent"], [35, "Answer & grading"]].map(([p, c]) => [`B09 Q5 intradermal nevus p${String(p).padStart(2, "0")}.jpg`, c]),
  "p-aspergillus": [[36, "Low power"], [37, "Respiratory epithelium, submucosal vessels, squamous metaplasia, mixed inflammation"], [38, "Fungal hyphae"], [39, "Fungal hyphae"], [40, "Fungal hyphae with septa and acute-angle branching"], [41, "Fungal hyphae with septa and acute-angle branching"], [42, "Sulfur granules / bacterial clumps; filamentous bacteria"], [43, "Filamentous bacteria"], [44, "Gram stain: Gram-positive bacteria"], [45, "Answer & grading (double diagnosis)"]].map(([p, c]) => [`B09 Q6 sinonasal aspergillosis actinomycosis p${String(p).padStart(2, "0")}.jpg`, c]),
};
KAOGU_IMAGES["p-actinomycosis"] = KAOGU_IMAGES["p-aspergillus"];

const KAOGU_RULES = [
  "Each case ≈ 20 points: organ 2 · diagnosis 5 · description ~13.",
  "Obvious misspelling in the description: −1.",
  "Obvious misspelling in the diagnosis: −1 to −3 (not deducted again in the description).",
  "Findings that are clearly NOT on the slide: −1 each (max −3 in total; no further deduction once the diagnosis already scores 0).",
  "A diagnosis that is clearly not present: −1 to −3 (not deducted again in the description).",
  "Notably bizarre descriptions: −1 at the grader's discretion.",
  "Don't write unrelated text, marks or drawings on the answer sheet.",
  "Year 07: each finding written that is not on the slide −1; a wrong diagnosis with an overlapping description gets partial credit at the grader's discretion.",
  "Year 06: findings that help make the diagnosis carry more points; hard-to-find or unrelated findings carry fewer.",
];

const KAOGU_TAKEAWAYS = [
  "The ORGAN is often changed (換器官): caseating granuloma → lymph node (07, 08, 09, 11, 12); suture granuloma → thyroid (07, 11); CMV → colon/large intestine (10, 11) and lung (06); amebiasis → colon/large intestine (06, 11, 12); condyloma → uterine cervix (12, master's program); actinomycosis → lung (12); condyloma → anorectum (06); mucormycosis → lung (06); candidiasis → lung (08); aspergillosis → sinonasal tract (07, 09, 12).",
  "Describe only what is on THIS slide — each finding that isn't there costs −1 (max −3). Year 10 examples: adipocytic metaplasia in the nevus (it was on the teaching slide, not the exam slide), neutrophils/microabscess in encephalomalacia (the lecture says 'may be present', but this slide had none), and koilocytosis in molluscum (a condyloma feature — don't mix up the viral lesions).",
  "Fat around/inside an organ is usually normal surrounding tissue — not adipocytic metaplasia or steatosis (lymph node and appendix, year 09).",
  "Double diagnoses happen (year 06: mucormycosis + CMV pneumonitis in the lung; year 09: aspergillosis + actinomycosis; year 07: suture granuloma + nodular hyperplasia of the thyroid, optional); if so, both are obvious — one of two earns half the points.",
  "Most tested (years 06–12): caseating granulomatous inflammation (5 of 7 years — always a lymph node since 07); acute appendicitis, intradermal nevus and myocardial infarction (4 each; condyloma also 4 counting year 12's master's-program question); CMV, amebiasis and aspergillosis (3 each).",
  "Year 12 repeated year 09's fungus/bacteria pair as two separate questions in new organs: aspergillosis in the sinonasal tract and actinomycosis in the LUNG (teaching slide = ovary).",
  "Precise wording matters (year 07 deductions): 'Acute appendicitis' −1 vs 'acute suppurative appendicitis'; 'Nevus' −1, 'Compound nevus' −2; 'Granulomatous inflammation' −1 vs 'caseating granulomatous inflammation'; 'Foreign body granuloma' −1 vs 'suture granuloma'.",
  "Year 11 full-marks sheet: a clear structure is enough — granulomas as **center + periphery**, infections as **organism (with its features, ideally sketched) + tissue reaction**. Four to five correct findings scored 10/10.",
  "Later exams re-test Micro I topics (★ in the Micro II/III tabs): year 11 Micro 3 — lung adenocarcinoma + cryptococcosis; year 10 Micro 3 — lung adenocarcinoma + caseating granulomatous inflammation.",
];

// Later exams in year 11 (outside the current Micro 1 scope) — for reference.
const KAOGU_LATER = [
  { title: "Year 11 · second semester · MICRO 1", items: ["Kidney ; DM nephropathy", "Breast ; Invasive carcinoma of no special type + DCIS (missing DCIS not marked wrong, so not counted as a double diagnosis)", "Fallopian tube ; Tubal pregnancy", "Prostate ; Adenocarcinoma", "Ovary ; Clear cell carcinoma", "Kidney ; Clear cell renal cell carcinoma"] },
  { title: "Year 11 · second semester · MICRO 2", items: ["Bone marrow ; Multiple myeloma", "Thyroid gland ; Papillary carcinoma", "Thyroid gland ; Hashimoto thyroiditis", "Lymph node ; Follicular lymphoma", "Lymph node ; Classic Hodgkin lymphoma", "Adrenal gland ; Pheochromocytoma"] },
  { title: "Year 11 · second semester · MICRO 3", items: ["Skin ; Bullous pemphigoid", "Lung (soft tissue also accepted) ; Desmoid fibromatosis", "Bone ; Fibrous dysplasia", "CNS ; Glioblastoma", "Lung ; Meningioma (organ changed)", "Soft tissue ; Myxoid liposarcoma"] },
];

// ═══════════ Micro II & Micro III past exams (years 10 and 11) ═══════════
// Sources (in "pathology slides/"):
//   B10_第二次micro考試答案及評分標準.pdf – year 10 Micro 2: official answers + grading (+ dentistry / master's variants, make-up exam list)
//   B10_第三次micro考試答案及評分標準.pdf – year 10 Micro 3: official answers + grading
//   B11 114-1 Micro 2.pdf                – year 11 Micro 2: a student's answer sheet scoring 101/102
//   B11 114-1 Micro 3_1.pdf / 3_2.pdf    – year 11 Micro 3: two different students' full-marks sheets (102/102)
// Each question = organ 2 + diagnosis 5 + description 10. Exam-list cards are matched by diagnosis; "swapped" = the exam
// used a different organ from the exam-list slide. Hits/answers carry ex: "m2" | "m3".
const KAOGU_EXAM_YEARS = {
  m2: [
    { id: "11", source: "B11 114-1 Micro 2 — a student's answer sheet (101/102; each question organ 2 + diagnosis 5 + description 10)" },
    { id: "10", source: "B10 第二次 micro — official answers & grading criteria. 牙 = dentistry students' replacement question · 碩 = master's-program replacement question · 補考 = make-up exam" },
    { id: "09", source: "Senior's annotated exam list (授袍禮物) — topics only, no answers" },
    { id: "08", source: "Senior's annotated exam list (授袍禮物) — topics only, no answers" },
    { id: "07", source: "Senior's annotated exam list (授袍禮物) — topics only, possibly incomplete" },
  ],
  m3: [
    { id: "11", source: "B11 114-1 Micro 3 — two different students' full-marks sheets (102/102 each)" },
    { id: "10", source: "B10 第三次 micro — official answers & grading criteria" },
    { id: "09", source: "Senior's annotated exam list (授袍禮物) — topics only, no answers" },
    { id: "08", source: "Senior's annotated exam list (授袍禮物) — topics only, no answers" },
    { id: "07", source: "Senior's annotated exam list (授袍禮物) — topics only, possibly incomplete" },
  ],
};
// Papers: [question label, organ, diagnosis, card id(s), flag]
const KAOGU_EXAM_PAPERS = {
  m2: {
    "11": [
      ["1", "Salivary gland (written as soft tissue)", "Amyloidosis", ["p-pa0030", "p-pa0171"], "Organ changed"],
      ["2", "Stomach", "Adenocarcinoma, diffuse type (signet-ring cell)", ["p-pa0279"]],
      ["3", "Large intestine", "Adenocarcinoma", ["p-pa0249"]],
      ["4", "Kidney", "Wilms tumor", ["p-pa0289"]],
      ["5", "Soft tissue", "Schwannoma", ["p-pa0158"]],
      ["6", "Skin", "Squamous cell carcinoma", ["p-pa0102", "p-pa0047"], "Organ changed"],
    ],
    "10": [
      ["1", "Skin", "Neurofibroma", ["p-pa0195"], "Organ changed"],
      ["2", "Stomach", "Adenocarcinoma, diffuse type / signet-ring cell carcinoma", ["p-pa0279"]],
      ["3", "Large intestine / colon", "Adenocarcinoma", ["p-pa0249"]],
      ["4", "Uterine cervix", "Squamous cell carcinoma", ["p-pa0102"]],
      ["5", "Artery", "Atherosclerosis", ["p-pa0340"]],
      ["6", "Kidney", "Wilms tumor (nephroblastoma)", ["p-pa0289"]],
      ["5 (dentistry, 牙)", "Ovary", "Mature (cystic) teratoma", ["p-pa0285"], "牙 — dentistry students' Q5 (replaced Q5)"],
      ["6 (master's, 碩)", "Lung", "Small cell carcinoma", ["p-pa0307"], "碩 — master's-program Q6 (replaced Q6)"],
      ["補考 Make-up 1", "Uterine cervix", "Squamous cell carcinoma", ["p-pa0102"], "補考 — make-up exam"],
      ["補考 Make-up 2", "Ovary", "Mature teratoma", ["p-pa0285"], "補考 — make-up exam"],
      ["補考 Make-up 3", "Stomach", "Adenocarcinoma, diffuse type", ["p-pa0279"], "補考 — make-up exam"],
      ["補考 Make-up 4", "Skin", "Neurofibroma", ["p-pa0195"], "補考 — make-up exam"],
      ["補考 Make-up 5", "Eye", "Retinoblastoma", ["p-pa0247"], "補考 — make-up exam"],
      ["補考 Make-up 6", "Nasopharynx", "Nasopharyngeal carcinoma", ["p-pa0260"], "補考 — make-up exam"],
    ],
  },
  m3: {
    "11": [
      ["1", "Small intestine (duodenum) / pancreas & duodenum", "Neuroendocrine tumor", ["p-pa0055"], "Organ changed"],
      ["2", "Salivary gland", "Warthin tumor", ["p-pa0045"]],
      ["3", "Pancreas (and some duodenum)", "IgG4-related autoimmune pancreatitis", ["p-pa0248"]],
      ["4", "Nasopharynx", "Nasopharyngeal carcinoma", ["p-pa0260"]],
      ["5", "Lung", "(1) Adenocarcinoma (2) Cryptococcosis", ["p-pa0174", "p-crypto"], "Double diagnosis"],
      ["6", "Liver", "Focal nodular hyperplasia", ["p-pa0067"]],
    ],
    "10": [
      ["1", "Pancreas", "(Well-differentiated) neuroendocrine tumor", ["p-pa0055"], "Organ changed"],
      ["2", "Lung", "Melanoma (metastatic)", ["p-pa0100"], "Organ changed"],
      ["3", "Lung", "Adenocarcinoma (+ caseating granulomatous inflammation)", ["p-pa0174", "p-caseating"], "Double diagnosis"],
      ["4", "Liver", "Cirrhosis + primary sclerosing cholangitis", ["p-pa0075", "p-pa0333"], "Double diagnosis"],
      ["5", "Gallbladder", "Adenocarcinoma", ["p-pa0184"], "Not on the current list — closest card: cholangiocarcinoma"],
      ["6", "Liver", "Hepatocellular carcinoma", ["p-pa0071"]],
    ],
  },
};
// Years 07–09 from the senior's annotated exam list (pathology slides/kaogu_micro_senior_list.pdf):
// colour key 09 purple ✓, 08 orange, 07 green (pages 1–4 = first semester). Order within a year is unknown.
Object.assign(KAOGU_EXAM_PAPERS.m2, {
  "09": [
    ["–", "Lung", "Amyloidosis", ["p-pa0030"]],
    ["–", "Adrenal gland", "Neuroblastoma", ["p-pa0305"]],
    ["–", "Colon", "Adenocarcinoma", ["p-pa0249"]],
    ["–", "Parotid gland", "Warthin tumor", ["p-pa0045"]],
    ["–", "Soft tissue", "Schwannoma", ["p-pa0158"]],
    ["–", "Artery", "Atherosclerosis", ["p-pa0340"]],
  ],
  "08": [ // confirmed by you as B08 Micro II
    ["–", "Lung", "Hyaline membrane disease", ["p-pa0341"]],
    ["–", "Esophagus", "Squamous cell carcinoma", ["p-pa0047"]],
    ["–", "Parotid gland", "Pleomorphic adenoma (mixed tumor)", ["p-pa0046"]],
    ["–", "Soft tissue (abdominal wall)", "Desmoid-type fibromatosis", [], "Not in the B12 list"],
    ["–", "Soft tissue (thigh)", "Myxoid liposarcoma", [], "Not in the B12 list"],
    ["–", "Heart (left atrium), 68F", "Cardiac myxoma", ["p-pa0002"]],
  ],
  "07": [
    ["–", "Lung or heart (both highlighted)", "Amyloidosis", ["p-pa0030", "p-pa0171"]],
    ["–", "Kidney", "Wilms tumor", ["p-pa0289"]],
    ["–", "Esophagus", "Squamous cell carcinoma", ["p-pa0047"], "Marked on the cervix SCC line: '07: esophagus'"],
    ["–", "Parotid gland", "Warthin tumor", ["p-pa0045"]],
    ["–", "Ovary", "Mature cystic teratoma", ["p-pa0285"]],
    ["–", "Artery", "Atherosclerosis", ["p-pa0340"]],
  ],
});
Object.assign(KAOGU_EXAM_PAPERS.m3, {
  "09": [
    ["–", "Lung", "Diffuse alveolar damage", ["p-pa0040"]],
    ["–", "Liver", "Submassive necrosis", ["p-pa0282"]],
    ["–", "Liver", "(1) Cirrhosis (2) Hepatocellular carcinoma", ["p-pa0075", "p-pa0071"], "Double diagnosis"],
    ["–", "Stomach", "Adenocarcinoma, signet-ring cell type", ["p-pa0279"]],
    ["–", "Small intestine (ileum)", "Neuroendocrine tumor", ["p-pa0055"]],
    ["–", "Pancreas", "IgG4-related autoimmune pancreatitis", ["p-pa0248"]],
  ],
  "08": [
    ["–", "Lung", "Adenocarcinoma", ["p-pa0174"]],
    ["–", "Liver", "Submassive necrosis", ["p-pa0282"]],
    ["–", "Liver", "Cirrhosis", ["p-pa0075"]],
    ["–", "Liver", "Hepatocellular carcinoma", ["p-pa0071"]],
    ["–", "Stomach", "Adenocarcinoma, signet-ring cell type", ["p-pa0279"]],
    ["–", "Pancreas", "IgG4-related autoimmune pancreatitis", ["p-pa0248"]],
  ],
  "07": [
    ["–", "Liver", "Cirrhosis", ["p-pa0075"]],
    ["–", "Liver", "Hepatocellular carcinoma", ["p-pa0071"]],
    ["–", "Small intestine (ileum)", "Neuroendocrine tumor", ["p-pa0055"]],
  ],
});
// Hits for the "how often" grid and the card chips (derived from the papers).
for (const [ex, years] of Object.entries(KAOGU_EXAM_PAPERS))
  for (const [y, rows] of Object.entries(years))
    for (const [q, organ, , ids, flag] of rows)
      for (const id of ids) {
        const list = (KAOGU_HITS[id] = KAOGU_HITS[id] || []);
        // only-for-some-students questions: 補考 = make-up exam, 牙 = dentistry students, 碩 = master's program
        const v = /Make-up/.test(q) ? "補考" : /dentistry/.test(q) ? "牙" : /master/.test(q) ? "碩" : "";
        const old = list.find(h => h.y === y && h.ex === ex);
        if (old) { // e.g. make-up exam repeating a main question → keep one hit, note both
          if (old.variant !== undefined) old.variant = old.variant && v ? [...new Set([...old.variant.split(", "), v])].join(", ") : "";
          continue;
        }
        list.push({ y, ex, organ: organ.replace(/ \(.*\)$/, ""), swapped: /Organ changed/.test(flag || "") || (findItem_(id) && organDiffers(findItem_(id), organ)), makeup: !!v, variant: v, double: /Double/.test(flag || "") });
      }
function findItem_(id) { return PATHO.find(p => p.id === id); }
// Organ synonyms (same organ, different wording) are not "organ changed".
function organDiffers(p, organ) {
  const ORGAN_SAME = [["colon", "large intestine"], ["parotid", "salivary"], ["uterine cervix", "cervix"], ["heart", "myocardium"]];
  const a = p.organ.toLowerCase(), b = organ.toLowerCase();
  if (ORGAN_SAME.some(g => g.some(x => a.includes(x)) && g.some(x => b.includes(x)))) return false;
  return !b.includes(a.split(/[ ,(]/)[0]) && !a.includes(b.split(/[ ,(/]/)[0]);
}

// Answers. Official (year 10): points per part; description points are ranges for each aspect.
// "(wrong, but still credited)" = accepted by the grader although not correct.
const KG_DESC_NOTE = "Only scored when the diagnosis is wrong";
const KAOGU_EXAM_ANSWERS = [
  // ── Year 10 · Micro 2 (official) ──
  { ex: "m2", y: "10", q: "1", ids: ["p-pa0195"], swapped: true,
    organ: [["Skin", "2"], ["Soft tissue (wrong, but still credited)", "2"]], dx: [["Neurofibroma (no need to give the type)", "5"]],
    desc: [["Cytology", "2–6"], ["Architecture / cellularity", "2–4"], ["Stroma", "2–4"], ["Border", "2"]] },
  { ex: "m2", y: "10", q: "2", ids: ["p-pa0279"],
    organ: [["Stomach", "2"], ["Intestine (wrong, but still credited)", "2"]], dx: [["Adenocarcinoma, diffuse type", "5"], ["Signet-ring cell carcinoma", "5"], ["Adenocarcinoma", "2"]],
    desc: [["Cytology", "2–4"], ["Architecture", "2–4"], ["Stroma", "1–4"], ["Border / depth of invasion", "2–4"]] },
  { ex: "m2", y: "10", q: "3", ids: ["p-pa0249"],
    organ: [["Large intestine", "2"], ["Colon", "2"], ["Stomach", "0"]], dx: [["Adenocarcinoma", "5"], ["Adenocarcinoma, intestinal type (wrong, but still credited)", "5"]],
    desc: [["Cytology", "2–4"], ["Architecture", "2–4"], ["Stroma", "1–2"], ["Dirty necrosis", "2"], ["Border / depth of invasion", "2–4"]] },
  { ex: "m2", y: "10", q: "4", ids: ["p-pa0102"],
    organ: [["Cervix", "2"], ["Uterine cervix", "2"]], dx: [["Squamous cell carcinoma", "5"], ["High-grade squamous intraepithelial lesion", "3"]],
    desc: [["Cytology of HSIL/SCC + architecture of HSIL", "2–6"], ["Architecture of SCC", "2"], ["Border / stroma of SCC", "2–4"]] },
  { ex: "m2", y: "10", q: "5", ids: ["p-pa0340"],
    organ: [["Artery", "2"], ["Blood vessel", "1"], ["Aorta", "1"]], dx: [["Atherosclerosis", "5"], ["Arteriosclerosis", "5"]],
    desc: [["Necrotic core", "3"], ["Cholesterol clefts", "3"], ["Fibrous cap", "3"], ["Foam cells / macrophages", "3"], ["Lymphocytes", "2"], ["Smooth muscle cells", "2"], ["Luminal narrowing / intimal thickening", "2"]] },
  { ex: "m2", y: "10", q: "6", ids: ["p-pa0289"],
    organ: [["Kidney", "2"], ["Soft tissue", "2"]], dx: [["Wilms tumor", "5"], ["Nephroblastoma", "5"]],
    desc: [["Epithelial component", "2–6"], ["Blastemal component", "2–6"], ["Stromal component", "2–4"]] },
  { ex: "m2", y: "10", q: "5 (dentistry, 牙)", ids: ["p-pa0285"],
    organ: [["Ovary", "2"], ["Soft tissue", "2"]], dx: [["Mature teratoma", "5"], ["Mature cystic teratoma", "5"], ["Teratoma", "3"]],
    desc: [["Name the components of the mature teratoma (2–3 points each)", "3–10"], ["Cystic architecture", "2"]] },
  { ex: "m2", y: "10", q: "6 (master's, 碩)", ids: ["p-pa0307"],
    organ: [["Lung", "2"]], dx: [["Small cell carcinoma", "5"]],
    desc: [["Cytology of small cell carcinoma", "2–6"], ["Architecture of small cell carcinoma", "2–4"]] },
  // ── Year 10 · Micro 3 (official) ──
  { ex: "m3", y: "10", q: "1", ids: ["p-pa0055"], swapped: true,
    organ: [["Pancreas", "2"]], dx: [["(Well-differentiated) neuroendocrine tumor", "5"]],
    desc: [["Cytology", "2–5"], ["Architecture / stroma", "2–5"], ["Border", "1–2"], ["Chronic pancreatitis / other findings — " + KG_DESC_NOTE, "1–4"]] },
  { ex: "m3", y: "10", q: "2", ids: ["p-pa0100"], swapped: true,
    organ: [["Lung", "2"]], dx: [["Melanoma", "5"]],
    desc: [["Cytology", "2–6"], ["Architecture", "1–3"], ["Border / stroma", "1–3"], ["Other findings — " + KG_DESC_NOTE, "1–4"]] },
  { ex: "m3", y: "10", q: "3", ids: ["p-pa0174", "p-caseating"], double: true,
    organ: [["Lung", "2"]], dx: [["Adenocarcinoma", "5"], ["(Invasive) mucinous adenocarcinoma", "2"], ["Caseating granulomatous inflammation / tuberculosis", "3"]],
    desc: [["Cytology (adenocarcinoma)", "1–3"], ["Architecture / border / stroma (adenocarcinoma)", "1–5"], ["Caseating granulomatous inflammation", "2–5"], ["Other findings — " + KG_DESC_NOTE, "1–4"]] },
  { ex: "m3", y: "10", q: "4", ids: ["p-pa0075", "p-pa0333"], double: true,
    organ: [["Liver", "2"]], dx: [["Cirrhosis (may also be written in the description)", "3"], ["Primary sclerosing cholangitis (may also be written in the description)", "3"]],
    desc: [["Cirrhotic nodules / nodular fibrosis", "3"], ["Portal inflammation / interface activity", "2"], ["Ductular reaction", "2"], ["Cholestasis", "2"], ["Feathery degeneration", "2"], ["Obliteration / fibrous scarring of large bile ducts", "3"], ["Onion-skin fibrosis", "2"]] },
  { ex: "m3", y: "10", q: "5", ids: ["p-pa0184"], swapped: true, refOnly: true,
    organ: [["Gallbladder", "2"], ["Stomach / small intestine / large intestine", "1"]], dx: [["Adenocarcinoma", "5"], ["Cholangiocarcinoma (wrong, but still credited)", "5"]],
    desc: [["Cytology", "2–4"], ["Architecture", "2–4"], ["Border / stroma", "2–4"], ["Chronic cholecystitis / other findings — " + KG_DESC_NOTE, "1–4"]],
    notes: ["Gallbladder adenocarcinoma is not on the current Micro III list; it is attached to the cholangiocarcinoma card (credited as an answer)."] },
  { ex: "m3", y: "10", q: "6", ids: ["p-pa0071"],
    organ: [["Liver", "2"]], dx: [["Hepatocellular carcinoma", "5"]],
    desc: [["Cytology", "2–5"], ["Architecture", "2–5"], ["Border / stroma", "1–3"], ["Other findings — " + KG_DESC_NOTE, "1–4"]] },
  // ── Year 11 · Micro 2 (student sheet, 101/102) ──
  { ex: "m2", y: "11", q: "1", ids: ["p-pa0030", "p-pa0171"], sample: true, score: "16/17", swapped: true,
    organ: [["Soft tissue (salivary gland)", "2"]], dx: [["Amyloidosis", "5"]], descScore: "9",
    desc: ["Amorphous, eosinophilic extracellular material deposits", "Cracking artifact", "Lymphocytes"] },
  { ex: "m2", y: "11", q: "2", ids: ["p-pa0279"], sample: true,
    organ: [["Stomach", "2"]], dx: [["Adenocarcinoma, diffuse type", "5"]],
    desc: ["Stromal invasion", "Stromal desmoplasia", "Clusters or single cells with a signet-ring-cell appearance", "Mild cytologic atypia: nuclear hyperchromasia"] },
  { ex: "m2", y: "11", q: "3", ids: ["p-pa0249"], sample: true,
    organ: [["Large intestine", "2"]], dx: [["Adenocarcinoma", "5"]],
    desc: ["Stromal invasion (mucosa → subserosa)", "Atypical tall columnar tumor cells forming complex glandular structures", "Hyperchromatic nuclei, elongation, stratification, prominent nucleoli", "Dirty necrosis", "Stromal desmoplasia"] },
  { ex: "m2", y: "11", q: "4", ids: ["p-pa0289"], sample: true,
    organ: [["Kidney", "2"]], dx: [["Wilms tumor", "5"]],
    desc: ["Triphasic pattern: (1) blastemal component — sheets of small round blue cells; (2) epithelial component — epithelial cells forming tubular structures; (3) stromal component — spindle cells forming a fibromyxoid background", "Necrosis", "Hemorrhage"] },
  { ex: "m2", y: "11", q: "5", ids: ["p-pa0158"], sample: true,
    organ: [["Soft tissue", "2"]], dx: [["Schwannoma", "5"]],
    desc: ["Circumscribed tumor", "Antoni A: hypercellular, intersecting fascicles, nuclear palisading", "Antoni B: hypocellular, myxoid stroma", "No cytologic atypia", "Spindle cells with wavy nuclei", "Hyalinized vessels"] },
  { ex: "m2", y: "11", q: "6", ids: ["p-pa0102", "p-pa0047"], sample: true, swapped: true,
    organ: [["Skin", "2"]], dx: [["Squamous cell carcinoma", "5"]],
    desc: ["Nests of atypical squamous cells with nuclear hyperchromasia, prominent nucleoli, high mitotic activity", "Eosinophilic cytoplasm, keratinization", "Stromal desmoplasia", "Stromal invasion"] },
  // ── Year 11 · Micro 3 (two full-marks sheets, A = Micro 3_1, B = Micro 3_2) ──
  { ex: "m3", y: "11", q: "1", ids: ["p-pa0055"], sample: true, sheet: "A", swapped: true,
    organ: [["Pancreas & duodenum", "2"]], dx: [["Neuroendocrine tumor", "5"]],
    desc: ["Border: infiltrative", "Cytology: uniform round-to-oval tumor cells, salt-and-pepper chromatin", "Architecture: islands, nests, glandular, trabecular"] },
  { ex: "m3", y: "11", q: "1", ids: ["p-pa0055"], sample: true, sheet: "B", swapped: true,
    organ: [["Small intestine (duodenum — Brunner's glands)", "2"]], dx: [["Neuroendocrine tumor", "5"]],
    desc: ["Infiltrative, transmural — to the serosa (and the layers above)", "Islands, cribriform, nests, pseudoglandular pattern surrounded by (muscular?) septa", "Cuboidal cells with eosinophilic cytoplasm, round nuclei, salt-and-pepper chromatin; monotonous (look-alike) cytology", "Lymphocytic infiltration in the mucosa / lamina propria (sketched)"] },
  { ex: "m3", y: "11", q: "2", ids: ["p-pa0045"], sample: true, sheet: "A",
    organ: [["Salivary gland", "2"]], dx: [["Warthin tumor", "5"]],
    desc: ["Border: well defined, no invasion", "Architecture: cystic & papillary, bilayered oncocytic cells", "Cell lineage: epithelial (oncocytic) cells", "Stroma: lymphoid stroma"] },
  { ex: "m3", y: "11", q: "2", ids: ["p-pa0045"], sample: true, sheet: "B",
    organ: [["Salivary gland", "2"]], dx: [["Warthin tumor", "5"]],
    desc: ["Well-circumscribed", "Papillary and cystic pattern", "Bilayered oncocytic columnar epithelium + lymphoid matrix", "No cytologic atypia", "Some epithelioid cells in the stroma"] },
  { ex: "m3", y: "11", q: "3", ids: ["p-pa0248"], sample: true, sheet: "A",
    organ: [["Pancreas", "2"]], dx: [["IgG4-related autoimmune pancreatitis", "5"]],
    desc: ["Storiform fibrosis", "Acinar atrophy", "Lymphoplasmacytic infiltrate"] },
  { ex: "m3", y: "11", q: "3", ids: ["p-pa0248"], sample: true, sheet: "B",
    organ: [["Pancreas, mainly (and some duodenum)", "2"]], dx: [["IgG4 autoimmune pancreatitis", "5"]],
    desc: ["Storiform fibrosis", "Acinar atrophy", "Lymphocytes, especially plasma cell infiltration", "Obliterative phlebitis"] },
  { ex: "m3", y: "11", q: "4", ids: ["p-pa0260"], sample: true, sheet: "A",
    organ: [["Nasopharynx", "2"]], dx: [["Nasopharyngeal carcinoma", "5"]],
    desc: ["Border: infiltrative", "Cytology: nuclear enlargement, vesicular nuclei, syncytial appearance", "Architecture: solid sheets", "Stroma: lymphocytes and other inflammatory cells"] },
  { ex: "m3", y: "11", q: "4", ids: ["p-pa0260"], sample: true, sheet: "B",
    organ: [["Respiratory tract (with respiratory epithelium)", "2"]], dx: [["Nasopharyngeal carcinoma", "5"]],
    desc: ["Infiltrative growth", "Lymphocytes and syncytial (epithelial) cells mixed together", "No prominent cell borders; prominent nucleoli and vesicular nuclei (sketched)", "Hemorrhage and exudative fluid"] },
  { ex: "m3", y: "11", q: "5", ids: ["p-pa0174", "p-crypto"], sample: true, sheet: "A", double: true,
    organ: [["Lung", "2"]], dx: [["Adenocarcinoma (cryptococcus infection written under 'Other')", "5"]],
    desc: ["Border: infiltrative", "Cytology: nuclear enlargement, hyperchromasia, pleomorphism", "Architecture: lepidic, acinar, papillary, cribriform, micropapillary, solid", "Cell lineage: cuboidal to low columnar cells", "Stroma: myofibroblastic stroma", "Other: anthracosis, cryptococcus infection"] },
  { ex: "m3", y: "11", q: "5", ids: ["p-pa0174", "p-crypto"], sample: true, sheet: "B", double: true,
    organ: [["Lung", "2"]], dx: [["(1) Adenocarcinoma (2) Cryptococcosis", "5"]],
    desc: ["(1) Lepidic, papillary, acinar pattern; pseudopapillary", "Cuboidal to columnar atypical alveolar lining cells with enlarged nuclei, nuclear hyperchromasia", "Hemorrhage and exudative fluid", "(2) Refractile, round, thick-walled organisms (sketched)", "Some cryptococci within granulomas: Langhans (multinucleated) giant cells, histiocytes, lymphocytes"] },
  { ex: "m3", y: "11", q: "6", ids: ["p-pa0067"], sample: true, sheet: "A",
    organ: [["Liver", "2"]], dx: [["Focal nodular hyperplasia", "5"]],
    desc: ["Border: well defined", "Cytology: no cytologic atypia", "Architecture: nodular", "Cell lineage: hepatocytes", "Stroma: central stellate scar; fibrous septa with arteries unaccompanied by portal veins / bile ducts, ductular reaction & lymphocyte infiltration", "Other: mild steatosis; some portal areas with (a little) lymphocyte infiltration"] },
  { ex: "m3", y: "11", q: "6", ids: ["p-pa0067"], sample: true, sheet: "B",
    organ: [["Liver", "2"]], dx: [["Focal nodular hyperplasia", "5"]],
    desc: ["Central stellate scar", "Well-circumscribed border", "Fibrotic septa dividing it into nodules", "Ductular reaction within the fibrotic septa, especially at the interface", "No cytologic atypia (not malignant)", "Steatosis (macrovesicular)", "Mild lymphocytic infiltration in the septa"] },
];
for (const a of KAOGU_EXAM_ANSWERS) {
  const exName = a.ex === "m2" ? "Micro II" : "Micro III";
  const e = { ...a, desc: a.sample ? a.desc.map(t => [t, ""]) : a.desc,
    descTotal: a.sample ? (a.descScore || "10") : undefined,
    label: a.sample ? `${exName} · student answer${a.sheet ? " " + a.sheet : ""} (scored ${a.score || "17/17"})` : `${exName} · official answer & grading` };
  for (const id of a.ids) (KAOGU_ANSWERS[id] = KAOGU_ANSWERS[id] || []).push(e);
}
const KAOGU_EXAM_TAKEAWAYS = {
  m2: [
    "Tumors are graded by aspect, not by a fixed list: **cytology**, **architecture / cellularity**, **stroma**, **border / depth of invasion** (year 10). Year-11 full-marks answers follow the same structure.",
    "Diagnosis precision: 'Adenocarcinoma' alone = 2/5 for the diffuse-type gastric cancer; 'Teratoma' = 3/5 vs 'Mature (cystic) teratoma' = 5; HSIL for an invasive SCC = 3/5.",
    "Organs change here too: neurofibroma → skin (10), SCC → skin (11), amyloid → salivary gland (11). 'Soft tissue' was accepted for Wilms tumor and teratoma (10).",
    "Most tested Micro II topics (07–11): atherosclerosis (07, 09, 10), Wilms tumor (07, 10, 11), colon adenocarcinoma (09, 10, 11), amyloid (07, 09, 11) — 3 years each; SCC (esophagus 07, 08; cervix 10; skin 11); Warthin tumor (07, 09 — now on the Micro III list); schwannoma (09, 11).",
  "Topic lists have shifted between years: Warthin / pleomorphic adenoma were Micro II topics in 07–09, and gastric adenocarcinoma and NET were Micro III topics — check the current list's grouping, not just past exams.",
  ],
  m3: [
    "Write the description as **Border / Cytology / Architecture / (Cell lineage) / Stroma / Other** — both year-11 full-marks sheets used this layout.",
    "Double diagnoses in the LUNG both years: adenocarcinoma + caseating granulomatous inflammation (10), adenocarcinoma + cryptococcosis (11). Look for a second process in the background.",
    "'Other findings' only score when the diagnosis is wrong (year 10) — but they are a safety net.",
    "Liver every year (07–11): cirrhosis (07, 08, 09 with HCC, 10 with PSC), HCC (07, 08, 09), submassive necrosis (08, 09), FNH (11). Know the liver approach table.",
    "Also repeated: IgG4-related pancreatitis (08, 09, 11), signet-ring gastric carcinoma (08, 09), NET (07, 09, 10, 11), lung adenocarcinoma (08, 10, 11).",
    "Organs change: neuroendocrine tumor → pancreas (10) and duodenum (11); melanoma → lung (10, metastasis). 'Respiratory tract (with respiratory epithelium)' still got 2/2 for the nasopharynx (11).",
    "Year 10 liver: cirrhosis and PSC were 3 points each — they may be written in the description too.",
  ],
};
