// Pathology exam slide list — based on the NTU microteaching lectures in "pathology slides/".
// Each item: id, no (exam slide number), teach (teaching slide shown in lecture, if different), organ, dx, cat,
// normal (id of the normal-histology organ card in data.js, or null), src (lecture it is taught in),
// answer: the course's exam-answer format { organ, dx, desc[] } (器官 / 診斷 / 描述),
// slide: lecturer's notes about THIS slide (本片 …), features: morphology & recognition tips,
// pearls: exam points / differentials. Images are attached by pathology-images.js.

const PATH_CATS = [
  { id: "necrosis", name: "Cell injury & necrosis" },
  { id: "adapt", name: "Adaptation & intracellular accumulation" },
  { id: "inflam", name: "Inflammation" },
  { id: "circ", name: "Hemodynamic derangement" },
  { id: "virus", name: "Infection – viral & bacterial" },
  { id: "fungus", name: "Infection – fungal" },
  { id: "parasite", name: "Infection – parasitic" },
  { id: "supp", name: "Supplement (not on the exam list)" },
  // Micro II (考試範圍(二), 27 slides)
  { id: "m2-immuno", exam: "m2", name: "Immunological disorder" },
  { id: "m2-child", exam: "m2", name: "Disease of infancy and childhood" },
  { id: "m2-epi", exam: "m2", name: "Epithelial tumor" },
  { id: "m2-nonepi", exam: "m2", name: "Non-epithelial tumor" },
  { id: "m2-cv", exam: "m2", name: "Cardiovascular diseases" },
  // Micro III (考試範圍(三), 32 slides)
  { id: "m3-resp", exam: "m3", name: "Respiratory system" },
  { id: "m3-liver", exam: "m3", name: "Liver and biliary" },
  { id: "m3-hn", exam: "m3", name: "Head and neck" },
  { id: "m3-gi", exam: "m3", name: "GI and pancreas" },
];
// Which exam each pathology item belongs to (items without "exam" are Micro I).
const PATH_EXAMS = [
  { id: "m1", name: "Micro I" },
  { id: "m2", name: "Micro II" },
  { id: "m3", name: "Micro III" },
];
const examOf = p => p.exam || "m1";

const PATH_LECTURES = {
  ci1: "Cell injury & adaptation (1) · 2026/09/10",
  ci2: "Cell injury & adaptation (2) · 2026/09/11",
  ci3: "Cell injury & adaptation (3) · 2026/09/14",
  ci4: "Cell injury & adaptation (4) · 2026/09/15",
  inf: "Inflammation · 2026/09/18",
  hd: "Hemodynamic derangement · 2026/09/23",
  i1: "Infection (1) · 2026/10/01",
  i2: "Infection (2) · 2026/10/02",
  i3: "Infection (3) · 2026/10/05",
  m2list: "Micro II exam list — 考試範圍(二)",
  m3list: "Micro III exam list — 考試範圍(三)",
  imm: "Immunological disorder · 2026/10/15",
  et1: "Epithelial tumor (1) · 2026/10/22",
  et2: "Epithelial tumor (2) · 2026/10/23",
  et3: "Epithelial neoplasm (3) · 2026/10/27",
  ne1: "Non-epithelial tumor (1) · 2026/11/03",
  ne2: "Non-epithelial tumor (2) · 2026/11/04",
  cvs: "Cardiovascular system · 2026/11/06",
  child: "Disease of infancy and childhood · 2026/10/16",
  ext: "ExpertPath (external images, not from the lectures)",
  sr1: "Section review (1.1) · 2026/09/24",
  web: "Images you added (online sources, e.g. @RaulSGonzalezMD — not from the lectures)",
  added: "Images you added (source not stated — not from the lectures)",
  user: "Slides you added (pp. 79–81 of a deck not in the “pathology slides” folder)",
};

const PATH_EXAM_TIPS = [
  "Some diagnoses only appear in a specific organ (e.g. ATN → kidney, hemorrhoid → anus).",
  "Infections are more likely to appear in a DIFFERENT organ than the teaching slide — especially CMV, fungi and granulomatous inflammation.",
  "Only diagnoses taught in class are examined, but the organ may differ.",
  "A slide may carry more than one diagnosis; if so, both will be obvious.",
  "Memorise the diagnosis list and know the normal histology of the organs (at least the ones on the teaching slides).",
  "Practise writing your own description points (lab slides + Robbins).",
  "Identify the main features at LOW power, confirm details at high power — don't stay at high power too long.",
  "Watch your time; write clearly. Spelling counts: Fibrosis ≠ Fibrinous.",
];

const PATHO = [
  // ───────────── CELL INJURY & NECROSIS ─────────────
  {
    id: "p-atn", no: "PA0097 (77)", organ: "Kidney", dx: "Acute tubular necrosis", cat: "necrosis", normal: "kidney", src: "ci1",
    answer: { organ: "Kidney", dx: "Acute tubular necrosis", desc: [
      "Tubular epithelial coagulative necrosis: (a) dead cells with preserved cellular outlines; (b) cytoplasmic eosinophilia, may be glassy or vacuolated; (c) nuclear changes – karyolysis, pyknosis, karyorrhexis",
      "An inflammatory infiltrate",
    ] },
    slide: ["ATN is mainly in the proximal convoluted tubule, but on THIS slide the distal tubules are also severely affected."],
    features: [
      "Coagulative necrosis = 'ghost cells': eosinophilic dead cells with preserved outlines but no nuclei",
      "Cell injury before necrosis: cellular swelling, hydropic change / vacuolar degeneration",
      "Glomeruli usually unremarkable",
    ],
    pearls: [
      "ATN vs infarct: ATN = necrosis of tubules, glomeruli usually spared; infarct = wedge-shaped necrosis that also involves glomeruli. If there is no definite evidence of infarction → call it ATN",
      "Causes: ischemia, nephrotoxins",
    ],
  },
  {
    id: "p-nec", no: "PA0313 (196)", organ: "Colon", dx: "Necrotizing enterocolitis (NEC)", cat: "necrosis", normal: "colon", src: "ci1",
    answer: { organ: "Intestine / colon", dx: "Necrotizing enterocolitis", desc: [
      "Coagulative necrosis with hemorrhage – mucosal and transmural (impending perforation)",
      "Chronic changes: strictures, crypt distortion, reactive epithelial cells",
    ] },
    slide: ["Chronic changes (stricture, crypt distortion, reactive epithelium) are NOT present on this slide."],
    features: [
      "Recognise colon first: mucosa with crypts but no villi, submucosa, muscularis propria",
      "Hemorrhagic, eosinophilic necrotic mucosa with ghost crypts, extending through the wall",
      "With inflamatory cells, but it is there naturally in the colon and could be not a sign of acute inflammation",
    ],
    pearls: [
      "Coagulative / hemorrhagic necrosis + inflammation of small bowel & proximal colon, mostly in PREMATURE infants; high mortality",
      "Pathogenesis: intestinal immaturity, microbial dysbiosis, enteral (formula) feeding — breast milk & probiotics protect — mucosal ischemia",
    ],
  },
  {
    id: "p-mi-remote", no: "PA0004 (6)", teach: "Teaching slide PA0335 (6) — MI, remote (healed), 69M. The latest section review (2026/10/06) lists PA0004 (6) Myocardial infarction.",
    organ: "Heart", dx: "Myocardial infarction", cat: "necrosis", normal: "heart", src: "ci2",
    answer: { organ: "Heart", dx: "Myocardial infarction", desc: [
      "multifocal fibrosis replacing myocytes (remote change) with slightly increased mononuclear cells",
      "focal granulation tissue – neovascularization, hemorrhage (recent change, hard to find)",
      "myocyte vacuolization, especially subendocardial (sublethal ischemia)",
      "hypertrophic cardiomyocytes – larger cells & nuclei (patient background)",
    ] },
    slide: [
      "Past Answer",
      "Teaching slide PA0335 = MI, HEALED:",
      "Lipofuscin (yellow-brown perinuclear granules) in old myocytes — a common incidental finding",
      "Cardiomyocyte coagulative necrosis: preserved cellular outlines, cytoplasmic eosinophilia, nuclear changes (karyolysis, pyknosis, karyorrhexis)",
      "Interstitial edema and hemorrhage",
      "An inflammatory infiltrate (neutrophils or macrophages)",
      "Granulation tissue (capillary and fibroblast proliferation)",
      "Fibrosis / scar formation (dense collagen deposition)",
    ],
    features: [
      "Infarct = localised coagulative necrosis; low power: clear border between normal and lesion (eosinophilic shadows)",
      "Timeline: <1 day coagulative necrosis → <7 days acute inflammation (neutrophils) → 1–3 wk granulation tissue (with hemosiderin-laden macrophages) → 3–6 wk+ scar",
    ],
    pearls: [
      "Describe what you see according to the stage: acute (necrosis, hemorrhage, neutrophils), subacute (granulation tissue), remote (scar)",
    ],
  },
  {
    id: "p-encephalomalacia", no: "PA0162 (138)", organ: "Brain (cerebrum)", dx: "Encephalomalacia", cat: "necrosis", normal: "cerebral-cortex", src: "ci2",
    answer: { organ: "Cerebrum", dx: "Encephalomalacia", desc: [
      "Focal liquefactive necrosis – loss of the original structure → loosening of the tissue",
      "Neutrophil infiltration or 'microabscess' may be present",
      "Reactive gliosis, gemistocytic astrocytes",
      "Gitter cells – histiocytes with phagocytosed myelin",
    ] },
    features: [
      "'Softening of the brain' – old term for the gross appearance after e.g. cerebral infarction, due to liquefactive necrosis",
      "Reactive gliosis: 'gemistocytic' astrocytes (abundant pink cytoplasm), microglia",
      "Gitter cells = foamy macrophages full of myelin debris",
      "Many microcysts",
    ],
    pearls: [
      "Liquefactive necrosis: infection (abscess) or hypoxic death in the CNS — ischemia elsewhere gives coagulative necrosis",
    ],
  },
  {
    id: "p-caseating", no: "PA0198 (144)", organ: "Lung", dx: "Caseating granulomatous inflammation", cat: "necrosis", normal: null, src: "ci2",
    answer: { organ: "Lung", dx: "Caseating granulomatous inflammation", desc: [
      "Center: caseous necrosis – a structureless collection of lysed cells & amorphous granular debris",
      "Periphery: granulomatous inflammation – (a) epithelioid macrophages, (b) Langhans giant cells, (c) lymphocytes, (d) fibrosis",
    ] },
    features: [
      "Caseous = 'cheese-like' friable white grossly; complete loss of cellular detail microscopically",
      "Epithelioid histiocytes: abundant cytoplasm, indistinct borders (syncytium-like), reniform/slipper nuclei",
      "Langhans giant cells: multinucleated, nuclei in a horseshoe/ring at the periphery",
      "Granuloma = discrete rounded aggregate of histiocytes; sheets of them = 'granulomatous inflammation'",
    ],
    pearls: [
      "Classic cause: tuberculosis; can happen in ANY organ (also fungi – e.g. this course's mucormycosis slide)",
      "Langhans giant cells are not specific to TB — can be in any granuloma. Don't confuse with islets of Langerhans / Langerhans cells",
      "Caseous necrosis (granuloma centre) ≠ fibrinous necrosis (fibrin on surfaces/ulcer bases)",
      "Lymph-node version (the past-exam organ, with the year-09 exam photos): see the Supplement card 'Caseating granulomatous inflammation — Lymph node'",
    ],
  },
  {
    id: "p-fat-necrosis", no: "PA0081 (65)", organ: "Pancreas", dx: "Fat necrosis", cat: "necrosis", normal: "pancreas", src: "ci2",
    answer: { organ: "Pancreas", dx: "Fat necrosis", desc: [
      "Shadowy outlines of necrotic fat cells",
      "Basophilic calcium deposits",
      "Inflammation",
    ] },
    slide: ["This slide ALSO shows acute interstitial (traumatic) pancreatitis: acute inflammatory infiltrate in the pancreatic parenchyma, mostly in the outer part, with hemorrhage (RBCs and fibrin); 'traumatic' comes from the clinical history."],
    features: [
      "Gross: chalky-white areas (fat saponification)",
      "Mechanism: pancreatic lipases split triglycerides → fatty acids combine with calcium",
    ],
    pearls: ["Causes: trauma, pancreatitis. Saponification is especially seen when pancreatic lipase is present"],
  },

  // ───────────── ADAPTATION & ACCUMULATION ─────────────
  {
    id: "p-bph", no: "PA0220 (162)", organ: "Prostate", dx: "Nodular hyperplasia", cat: "adapt", normal: "prostate", src: "ci3",
    answer: { organ: "Prostate", dx: "Nodular hyperplasia", desc: [
      "Nodules of cystically dilated hyperplastic glands lined by bilayered glandular epithelium and epithelial infoldings forming papillary protrusions",
      "No cytologic atypia; basal cells preserved",
    ] },
    slide: ["Stromal hyperplasia is NOT obvious on this slide."],
    features: [
      "Lobulated florid glandular architecture → prostate",
      "How to see a nodule: (1) a 'ball' visible by eye or at low power; (2) compression of the surrounding structures",
      "Epithelial hyperplasia → infoldings → papillae; cystically dilated glands",
      "Bilayered glandular epithelium (acinar + basal cells); ± stromal hyperplasia",
      "Courpus amylacea: laminated eosinophilic concretions in the glandular lumen, common in older men",
    ],
    pearls: [
      "Can happen in secretory organs, e.g. thyroid gland, adrenal gland, liver, etc.",
      "Clinical term BPH (benign prostatic hypertrophy); cause: androgenic stimulation by DHT; gross 3–5× weight with well-defined nodules",
      "DDx prostatic adenocarcinoma: no cytologic atypia and basal cells preserved in hyperplasia",
    ],
  },
  {
    id: "p-steatosis", no: "PA0074 (58)", organ: "Liver", dx: "Steatosis (fatty change)", cat: "adapt", normal: "liver", src: "ci3",
    answer: { organ: "Liver", dx: "Steatosis (fatty change)", desc: ["Lipid droplets in hepatocytes (microvesicular and macrovesicular"] },
    features: [
      "Recognise liver: portal areas, central veins, polygonal eosinophilic cells",
      "Large droplets (macrovesicular) distend the hepatocyte and push the nucleus aside; small droplets (microvesicular). Domination matters",
      "Droplets look empty and clean — the lipid is washed out during processing",
      "Adult fatty liver disease starts in zone 3",
    ],
    pearls: [
      "Causes: toxins, protein malnutrition, diabetes, obesity, hypoxia; in liver: alcohol, NAFLD. Gross: soft, yellow, greasy",
      "Steatosis vs ballooning (zone 3, reticular cleared cytoplasm, Mallory-Denk bodies) vs feathery degeneration (zone 1, cholestasis) — see comparison table",
      "Another steatosis slide number is mentioned in lecture: PA0274",
    ],
  },
  {
    id: "p-anthracosis", no: "PA0017 (18)", organ: "Lung", dx: "Anthracosis", cat: "adapt", normal: null, src: "ci3",
    answer: { organ: "Lung", dx: "Anthracosis", desc: ["Dark black pigments in macrophages/histiocytes"] },
    slide: ["Section review also shows anthracosis in a LYMPH NODE — see the Supplement card 'Anthracosis — Lymph node'."],
    features: [
      "Recognise lung: solid organ with air spaces, bronchovascular bundles",
      "Multifocal dark black areas at low power; very black pigment in macrophages at high power",
      "Spread along lymphatics → peribronchovascular areas, tracheobronchial lymph nodes",
    ],
    pearls: [
      "Carbon (coal dust) from urban air; very common incidental finding (also seen on the aspergillosis slide)",
    ],
  },
  {
    id: "p-nevus", no: "PA0144 (120)", organ: "Skin", dx: "Intradermal (melanocytic) nevus", cat: "adapt", normal: "skin", src: "ci3",
    answer: { organ: "Skin", dx: "Intradermal (melanocytic) nevus", desc: [
      "Nests & cords of proliferative melanocytes",
      "Brown-black melanin pigmentation",
      "Maturation of descent",
      "No cytologic atypia",
      "(Adipocytic metaplasia)",
    ] },
    features: [
      "Recognise skin: squamous epithelium + dense collagen + adnexa + fat (epidermis, dermis, subcutis); relatively dark, hypercellular dermal lesion",
      "Maturation with descent: superficial larger 'epithelioid' melanocytes with melanin → middle smaller 'lymphocytoid' cells with little melanin → deep spindle 'neuroid' cells",
      "No cytologic atypia; ± adipocytic metaplasia",
      "Melanin: brown, uniform fine granules, NOT refractile — the only endogenous brown-black pigment",
    ],
    pearls: [
      "Junctional (epidermis) → compound (epidermis + dermis) → intradermal (dermis only)",
      "DDx melanoma",
    ],
  },
  {
    id: "p-melanosis-coli", no: "PA0208 (152)", organ: "Large intestine", dx: "Melanosis coli", cat: "adapt", normal: "colon", src: "ci4",
    answer: { organ: "Large intestine", dx: "Melanosis coli", desc: ["Yellow-brown ceroid-laden macrophages in the lamina propria (yellow-brown,fine granules, not/lightly refractile)"] },
    features: [
      "Recognise colon: crypts with goblet cells, no Paneth cells, loose submucosa, inner circular + outer longitudinal muscularis propria",
      "Yellow-brown, finely granular 'lipofuscin-like ceroid' pigment in lamina propria macrophages",
    ],
    pearls: [
      "NOT melanin despite the name — just black/brown grossly",
      "Cause: chronic constipation, anthraquinone laxatives → epithelial apoptosis → phagocytosed → ceroid",
      "Ceroid (pathologic, injury-associated, in macrophages) vs lipofuscin (physiologic wear-and-tear, perinuclear in long-lived cells) — exam wording: 'lipofuscin-like ceroid pigment'",
    ],
  },
  {
    id: "p-hemosiderosis", no: "PA0211 (153)", organ: "Liver", dx: "Hemosiderosis", cat: "adapt", normal: "liver", src: "ci4",
    answer: { organ: "Liver", dx: "Hemosiderosis", desc: ["Golden yellow-brown, refractile hemosiderin accumulation in hepatocytes"] },
    slide: ["Hemosiderin mainly in HEPATOCYTES (some in macrophages). This slide also shows ballooning change, Mallory-Denk bodies and steatosis."],
    features: [
      "Hemosiderin look: golden-brown, clearly refractile, very variable size, clumped",
      "Gross: rust-brown pigmentation",
      "hepatocyte with balloning change, Mallory-Denk bodies, steatosis",
    ],
    pearls: [
      "Systemic iron overload: hemochromatosis (↑ absorption), hemolytic anemia, repeated transfusions. Localised hemosiderosis = bruise",
      "Prussian blue positive (iron)",
    ],
  },
  {
    id: "p-cholestasis", no: "PA0214 (156)", organ: "Liver", dx: "Obstructive cholestasis", cat: "adapt", normal: "liver", src: "ci4",
    answer: { organ: "Liver", dx: "Obstructive cholestasis", desc: [
      "Green-brown bile pigments in hepatocytes and dilated canaliculi",
      "Portal edema, prominent ductular reaction & neutrophil infiltration ('pericholangitis') — triad of obstructive cholestasis",
      "Swelling of periportal hepatocytes ('feathery degeneration')",
    ] },
    features: [
      "Bile look: brown-green; when in large patches looks thick/dense (plugs)",
      "Feathery degeneration: zone 1, flocculent finely vacuolated cytoplasm from bile-acid detergent action",
    ],
    pearls: [
      "Causes: stones, pancreatobiliary tumour, strictures, PSC; children: biliary atresia, cystic fibrosis, choledochal cyst",
      "A PORTAL TRIAD (zone 1) problem: bile can't drain → ductular proliferation, inflammation and edema in the portal tract",
    ],
  },
  {
    id: "p-malaria-pigment", no: "PA0216 (158)", organ: "Liver", dx: "Malaria pigment", cat: "adapt", normal: "liver", src: "ci4",
    answer: { organ: "Liver", dx: "Malaria pigment", desc: ["Brown-black malaria pigments in macrophages and hepatocytes"] },
    slide: ["Also sinusoid dilatation (obstruction + congestion) on this slide."],
    features: [
      "Hemozoin look: black with a slight brown tinge, faintly refractile/birefringent, granular",
    ],
    pearls: [
      "Plasmodium digests hemoglobin; toxic heme is polymerised into hemozoin",
      "Gross: enlarged, pigmented spleen, liver & kidneys",
    ],
  },

  // ───────────── INFLAMMATION ─────────────
  {
    id: "p-appendicitis", no: "PA0270 (37)", organ: "Appendix", dx: "Acute suppurative appendicitis", cat: "inflam", normal: "appendix", src: "inf",
    answer: { organ: "Appendix", dx: "Acute suppurative appendicitis", desc: [
      "Mucosal and mural neutrophil infiltration, involving muscularis propria",
      "Mucosal ulceration",
      "Luminal and mural abscess",
      "Fibrinous inflammation on the serosal surface",
    ] },
    features: [
      "Recognise appendix: small hollow organ, whole cross-section fits on one slide",
      "Ulcer = mucosal defect + fibrinous necrosis; abscess = neutrophil collection + cell debris",
      "Neutrophils with lymphocytes, plasma cells, eosinophils, histiocytes through the wall to serosa",
    ],
    pearls: [
      "Purulent (suppurative) = acute inflammation with pus (neutrophils + liquefied necrotic debris + edema fluid)",
      "Cause: luminal obstruction (fecalith) → stasis → bacterial infection",
    ],
  },
  {
    id: "p-sinusitis", no: "PA0044 (29)", organ: "Maxillary sinus", dx: "Chronic sinusitis", cat: "inflam", normal: "trachea", src: "inf",
    answer: { organ: "Maxillary sinus (nasal cavity / paranasal sinus / sinonasal tract)", dx: "Chronic sinusitis", desc: [
      "Submucosal mixed inflammatory cell infiltrate of lymphocytes, plasma cells, and eosinophils",
      "Submucosal edema",
      "Basement membrane thickening",
    ] },
    slide: ["Basement membrane thickening is only FOCAL on this slide; histiocytes and neutrophils are few."],
    features: [
      "Recognise sinonasal tract: multiple tissue fragments with respiratory epithelium (ciliated pseudostratified columnar ± goblet cells), submucosal glands, abundant vessels, bone & cartilage",
      "Invaginated respiratory epithelium with cystic dilation; flattened epithelium in cysts",
      "Plasma cell: clock-face chromatin, perinuclear hof",
    ],
    pearls: ["Chronic inflammation = lymphocytes, plasma cells (± eosinophils), not neutrophil-dominant"],
  },
  {
    id: "p-suture-granuloma", no: "PA0143 (119)", organ: "Skin", dx: "Suture granuloma", cat: "inflam", normal: "skin", src: "inf",
    answer: { organ: "Skin", dx: "Suture granuloma", desc: [
      "Center: suture",
      "Periphery: granulomatous inflammation – (epithelioid) macrophages/histiocytes, multinucleated giant cells, lymphocytes, plasma cells, fibrosis/scar",
      "Other finding: fat necrosis",
    ] },
    features: [
      "Foreign-body granuloma: material too large to phagocytose and non-immunogenic → no T-cell response",
      "Scar: collagen deposition, fibroblast → activated fibroblast → myofibroblast proliferation (vs normal dermis)",
      "Fat necrosis in subcutis: size-varied lipid droplets + chronic inflammation with foamy histiocytes; eosinophils may be present",
    ],
    pearls: [],
  },
  {
    id: "p-gastric-ulcer", no: "PA0202 (148)", organ: "Stomach", dx: "Chronic ulcer", cat: "inflam", normal: "stomach-fundic", src: "inf",
    answer: { organ: "Stomach", dx: "Chronic ulcer", desc: [
      "Mucosal defect with fibrinous necrosis and neutrophils",
      "Granulation tissue",
      "Fibrosis/scar",
      "Other finding: fibrinous inflammation on the serosal surface",
    ] },
    slide: ["37M. A slice of hollow organ; mucosa with foveolar glands (columnar cells with abundant intracellular mucin, no goblet cells) and oxyntic glands (chief + parietal cells) → stomach."],
    features: [
      "Ulcer: mucosal defect with fibrinous necrosis (fibrin + cell debris), neutrophil-predominant infiltrate",
      "Chronic = evidence of healing: granulation tissue (loose edematous ECM, capillary proliferation, mixed inflammatory cells) and scar (collagen, fibroblasts/myofibroblasts)",
    ],
    pearls: [
      "Don't misspell: Fibrosis (scar) ≠ Fibrinous (fibrin)",
      "Fibrinous necrosis/inflammation (surfaces) vs caseous necrosis (granuloma centre)",
    ],
  },

  // ───────────── HEMODYNAMIC ─────────────
  {
    id: "p-spleen-congestion", no: "PA0008 (10)", organ: "Spleen", dx: "Congestive splenomegaly", cat: "circ", normal: "spleen", src: "hd",
    answer: { organ: "Spleen", dx: "Congestive splenomegaly", desc: [
      "Red pulp expansion",
      "Red pulp congestion (& fibrosis)",
      "Dilated sinusoids",
    ] },
    slide: ["Fibrosis is NOT obvious on this slide."],
    features: [
      "Recognise spleen: capsule & trabeculae, white pulp (periarteriolar lymphoid sheath), red pulp (cords + sinusoids)",
      "Gross: 1000–5000 g (normal ~150 g), firm (fibrosis), thick capsule",
      "Gamma-Gandy bodies",
    ],
    pearls: [
      "Chronic venous outflow obstruction: liver cirrhosis, portal/splenic vein thrombosis, heart failure",
      "Congestion = too much blood coming in, or too little going out — the red pulp fills with RBCs",
      "Chain: right heart failure → liver congestion (nutmeg liver) → if severe, backs up further into the spleen. Liver cirrhosis → portal hypertension → splenic congestion",
    ],
  },
  {
    id: "p-hemorrhoid", no: "PA0059 (41)", organ: "Anus", dx: "Hemorrhoid", cat: "circ", normal: "anorectal", src: "hd",
    answer: { organ: "Anus", dx: "Hemorrhoid", desc: [
      "Dilated and congested submucosal vessels",
      "Thrombosis",
      "Organization & recanalization",
    ] },
    features: [
      "Recognise anus: anorectal junction with large-intestinal type epithelium and non-keratinizing stratified squamous epithelium",
      "Thrombus = fibrin + platelets + RBCs; organization/recanalization = intravascular proliferation of endothelial cells, smooth muscle, fibroblasts, new capillaries",
      "Overlying mucosa may be ulcerated and inflamed",
    ],
    pearls: [
      "Venous plexus congestion: constipation, pregnancy, portal hypertension",
      "Fates of a thrombus: propagation, embolization, dissolution, organization & recanalization",
    ],
  },
  {
    id: "p-nutmeg", no: "PA0076 (61)", organ: "Liver", dx: "Nutmeg liver (centrilobular congestion and necrosis)", cat: "circ", normal: "liver", src: "hd",
    answer: { organ: "Liver", dx: "Nutmeg liver", desc: [
      "Centrilobular [zone 3] congestion",
      "Centrilobular [zone 3] hepatocyte necrosis",
    ] },
    slide: ["Zone 3 congestion is the MAIN finding on this slide; hepatocyte necrosis is only focal."],
    features: [
      "Find portal tracts (P) and central veins (C) first, then see that congestion (dilated sinusoids full of RBCs) surrounds the central veins",
      "Gross: red-brown centrilobular areas vs tan uncongested areas = nutmeg pattern",
    ],
    pearls: [
      "Passive hepatic congestion (congestive hepatopathy) — right heart failure, or IVC/hepatic vein obstruction (Budd–Chiari syndrome)",
      "Zone 3 is at the END of the blood flow (lowest O₂) → also the first to die in shock, hypotension or severe anemia (ischemic centrilobular necrosis)",
    ],
  },
  {
    id: "p-cardiac-sclerosis", no: "PA0215 (157)", organ: "Liver", dx: "Cardiac sclerosis", cat: "circ", normal: "liver", src: "hd",
    answer: { organ: "Liver", dx: "Cardiac sclerosis", desc: [
      "Centrilobular congestion, sinosoid dilation",
      "Centrilobular hepatocyte fibrosis, (bridging sclerosis) – may bridge 'central to central' or 'central to portal'",
    ] },
    features: [
      "Zone 3 congestion with dilated hepatic (central) veins + centrilobular fibrosis; may bridge 'central to central' or 'central to portal'",
      "Also called congestive hepatic fibrosis",
    ],
    pearls: ["Sustained chronic congestive heart failure: congestion → injury → necrosis (nutmeg liver) → fibrosis (cardiac sclerosis)"],
  },
  {
    id: "p-kidney-infarct", no: "PA0096 (76)", organ: "Kidney", dx: "(1) Infarct; (2) Acute tubular necrosis", cat: "circ", normal: "kidney", src: "hd",
    answer: { organ: "Kidney", dx: "Infarct / infarction", desc: [
      "Wedge-shaped coagulative necrosis – acute tubular necrosis",
      "Thrombosis",
    ] },
    features: [
      "Infarct = area of ischemic coagulative necrosis from occlusion of arterial supply (more common) or venous drainage",
      "Shape follows the vascular territory → usually wedge-shaped; glomeruli are also necrotic",
    ],
    pearls: [
      "Infarct vs ATN: infarct = localised wedge, glomeruli affected; ATN = tubules, glomeruli usually unremarkable. They can overlap; without definite evidence of infarction → ATN",
    ],
  },

  // ───────────── VIRAL & BACTERIAL ─────────────
  {
    id: "p-condyloma", no: "PA0255 (80)", organ: "Skin", dx: "Condyloma acuminatum", cat: "virus", normal: "skin", src: "i1",
    answer: { organ: "Skin", dx: "Condyloma acuminatum", desc: [
      "Papillomatosis",
      "Koilocytosis",
      "Acanthosis",
      "Hyperkeratosis",
      "Parakeratosis",
    ] },
    features: [
      "Papillomatosis: papillary architecture with fibrovascular cores",
      "Koilocytes: perinuclear halo, enlarged hyperchromatic nuclei, wrinkled ('raisin-like') nuclear membrane",
      "Acanthosis: diffuse epidermal hyperplasia; hyperkeratosis: thick corneal layer; parakeratosis: retained nuclei in the corneal layer",
    ],
    pearls: [
      "Benign genital wart, low-risk HPV; gross: mushroom-shaped red papillary excrescences, often multiple",
      "Appeared in the 2025 anatomic pathology board exam (cauliflower-like urethral tumour)",
      "Urogenital version (squamous metaplasia of urothelium): see the Supplement card 'Condyloma acuminatum — Urogenital tract'",
    ],
  },
  {
    id: "p-molluscum", no: "PA0271 (117)", organ: "Skin", dx: "Molluscum contagiosum", cat: "virus", normal: "skin", src: "i1",
    answer: { organ: "Skin", dx: "Molluscum contagiosum", desc: [
      "A cup-like lesion with a crater",
      "Epidermal hyperplasia",
      "Molluscum bodies (Henderson-Patterson bodies) in the crater: large, eosinophilic to basophilic intracytoplasmic inclusions that push aside the nucleus",
    ] },
    features: [
      "Molluscum bodies in keratinocytes of the granular layer (eosinophilic) and corneal layer (pale blue)",
    ],
    pearls: ["Poxvirus; dome-shaped papules with central umbilication; self-limited"],
  },
  {
    id: "p-cmv", no: "PA0218 (160)", organ: "Kidney", dx: "Cytomegaloviral nephritis", cat: "virus", normal: "kidney", src: "i1",
    answer: { organ: "Kidney", dx: "Cytomegalovirus (CMV) infection / CMV nephritis", desc: [
      "Infected cells: (a) cellular and nuclear enlargement; (b) large intranuclear basophilic inclusions with halos; (c) small cytoplasmic basophilic inclusions",
      "Chronic inflammation",
    ] },
    slide: ["This slide shows CHRONIC inflammation; other cases may show mainly acute inflammation."],
    features: [
      "'Owl's eye' intranuclear inclusion; chromatin margination",
      "Inclusions may be scattered and hard to find — look in areas with inflammation",
    ],
    pearls: [
      "β-herpesvirus; infects tubular epithelium and glomerular endothelium in kidney; latent in monocytes, reactivates in immunosuppression (transplant, HIV)",
      "Can appear in ANY organ in the exam",
      "Intestinal version (the organ used in years 10 and 11): see the Supplement card 'Cytomegalovirus colitis / enteritis — Large intestine'",
    ],
  },
  {
    id: "p-endocarditis", no: "PA0001 (4)", teach: "Slide PA0001 (4) on the microteaching site — infective endocarditis. The case list and section reviews write it as PA0306 (4), aortic valve.",
    organ: "Aortic valve", dx: "Infective endocarditis", cat: "virus", normal: "heart", src: "i1",
    answer: { organ: "Heart valve (in the exam just write 'heart valve' – which valve can't be told histologically)", dx: "Infective endocarditis", desc: [
      "Valve destruction with necrosis",
      "Vegetation: composed of fibrin, bacterial clumps, and inflammatory infiltrate (neutrophilic or lymphohistiocytic)",
      "Inflamed granulation tissue",
      "(In chronic lesion): organization and calcification",
    ] },
    features: [
      "Normal valve layers: atrialis, spongiosa, fibrosa, ventricularis",
      "Vegetation may erode into the myocardium and form an abscess",
    ],
    pearls: [],
  },
  {
    id: "p-actinomycosis", no: "PA0251 (39)", organ: "Ovary", dx: "Actinomycosis", cat: "virus", normal: "ovary", src: "i2",
    answer: { organ: "Ovary", dx: "Actinomycosis", desc: [
      "Sulfur granules composed of clumped colonies of bacteria in the center with eosinophilic periphery with club-like projections (Splendore-Hoeppli phenomenon)",
      "Acute and chronic inflammation with abscess formation",
      "May granulomatous inflammation (suppurative granulomatous inflammation)",
    ] },
    slide: ["The lesion fills the whole slide — there is actually no recognisable ovarian tissue."],
    features: [
      "Basophilic centre = clumped bacterial colonies; eosinophilic periphery = fibrin, immune complexes and debris",
      "May have abscess, necrosis, fibrosis",
    ],
    pearls: [
      "Actinomyces: gram-positive filamentous, slow-growing anaerobic rods (bacterium, not fungus)",
      "Sites: oral cavity (lumpy jaw), lung (aspiration), pelvis (IUD); normal flora — not necessarily pathogenic",
    ],
  },

  // ───────────── FUNGAL ─────────────
  {
    id: "p-mucor", no: "PA0022 (9)", organ: "Spleen", dx: "Mucormycosis", cat: "fungus", normal: "spleen", src: "i2",
    answer: { organ: "Spleen", dx: "Mucormycosis", desc: [
      "Aseptate hyphae with wide-angle branching",
      "Necrotizing granulomatous inflammation (caseating)",
    ] },
    features: [
      "'Wide ribbons': wide (6–50 µm) hyphae with infrequent or absent septa, wide-angle branching up to 90°",
      "Angioinvasion is common → thrombosis and tissue necrosis ('black fungus')",
    ],
    pearls: ["Size reference: RBC & lymphocyte nucleus ≈ 7 µm; bacterial cocci 0.5–1 µm"],
  },
  {
    id: "p-aspergillus", no: "PA0015 (17)", organ: "Lung", dx: "Aspergillosis", cat: "fungus", normal: null, src: "i2",
    answer: { organ: "Lung", dx: "Aspergillosis", desc: [
      "Fungal hyphae with septa and acute-angle branching",
      "Chronic inflammation",
      "Fibrosis",
      "Anthracosis",
    ] },
    features: [
      "'Sling shots' (Y-shaped): thin (2–5 µm) septate hyphae with narrow-angle (45°) branching",
      "Degenerated hyphae are NOT suitable for judging septa/branching — find well-preserved ones",
    ],
    pearls: [
      "Forms: allergic (ABPA), colonizing (aspergilloma), invasive (immunocompromised)",
      "Anthracosis on the same slide — list it as an extra finding",
    ],
  },
  {
    id: "p-candida", no: "PA0201 (147)", organ: "Esophagus", dx: "Candidiasis", cat: "fungus", normal: "esophagus", src: "i2",
    answer: { organ: "Esophagus", dx: "Candidiasis", desc: [
      "Fungal yeasts and pseudohyphae",
      "Hyperkeratosis, parakeratosis",
      "Chronic inflammation",
      "Bacterial clumps",
    ] },
    features: [
      "'Sausage links & yeast': 3–5 µm budding yeasts + 5–10 µm pseudohyphae (elongated yeasts joined end-to-end, constricted at septa)",
      "Pseudohyphae: pinched constrictions, little branching; true hyphae: parallel walls, no constrictions, frequent branching",
    ],
    pearls: ["C. albicans: oral cavity (thrush), esophagus, vagina, diaper rash"],
  },
  {
    id: "p-crypto", no: "PA0316 (198)", organ: "Lung", dx: "Cryptococcosis", cat: "fungus", normal: null, src: "i3",
    answer: { organ: "Lung", dx: "Cryptococcosis", desc: [
      "Numerous round to oval, refractile, thick-walled fungal yeasts",
      "Focal necrosis",
      "Granulomatous inflammation (vaguely-formed granuloma / macrophage infiltration with scattered multinucleated giant cells)",
      "Chronic inflammation",
      "Intraalveolar fibrin deposition",
      "Fibrosis",
    ] },
    features: [
      "5–10 µm yeasts with a thick gelatinous polysaccharide capsule; narrow-based budding",
      "Yeasts inside multinucleated giant cells",
      "Capsule stains red with PAS and mucicarmine",
    ],
    pearls: [
      "C. neoformans (soil, pigeons; opportunistic, meningoencephalitis) vs C. gattii (immunocompetent, large lesions)",
      "With immunity: granulomas; immunosuppressed: little inflammation, 'soap-bubble' gelatinous masses",
    ],
  },
  {
    id: "p-pcp", no: "PA0302 (191)", organ: "Lung", dx: "Pneumocystis jirovecii pneumonia", cat: "fungus", normal: null, src: "i3",
    answer: { organ: "Lung", dx: "Pneumocystis jirovecii pneumonia", desc: [
      "Foamy, granular, eosinophilic exudate in the alveolar spaces",
      "Interstitial thickening and inflammation",
      "Other finding: focal ossification",
      "Diffuse alveolar damage (hyaline membranes) may be present",
    ] },
    slide: ["Your list says PA0302 (101); the lectures and section reviews give (191)."],
    features: [
      "Exudate = fibrin + trophozoites and cysts + surfactant + debris",
      "Cysts (cup-shaped / crushed ping-pong balls) are NOT visible on H&E — black on silver (GMS) stain",
      "Reactive pneumocytes, interstitial lymphocytes & plasma cells; may have diffuse alveolar damage (hyaline membranes)",
      "Diffused alveolar damage (DAD) = hyaline membranes + interstitial edema + type II pneumocyte hyperplasia + interstitial inflammation",
    ],
    pearls: ["Yeast-like fungus; opportunistic infection in AIDS; rapidly progressive bilateral pneumonia"],
  },

  // ───────────── PARASITIC & HERPES ─────────────
  {
    id: "p-amebiasis", no: "PA0206 (150)", organ: "Appendix", dx: "Amebiasis", cat: "parasite", normal: "appendix", src: "i3",
    answer: { organ: "Appendix", dx: "Amebiasis", desc: [
      "Round microorganisms: (a) foamy cytoplasm; (b) round, eccentric nucleus; (c) ingested red blood cells",
      "Ulcer with inflamed granulation tissue and acute suppurative inflammation (transmural neutrophil infiltration)",
    ] },
    features: [
      "Trophozoites 10–60 µm, foamy pink-purple cytoplasm (mimic macrophages), nucleus with peripheral chromatin rim and dot-like central karyosome",
      "Flask-shaped ulcer (base broader than apex) containing debris, fibrin and trophozoites",
    ],
    pearls: [
      "Entamoeba histolytica; caecum most common, then right colon, rectum, sigmoid, appendix",
      "Appeared in the 2025 anatomic pathology board slide exam",
    ],
  },
  {
    id: "p-herpes", no: "PA0332 (145)", teach: "Teaching slide updated to PA0354 (145) — oral cavity, mouth floor. Exam list: skin (thigh).",
    organ: "Skin, thigh", dx: "Herpes virus infection", cat: "virus", normal: "skin", src: "i3",
    answer: { organ: "Oral cavity (mouth floor) on the teaching slide — skin on the exam list", dx: "Herpes virus infection", desc: [
      "Cytopathic effects compatible with herpes infection: (a) multinucleation, (b) margination of chromatin, (c) molding of nuclei",
      "Ulcer with neutrophil infiltration and necrotic debris",
    ] },
    features: [
      "'3 M': multinucleation, molding, margination of chromatin",
      "Large pink-to-purple intranuclear inclusions (Cowdry type A)",
      "Steel-grey (ground-glass) nuclear texture is the easiest feature to recognise",
    ],
    pearls: [],
  },
  // ── Supplement: extra teaching slides at the start of Cell injury & adaptation (4), pp. 1–9 — not on the exam slide list ──
  {
    id: "p-junctional-nevus", supp: true, no: "Supplement", organ: "Skin", dx: "Junctional (melanocytic) nevus", cat: "supp", normal: "skin", src: "ci4",
    teach: "Supplement slides (lecture 4, pp. 1–5) — not on the exam slide list. Compare with the exam's intradermal nevus (PA0144).",
    answer: { organ: "Skin", dx: "Junctional (melanocytic) nevus", desc: [
      "Nests of melanocytes (nevus cells) at the dermo-epidermal junction, within the epidermis (base of the rete ridges)",
      "Melanin pigmentation within the nests",
      "No dermal component",
      "No cytologic atypia",
    ] },
    slide: ["Lecturer's slides: arrows / yellow circles mark small round nests of pale nevus cells with fine brown melanin, sitting at the bottom of the rete ridges at the epidermis–dermis border (15× and 40×). The dermis below is just normal collagen."],
    features: [
      "Lecture definition: **junctional nevus = inside the epidermis** (epidermis內)",
      "Small, round, well-circumscribed nests of nevus cells at the dermo-epidermal junction, often at the tips of rete ridges",
      "Nest cells: round-oval nuclei, pale cytoplasm, fine brown melanin granules; often separated from the surrounding keratinocytes by a clear cleft",
      "Clinically the darkest type (dark brown to black, flat)",
    ],
    pearls: [
      "Sequence: junctional (epidermis) → compound (epidermis + dermis) → intradermal (dermis only) — name the type by WHERE the nests are",
      "DDx melanoma in situ: single cells rather than nests, upward (pagetoid) spread, cytologic atypia",
    ],
  },
  {
    id: "p-compound-nevus", supp: true, no: "Supplement", organ: "Skin", dx: "Compound (melanocytic) nevus", cat: "supp", normal: "skin", src: "ci4",
    teach: "Supplement slides (lecture 4, pp. 1, 6–8) — not on the exam slide list. Compare with the exam's intradermal nevus (PA0144).",
    answer: { organ: "Skin", dx: "Compound (melanocytic) nevus", desc: [
      "Nests of melanocytes (nevus cells) at the dermo-epidermal junction (junctional component)",
      "Nests and cords of nevus cells in the dermis (intradermal component)",
      "Melanin pigmentation",
      "Maturation of descent",
      "No cytologic atypia",
    ] },
    slide: ["Lecturer's slide (10×): yellow arrow = a junctional nest at the epidermis border; green outline = nests and cords of nevus cells in the dermis. Sebaceous glands on the left → skin."],
    features: [
      "Lecture definition: **compound nevus = epidermis + dermis**",
      "Junctional nests at the dermo-epidermal junction PLUS nests/cords in the underlying dermis",
      "Dermal part shows maturation of descent (larger pigmented cells superficially, smaller cells deeper), as in the intradermal nevus",
      "Clinically brown and slightly raised",
    ],
    pearls: [
      "If you see ANY junctional nests on top of a dermal nevus → compound; dermal nests only → intradermal (the exam slide PA0144)",
      "DDx melanoma: no atypia, no deep mitoses, maturation preserved in a nevus",
    ],
  },
  {
    id: "p-stromal-bph", supp: true, no: "Supplement", organ: "Prostate", dx: "Nodular hyperplasia (stromal hyperplasia)", cat: "supp", normal: "prostate", src: "ci4",
    teach: "Supplement slide (lecture 4, p. 9; WebPathology images) — not on the exam slide list. The exam slide PA0220 shows glandular nodules; its stromal hyperplasia is NOT obvious.",
    answer: { organ: "Prostate", dx: "Nodular hyperplasia (stromal hyperplasia)", desc: [
      "Well-circumscribed nodule of proliferating stroma (spindle cells: fibroblasts and smooth muscle) with few or no glands",
      "Compression of the surrounding prostatic tissue",
      "No cytologic atypia",
    ] },
    slide: ["Lecture images: left — a cellular, round stromal nodule with a few small vessels; right — a paler, loose stromal nodule pushing on the surrounding fibromuscular stroma."],
    features: [
      "A round 'ball' made of stroma instead of glands — recognise the nodule at low power (well-defined edge, compression of the surroundings)",
      "Spindle stromal cells, bland nuclei, small vessels; glands sparse or absent",
      "Elsewhere in the same prostate: glandular nodules (bilayered epithelium, papillary infoldings, corpora amylacea) as on PA0220",
    ],
    pearls: [
      "Nodular hyperplasia of the prostate = glandular AND/OR stromal hyperplasia — the diagnosis is the same",
      "DDx leiomyoma / stromal tumour: hyperplasia is usually multiple nodules with adjacent glandular hyperplasia",
    ],
  },
  {
    id: "p-caseating-ln", supp: true, kaoguOf: "p-caseating", answerSrc: "the year-09 official answer for this lymph-node slide", no: "Supplement · 考古 year-09 exam slide", organ: "Lymph node", dx: "Caseating granulomatous inflammation", cat: "supp", normal: "lymph-node", src: "ci2",
    teach: "Supplement — the LYMPH NODE version of PA0198 (teaching slide = lung). Photos are from the year-09 exam (B09 Q4); a lymph node was also used in years 07, 08 and 11 (organ changed).",
    answer: { organ: "Lymph node", dx: "Caseating granulomatous inflammation", desc: [
      "Center: caseous necrosis",
      "Periphery: (epithelioid) histiocytes / macrophages",
      "Multinucleated giant cells (some Langhans type)",
      "Lymphocytes",
      "Fibrosis",
    ] },
    slide: ["Year-09 answer: the fat around the node is normal surrounding tissue (NOT adipocytic metaplasia); the inflammation breaks through the capsule; focal fat necrosis (no obvious saponification yet) in the surrounding fat is optional to write."],
    features: [
      "Recognise lymph node: capsule, subcapsular sinus, lymphoid follicles with germinal centres",
      "Granulomas replace part of the node: pink amorphous caseous centre rimmed by epithelioid histiocytes, giant cells, lymphocytes and fibrosis",
      "Same morphology as the lung teaching slide — only the background organ changes",
    ],
    pearls: [
      "Organ is often changed in the exam: lymph node in years 07, 08, 09 and 11",
      "Description scoring (year 09): centre caseous necrosis 3 · periphery histiocytes 3 · giant cells 2 · lymphocytes 1 · fibrosis 1",
    ],
  },
  {
    id: "p-cmv-gi", supp: true, kaoguOf: "p-cmv", answerSrc: "the year-10 official answer (colon) and the year-11 full-marks sheet", no: "Supplement", organ: "Large intestine (colon)", dx: "Cytomegalovirus colitis / enteritis", cat: "supp", normal: "colon", src: "web",
    teach: "Supplement — the INTESTINAL version of PA0218 (teaching slide = kidney). The exam used the large intestine in years 10 and 11 (organ changed).",
    answer: { organ: "Large intestine (colon)", dx: "Cytomegalovirus (CMV) infection / CMV colitis", desc: [
      "Infected cells: (a) cellular and nuclear enlargement; (b) large intranuclear inclusion with a halo (owl's eye); (c) small intracytoplasmic inclusions",
      "Ulcer / mucosal defect with ulcerative (necrotic) debris",
      "Mixed inflammatory infiltrate (neutrophils, eosinophils, lymphocytes, plasma cells)",
      "Granulation tissue / capillary proliferation",
      "(Mucosal / mural) hemorrhage, congestion",
    ] },
    features: [
      "Recognise colon: straight crypts full of goblet cells, no villi; small intestine (enteritis) has villi + Paneth cells",
      "Look in the lamina propria and the ulcer base: infected cells are mostly ENDOTHELIAL and STROMAL cells (also glandular epithelium) — markedly enlarged, standing out among small inflammatory cells",
      "Owl's eye: one large dark intranuclear inclusion with a clear halo; plus small granular pink-purple cytoplasmic inclusions",
      "Background: ulceration, mixed inflammation, granulation tissue, hemorrhage, reactive crypts",
    ],
    pearls: [
      "Year 10 grading: viral inclusion with description = 5 points — the inclusion is the key finding; tissue reaction adds 1–2 each",
      "Year 10 penalised: abscess, transmural necrosis, thrombus with organization, granulomas / Langhans giant cells (−1 each)",
      "Organ: 'Colon / large intestine' = 2 points; 'Intestine' only 1 in year 10 (full in year 11) — be specific",
    ],
  },
  {
    id: "p-condyloma-uro", supp: true, kaoguOf: "p-condyloma", answerSrc: "your notes", no: "Supplement", organ: "Urogenital tract (urinary bladder / urethra)", dx: "Condyloma acuminatum", cat: "supp", normal: "bladder", src: "added",
    teach: "Supplement — the UROGENITAL version of PA0255 (teaching slide = skin). Here the HPV lesion sits on urothelial mucosa, which has turned into keratinizing squamous epithelium. Includes the Infection (1) lecture case (pp. 22–23, 2025 board exam: urethral cauliflower-like tumour in a 48M with a history of bladder cancer).",
    answer: { organ: "Urogenital tract (urinary bladder / urethra)", dx: "Condyloma acuminatum", desc: [
      "Keratinizing squamous metaplasia (hyperkeratotic squamous epithelium replacing the urothelial mucosa)",
      "Papillary fronds",
      "Hyperplastic squamous epithelium",
      "Koilocytosis: hyperchromatic, wrinkled nuclei",
      "Parakeratosis, hyperkeratosis and granular layer",
    ] },
    features: [
      "Clue to the organ: SQUAMOUS epithelium where urothelium should be (bladder/urethra) — remnants of urothelium or the urothelial setting at the edges",
      "Low power: papillary fronds with thin fibrovascular cores (seen in cross-section as round cores with vessels)",
      "Thick, acanthotic squamous epithelium with a pink keratin layer on top (hyperkeratosis ± parakeratosis) and a granular layer",
      "Koilocytes in the upper layers: perinuclear clear halo + hyperchromatic, wrinkled (raisinoid) nuclei, sometimes binucleated",
    ],
    pearls: [
      "Same diagnosis as the skin condyloma — the exam changes organs (anorectum in year 06)",
      "DDx squamous cell carcinoma / verrucous carcinoma: condyloma has no invasion and no marked atypia",
      "DDx plain squamous metaplasia of the bladder (no papillae, no koilocytes) and urothelial papilloma (urothelium, not squamous)",
    ],
  },
  {
    id: "p-thyroid-nh", supp: true, no: "Supplement", organ: "Thyroid gland", dx: "Nodular hyperplasia", cat: "supp", normal: "thyroid", src: "added",
    teach: "Supplement — nodular hyperplasia of the THYROID (multinodular goiter). Same diagnosis as the prostate exam slide (PA0220); it was the optional second diagnosis on the year-07 suture-granuloma slide (thyroid).",
    answer: { organ: "Thyroid gland", dx: "Nodular hyperplasia", desc: [
      "Variable-sized, dilated follicles filled with colloid, lined by flattened to hyperplastic epithelium",
      "Nodules without a thick capsule, with variable patterns (colloid-rich / macrofollicular to hypercellular / microfollicular)",
      "Secondary changes: fresh or old hemorrhage, fibrosis, calcification (± granulomatous response to ruptured follicles)",
      "Papillary projections (Sanderson polsters) in cystic follicles — without the nuclear features of papillary carcinoma",
      "Compressed surrounding (non-nodular) thyroid",
    ] },
    features: [
      "Recognise thyroid: follicles of cuboidal epithelium filled with pink colloid",
      "Low power: follicles of very different sizes, many cystically dilated; ill-defined nodules (no thick capsule)",
      "Look for secondary changes — hemorrhage, hemosiderin, fibrosis, calcification, even osseous metaplasia; ruptured follicles may provoke a granulomatous (foreign-body) response",
      "Sanderson polsters: small papillary infoldings into a dilated follicle — normal round nuclei, no clearing / grooves / pseudoinclusions",
    ],
    pearls: [
      "DDx follicular adenoma: a single nodule with a thick complete capsule and a uniform pattern, different from the surrounding thyroid",
      "DDx papillary carcinoma: true papillae with fibrovascular cores AND nuclear features (optically clear 'Orphan Annie' nuclei, grooves, pseudoinclusions)",
      "Highly atypical nuclei can appear after radioactive iodine; an incidental papillary microcarcinoma may coexist",
      "考古 year 07: the thyroid suture granuloma slide also showed nodular hyperplasia — optional second diagnosis (no deduction if omitted)",
    ],
  },
  {
    id: "p-adrenal-nh", supp: true, no: "Supplement", organ: "Adrenal gland", dx: "Nodular hyperplasia", cat: "supp", normal: "adrenal", src: "added",
    teach: "Supplement — nodular (adrenocortical) hyperplasia of the ADRENAL GLAND. Same diagnosis as the prostate exam slide (PA0220) and the thyroid supplement card.",
    answer: { organ: "Adrenal gland", dx: "Nodular hyperplasia", desc: [
      "Thickened adrenal cortex (zona fasciculata and reticularis) with multiple non-encapsulated cortical nodules",
      "Nodules of lipid-laden clear cells resembling zona fasciculata; micronodules may sit near the central vein",
      "Fasciculata cells may be lipid-depleted (compact, eosinophilic)",
      "Scattered atypical cells with large hyperchromatic nuclei (endocrine atypia) — not a sign of malignancy",
    ] },
    features: [
      "Recognise adrenal: thin capsule in fat, yellow-pale cortex (glomerulosa → fasciculata → reticularis) around a central medulla with a central vein",
      "Low power: the gland is thick and lumpy — several pale, poorly circumscribed nodules replace the normal regular zonation",
      "Clear (lipid-laden, 'spongiocyte') cells like zona fasciculata vs compact pink lipid-depleted cells",
      "No thick capsule around the nodules; the cortex between them is also hyperplastic (not atrophic)",
    ],
    pearls: [
      "DDx adrenocortical adenoma: usually a SINGLE, well-circumscribed (± encapsulated) nodule; in a cortisol-secreting adenoma the adjacent cortex is ATROPHIC",
      "DDx adrenocortical carcinoma: large, necrosis, high mitotic activity, atypical mitoses, invasion — endocrine atypia alone is not malignancy",
      "Cause: ACTH-driven (Cushing disease, ectopic ACTH) → diffuse or nodular hyperplasia of both adrenals",
    ],
  },
  {
    id: "p-anthracosis-ln", supp: true, no: "Supplement", organ: "Lymph node", dx: "Anthracosis", cat: "supp", normal: "lymph-node", src: "sr1",
    teach: "Supplement — the LYMPH NODE version of PA0017 (teaching slide = lung), from Section review (1.1) pp. 18–21, with the course's answer page.",
    answer: { organ: "Lymph node", dx: "Anthracosis", desc: [
      "Dark black pigments in histiocytes",
      "— OR: Accumulation of black anthracotic pigments in histiocytes",
    ] },
    features: [
      "Recognise lymph node: capsule, lymphoid tissue with follicles, sinuses; surrounded by fat",
      "Low power: scattered dark black spots within the node",
      "High power: coarse, very black (not brown) granules inside histiocytes, between small lymphocytes",
    ],
    pearls: [
      "Inhaled carbon is carried by lymphatics from the lung to the tracheobronchial (hilar) lymph nodes",
      "DDx: hemosiderin (golden-brown, refractile), melanin (brown, fine), malaria pigment (black-brown, in a spleen/liver) — anthracotic pigment is the blackest",
    ],
  },
  {
    id: "p-ulcer-skin", supp: true, no: "Supplement", organ: "Skin", dx: "Chronic ulcer", cat: "supp", normal: "skin", src: "user",
    teach: "Supplement — the SKIN version of the exam's chronic ulcer (PA0202 (148), stomach). Same diagnosis, different organ.",
    answer: { organ: "Skin", dx: "Chronic ulcer", desc: [
      "Epidermal defect with fibrinoid necrosis",
      "Granulation tissue with a mixed inflammatory infiltrate of lymphocytes, plasma cells, histiocytes and neutrophils",
      "Hemorrhage",
      "— OR, shorter: (1) Ulceration with necrotic debris and fibrin; (2) Inflamed granulation tissue",
    ] },
    slide: ["Slide labels: low power — ulcer (skin), ulcerative debris, granulation tissue; medium power (red circle) — edema, granulation tissue, lymphocytes + neutrophils, ulcerative debris; high power — edematous stroma, capillaries, inflammatory cells, degenerative ulcer debris (blue, smudgy); fibrin at the bottom of the cell debris."],
    features: [
      "Recognise skin: keratinising squamous epidermis, dermis with adnexa (hair follicles, sebaceous glands)",
      "Low power: the epidermis is MISSING over one area — replaced by a purple layer of ulcerative debris",
      "Layers of an ulcer from the surface down: necrotic/ulcerative debris (blue, smudgy) → fibrin / fibrinoid necrosis → inflamed granulation tissue (edematous stroma + proliferating capillaries + mixed inflammatory cells) → fibrosis",
      "Hemorrhage around the ulcer base",
    ],
    pearls: [
      "Same layered structure as the exam's chronic gastric ulcer — only the organ changes (ulcers can be in any epithelium-lined organ)",
      "'Chronic' = granulation tissue / fibrosis at the base; an acute ulcer is mostly fibrin, debris and neutrophils",
      "Fibrinoid necrosis ≠ fibrosis — spelling and meaning matter",
    ],
  },
  {
    id: "p-malaria-spleen", supp: true, no: "Supplement", organ: "Spleen", dx: "Malaria pigment (malaria)", cat: "supp", normal: "spleen", src: "ext",
    teach: "Supplement (ExpertPath images) — not on the exam slide list. Same pigment as the exam's malaria pigment in the LIVER (PA0216); here the organ is the spleen.",
    answer: { organ: "Spleen", dx: "Malaria pigment (malaria)", desc: [
      "Congestion",
      "White pulp depletion",
      "Malaria pigment (hemozoin)",
      "Rarely organisms in macrophages or RBCs",
    ] },
    features: [
      "Recognise spleen: capsule + trabeculae, white pulp (lymphoid follicles around arterioles) in a congested red pulp",
      "Low power: dark brown-black pigment scattered through a congested red pulp; white pulp small and depleted",
      "High power: coarse black-brown hemozoin clumps inside macrophages (and sometimes in RBCs); organisms only rarely seen",
      "Hemozoin look: black with a slight brown tinge, faintly refractile, granular — darker and less golden than hemosiderin",
    ],
    pearls: [
      "Gross: enlarged, pigmented (grey-black) spleen — malaria also pigments the liver and kidneys",
      "DDx hemosiderin (golden-brown, refractile, Prussian blue +) and simple congestive splenomegaly (exam slide: congestion WITHOUT black pigment)",
      "Exam version of this pigment is in the liver (PA0216): pigment in macrophages (Kupffer cells) and hepatocytes",
    ],
  },
];

// ───────────── PATHOLOGY COMPARISONS (from the lecture take-home tables) ─────────────
// Diagnoses that are not tied to one organ (so "which organ?" can't be answered from the diagnosis alone).
// Basis: lecture take-homes — caseous necrosis/granulomatous inflammation "can happen in ANY organ", CMV "any tissue",
// section review — infections (esp. CMV, fungi, granulomatous inflammation) often appear in a different organ;
// pigment table — anthracotic pigment, hemosiderin and malaria pigment have several typical sites.
const ANY_ORGAN = {
  "p-caseating": "Granulomatous inflammation can happen in ANY organ (exams: lung, lymph node)",
  "p-condyloma-uro": "Condylomas occur on any squamous-lined (or squamous-metaplastic) anogenital / urogenital surface (this card: urogenital tract)",
  "p-thyroid-nh": "Nodular hyperplasia occurs in several organs — prostate (exam slide), adrenal gland and thyroid (this card)",
  "p-adrenal-nh": "Nodular hyperplasia occurs in several organs — prostate (exam slide), thyroid and adrenal gland (this card)",
  "p-anthracosis-ln": "Anthracotic pigment is found in the lung or its draining lymph nodes (this card: the lymph-node version)",
  "p-ulcer-skin": "Ulcers occur in any epithelium-lined organ (this card: the skin version of the exam's gastric ulcer)",
  "p-caseating-ln": "Granulomatous inflammation can happen in ANY organ (this card: the lymph-node version used in the 07, 08, 09 and 11 exams)",
  "p-suture-granuloma": "Foreign-body granuloma wherever there was surgery (exams: skin, thyroid gland)",
  "p-fat-necrosis": "Fat necrosis wherever there is fat — pancreas, subcutis, around lymph nodes, appendix wall",
  "p-anthracosis": "Lung or lymph nodes (tracheobronchial)",
  "p-hemosiderosis": "Iron overload deposits in liver, spleen, bone marrow",
  "p-malaria-pigment": "Spleen, liver, kidneys",
  "p-gastric-ulcer": "Ulcers can occur in any mucosal organ (e.g. the CMV colitis exam slide had an ulcer)",
  "p-cmv": "CMV can infect any tissue (exams: kidney, colon / large intestine)",
  "p-actinomycosis": "Infection — organ varies (teaching: ovary; exam: sinonasal tract)",
  "p-mucor": "Fungal infection — organ varies (teaching: spleen)",
  "p-aspergillus": "Fungal infection — organ varies (teaching: lung; exam: sinonasal tract)",
  "p-candida": "Fungal infection — organ varies (teaching: esophagus; exam: lung)",
  "p-crypto": "Fungal infection — organ varies (lung in the teaching slide and exams)",
  "p-amebiasis": "Intestinal infection — appendix or large intestine (exam: large intestine)",
  "p-herpes": "Organ varies (teaching: oral cavity; exam list: skin)",
};

const PATH_COMPARISONS = [
  {
    id: "pc-liver-approach", title: "Liver: where is the problem? (portal triad vs central vein)",
    intro: "Blood flows from the portal triad (zone 1, outside) through the sinusoids to the central vein (zone 3, centre) → hepatic veins → IVC → heart. So the LOCATION of the damage points to the cause. Step 1: is the change around the portal triad or around the central vein?",
    headers: ["", "Portal triad (zone 1)", "Central vein (zone 3)"],
    rows: [
      ["Basic question", "**Bile problem?** Too much bile, or bile stuck (can't drain)", "**Outflow problem?** Blood can't drain back to the heart (e.g. IVC blocked)"],
      ["Contains / position", "Portal vein, hepatic artery, bile duct; first to receive blood from the gut", "Drains to hepatic veins → IVC; end of the blood flow, lowest O₂"],
      ["Obstruction / backflow", "Bile duct obstruction (stones, tumour, stricture): **ductular proliferation, portal edema, neutrophils** ('pericholangitis'), feathery degeneration", "IVC/hepatic vein block (Budd–Chiari) or right heart failure: **dilated central veins, congestion** → nutmeg liver → cardiac sclerosis (fibrosis)"],
      ["Other causes", "Chronic viral hepatitis (B, C) and autoimmune hepatitis are portal-based (portal inflammation, interface hepatitis); primary biliary cholangitis destroys small intrahepatic bile ducts", "**Ischemia** (shock, hypotension, severe anemia) → centrilobular necrosis; most drug/toxin injury (e.g. acetaminophen) and alcoholic/fatty liver also start here"],
      ["Exam slides", "Obstructive cholestasis", "Nutmeg liver, cardiac sclerosis (steatosis also starts in zone 3)"],
    ],
  },
  {
    id: "pc-pigments", title: "Pigments (lecture take-home table)",
    headers: ["Pigment", "Origin", "Appearance", "Typical site", "Exam slide"],
    rows: [
      ["Anthracotic", "Carbon", "**Black**, fine", "Lung, tracheobronchial LNs", "Anthracosis (lung; LN in review)"],
      ["Melanin", "Endogenous (melanocytes)", "**Brown-black**, uniform granules, not refractile", "Skin; nevus, melanoma", "Intradermal nevus"],
      ["Ceroid", "Lipids & proteins (injury)", "**Golden-brown**, finely granular, in macrophages", "Melanosis coli", "Melanosis coli"],
      ["Lipofuscin", "Lipids & proteins (aging)", "**Yellow-brown**, finely granular, perinuclear", "Heart, liver", "MI slide (incidental)"],
      ["Hemosiderin", "Hemoglobin", "**Golden yellow-brown, refractile**, variable size, clumped", "Marrow, spleen, liver, hemorrhage", "Hemosiderosis"],
      ["Bile pigments", "Bilirubin & biliverdin (hemoglobin)", "**Green-brown** plugs", "Liver", "Obstructive cholestasis"],
      ["Malaria pigment", "Hemozoin (hemoglobin)", "**Brown-black**, faintly birefringent, granular", "Spleen, liver, kidneys", "Malaria pigment"],
    ],
  },
  {
    id: "pc-hepatocyte", title: "Swollen / cleared hepatocytes",
    headers: ["", "Feathery degeneration", "Ballooning change", "Steatosis"],
    rows: [
      ["Cause", "Cholestasis", "Metabolic / oxidative stress (MASH/ASH, viral hepatitis)", "Lipid accumulation"],
      ["Zone", "**Zone 1 / periportal**", "**Zone 3 / centrilobular**", "Adult fatty liver: zone 3"],
      ["Cytoplasm", "Flocculent, fine irregular vacuoles (bile acids dissolve membranes)", "Reticular, cleared (severe swelling dilutes cytoplasm)", "**Clean empty droplets** (lipid washed out), large or small"],
      ["Associated", "Bile pigment", "Mallory-Denk bodies", "—"],
      ["Exam slide", "Obstructive cholestasis", "Seen on hemosiderosis slide", "Steatosis"],
    ],
  },
  {
    id: "pc-fungi", title: "Fungi (Quick Reference Handbook table from lecture)",
    headers: ["Organism", "Nickname", "Morphology", "Branching", "Exam slide"],
    rows: [
      ["Mucor", "'Wide ribbons'", "**Wide 6–50 µm**, infrequent/absent septa", "**Wide-angle, up to 90°**", "Spleen (+ caseating granulomas)"],
      ["Aspergillus", "'Sling shots' (Y)", "**Thin 2–5 µm, septate**", "**Narrow-angle 45°**", "Lung (+ fibrosis, anthracosis)"],
      ["Candida", "'Sausage links & yeast'", "3–5 µm budding yeasts + 5–10 µm pseudohyphae", "Little branching", "Esophagus"],
      ["Cryptococcus", "—", "5–10 µm yeasts, **thick refractile capsule**", "Narrow-based budding", "Lung"],
      ["Pneumocystis", "—", "Cysts invisible on H&E; **foamy alveolar exudate**", "—", "Lung"],
      ["Actinomyces (bacterium)", "Sulfur granule", "Basophilic colonies + eosinophilic clubs", "Filamentous", "Ovary"],
    ],
  },
  {
    id: "pc-necrosis", title: "Necrosis patterns (lecture take-home)",
    headers: ["Type", "Gross", "Micro", "Cause", "Exam slides"],
    rows: [
      ["Coagulative 凝固性", "Firm", "**Ghost cells**", "Ischemia", "ATN, NEC, renal infarct, MI"],
      ["Liquefactive 液化性", "Dissolved tissue", "**Tissue loss**, gitter cells", "Infection, CNS ischemia", "Encephalomalacia"],
      ["Caseous 乾酪性", "Cheese-like", "**Amorphous granular debris** in granuloma", "Tuberculosis", "Caseating granulomatous inflammation; mucormycosis"],
      ["Fat 脂肪", "Chalky-white", "**Necrotic fat cells + basophilic calcium**", "Trauma, pancreatitis", "Fat necrosis; suture granuloma (subcutis)"],
      ["Fibrinous necrosis / inflammation", "Shaggy 'bread-and-butter' surface", "Eosinophilic fibrin (+ inflammatory cells) on serosa / ulcer base", "Acute inflammation", "Chronic ulcer (fibrinous necrosis); appendicitis & ulcer serosa (fibrinous inflammation)"],
    ],
  },
  {
    id: "pc-atn-infarct", title: "ATN vs infarct (kidney)",
    headers: ["", "Acute tubular necrosis", "Infarct"],
    rows: [
      ["Pattern", "Coagulative necrosis of renal tubules", "Localised, usually **wedge-shaped** coagulative necrosis"],
      ["Glomeruli", "Usually **unremarkable**", "Usually **affected**"],
      ["Rule", "No definite evidence of infarction → ATN", "Look for wedge shape and thrombosis"],
      ["Exam slides", "PA0097 (77)", "PA0096 (76) — infarct + ATN"],
    ],
  },
  {
    id: "pc-viral", title: "Viral cytopathic effects",
    headers: ["Virus", "Change", "Exam slide"],
    rows: [
      ["HPV", "**Koilocytosis**: perinuclear halo, enlarged hyperchromatic raisin-like nuclei", "Condyloma acuminatum"],
      ["Poxvirus", "**Molluscum bodies**: large intracytoplasmic inclusions, eosinophilic (granular layer) → pale blue (corneal layer)", "Molluscum contagiosum"],
      ["CMV", "**Owl's eye** intranuclear + small cytoplasmic basophilic inclusions, cytomegaly", "CMV nephritis"],
      ["Herpes (HSV/VZV)", "**3 M** (multinucleation, molding, margination) + Cowdry A", "Herpes virus infection"],
    ],
  },
  {
    id: "pc-liver", title: "Liver exam slides side by side",
    headers: ["Diagnosis", "Where", "Key finding"],
    rows: [
      ["Steatosis", "Hepatocytes (zone 3 first)", "**Empty lipid droplets**, nucleus pushed aside"],
      ["Hemosiderosis", "Hepatocytes > macrophages", "**Golden yellow-brown refractile** clumps"],
      ["Malaria pigment", "Macrophages & hepatocytes", "**Brown-black** granules, sinusoid dilatation"],
      ["Obstructive cholestasis", "Hepatocytes, canaliculi, portal tracts", "**Green-brown bile** + pericholangitis triad + feathery degeneration"],
      ["Nutmeg liver", "Zone 3", "**Congestion** (± focal necrosis)"],
      ["Cardiac sclerosis", "Zone 3", "Congestion + **centrilobular fibrosis**"],
    ],
  },
];

// ── Micro II & III exam lists (考試範圍(二) #27, 考試範圍(三) #32) — list entries only, content to be added ──
// [slide no., category, organ, diagnosis, detail as written on the list]
const PATH_LIST_23 = [
  ["PA0030 (25)", "m2-immuno", "Lung", "Amyloidoma"],
  ["PA0284 (69)", "m2-immuno", "Kidney", "Chronic rejection"],
  ["PA0061 (43)", "m2-immuno", "Liver", "Acute cellular rejection", "49F"],
  ["PA0264 (193)", "m2-immuno", "Nasal mucosa", "Allergic rhinitis", "organ not written on the list"],
  ["PA0289 (68)", "m2-child", "Kidney", "Nephroblastoma (Wilms tumor)", "written as PA00289 on the list"],
  ["PA0305 (107)", "m2-child", "Adrenal gland", "Neuroblastoma"],
  ["PA0247 (142)", "m2-child", "Eye", "Retinoblastoma"],
  ["PA0341 (146)", "m2-child", "Lung", "Hyaline membrane disease"],
  ["PA0047 (32)", "m2-epi", "Esophagus", "Squamous cell carcinoma"],
  ["PA0337 (82)", "m2-epi", "Uterine cervix", "High-grade squamous intraepithelial lesion (HSIL), CIN 2", "online slide only (線上片)"],
  ["PA0338 (96)", "m2-epi", "Uterine cervix", "High-grade squamous intraepithelial lesion (HSIL), CIN 3"],
  ["PA0102 (83)", "m2-epi", "Uterine cervix", "Squamous cell carcinoma"],
  ["PA0295 (118)", "m2-epi", "Skin", "Basal cell carcinoma"],
  ["PA0260 (190)", "m2-epi", "Nasopharynx", "Nasopharyngeal carcinoma"],
  ["PA0207 (151)", "m2-epi", "Large intestine", "Familial adenomatous polyposis"],
  ["PA0249 (38)", "m2-epi", "Colon", "Adenocarcinoma"],
  ["PA0104 (85)", "m2-nonepi", "Uterus", "Leiomyoma"],
  ["PA0158 (135)", "m2-nonepi", "Soft tissue (near T-level vertebra)", "Schwannoma"],
  ["PA0195 (134)", "m2-nonepi", "Cheek", "Neurofibroma, plexiform and diffuse"],
  ["PA0314 (197)", "m2-nonepi", "Skin", "Hemangioma"],
  ["PA0336 (132)", "m2-nonepi", "Pericardial soft tissue", "Lymphangioma", "added in Section review (2.1)"],
  ["PA0226 (167)", "m2-nonepi", "Soft tissue", "Embryonal rhabdomyosarcoma"],
  ["PA0100 (81)", "m2-nonepi", "Vulva", "Malignant melanoma"],
  ["PA0285 (88)", "m2-nonepi", "Ovary", "Mature cystic teratoma"],
  ["PA0002 (5)", "m2-cv", "Heart, left atrium", "Cardiac myxoma"],
  ["PA0340 (2)", "m2-cv", "Carotid artery", "Atherosclerosis"],
  ["PA0197 (143)", "m2-cv", "Heart", "Acute rheumatic pancarditis", "organ not written on the list"],
  ["PA0171 (3)", "m2-cv", "Myocardium", "Amyloidosis"],
  ["PA0174 (19)", "m3-resp", "Lung", "Adenocarcinoma"],
  ["PA0308 (23)", "m3-resp", "Lung", "Invasive mucinous adenocarcinoma"],
  ["PA0307 (20)", "m3-resp", "Lung", "Small cell carcinoma"],
  ["PA0021 (22)", "m3-resp", "Lung", "Squamous cell carcinoma"],
  ["PA0041 (27)", "m3-resp", "Pleura", "Mesothelioma"],
  ["PA0024 (24)", "m3-resp", "Lung", "Bronchopneumonia"],
  ["PA0040 (26)", "m3-resp", "Lung", "Diffuse alveolar damage"],
  ["PA0263 (192)", "m3-resp", "Lung", "Pneumoconiosis", "organ not written on the list"],
  ["PA0067 (51)", "m3-liver", "Liver", "Focal nodular hyperplasia", "7M"],
  ["PA0071 (55)", "m3-liver", "Liver", "Hepatocellular carcinoma", "56M"],
  ["PA0184 (60)", "m3-liver", "Liver", "Cholangiocarcinoma", "74M"],
  ["PA0331 (57)", "m3-liver", "Gallbladder", "Cholesterolosis"],
  ["PA0281 (42)", "m3-liver", "Liver", "Acute hepatitis"],
  ["PA0334 (50)", "m3-liver", "Liver", "Chronic hepatitis", "72M"],
  ["PA0282 (47)", "m3-liver", "Liver", "Submassive necrosis"],
  ["PA0075 (59)", "m3-liver", "Liver", "Cirrhosis", "64M"],
  ["PA0286 (159)", "m3-liver", "Liver", "Steatohepatitis"],
  ["PA0265 (45)", "m3-liver", "Liver", "Primary biliary cholangitis", "36F"],
  ["PA0333 (52)", "m3-liver", "Liver", "Primary sclerosing cholangitis"],
  ["PA0069 (53)", "m3-liver", "Liver", "Neonatal hepatitis (giant cell hepatitis)", "4mM"],
  ["PA0311 (48)", "m3-liver", "Liver", "Biliary atresia", "8mM"],
  ["PA0078 (62)", "m3-liver", "Gallbladder", "Chronic cholecystitis", "71F"],
  ["PA0273 (28)", "m3-hn", "Bone (jaw)", "Ameloblastoma"],
  ["PA0045 (30)", "m3-hn", "Parotid gland", "Warthin tumor", "43M"],
  ["PA0046 (31)", "m3-hn", "Parotid gland", "Pleomorphic adenoma (mixed tumor)"],
  ["PA0279 (33)", "m3-gi", "Stomach (with duodenal involvement)", "Adenocarcinoma, signet-ring cell type (signet-ring cell carcinoma)"],
  ["PA0309 (34)", "m3-gi", "Stomach", "Adenocarcinoma, intestinal type", "70M"],
  ["PA0055 (36)", "m3-gi", "Ileum", "Neuroendocrine tumor (carcinoid tumor)", "74M"],
  ["PA0280 (35)", "m3-gi", "Small intestine", "Crohn disease"],
  ["PA0310 (40)", "m3-gi", "Large intestine", "Ulcerative colitis", "40F"],
  ["PA0312 (63)", "m3-gi", "Pancreas", "Chronic pancreatitis", "49M; organ not written on the list"],
  ["PA0248 (187)", "m3-gi", "Pancreas", "IgG4-related autoimmune pancreatitis", "organ not written on the list"],
];
for (const [no, cat, organ, dx, detail] of PATH_LIST_23) {
  const exam = cat.slice(0, 2);
  PATHO.push({
    id: "p-" + no.slice(0, 6).toLowerCase(), no, organ, dx, cat, exam, src: exam + "list", listOnly: true, normal: null,
    teach: `${exam === "m2" ? "Micro II" : "Micro III"} exam list${detail ? ` · ${detail}` : ""} — content not added yet.`,
    answer: { organ, dx, desc: [] }, features: [], pearls: [],
  });
}

// ── Micro II content from the microteaching lectures (filled in as lectures arrive) ──
// Each entry replaces the list-only placeholder of that slide (answers follow the lecture's 器官/診斷/描述 page).
const PATH_FILL = {
  "p-pa0030": { src: "imm", normal: "bronchus", dx: "Amyloidoma (amyloidosis)",
    answer: { organ: "Lung", dx: "Amyloidoma (or Amyloidosis)", desc: [
      "Amorphous, eosinophilic, hyaline extracellular deposits with cracking artifacts",
      "Other finding: lymphocytes & multinucleated giant cells (like a foreign-body reaction)",
    ] },
    features: [
      "Amyloid = **amorphous, eosinophilic, hyaline (glassy), extracellular** deposits — acellular, homogeneous pink",
      "Usually next to basement membranes or around vessels (perivascular deposition)",
      "When it forms a mass → **amyloidoma**",
      "On this slide: cracking artifacts in the deposits; multinucleated giant cells and lymphocytes around them",
      "Congo red stain → apple-green birefringence under polarized light",
    ],
    pearls: [
      "Misfolded proteins aggregate into fibrils → extracellular deposits damage the tissue",
      "Types: AL (immunoglobulin light chain — myeloma / plasma cell proliferation), AA (chronic inflammation), ATTR (transthyretin — hereditary or senile), Aβ (Alzheimer)",
      "Lecture DDx of 'pink stuff': fibrosis (wavy collagen with fibroblasts) · fibrinous inflammation (fibrin strands + inflammatory cells) · fibrinoid necrosis (bright pink in vessel walls with debris) · amyloid (glassy, acellular, cracking)",
    ] },
  "p-pa0264": { src: "imm", organ: "Nasal cavity", normal: "trachea",
    answer: { organ: "Nasal cavity", dx: "Allergic rhinitis", desc: [
      "Submucosal eosinophil-rich inflammatory infiltrate",
      "Submucosal edema",
      "Basement membrane thickening",
      "Other finding: squamous metaplasia",
    ] },
    features: [
      "Recognise nasal mucosa: respiratory epithelium (partly denuded) over a loose submucosa with seromucous glands",
      "Submucosal inflammatory infiltrate of lymphocytes and **many eosinophils**",
      "Submucosal edema; thickened (hyalinised) epithelial basement membrane",
      "Squamous metaplasia: polygonal keratinocytes, intercellular bridges, keratinization",
    ],
    pearls: [
      "Type I (immediate, IgE-mediated) hypersensitivity with early- and late-phase responses — eosinophils dominate the late phase",
      "Allergens: plant pollens, fungi, animal allergens, dust mites",
      "DDx chronic sinusitis (Micro I): mixed chronic inflammation without the eosinophil predominance",
    ] },
  "p-pa0061": { src: "imm", no: "PA0061 (43); PA0269 (195)", normal: "liver",
    teach: "Two slides for this case: PA0061 (43) and PA0269 (195) — bile duct injury is not obvious on PA0061; see PA0269.",
    dx: "Acute cellular rejection",
    answer: { organ: "Liver", dx: "Acute cellular rejection (acute T-cell-mediated rejection)", desc: [
      "Mixed portal inflammation (lymphocyte predominant, admixed with some neutrophils and eosinophils)",
      "Bile duct injury (bile duct epithelium damage and infiltration by inflammatory cells)",
      "Subendothelial venous inflammation (endotheliitis) (in severe cases: perivenular parenchymal necrosis)",
    ] },
    features: [
      "Approach a non-tumour liver biopsy systematically: scan for the obvious lesion, then check every portal tract (artery, vein, interlobular bile duct, mesenchyme), central venule and lobule (hepatocytes, sinusoids, zonal distribution)",
      "Portal tracts expanded by a **mixed infiltrate**: mostly activated lymphocytes, plus eosinophils (common), neutrophils, macrophages, plasma cells",
      "**Bile duct injury** (lymphocytic cholangitis): ducts infiltrated by lymphocytes; epithelium with eosinophilic or vacuolated cytoplasm and irregular nuclear arrangement",
      "**Endotheliitis** (most specific): lymphocytes under the endothelium of portal / central venules, lifting it off the basement membrane",
      "Other findings (not always): zone 3 (perivenular) necrosis, acidophil bodies (apoptotic hepatocytes)",
    ],
    pearls: [
      "Triad of acute liver rejection: portal inflammation + bile duct injury + endotheliitis",
      "Chronic rejection: ductopenia (loss of bile ducts), obliterative arteriopathy of larger portal arteries, ischemic perivenular necrosis / fibrosis",
      "General rejection pattern: acute = inflammatory cells INTO epithelium / under endothelium; chronic = atrophy, basement membrane thickening, intimal thickening / luminal obstruction",
    ] },
  "p-pa0284": { src: "imm", normal: "kidney", dx: "Chronic (active) rejection",
    teach: "Skipped in class (先pass — 忍痛割愛), but it is on the exam list; the lecture includes its photos and answer page.",
    answer: { organ: "Kidney", dx: "Chronic (active) rejection / chronic active T-cell-mediated rejection", desc: [
      "Tubulitis, tubular atrophy",
      "Interstitial inflammation, interstitial fibrosis",
      "Peritubular capillaritis, glomerulitis",
      "Endotheliitis, intimal thickening of vessels",
    ] },
    features: [
      "**Tubulitis**: lymphocytes between tubular epithelial cells",
      "**Tubular atrophy**: attenuated epithelium + thickened, wrinkled tubular basement membrane",
      "**Interstitial inflammation & fibrosis**",
      "**Endotheliitis (intimal arteritis)**: lymphocytes between the endothelium and the vessel wall; **intimal thickening** of arterioles (chronic)",
      "**Peritubular capillaritis** and **glomerulitis**: mononuclear cells within capillaries",
    ],
    pearls: [
      "Acute → chronic spectrum: tubulitis → tubular atrophy · interstitial inflammation → fibrosis · endotheliitis → intimal thickening · capillaritis / glomerulitis → basement membrane duplication / multilayering",
      "T-cell-mediated: tubulitis + interstitial inflammation (tubulointerstitial) and endotheliitis (vascular). Antibody-mediated: glomerulitis / peritubular capillaritis + C4d (immunostain)",
      "Chronic: intimal thickening with inflammation (easy on H&E); transplant glomerulopathy (basement membrane duplication — reticulin/silver stain); interstitial fibrosis and tubular atrophy are non-specific",
      "Graded with the Banff criteria (i, t, v, g, ptc, ci, cv scores)",
    ] },
  "p-pa0341": { src: "child", no: "PA0200 (146)", organ: "Lung (neonatal)", normal: "bronchus",
    teach: "Slide updated: PA0341 → PA0200 (lecture p. 8); the exam list still writes PA0341 (146).",
    answer: { organ: "Lung (neonatal)", dx: "Hyaline membrane disease", desc: [
      "Variable atelectasis and dilation of alveoli with edematous, thickened alveolar septa",
      "Hyaline membrane lining alveolar space: homogeneous eosinophilic linear material closely adherent to the alveolar surface",
      "May hemorrhage",
    ] },
    features: [
      "Neonatal lung: **immature cartilage** (cellular, small lacunae) vs adult cartilage; poorly developed alveoli",
      "Collapsed alveoli (atelectasis) next to dilated airspaces",
      "**Hyaline membranes**: homogeneous eosinophilic linear material lining alveolar ducts / alveoli — made of dead-cell cytoplasm and nucleoplasm, plasma transudate and amniotic fluid",
      "Necrotic debris in terminal bronchioles and alveolar ducts",
      "Gross: solid, airless, reddish-purple lung that resembles liver",
    ],
    pearls: [
      "Prematurity → reduced surfactant synthesis → neonatal respiratory distress syndrome (NRDS)",
      "Clinical vs pathological terms: adult ARDS ↔ diffuse alveolar damage (Micro III, PA0040); infant NRDS ↔ hyaline membrane disease",
      "Lung development: saccular phase 28–34 weeks, alveolar phase from 34 weeks",
    ] },
  "p-pa0305": { src: "child", normal: "adrenal",
    answer: { organ: "Adrenal gland", dx: "Neuroblastoma (\"poorly differentiated\" optional)", desc: [
      "Circumscribed tumor at the adrenal medulla (border & location)",
      "Nests and sheets of neuroblasts: small, round to oval cells with salt-and-pepper chromatin, scant / indiscernible cytoplasm (high N:C ratio) and vague cytoplasmic borders (arrangement & cells)",
      "Eosinophilic fibrillary material (neuropil) in the background (thin septa of S100+ schwannian stroma are hard to see — optional)",
      "Homer-Wright (pseudo) rosettes (arrangement)",
      "Extensive hemorrhage (background)",
      "Focal calcification (background)",
    ] },
    features: [
      "Low power: large, very **hemorrhagic** tumor with a pseudocapsule; compressed adrenal cortex (glomerulosa / fasciculata / reticularis) at the edge",
      "**Small round blue cells** in sheets and nests: hyperchromatic nuclei, little cytoplasm, poorly defined borders; mitoses & karyorrhexis",
      "**Neuropil**: eosinophilic fibrillary ('felt-like') background material",
      "**Homer-Wright pseudorosettes**: tumor cells surrounding neuropil (no lumen)",
      "Calcifications; necrosis",
      "Maturation (not on this slide): ganglion cells (abundant amphophilic cytoplasm, eccentric vesicular nucleus, prominent nucleolus, Nissl substance) and schwannian stroma (wavy bundles; S100+) → ganglioneuroblastoma / ganglioneuroma",
    ],
    pearls: [
      "Neural crest origin: adrenal medulla (40%), sympathetic ganglia along the midline (abdomen, posterior mediastinum)",
      "Median age 18 months; MYCN amplification, ALK — prognosis also by MKI (mitosis-karyorrhexis index; details not needed)",
      "Rosettes: Homer-Wright = around neuropil (neuroblastoma, retinoblastoma) · perivascular pseudorosettes = around a vessel (ependymoma) · Flexner-Wintersteiner = around a lumen (retinoblastoma)",
      "'-blastoma' = small round blue cell tumors of childhood — use the site and age (neuroblastoma, retinoblastoma, Wilms tumor)",
    ] },
  "p-pa0247": { src: "child", normal: "retina",
    answer: { organ: "Eye", dx: "Retinoblastoma", desc: [
      "Small round blue cells arising from the retina (growing into the vitreous cavity without choroidal invasion — for staging)",
      "Flexner-Wintersteiner rosettes (rosettes of tumor cells surrounding a central lumen)",
      "Fleurettes (photoreceptor differentiation)",
      "Necrosis",
    ] },
    features: [
      "Recognise the eye: globe with sclera, choroid, retina and lens; normal retinal layers (inner limiting membrane → nerve fibre, ganglion cell, plexiform and nuclear layers → rods & cones → retinal pigment epithelium)",
      "Tumor arises from the retina and fills the vitreous: sheets of **small round blue cells** (little cytoplasm, hyperchromatic nuclei)",
      "**Flexner-Wintersteiner rosettes**: tumor cells around a central lumen (retinal differentiation)",
      "**Fleurettes**: bouquet-like eosinophilic aggregates (photoreceptor differentiation)",
      "Necrosis and calcification; Homer-Wright rosettes are uncommon",
    ],
    pearls: [
      "RB gene, 'two-hit' hypothesis: inherited = germline + somatic hit (often bilateral, younger); sporadic = two somatic hits (usually unilateral)",
      "Average age at diagnosis 24 months",
      "Choroidal / optic nerve invasion matters for staging",
      "Poorly differentiated areas: diffuse sheets without rosettes, prominent mitoses and apoptosis",
    ] },
  "p-pa0289": { src: "child", normal: "kidney", dx: "Nephroblastoma (Wilms tumor)",
    teach: "The lecture writes 'soft tissue (kidney)' — in year 10 both kidney and soft tissue scored 2.",
    answer: { organ: "Kidney", dx: "Nephroblastoma (or Wilms tumor)", desc: [
      "Triphasic pattern: (1) blastemal component — sheets of small round blue cells; (2) epithelial component — epithelial cells forming tubular, glomerular or papillary structures",
      "Stromal component: spindle cells in a fibromyxoid background (may have heterologous elements — not on this slide)",
      "Anaplasia (not on this slide)",
      "Necrosis",
      "Hemorrhage",
    ] },
    features: [
      "**Triphasic pattern** (mirrors nephrogenesis): blastema + epithelium + stroma",
      "Blastema: sheets of small round blue cells with frequent mitoses",
      "Epithelial component: **abortive tubules**, papillary and **glomeruloid** structures",
      "Stroma: myxoid to fibrous spindle-cell stroma; heterologous elements possible (cartilage, skeletal muscle)",
      "**Anaplasia** (5%, poor prognosis): large, hyperchromatic, pleomorphic nuclei and atypical (e.g. tripolar) mitoses",
      "Necrosis and hemorrhage",
    ],
    pearls: [
      "Peak age 2–5 years; 5–10% bilateral (germline mutation)",
      "Syndromes: WAGR, Denys-Drash, Beckwith-Wiedemann; genes WT1, WT2, CTNNB1, DICER1",
      "考古: Micro 2 in years 10 and 11 — description graded by component (epithelial 2–6, blastemal 2–6, stromal 2–4)",
    ] },
};
for (const [id, c] of Object.entries(PATH_FILL)) {
  const p = PATHO.find(x => x.id === id);
  Object.assign(p, c);
  p.teach = c.teach || "";
  delete p.listOnly;
}

// ── Micro II: Epithelial tumor (1)(2)(3) ──
const PATH_FILL_2 = {
  "p-pa0047": { src: "et1", normal: "esophagus",
    answer: { organ: "Esophagus", dx: "Squamous cell carcinoma", desc: [
      "The tumor cells have pleomorphic hyperchromatic nuclei and prominent nucleoli, arranged in solid sheets & nests (cells & arrangement)",
      "The tumor cells are polygonal, with abundant eosinophilic cytoplasm, keratinization and intercellular bridges (differentiation)",
      "Invasion to the lamina propria, muscularis mucosae & submucosa (extent of invasion)",
      "Desmoplastic stromal reaction (affected background)",
      "Squamous dysplasia also present (precursor in the background)",
    ] },
    features: [
      "Recognise esophagus: non-keratinizing stratified squamous mucosa, muscularis mucosae, submucosa with glands",
      "Solid nests and sheets of tumor cells infiltrating the lamina propria and the smooth muscle of the muscularis mucosae",
      "Pleomorphic hyperchromatic nuclei, prominent nucleoli, occasional multinucleated tumor giant cells, mitoses",
      "**Squamous differentiation**: polygonal cells, abundant eosinophilic cytoplasm, keratinization, **keratin pearls**, **intercellular bridges**",
      "Stromal desmoplasia (fibrosis + inflammation); adjacent **squamous dysplasia** (malignant but not yet invasive — border may be hard to define)",
    ],
    pearls: [
      "Lecture approach to a neoplasm: ① border (invasive? in situ?) ② cytologic atypia ③ architecture ④ cell lineage (normal counterpart) ⑤ stroma — then grade & stage",
      "Carcinoma = cohesive cells with distinct borders and abundant cytoplasm; SCC → keratinization + intercellular bridges; adenocarcinoma → glands ± intracellular mucin",
      "考古: SCC was tested in Micro 2 as cervix (10) and skin (11)",
    ] },
  "p-pa0338": { src: "et1", normal: "cervix", teach: "Teaching slide PA0101 (HSIL, cervix). Exam list: PA0337 (CIN 2, online slide only) and PA0338 (96) (CIN 3).",
    answer: { organ: "Uterine cervix", dx: "High-grade squamous intraepithelial lesion (HSIL)", desc: [
      "Atypical squamous cells with nuclear enlargement, hyperchromasia, coarse chromatin, increased N/C ratio, pleomorphism and increased mitosis, expanding to the upper 2/3 of the epithelium / the full thickness of the epithelium",
      "Endocervical glandular involvement",
      "No stromal invasion",
    ] },
    features: [
      "Recognise cervix: ectocervix (squamous epithelium), endocervix (mucinous glandular epithelium), cervical stroma; inked margin; ± Nabothian cysts (dilated endocervical glands — benign)",
      "**Loss of maturation**: immature-appearing atypical squamous cells reach the upper 2/3 (CIN 2–3) or full thickness (CIN 3)",
      "Nuclear enlargement, hyperchromasia, high N:C ratio, pleomorphism; mitoses high in the epithelium",
      "**Endocervical glandular involvement** — HSIL filling glands with smooth, round outlines; NOT invasion",
      "Border: basement membrane intact, no stromal invasion",
    ],
    pearls: [
      "Progression: LSIL (CIN 1, low-grade dysplasia) → HSIL (CIN 2–3, high-grade / in situ) → invasive SCC (dysplasia + stromal invasion)",
      "CIN 1 vs condyloma: both HPV; CIN 1 = high-risk types (16, 18, 52, 58), flat, precancerous; condyloma = low-risk types (6, 11), cauliflower-like, benign",
      "DDx invasive SCC: angulated irregular nests with desmoplasia vs smooth rounded gland involvement",
    ] },
  "p-pa0337": { src: "et1", normal: "cervix", teach: "Teaching slide PA0101 (HSIL, cervix). Exam list: PA0337 (CIN 2, online slide only) and PA0338 (96) (CIN 3).",
    answer: { organ: "Uterine cervix", dx: "High-grade squamous intraepithelial lesion (HSIL)", desc: [
      "Atypical squamous cells with nuclear enlargement, hyperchromasia, coarse chromatin, increased N/C ratio, pleomorphism and increased mitosis, expanding to the upper 2/3 of the epithelium / the full thickness of the epithelium",
      "Endocervical glandular involvement",
      "No stromal invasion",
    ] },
    features: [
      "Recognise cervix: ectocervix (squamous epithelium), endocervix (mucinous glandular epithelium), cervical stroma; inked margin; ± Nabothian cysts (dilated endocervical glands — benign)",
      "**Loss of maturation**: immature-appearing atypical squamous cells reach the upper 2/3 (CIN 2–3) or full thickness (CIN 3)",
      "Nuclear enlargement, hyperchromasia, high N:C ratio, pleomorphism; mitoses high in the epithelium",
      "**Endocervical glandular involvement** — HSIL filling glands with smooth, round outlines; NOT invasion",
      "Border: basement membrane intact, no stromal invasion",
    ],
    pearls: [
      "Progression: LSIL (CIN 1, low-grade dysplasia) → HSIL (CIN 2–3, high-grade / in situ) → invasive SCC (dysplasia + stromal invasion)",
      "CIN 1 vs condyloma: both HPV; CIN 1 = high-risk types (16, 18, 52, 58), flat, precancerous; condyloma = low-risk types (6, 11), cauliflower-like, benign",
      "DDx invasive SCC: angulated irregular nests with desmoplasia vs smooth rounded gland involvement",
    ] },
  "p-pa0102": { src: "et1", normal: "cervix",
    answer: { organ: "Uterine cervix", dx: "Squamous cell carcinoma", desc: [
      "Infiltrative, angulated, irregular solid nests of tumor cells with stromal desmoplasia (border, arrangement, background)",
      "Tumor cells show pleomorphic hyperchromatic nuclei, increased mitosis, and squamous differentiation: polygonal shape, abundant eosinophilic cytoplasm, keratinization and intercellular bridges (cells, differentiation)",
      "Other finding: acute and chronic inflammation with multinucleated giant cells (bystander, not always present)",
    ] },
    features: [
      "Orientation: mucosal surface, ectocervix / endocervix, inked margin",
      "**Stromal invasion**: angulated, irregular nests, anastomosing cords and tongue-like protrusions into the stroma; ± adjacent HSIL",
      "Pleomorphic hyperchromatic nuclei, prominent nucleoli, multinucleated tumor giant cells, mitoses, apoptosis",
      "Squamous differentiation: polygonal cells, abundant eosinophilic cytoplasm, keratinization, intercellular bridges",
      "Stromal desmoplasia (fibrosis + inflammation); foreign-body giant cells (likely prior surgery)",
    ],
    pearls: [
      "考古 year 10 Micro 2: SCC 5/5 but HSIL only 3/5 — look for stromal invasion before calling HSIL",
      "Grading aspects (year 10): cytology of HSIL/SCC + architecture of HSIL 2–6 · architecture of SCC 2 · border/stroma of SCC 2–4",
    ] },
  "p-pa0295": { src: "et2", normal: "skin", teach: "Basal cell carcinoma, skin, 69M.",
    answer: { organ: "Skin", dx: "Basal cell carcinoma (nodular and superficial features)", desc: [
      "Epidermal tumor with dermal invasion",
      "Atypical basaloid tumor cells with elongated hyperchromatic nuclei, arranged in large nests / rounded small nests / irregular jagged nests and cords with peripheral palisading and clefting",
      "Increased mitosis and apoptosis",
      "Mucinous / fibromyxoid stroma",
      "Solar elastosis (background)",
      "Perineural invasion (not on this slide)",
    ] },
    features: [
      "Low power: dark-staining tumor arising from the epidermis and invading the dermis",
      "**Basaloid cells** (scant cytoplasm, high N:C ratio — like basal keratinocytes) in nests, islands and cords",
      "**Peripheral palisading** of nuclei at the edge of the nests; **clefts** (retraction artifact between nests and stroma)",
      "Nuclear hyperchromasia, increased mitoses and apoptosis; may contain melanin",
      "Mucinous / fibromyxoid stroma; **solar elastosis** (blue-grey degenerated elastic fibres in sun-damaged dermis)",
    ],
    pearls: [
      "Most common human malignancy; UV exposure; PTCH1 (Hedgehog) and TP53 mutations",
      "BCC vs SCC: basaloid cells, scant cytoplasm, palisading, less pleomorphism, mucinous stroma with retraction vs SCC's polygonal cells, keratinization, bridges, more pleomorphism, desmoplasia with inflammation",
    ] },
  "p-pa0260": { src: "et2", normal: "tonsil-pharyngeal",
    answer: { organ: "Nasopharynx", dx: "Nasopharyngeal carcinoma (NPC)", desc: [
      "Infiltrative growth",
      "Sheets of tumor cells mixed with abundant lymphocytes",
      "Tumor cells: (1) oval nuclei, prominent nucleoli, vesicular chromatin; (2) indistinct cell borders imparting a syncytial appearance",
    ] },
    features: [
      "Recognise nasopharynx: **respiratory epithelium + lymphoid stroma** ± minor salivary glands",
      "Infiltrative sheets / nests of large tumor cells **mixed with abundant lymphocytes**",
      "Large oval vesicular nuclei with prominent nucleoli; scant amphophilic-eosinophilic cytoplasm",
      "**Indistinct cell borders → syncytial appearance**, crowded / overlapping nuclei; may be spindly",
      "No keratinization — squamous differentiation is proven by immunostains; diagnosis rests on site + cytology + lymphocytes",
    ],
    pearls: [
      "Strong association with EBV; heredity, age and EBV; common in Southeast Asia (Taiwan)",
      "Types: non-keratinizing SCC (undifferentiated — most common, the teaching case; differentiated), keratinizing SCC, basaloid SCC",
      "考古: year 11 Micro 3 (organ 'respiratory tract with respiratory epithelium' still 2/2); year 10 Micro 2 make-up exam",
    ] },
  "p-pa0207": { src: "et2", normal: "colon",
    dx: "Familial adenomatous polyposis (multiple tubular adenomas)",
    answer: { organ: "Large intestine OR colon", dx: "Multiple adenomas, compatible with familial adenomatous polyposis / Tubular adenoma, multiple", desc: [
      "Multiple polypoid lesions",
      "Atypical tall columnar cells with nuclear hyperchromasia, elongation, and stratification, arranged in tubules",
      "No stromal invasion",
    ] },
    features: [
      "Multiple polypoid lesions; also tiny **monocryptic / oligocryptic adenomas** (single dysplastic crypts) in FAP",
      "**Abrupt transition** from normal mucosa to adenoma; no stromal invasion (lamina propria between the neoplastic glands, no stromal reaction)",
      "Tubular structures lined by tall columnar cells with **nuclear hyperchromasia, elongation, (pseudo)stratification**; goblet cell depletion",
      "High-grade dysplasia (write it if present): cribriform / complex crowded glands, loss of polarity, markedly enlarged nuclei with prominent nucleoli, atypical mitoses, intraluminal necrosis",
    ],
    pearls: [
      "FAP: autosomal dominant APC mutation → ≥100 colorectal adenomas from the teens; carcinoma develops in 100% if untreated",
      "Tubular adenoma = villous part <25%; tubulovillous 25–75%; villous >75%. A tubular adenoma by definition has at least low-grade dysplasia",
    ] },
  "p-pa0249": { src: "et2", normal: "colon",
    answer: { organ: "Colon OR large intestine", dx: "Adenocarcinoma", desc: [
      "Atypical tall columnar cells arranged in a complex glandular pattern",
      "Nuclear hyperchromasia, elongation, and stratification",
      "Prominent nucleoli",
      "Stromal desmoplasia",
      "Dirty necrosis",
      "Stromal invasion (to the lamina propria, muscularis mucosae, submucosa and muscularis propria)",
    ] },
    features: [
      "Infiltrative glands breaking through the muscularis mucosae into the submucosa and muscularis propria",
      "Complex, irregular, compact glands or cribriform pattern; poorer differentiation → solid sheets / nests",
      "Tall columnar cells, eosinophilic cytoplasm, hyperchromatic elongated stratified nuclei, prominent nucleoli",
      "**Dirty necrosis**: necrotic debris inside the gland lumina",
      "**Stromal desmoplasia** (fibrosis + inflammation); ± ulceration / perforation",
    ],
    pearls: [
      "Grade by gland formation: well >95%, moderately 50–95%, poorly <50%",
      "Pathways: APC/β-catenin (adenoma–carcinoma sequence) and MSI",
      "考古: Micro 2 in years 10 & 11. Year-10 grading: 'Stomach' as organ = 0; 'Adenocarcinoma, intestinal type' credited (though wrong)",
    ] },
  "p-pa0309": { src: "et3", no: "PA0049 (34)", organ: "Stomach", normal: "stomach-fundic",
    teach: "The lecture labels this slide PA0049 (34); the exam list writes PA0309 (34) — search finds both.",
    answer: { organ: "Stomach", dx: "Adenocarcinoma, intestinal type", desc: [
      "Infiltrative growth, stromal invasion (penetrates into the subserosal tissue)",
      "Irregular glands with focal compact arrangement",
      "Flattened, cuboidal to columnar tumor cells with eosinophilic cytoplasm and intracellular mucin",
      "Cytologic atypia: nuclear hyperchromasia, occasional prominent nucleoli",
      "Stromal desmoplasia",
      "Intestinal metaplasia and dysplasia",
      "Lymphovascular invasion, perineural invasion (may not be found)",
    ] },
    features: [
      "Background gastric mucosa with **intestinal metaplasia** (goblet cells) and **dysplasia**",
      "Irregular, cohesive glands (tubular, slit-like or dilated; complex or cribriform) infiltrating submucosa → muscularis propria → subserosa",
      "Flattened, cuboidal to columnar cells, eosinophilic cytoplasm, apical / intracellular mucin; atypia not always obvious",
      "Stromal desmoplasia; ± extracellular mucin, papillary areas, ulceration",
      "Lymphovascular and perineural invasion",
    ],
    pearls: [
      "Intestinal type looks like colon cancer: cohesive glands, columnar cells, elongated nuclei, apical/luminal mucin; Wnt/APC pathway; mass-forming",
      "Sequence: normal mucosa → intestinal metaplasia → dysplasia → adenocarcinoma; H. pylori, diet",
      "考古 Micro 2 year 10: 'Adenocarcinoma' alone 2/5 for the diffuse type — always state the type",
    ] },
  "p-pa0279": { src: "et3", normal: "gd-junction",
    answer: { organ: "Stomach (with duodenal involvement)", dx: "Adenocarcinoma, diffuse/signet-ring cell type (signet-ring cell carcinoma)", desc: [
      "Infiltrative growth, stromal invasion (deep into the muscularis propria)",
      "Small clusters or single discohesive cells with signet-ring features (voluminous intracellular mucin + pushed-aside nuclei)",
      "Mild cytologic atypia: nuclear hyperchromasia",
      "Stromal desmoplasia",
    ] },
    features: [
      "Orientation: gastric mucosa → pyloric sphincter (thick muscle) → duodenum with submucosal **Brunner glands** (orderly — not intestinal metaplasia)",
      "**Discohesive** single cells and small clusters infiltrating the lamina propria, submucosa and muscularis propria",
      "**Signet-ring cells**: a clear globoid droplet of intracytoplasmic mucin pushing the nucleus to the side (not every cell)",
      "Atypia can be subtle — mild hyperchromasia; extracellular mucin; stromal desmoplasia (may be absent in intramucosal carcinoma)",
    ],
    pearls: [
      "Diffuse type: CDH1 (E-cadherin) mutation → loss of cohesion; diffuse infiltration with wall thickening",
      "Intestinal vs diffuse: glands/columnar/elongated nucleus/apical mucin vs single cells/round/pushed-aside nucleus/voluminous intracellular mucin",
      "考古 Micro 2 years 10 & 11: 'Adenocarcinoma, diffuse type' or 'signet-ring cell carcinoma' 5/5; 'Adenocarcinoma' alone 2/5",
    ] },
  "p-pa0055": { src: "et3", organ: "Small intestine (ileum)", normal: "ileum",
    answer: { organ: "Small intestine", dx: "Neuroendocrine tumor", desc: [
      "Infiltrative growth, stromal invasion (deep into the subserosa)",
      "Uniform cells with pink cytoplasm, round to oval nuclei, \"salt and pepper\" chromatin",
      "Islands, nests, trabeculae, glands",
    ] },
    features: [
      "Recognise small intestine: villi with goblet cells and Paneth cells; mucosa / submucosa / muscularis propria / serosa",
      "Tumor infiltrating the submucosa, muscularis propria and subserosa (may look circumscribed when small)",
      "**Islands, nests, trabeculae, glands** of **uniform, monomorphic** cells with ample pink cytoplasm",
      "Round to oval nuclei with **salt-and-pepper chromatin** (fine + coarse granules — neuroendocrine differentiation)",
      "Focal calcification; non-specific stroma",
    ],
    pearls: [
      "Old name: carcinoid tumor. Well-differentiated NET G1 (<2 mitoses/10 HPF, Ki-67 ≤2%), G2 (2–20 / 3–20%), G3 (>20); poorly differentiated = NEC (small / large cell)",
      "Sites: GI tract most common (rectum > small intestine, colon, stomach), then lung, then pancreas",
      "考古 Micro 3: pancreas (10) and duodenum (11) — organ changed",
    ] },
};
// Section review (2.1) moved these three from the Micro III list into Micro II · Epithelial tumor.
for (const id of ["p-pa0309", "p-pa0279", "p-pa0055"]) Object.assign(PATH_FILL_2[id], { exam: "m2", cat: "m2-epi" });
for (const [id, c] of Object.entries(PATH_FILL_2)) { const p = PATHO.find(x => x.id === id); Object.assign(p, c); p.teach = c.teach || ""; delete p.listOnly; }

// ── Micro II: Non-epithelial tumor (1)(2) and Cardiovascular system ──
const PATH_FILL_3 = {
  "p-pa0104": { src: "ne1", organ: "Uterine corpus", normal: "uterus",
    answer: { organ: "Uterine corpus", dx: "Leiomyoma", desc: [
      "A well-circumscribed tumor composed of uniform spindle cells arranged in intersecting fascicles",
      "Tumor cells with cigar-shaped nuclei and eosinophilic cytoplasm",
      "No cytologic atypia",
    ] },
    features: [
      "Low power: well-circumscribed tumor in the myometrium (endometrium at the edge)",
      "Orderly **intersecting / interlacing fascicles** of uniform spindle cells",
      "**Cigar-shaped** (blunt-ended, elongated) nuclei; bipolar eosinophilic, sometimes **vacuolated** cytoplasm",
      "No atypia, very low mitotic activity (<10 per 10 HPF still acceptable in the uterus), no tumor necrosis",
      "Large tumors: degenerative changes — hyalinization, myxoid / hydropic change, fibrosis, calcification",
    ],
    pearls: [
      "Lecture approach to a mesenchymal neoplasm: ① border (circumscribed vs infiltrative) ② cytology (spindle / round / small round blue; uniform vs pleomorphic; atypia) ③ architecture (fascicles, whorls, storiform, palisading) ④ cell lineage (look-alike) ⑤ stroma (myxoid, collagenous, vessels, inflammation)",
      "Benign smooth muscle tumor: uterus (corpus, cervix, ligaments), skin, soft tissue, GI tract. Gross: firm, grey-white, whorled cut surface, single or multiple",
      "Leiomyoma vs schwannoma: palisading rare vs common; fascicles short, intersecting at right angles vs longer; nuclei blunt-ended vs wavy and tapering; cytoplasm eosinophilic-fibrillary vs pale with indistinct borders",
    ] },
  "p-pa0158": { src: "ne1", normal: null,
    answer: { organ: "Soft tissue", dx: "Schwannoma", desc: [
      "Well-circumscribed / encapsulated tumor",
      "Uniform spindle cells with wavy nuclei",
      "Hypercellular (compact) areas with intersecting fascicles and whorling of spindle cells and nuclear palisading, forming Verocay bodies (Antoni A)",
      "Hypocellular areas with myxoid stroma (Antoni B)",
      "May have hyalinized vessels",
      "May have lymphoid aggregates at the periphery",
      "May have degenerative changes: scattered bizarre nuclei, cystic change, xanthomatous change",
    ] },
    features: [
      "Well-circumscribed, usually **encapsulated**",
      "**Antoni A**: hypercellular, intersecting fascicles, whorls, **nuclear palisading** around nuclear-free zones = **Verocay bodies**",
      "**Antoni B**: hypocellular, loose cobweb-like network in **myxoid stroma**, lipid-laden histiocytes, thick-walled **hyalinized vessels**",
      "Uniform spindle cells with **wavy, tapered** nuclei and pale cytoplasm without discernible cell borders; no atypia",
      "Degenerative ('ancient') changes: scattered bizarre nuclei with low mitoses; lymphoid cuff at the periphery (especially in the GI tract)",
    ],
    pearls: [
      "Benign nerve-sheath tumor of Schwann cells; sporadic (90%) or NF2 / schwannomatosis; sites: head & neck, limbs, retroperitoneum, posterior mediastinum, CN VIII",
      "Variants (supplement): cellular, plexiform, microcystic/reticular schwannoma",
      "考古 year 11 Micro 2 (full marks): circumscribed · Antoni A · Antoni B · no atypia · wavy nuclei · hyalinized vessels",
    ] },
  "p-pa0195": { src: "ne1", dx: "Neurofibroma, plexiform and diffuse type", organ: "Soft tissue (cheek)", normal: "skin",
    answer: { organ: "Soft tissue", dx: "Neurofibroma, plexiform and diffuse type (the type — localized / plexiform / diffuse — must be written in the diagnosis or description)", desc: [
      "Infiltrative (diffuse type) or multinodular growth / bag-of-worms appearance (plexiform type)",
      "Bland spindle cells with wavy, tapering nuclei",
      "Myxoid to collagenous stroma",
      "Shredded-carrot-like collagen fibers",
      "No cytologic atypia",
      "May have entrapped nerves",
      "May have mast cell infiltration",
    ] },
    features: [
      "Two patterns on this slide: **plexiform** (expanded nerve bundles → multinodular 'bag of worms') and **diffuse** (infiltrating fat and dermis around entrapped nerves)",
      "Unencapsulated; loosely arranged **bland spindle cells** with thin, wavy or comma-shaped nuclei — smaller than schwannoma cells",
      "**Myxoid to collagenous stroma** with **'shredded carrot'** collagen",
      "**Mast cells**; entrapped nerves; ± pseudo-Meissnerian corpuscles (not on this slide)",
    ],
    pearls: [
      "Neoplastic Schwann cells + perineurial-like cells, fibroblasts, mast cells and residual axons — more varied than a schwannoma",
      "Localized (single = sporadic; multiple = NF1) · diffuse (large plaque, NF1) · plexiform (NF1-associated)",
      "Schwannoma vs neurofibroma: encapsulated, Antoni A/B, Verocay bodies, hyalinized vessels vs unencapsulated, loose, shredded-carrot collagen, mast cells, entrapped nerves",
      "考古 year 10 Micro 2 (organ changed to skin): cytology 2–6 · architecture/cellularity 2–4 · stroma 2–4 · border 2; type not required",
    ] },
  "p-pa0314": { src: "ne1", normal: "skin",
    teach: "The slide photos (pp. 69–75) carry no slide number, but are the hemangioma case of this lecture.",
    answer: { organ: "Skin", dx: "Hemangioma", desc: [
      "Polypoid lesion composed of variably sized vessels arranged in a vaguely lobular pattern with a circumscribed border",
      "Closely packed thin-walled capillaries and dilated irregular vascular spaces",
      "Endothelial cells are uniform, flat, single-layered, without cytologic atypia",
    ] },
    features: [
      "Polypoid skin lesion with a **circumscribed** border and vague **lobulation**",
      "Mixed small and large vessels: closely packed **capillaries** + dilated, irregular (cavernous) spaces filled with blood",
      "**Single layer** of flat, uniform endothelial cells, no atypia, low mitotic activity",
      "Fibrous tissue around vessels, mild lymphocytes; cavernous lesions may thrombose, organize or calcify",
    ],
    pearls: [
      "Benign proliferation of blood vessels (HIF1α, VEGF, PI3K/Akt); skin, liver, soft tissue; capillary vs cavernous",
      "Hemangioma vs angiosarcoma: circumscribed vs infiltrative / dissecting · well-formed vs poorly formed vessels · single-layered vs multilayered endothelium · uniform vs pleomorphic · low vs high mitoses",
    ] },
  "p-pa0336": { src: "ne1", organ: "Soft tissue (pericardial)", normal: null,
    teach: "The lecture shows a similar case (S2249365, mediastinum) — no photos of PA0336 itself.",
    answer: { organ: "Soft tissue (pericardial)", dx: "Lymphangioma", desc: [
      "Aggregation of lymphatic channels with bland-looking endothelial lining",
      "Amorphous lymph (proteinaceous fluid) in some spaces, containing lymphocytes and sometimes erythrocytes",
      "Lymphocytic aggregates",
    ] },
    features: [
      "Dilated, thin-walled **lymphatic channels** lined by a single layer of bland flat endothelium",
      "Lumens contain pale pink **proteinaceous lymph** with lymphocytes (few red cells — unlike a hemangioma)",
      "**Lymphoid aggregates** in the walls / stroma",
    ],
    pearls: [
      "Benign vascular tumor of dilated lymphatics — developmental malformation (congenital / early), PIK3CA mutations; skin, head & neck, limbs, mediastinum, GI",
      "Lymphangioma vs hemangioma: lymph + lymphocytes vs blood-filled spaces",
    ] },
  "p-pa0226": { src: "ne2", normal: null,
    answer: { organ: "Soft tissue", dx: "Embryonal rhabdomyosarcoma", desc: [
      "(Infiltrative tumor border — cannot be assessed on this slide)",
      "Hypercellular & hypocellular areas, higher cellularity around blood vessels",
      "Primitive spindle and round to stellate cells with eosinophilic cytoplasm, eccentric nuclei, and cross striation",
      "Myxoid stroma",
    ] },
    features: [
      "**Alternating hypercellular and hypocellular areas**; cells condense around vessels",
      "**Myxoid stroma**",
      "Primitive spindle, round and stellate cells; **rhabdomyoblasts** with eosinophilic cytoplasm, eccentric nuclei and ± **cross-striations** (tadpole, strap, spider cells)",
      "Supplement (not this slide): botryoid type — polypoid nodules with a dense **cambium layer** under the epithelium; anaplasia; cartilage (DICER1 syndrome)",
    ],
    pearls: [
      "Most common childhood sarcoma; ERMS = 60–70% of rhabdomyosarcomas (others: alveolar, pleomorphic, spindle/sclerosing)",
      "Sites: head & neck (orbit, sinonasal, oral, nasopharynx), genitourinary (bladder, prostate, paratesticular, uterus, cervix), bile duct",
      "RAS pathway mutations; uterine ERMS in DICER1 syndrome",
    ] },
  "p-pa0100": { src: "ne2", organ: "Skin (vulva)", normal: "skin",
    answer: { organ: "Skin", dx: "Melanoma", desc: [
      "Infiltrative tumor involving the epidermis and dermis",
      "Highly cellular tumor composed of irregular nests or single cells with enlarged pleomorphic nuclei, prominent nucleoli, and melanin pigments",
      "High mitotic activity",
      "Brisk tumor-infiltrating lymphocytes",
    ] },
    features: [
      "Highly cellular, infiltrative tumor involving **epidermis and dermis**",
      "Irregular **nests and single cells** (also fascicles / sheets); no maturation with depth",
      "Atypical epithelioid or spindle cells: enlarged **pleomorphic** nuclei, irregular nuclear membranes, coarse chromatin, **prominent eosinophilic nucleoli**",
      "**Melanin pigment**; **frequent mitoses**",
      "Supplement: **pagetoid spread** (single atypical melanocytes high in the epidermis), brisk tumor-infiltrating lymphocytes, ulceration",
    ],
    pearls: [
      "Skin >> mucosa (oral, GI, genitourinary) >> esophagus, meninges, uvea; UV, high mutation burden, BRAF (also in nevi), CDKN2A, TERT",
      "Melanoma vs nevus (Micro I): infiltrative, atypia, mitoses, no maturation, pagetoid spread vs circumscribed, bland, maturation of descent",
      "考古 year 10 Micro 3: metastatic melanoma in the LUNG (organ changed)",
    ] },
  "p-pa0285": { src: "ne2", dx: "Mature (cystic) teratoma", normal: "ovary",
    teach: "Old teaching slide PA0107 (also an ovarian mature teratoma) is included after the PA0285 photos.",
    answer: { organ: "Ovary", dx: "Mature teratoma", desc: [
      "Cystic tumor composed of mature tissue from different germ layers, including squamous epithelium, skin adnexa, glial tissue, nerves, adipose tissue, bone, cartilage, respiratory epithelium, and choroid plexus (in the exam, list the tissues you actually see on the slide)",
    ] },
    features: [
      "Well-circumscribed **cystic** (or solid-and-cystic) tumor; no cytologic atypia",
      "**Ectoderm**: skin (squamous epithelium) with adnexa and hair shafts; neuroectoderm — glia, ependyma, choroid plexus, nerves, ganglia",
      "**Mesoderm**: adipose tissue, bone, cartilage, smooth muscle",
      "**Endoderm**: respiratory / bronchial epithelium, GI epithelium (intestinal, pyloric glands), thyroid, salivary glands",
      "Ovarian stroma and primordial follicles at the edge (old slide PA0107)",
    ],
    pearls: [
      "Mature = only mature tissues (benign); immature teratoma contains primitive neuroectoderm (malignant)",
      "Rokitansky tubercle: a solid knob projecting into the cyst — most tissue types are found there",
      "Struma ovarii = thyroid tissue predominant; gross: hair, teeth, sebaceous material",
      "考古 year 10 Micro 2 (dentistry) & make-up: name the components, 2–3 points each (max 10); 'Teratoma' alone = 3/5",
    ] },
  "p-pa0002": { src: "cvs", dx: "Cardiac myxoma", organ: "Heart (left atrium)", normal: "heart",
    answer: { organ: "Heart (no need to name the chamber)", dx: "Cardiac myxoma or Myxoma", desc: [
      "Well-circumscribed tumor",
      "Bland spindle or stellate cells with oval nuclei arranged singly or in cords and rings",
      "Myxoid stroma",
      "Abundant vessels",
      "Hemorrhage and hemosiderin",
    ] },
    features: [
      "Well-circumscribed tumor arising from the endocardium (left atrium >>> other chambers)",
      "Abundant pale **myxoid stroma**",
      "**Myxoma (lepidic) cells**: stellate, ovoid or plump spindle cells with eosinophilic cytoplasm and oval/round nuclei, no atypia",
      "Arranged as **single cells, cords, nests or rings** — rings often around small vessels (perivascular)",
      "Abundant vessels (larger thick-walled vessels near the stalk); **hemorrhage and hemosiderin** from repeated trauma; ± Gamna–Gandy bodies, glands (not on this slide)",
    ],
    pearls: [
      "Most common primary adult cardiac tumor; PRKAR1A mutation; sporadic or Carney complex (<10%)",
      "Gross: solid or villiform, gelatinous, variegated cut surface with hemorrhage",
    ] },
  "p-pa0340": { src: "cvs", no: "PA0170 (2)", organ: "Artery (carotid)", normal: "artery-vein",
    teach: "The lecture's photos are labelled PA0170 with the note 'teaching slide updated: PA0340'; the exam list writes PA0340 (2).",
    answer: { organ: "Artery (no need to name which artery)", dx: "Atherosclerosis", desc: [
      "Fibrous cap with smooth muscle cells and collagen",
      "Necrotic core with cholesterol clefts and foam cells",
      "Macrophages and lymphocytes",
    ] },
    features: [
      "Artery with an eccentric, thickened **intima** (plaque = intimal thickening + lipid); media and adventitia below",
      "**Fibrous cap**: smooth muscle cells and collagen",
      "**Necrotic core**: empty needle-shaped **cholesterol clefts** (crystals dissolved in processing), **foam cells** (lipid-laden macrophages / SMCs), debris, fibrin",
      "Macrophages, lymphocytes; ± neovascularization, fibrosis, **calcification** (later stages)",
    ],
    pearls: [
      "Chronic inflammatory and healing response of the arterial wall to endothelial injury (lipoproteins, macrophages, T cells, SMCs)",
      "考古 year 10 Micro 2 (organ 'artery' 2; 'blood vessel' or 'aorta' 1): necrotic core 3 · cholesterol clefts 3 · fibrous cap 3 · foam cells/macrophages 3 · lymphocytes 2 · smooth muscle cells 2 · luminal narrowing / intimal thickening 2",
    ] },
  "p-pa0197": { src: "cvs", organ: "Heart", normal: "heart",
    answer: { organ: "Heart", dx: "Acute rheumatic pancarditis", desc: [
      "Acute inflammation involving the pericardium, myocardium and endocardium",
      "Aschoff nodules composed of numerous lymphocytes and histiocytes, some forming multinucleated giant cells (Aschoff giant cells), admixed with Anitschkow cells",
    ] },
    features: [
      "All three layers inflamed: **pericarditis** (fibrinous) + **myocarditis** + **endocarditis** = pancarditis",
      "**Aschoff bodies** (acute phase): nodules of mixed inflammatory cells around fibrinoid necrosis — a peculiar granulomatous inflammation",
      "**Anitschkow (caterpillar) cells**: macrophages with slender, wavy ribbon-like chromatin",
      "**Aschoff giant cells**, lymphocytes, plasma cells",
    ],
    pearls: [
      "Immune-mediated after group A streptococcal pharyngitis — molecular mimicry",
      "Acute RHD → pancarditis; chronic RHD → fibrotic valve disease (mitral stenosis)",
    ] },
  "p-pa0171": { src: "cvs", organ: "Heart (myocardium)", normal: "heart",
    answer: { organ: "Heart", dx: "Amyloidosis", desc: [
      "Amorphous, eosinophilic, hyaline extracellular deposits",
      "Deposition patterns: myocardial interstitial (pericellular / nodular); vascular / microvascular; also deposits in the endocardium and epicardium",
    ] },
    features: [
      "Pale pink, glassy, acellular **extracellular** material between cardiomyocytes",
      "**Pericellular** (around each myocyte) or **nodular** interstitial deposits; **vascular** deposits in vessel walls",
      "Cardiomyocytes trapped and separated by the amyloid",
    ],
    pearls: [
      "AL (light chain) or ATTR (wild-type = senile systemic; hereditary) amyloidosis",
      "Clinical: restrictive cardiomyopathy (HFpEF) with right heart failure, arrhythmia, thromboembolism; gross: thick, firm, waxy myocardium",
      "Same pink-material DDx as the lung amyloidoma (PA0030): fibrosis vs fibrinous vs fibrinoid vs amyloid",
      "考古 year 11 Micro 2: amyloid in a salivary gland (organ changed)",
    ] },
};
for (const [id, c] of Object.entries(PATH_FILL_3)) { const p = PATHO.find(x => x.id === id); Object.assign(p, c); p.teach = c.teach || ""; delete p.listOnly; }
