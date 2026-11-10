// Histology quick-review database.
// Each organ: id, name, system, images [file, caption], id (key identifying features),
// layers (optional structured description), vs (differentials), path (pathology link).
// Image files live in "histology photo/".

const SYSTEMS = [
  { id: "gi", name: "GI tract", note: "Oral cavity → anal canal, in order" },
  { id: "gi-glands", name: "GI accessory glands", note: "Salivary glands, pancreas, liver, biliary tree" },
  { id: "lymphoid", name: "Lymphoid & hematopoietic", note: "Tonsils, lymph node, spleen, thymus, marrow" },
  { id: "cv", name: "Cardiovascular", note: "Heart and vessels" },
  { id: "resp", name: "Respiratory", note: "Conducting airway" },
  { id: "urinary", name: "Urinary", note: "Kidney → bladder" },
  { id: "male", name: "Male reproductive", note: "Testis → ducts → glands → penis" },
  { id: "female", name: "Female reproductive & breast", note: "Ovary → tube → uterus → cervix → vagina, placenta, breast" },
  { id: "endo", name: "Endocrine", note: "Pituitary, pineal, thyroid, parathyroid, adrenal" },
  { id: "neuro", name: "Nervous system", note: "CNS and ganglia" },
  { id: "skin", name: "Skin & appendages", note: "Integument" },
  { id: "senses", name: "Eye & ear", note: "Special senses and adnexa" },
];

const ORGANS = [
  // ───────────────────────── GI TRACT ─────────────────────────
  {
    id: "lip", name: "Lip", system: "gi",
    images: [["lip.jpg", "Lip – skin side, red margin, oral mucosa"]],
    features: [
      "Three zones in one section: thin skin (hair follicles, sebaceous & sweat glands) → vermilion/red margin → oral mucosa",
      "Core of skeletal muscle (orbicularis oris)",
      "Vermilion: thin keratinized epithelium, tall dermal papillae with capillaries close to the surface (red colour), no glands",
      "Oral side: thick stratified squamous NON-keratinized epithelium + minor (labial) mucous/seromucous salivary glands in submucosa",
    ],
    vs: [
      ["Tongue", "Tongue has papillae on dorsal surface and interlacing skeletal muscle in 3 planes; no skin/hair"],
      ["Eyelid", "Eyelid also skin → mucosa transition with skeletal muscle, but has a dense tarsal plate with Meibomian glands and conjunctiva (stratified columnar + goblet cells)"],
    ],
    path: "Squamous cell carcinoma (lower lip, sun exposure), mucocele from damaged minor salivary glands.",
  },
  {
    id: "tongue", name: "Tongue – lingual papillae", system: "gi",
    images: [["papilla.jpg", "Filiform, fungiform, foliate, circumvallate papillae"]],
    features: [
      "Stratified squamous epithelium over a core of skeletal muscle running in 3 planes (interlacing bundles)",
      "Filiform: most numerous, slender, pointed, keratinized, NO taste buds",
      "Fungiform: mushroom-shaped, highly vascular core, taste buds on upper surface",
      "Foliate: parallel ridges on lateral tongue, taste buds on sides (prominent in children/animals)",
      "Circumvallate: large, sunken in a moat/trench, taste buds on lateral walls; von Ebner serous glands drain into trench",
    ],
    vs: [
      ["Lip", "Lip shows skin + hair on one side; tongue has no skin"],
      ["Esophagus", "Esophagus has smooth/mixed muscularis in 2 layers, no papillae, no taste buds"],
    ],
    path: "SCC of lateral tongue; leukoplakia; geographic tongue (filiform loss).",
  },
  {
    id: "esophagus", name: "Esophagus", system: "gi",
    images: [["esophagua.jpg", "Esophagus"]],
    features: [
      "Thick stratified squamous NON-keratinized epithelium",
      "Muscularis mucosae: single thick longitudinal layer of smooth muscle",
      "Submucosa: esophageal glands proper (mucous) — submucosal glands are a key clue",
      "Muscularis externa: upper 1/3 skeletal, middle mixed, lower 1/3 smooth",
      "Adventitia (not serosa) in the thorax; collapsed folded lumen",
    ],
    vs: [
      ["Vagina", "Vagina: same epithelium but glycogen-rich pale cells, NO glands at all, no muscularis mucosae"],
      ["Trachea", "Trachea has C-shaped hyaline cartilage and respiratory epithelium"],
      ["Anal canal", "Anal canal has the squamous–columnar transition, anal glands, internal anal sphincter"],
    ],
    path: "Barrett esophagus (intestinal metaplasia with goblet cells), adenocarcinoma (distal) vs SCC (mid), eosinophilic esophagitis, reflux.",
  },
  {
    id: "ge-junction", name: "Esophagus–stomach junction", system: "gi",
    images: [["esophagus stomach junction.jpg", "Gastroesophageal junction"]],
    features: [
      "ABRUPT change from stratified squamous (esophagus) to simple columnar surface mucous cells (cardiac stomach)",
      "Esophageal side: submucosal mucous glands; gastric side: gastric pits + cardiac glands in lamina propria",
      "Thickened inner circular muscle = (physiological) gastroesophageal sphincter",
    ],
    vs: [
      ["Recto-anal junction", "Recto-anal: columnar (crypts with goblet cells) → stratified squamous; gastric side here has NO goblet cells"],
      ["Gastroduodenal junction", "Stomach → duodenum: pits become villi, Brunner glands appear; no squamous epithelium"],
    ],
    path: "Z-line; Barrett metaplasia replaces squamous with columnar + goblet cells above the junction.",
  },
  {
    id: "stomach-cardiac", name: "Stomach – cardia", system: "gi",
    images: [["stomach cardiac.jpg", "Cardiac stomach"], ["stomach cardiac epi.jpg", "Cardiac mucosa – epithelium"]],
    features: [
      "Simple columnar surface mucous cells; NO goblet cells",
      "Gastric pits moderately deep; cardiac glands = SIMPLE BRANCHED TUBULAR, short, MUCOUS (pale, foamy) — few parietal cells",
      "Narrow zone immediately below the GE junction (location is the main clue)",
    ],
    vs: [
      ["Pyloric stomach", "Both have mucous glands; pyloric glands are simple COILED tubular with deep pits (≈1/2 mucosa) and a thick pyloric sphincter; location decides"],
      ["Fundus/body", "Fundic glands are long, straight, packed with pink parietal + blue chief cells; pits shallow (≈1/4)"],
    ],
    path: "Carditis in reflux; GE-junction adenocarcinoma.",
  },
  {
    id: "stomach-fundic", name: "Stomach – fundus / body", system: "gi",
    images: [["stomach fundic.jpg", "Fundic stomach"], ["stomach fundic epi.jpg", "Fundic glands (simple tubular) – parietal cells"]],
    features: [
      "Thick mucosa; SHORT pits (~1/4 depth) and LONG straight SIMPLE TUBULAR fundic glands",
      "Parietal cells: large, round, eosinophilic (pink), central nucleus — upper/mid gland (HCl, intrinsic factor)",
      "Chief cells: basophilic (blue) cytoplasm, basal — at gland base (pepsinogen)",
      "Mucous neck cells in the neck; enteroendocrine cells",
      "Rugae; muscularis externa has 3 layers (inner oblique, middle circular, outer longitudinal)",
    ],
    vs: [
      ["Cardia / pylorus", "Those have mucous (pale) glands and few parietal cells"],
      ["Duodenum", "Duodenum has villi, goblet cells, Brunner glands in submucosa"],
    ],
    path: "Autoimmune (atrophic) gastritis of body → loss of parietal cells → pernicious anemia; H. pylori gastritis; PPI-related parietal cell hyperplasia.",
  },
  {
    id: "stomach-pyloric", name: "Stomach – pylorus", system: "gi",
    images: [["stomach pylori.jpg", "Pyloric stomach"], ["stomach pyloric epi.jpg", "Pyloric mucosa – epithelium"]],
    features: [
      "DEEP gastric pits (~1/2 of mucosal thickness) with short SIMPLE COILED TUBULAR MUCOUS glands",
      "Pale foamy glands, few parietal cells; many G-cells (gastrin)",
      "Very thick middle circular muscle layer = pyloric sphincter",
      "Surface: simple columnar mucous cells, NO goblet cells",
    ],
    vs: [
      ["Fundus", "Fundus: shallow pits, long glands full of parietal/chief cells"],
      ["Duodenum (Brunner glands)", "Brunner glands are mucous too, but lie in SUBMUCOSA under villi; pyloric glands are in lamina propria under pits"],
      ["Large intestine", "Colon crypts are straight test-tube glands full of GOBLET cells; stomach has no goblet cells"],
    ],
    path: "Antrum = commonest site of H. pylori gastritis and gastric ulcers; pyloric stenosis (hypertrophied muscle in infants).",
  },
  {
    id: "gd-junction", name: "Stomach–duodenum junction", system: "gi",
    images: [["stomach doudenum junction.jpg", "Gastroduodenal junction"]],
    features: [
      "Gastric pits + pyloric mucous glands (no goblet cells) → villi with goblet cells",
      "Brunner glands begin in the duodenal submucosa (may extend slightly under pyloric mucosa)",
      "Thickened circular muscle (pyloric sphincter) at the junction",
    ],
    vs: [
      ["GE junction", "GE junction has squamous epithelium on one side"],
    ],
    path: "Duodenal ulcers lie just distal in the first part of duodenum; gastric metaplasia of duodenum.",
  },
  {
    id: "duodenum", name: "Duodenum", system: "gi",
    images: [["duodenum.jpg", "Duodenum"]],
    features: [
      "Villi + crypts of Lieberkühn; simple columnar enterocytes with brush border and goblet cells",
      "KEY: Brunner glands (submucosal duodenal glands) — mucous, alkaline; pierce the muscularis mucosae",
      "Low-power look: surface looks MESSY/irregular, with a big pale mass of glands (Brunner) underneath",
      "Villi broad/leaf-like; plicae circulares start here",
      "Paneth cells at crypt base (eosinophilic granules)",
    ],
    vs: [
      ["Jejunum", "Jejunum: no Brunner glands, tall finger-like villi, prominent plicae"],
      ["Ileum", "Ileum: Peyer patches in lamina propria/submucosa, shorter villi, more goblet cells"],
      ["Pyloric stomach", "Stomach: pits, no villi, no goblet cells"],
    ],
    path: "Celiac disease (villous blunting, intraepithelial lymphocytes, crypt hyperplasia — biopsy site); peptic ulcer; Giardia.",
  },
  {
    id: "jejunum", name: "Jejunum", system: "gi",
    images: [["jejunum.jpg", "Jejunum"]],
    features: [
      "Tallest, finger-like villi; most prominent plicae circulares (circular folds of mucosa + submucosa)",
      "Low-power look: villi very LONG and DENSE; cut villus tips often appear to 'float' free in the lumen",
      "NO Brunner glands and NO Peyer patches (diagnosis by exclusion)",
      "Moderate goblet cells; Paneth cells at crypt bases",
    ],
    vs: [
      ["Duodenum", "Look for Brunner glands in submucosa"],
      ["Ileum", "Look for Peyer patches (aggregated lymphoid follicles) on the antimesenteric side"],
    ],
    path: "Site of most absorption; Crohn disease may involve.",
  },
  {
    id: "ileum", name: "Ileum", system: "gi",
    images: [["iluem.jpg", "Ileum"], ["ileum epi.jpg", "Ileum – goblet cells (G) over Peyer patch nodules (LN)"]],
    features: [
      "KEY: Peyer patches — aggregated lymphoid nodules in lamina propria extending into submucosa (break the muscularis mucosae); there are LOTS of them (immune function)",
      "Over Peyer patch: dome epithelium with M cells, villi absent",
      "Shorter villi, more goblet cells than proximal small intestine",
      "No Brunner glands",
    ],
    vs: [
      ["Appendix", "Appendix: no villi, small lumen, circumferential ring of lymphoid follicles, crypts only"],
      ["Colon", "Colon: no villi; straight crypts with abundant goblet cells; taeniae coli"],
    ],
    path: "Terminal ileum = classic site of Crohn disease (transmural, granulomas); B12/bile salt absorption; Yersinia, typhoid (Peyer patch ulceration).",
  },
  {
    id: "appendix", name: "Appendix", system: "gi",
    images: [["appendix.jpg", "Appendix"]],
    features: [
      "Small, often irregular/triangular lumen surrounded by a complete RING of lymphoid nodules with germinal centres",
      "Low-power look: the ENTIRE circular cross-section fits on the slide (colon is too big — you only see a strip)",
      "Colonic-type mucosa: crypts with goblet cells, NO villi; crypts sparse/irregular",
      "Lymphoid tissue fills lamina propria and extends into submucosa; muscularis mucosae poorly defined",
      "Complete outer longitudinal muscle (no taeniae); serosa",
    ],
    vs: [
      ["Ileum", "Ileum has villi; Peyer patches only on one side"],
      ["Palatine tonsil", "Tonsil: stratified squamous epithelium with crypts, not columnar crypts with goblet cells"],
      ["Colon", "Colon: large lumen, crowded regular crypts, scattered (not ring) lymphoid nodules"],
    ],
    path: "Acute appendicitis (neutrophils in muscularis propria); low-grade appendiceal mucinous neoplasm; carcinoid (neuroendocrine) tumour at tip.",
  },
  {
    id: "colon", name: "Large intestine (colon)", system: "gi",
    images: [["large intestine.jpg", "Colon – low power with taeniae coli (TC)"], ["large intestine mid.jpg", "Colon – layers, lymphatic nodule, taenia coli"], ["large intestine epi.jpg", "Colon – crypts / goblet cells"]],
    features: [
      "NO villi; flat surface with straight, regularly spaced 'test-tube' crypts",
      "Crypts packed with GOBLET cells (pale, mucin) plus absorptive colonocytes",
      "Paneth cells normally absent (except right colon)",
      "Outer longitudinal muscle gathered into 3 taeniae coli; appendices epiploicae; serosa",
      "Scattered solitary lymphoid nodules — also immune tissue, but much less frequent than the Peyer patches of the ileum",
      "Low-power look: large lumen with a FLATTER, smoother surface than the appendix",
    ],
    vs: [
      ["Small intestine", "Small intestine has villi"],
      ["Rectum", "Rectum: same mucosa but longer crypts, complete longitudinal muscle (no taeniae), adventitia distally"],
      ["Appendix", "Colon and appendix have the same mucosa. Appendix: small lumen, ring of lymphoid follicles, and the WHOLE ring (complete cross-section) fits on one slide; colon: only a flat strip of a large wall"],
      ["Stomach (pylorus)", "No goblet cells in stomach; pits are funnel-shaped not test-tube"],
    ],
    path: "Ulcerative colitis (crypt abscess, crypt distortion, mucosal only); adenoma → adenocarcinoma sequence; diverticulosis.",
  },
  {
    id: "rectum", name: "Rectum", system: "gi",
    images: [["rectum.jpg", "Rectum"], ["rectum epi.jpg", "Rectum – crypts"]],
    features: [
      "Colonic mucosa with DEEPER crypts and abundant goblet cells; no villi",
      "Transverse rectal folds (mucosa + submucosa)",
      "Longitudinal muscle forms a complete layer (taeniae merge)",
      "Mostly adventitia (retroperitoneal/pelvic)",
    ],
    vs: [
      ["Colon", "Very similar; rectum has longer crypts, no taeniae, adventitia"],
    ],
    path: "Rectal biopsy for UC (always involves rectum) and Hirschsprung disease (absent ganglion cells).",
  },
  {
    id: "anorectal", name: "Recto-anal junction", system: "gi",
    images: [["recto-anal junction.jpg", "Recto-anal junction"], ["recto-anal junction epi.jpg", "Recto-anal junction – epithelial transition"]],
    features: [
      "Transition: colorectal crypts (simple columnar + goblet) → transitional (anal transition zone, stratified cuboidal/columnar) → stratified squamous NON-keratinized → keratinized perianal skin with hair & sweat glands",
      "Crypts disappear at the pectinate line",
      "Thickened inner circular muscle = internal anal sphincter (smooth); external sphincter skeletal",
      "Anal columns; large venous plexus in submucosa (hemorrhoidal); circumanal & apocrine glands distally",
    ],
    vs: [
      ["GE junction", "GE: squamous → gastric (no goblet cells); here columnar with goblet cells → squamous"],
      ["Cervix (transformation zone)", "Cervix: endocervical mucous glands (no goblet cells, no crypts) → squamous"],
    ],
    path: "Pectinate line: above → adenocarcinoma, internal hemorrhoids (painless); below → SCC (HPV), external hemorrhoids (painful).",
  },

  // ─────────────────────── GI ACCESSORY GLANDS ───────────────────────
  {
    id: "parotid", name: "Parotid gland", system: "gi-glands",
    images: [["parotid gland.jpg", "Parotid – low power"], ["parotid gland mid.jpg", "Parotid – serous acini (SA), striated (SD) & intercalated (ID) ducts"]],
    features: [
      "Purely SEROUS acini: pyramidal cells, basophilic base, round basal nuclei, small lumen, zymogen granules apically",
      "Prominent intercalated and STRIATED ducts (pink columnar cells with basal striations)",
      "Adipocytes scattered within lobules increase with age",
      "Thick capsule, lobules separated by CT septa containing interlobular ducts",
    ],
    vs: [
      ["Pancreas (exocrine)", "Pancreas: NO striated ducts, has centroacinar cells and pale islets of Langerhans; fewer adipocytes"],
      ["Lacrimal gland", "Lacrimal: serous but tubuloacinar with larger lumens, no striated ducts, more plasma cells"],
      ["Submandibular", "Submandibular has some mucous tubules with serous demilunes"],
    ],
    path: "Pleomorphic adenoma (commonest salivary tumour), Warthin tumour (almost exclusively parotid), mumps, Sjögren syndrome (lymphocytic sialadenitis).",
  },
  {
    id: "submandibular", name: "Submandibular gland", system: "gi-glands",
    images: [["submandibular gland.jpg", "Submandibular – low power"], ["submandibular gland mid.jpg", "Submandibular – mixed acini"]],
    features: [
      "MIXED gland, predominantly SEROUS (~80–90% serous)",
      "Some pale mucous tubules capped by serous demilunes",
      "Very long, numerous striated ducts (most of all salivary glands)",
    ],
    vs: [
      ["Parotid", "Parotid: pure serous, no mucous cells"],
      ["Sublingual", "Sublingual: predominantly MUCOUS (pale), striated ducts short/scarce"],
    ],
    path: "Sialolithiasis (most stones here – viscous saliva, uphill duct), chronic sclerosing sialadenitis (IgG4 – Küttner tumour).",
  },
  {
    id: "sublingual", name: "Sublingual gland", system: "gi-glands",
    images: [["sublingual gland.jpg", "Sublingual – low power"], ["sublingual gland mid.jpg", "Sublingual – mucous acini (MA), striated duct (SD)"]],
    features: [
      "MIXED gland, predominantly MUCOUS: pale, foamy cells with flattened basal nuclei, wide lumens",
      "Serous demilunes cap the mucous tubules (the crescent shape is partly a fixation artefact)",
      "Intercalated and striated ducts short and inconspicuous",
      "No distinct capsule",
    ],
    vs: [
      ["Submandibular", "Submandibular is mostly serous (dark) with long striated ducts"],
      ["Esophageal / Brunner glands", "Those are mucous glands within a GI wall, not a separate lobulated organ"],
    ],
    path: "Ranula (mucous extravasation cyst of sublingual gland in floor of mouth).",
  },
  {
    id: "pancreas", name: "Pancreas", system: "gi-glands",
    images: [["pancreas.jpg", "Pancreas – exocrine portion and islet (endocrine portion)"]],
    features: [
      "Exocrine serous acini: strongly basophilic base, eosinophilic zymogen granules apically",
      "CENTROACINAR cells (pale nuclei inside the acinus) = start of intercalated duct — unique to pancreas",
      "Islets of Langerhans: pale-staining endocrine clusters with capillaries (α, β, δ cells)",
      "NO striated ducts; thin capsule; few adipocytes",
    ],
    vs: [
      ["Parotid", "Parotid has striated ducts, adipocytes, no islets, no centroacinar cells"],
      ["Lymph node", "Islets can be mistaken for germinal centres – but islets lack a mantle zone and sit in acinar tissue"],
    ],
    path: "Pancreatic ductal adenocarcinoma, acute pancreatitis (fat necrosis), type 1 diabetes (insulitis), neuroendocrine tumours.",
  },
  {
    id: "liver", name: "Liver", system: "gi-glands",
    images: [["liver.jpg", "Liver – lobules and portal triads"]],
    features: [
      "Plates (cords) of polygonal hepatocytes radiating from a central vein, separated by sinusoids",
      "Portal triads at lobule corners: portal vein (largest, thin wall), hepatic artery (thick wall, small), bile duct (cuboidal epithelium) + lymphatic",
      "Hepatocytes: eosinophilic cytoplasm, round central nuclei, frequently binucleate",
      "Kupffer cells in sinusoids; space of Disse; (pig liver shows clear CT septa around lobules)",
      "Zones: zone 1 periportal (O2 rich), zone 3 centrilobular (hypoxia/toxin-sensitive)",
      "Blood flows from the portal triad (outside) → sinusoids → central vein (centre) → hepatic veins → IVC. So in disease, first ask: is the problem around the PORTAL TRIAD or the CENTRAL VEIN? (see Pathology tab → 'Liver: where is the problem?')",
    ],
    vs: [
      ["Adrenal cortex", "Adrenal: cords of cells too, but has distinct zonation and a medulla; no portal triads"],
      ["Pancreas / salivary", "Those are acinar, not plates; no sinusoids"],
    ],
    path: "Cirrhosis (fibrous septa + regenerative nodules), steatosis, zone 3 necrosis (acetaminophen, ischemia), hepatocellular carcinoma.",
  },
  {
    id: "gallbladder", name: "Gallbladder", system: "gi-glands",
    images: [["gall bladder.jpg", "Gallbladder"]],
    features: [
      "Simple tall COLUMNAR epithelium (no goblet cells) thrown into folds that look like villi",
      "NO muscularis mucosae and NO submucosa",
      "Thin, irregular smooth muscle layer (muscularis), then thick perimuscular CT, then serosa (adventitia on liver side)",
      "Rokitansky–Aschoff sinuses (mucosal outpouchings into the muscle) — common, especially with chronic inflammation",
    ],
    vs: [
      ["Small intestine", "Intestine has goblet cells, crypts, muscularis mucosae & submucosa"],
      ["Seminal vesicle", "Seminal vesicle also has highly folded mucosa but pseudostratified epithelium, lipofuscin, and thick 2-layer muscle; eosinophilic secretion in lumen"],
      ["Extrahepatic bile duct", "Bile duct: round lumen, low columnar epithelium, mostly CT wall"],
    ],
    path: "Cholecystitis (acute/chronic), cholesterolosis (foamy macrophages in lamina propria), adenocarcinoma.",
  },
  {
    id: "bile-duct", name: "Extrahepatic bile duct", system: "gi-glands",
    images: [["extrahepatic bile duct.jpg", "Common bile duct"]],
    features: [
      "Simple columnar epithelium lining a round/oval lumen",
      "Thin wall: mucosa, thin/scattered smooth muscle layer, then CT (muscle increases near duodenum = sphincter of Oddi)",
      "Mucous peribiliary glands in wall",
    ],
    vs: [
      ["Gallbladder", "Gallbladder has highly folded mucosa and a continuous muscle layer"],
      ["Ureter", "Ureter: transitional epithelium, stellate lumen, 2–3 muscle layers"],
      ["Vas deferens", "Vas deferens: pseudostratified with stereocilia, very thick 3-layer muscle"],
    ],
    path: "Cholangiocarcinoma, primary sclerosing cholangitis (onion-skin fibrosis), choledocholithiasis.",
  },

  // ─────────────────────── LYMPHOID ───────────────────────
  {
    id: "tonsil-palatine", name: "Palatine tonsil", system: "lymphoid",
    images: [["tonsil palatine.jpg", "Palatine tonsil – low power"], ["tonsil palatine mid.jpg", "Palatine tonsil – crypt epithelium"]],
    features: [
      "Covered by stratified squamous NON-keratinized epithelium",
      "10–20 DEEP, branched crypts that invaginate into lymphoid tissue (may contain debris)",
      "Lymphoid nodules with germinal centres lining crypts",
      "Partial dense CT capsule on deep surface separates from muscle",
    ],
    vs: [
      ["Lingual tonsil", "Lingual: single shallow crypt per tonsil, mucous glands drain into crypt, skeletal muscle of tongue beneath"],
      ["Pharyngeal tonsil", "Pharyngeal: pseudostratified ciliated columnar (respiratory) epithelium, folds not crypts"],
      ["Lymph node", "Lymph node has full capsule, subcapsular sinus, no epithelium"],
    ],
    path: "Tonsillitis, peritonsillar abscess, HPV-associated oropharyngeal SCC (arises in crypt epithelium).",
  },
  {
    id: "tonsil-lingual", name: "Lingual tonsil", system: "lymphoid",
    images: [["tonsil lingual.jpg", "Lingual tonsil – low power"], ["tonsil lingual mid.jpg", "Lingual tonsil – crypt and glands"]],
    features: [
      "On posterior 1/3 of tongue: stratified squamous non-keratinized epithelium",
      "Each tonsil has a single, SHALLOW crypt",
      "Mucous glands (posterior lingual glands) open into the base of the crypt — keeps crypts clean",
      "Skeletal muscle of the tongue deep to it",
    ],
    vs: [
      ["Palatine tonsil", "Palatine: many deep branched crypts, no glands draining into them, capsule"],
    ],
    path: "Lingual tonsil hypertrophy; base-of-tongue SCC.",
  },
  {
    id: "tonsil-pharyngeal", name: "Pharyngeal tonsil (adenoid)", system: "lymphoid",
    images: [["tonsil pharyngeal.jpg", "Pharyngeal tonsil – low power"], ["tonsil pharyngeal mid.jpg", "Pharyngeal tonsil – respiratory epithelium"]],
    features: [
      "Covered by pseudostratified ciliated columnar epithelium with goblet cells (respiratory), patches of stratified squamous",
      "NO crypts — instead shallow pleats/folds",
      "Thin underlying capsule; seromucous glands beneath",
    ],
    vs: [
      ["Palatine & lingual tonsils", "Those are covered by stratified squamous epithelium with crypts"],
    ],
    path: "Adenoid hypertrophy (obstructive sleep apnea, otitis media in children), nasopharyngeal carcinoma (EBV).",
  },
  {
    id: "lymph-node", name: "Lymph node", system: "lymphoid",
    images: [["lymph node.jpg", "Lymph node – capsule, cortex, medulla, germinal centre"], ["lymph node low.jpg", "Lymph node – low power"], ["lymph node cortex.jpg", "Cortex – follicles, subcapsular sinus"], ["lymph node medulla.jpg", "Medulla – medullary cords and sinuses"]],
    features: [
      "Bean-shaped, COMPLETE capsule with trabeculae; hilum with efferent lymphatic and vessels",
      "SUBCAPSULAR sinus just under the capsule (afferent lymphatics enter on convex surface) — KEY",
      "Superficial (outer) cortex: lymphoid follicles (B cells) with germinal centres",
      "Deep cortex = paracortex: T cells, high endothelial venules (HEVs), no follicles",
      "Medulla: medullary cords (plasma cells) alternating with medullary sinuses",
    ],
    vs: [
      ["Spleen", "Spleen: no subcapsular sinus, no cortex/medulla – white pulp (with central artery) scattered in red pulp"],
      ["Thymus", "Thymus: lobules with dark cortex/pale medulla, Hassall corpuscles, NO follicles"],
      ["Tonsil", "Tonsils have surface epithelium and incomplete capsule"],
    ],
    path: "Reactive hyperplasia, lymphoma (effaced architecture), metastatic carcinoma (first lands in subcapsular sinus — sentinel node).",
  },
  {
    id: "spleen", name: "Spleen", system: "lymphoid",
    images: [["spleen.jpg", "Spleen – white pulp, red pulp, trabecular artery & vein"]],
    features: [
      "Dense capsule + trabeculae (with trabecular arteries/veins); NO cortex/medulla and NO subcapsular sinus",
      "WHITE pulp: lymphoid nodules each with an eccentric CENTRAL ARTERIOLE + PALS (periarteriolar lymphoid sheath, T cells) — KEY",
      "RED pulp: splenic cords (of Billroth) and venous sinusoids full of RBCs",
      "Marginal zone between white and red pulp",
      "Looks LOOSE/spongy because it filters and recycles huge numbers of RBCs; red pulp packed with far too many RBCs = congestion (too much blood in, or too little out)",
    ],
    vs: [
      ["Lymph node", "Lymph node has subcapsular sinus, peripheral follicles, medulla"],
      ["Thymus", "Thymus lacks follicles, has Hassall corpuscles"],
    ],
    path: "Splenomegaly (portal hypertension – congestive red pulp, CML, malaria), infarcts, asplenia → encapsulated bacteria risk.",
  },
  {
    id: "thymus", name: "Thymus", system: "lymphoid",
    images: [["thymus.jpg", "Thymus – low power"], ["thymus mid.jpg", "Thymus – cortex, medulla, Hassall corpuscles"], ["thymus cortex.jpg", "Thymic cortex"], ["thymus medulla.jpg", "Thymic medulla – Hassall corpuscles"], ["thymus involution.jpg", "Involuted (adult) thymus – adipose replacement"]],
    features: [
      "Incomplete LOBULES separated by septa; each lobule = dark CORTEX + pale MEDULLA (medulla continuous between lobules)",
      "Cortex: densely packed thymocytes (T cells); NO lymphoid follicles / germinal centres",
      "Medulla: HASSALL (thymic) corpuscles — concentric whorls of keratinized epithelial reticular cells — PATHOGNOMONIC",
      "Epithelial reticular cells form the stroma (no reticular fibres); blood–thymus barrier in cortex",
      "Involution with age: lymphoid tissue replaced by adipose tissue",
    ],
    vs: [
      ["Lymph node", "LN has follicles, subcapsular sinus, continuous capsule"],
      ["Palatine tonsil", "Tonsil has surface epithelium + crypts + germinal centres"],
      ["Adipose / breast", "Involuted thymus = fat with islands of lymphocytes & Hassall corpuscles"],
    ],
    path: "Thymoma (myasthenia gravis), thymic hyperplasia with germinal centres in MG, DiGeorge (aplasia).",
  },
  {
    id: "marrow", name: "Red bone marrow", system: "lymphoid",
    images: [["red bone marrow.jpg", "Red bone marrow"]],
    features: [
      "Between bony trabeculae of spongy bone: hematopoietic cells + fat cells + sinusoids",
      "MEGAKARYOCYTES: giant cells with multilobed nucleus — easiest landmark",
      "Erythroid islands (dark round nuclei) and myeloid cells (granulocyte precursors)",
      "Cellularity ≈ 100 − age (%) ; rest is adipose",
    ],
    vs: [
      ["Spleen", "Spleen has white pulp, no bone, no megakaryocytes normally (adult)"],
      ["Liver (fetal)", "Fetal liver has hematopoiesis among hepatocyte plates"],
    ],
    path: "Aplastic anemia (hypocellular, fat), leukemia (packed with blasts), myelofibrosis, metastases.",
  },

  // ─────────────────────── CARDIOVASCULAR ───────────────────────
  {
    id: "heart", name: "Heart", system: "cv",
    images: [["heart.jpg", "Endocardium, Purkinje fibres, myocardium"],
      ["PA0001 infective endocarditis 08-046.jpg", "Atrioventricular valve: lamina atrialis, spongiosa, fibrosa, ventricularis (Infection (1) lecture p. 46)", 0, "pathology photo/"],
      ["PA0001 infective endocarditis 08-047.jpg", "Aortic valve: lamina arterialis → fibrosa (collagen) → spongiosa (GAGs, proteoglycan) → ventricularis (elastin) (Infection (1) lecture p. 47)", 0, "pathology photo/"]],
    features: [
      "Endocardium (endothelium + subendocardial CT with Purkinje fibres) / thick myocardium / epicardium (visceral pericardium with fat & coronary vessels)",
      "Cardiac muscle: branching fibres, 1–2 CENTRAL nuclei, INTERCALATED discs, perinuclear clear zone (lipofuscin)",
      "Purkinje fibres: large pale cells with few myofibrils, under endocardium",
      "Abundant capillaries between fibres",
      "Heart VALVES (avascular, endothelium-covered on both sides, with valvular interstitial cells). Layers: **fibrosa** = dense pink collagen core; **spongiosa** = loose, pale, glycosaminoglycan/proteoglycan-rich; **ventricularis** = elastin, on the ventricular (inflow) surface",
      "AV (mitral/tricuspid) valve, atrial → ventricular side: lamina atrialis → spongiosa → fibrosa → ventricularis. Aortic valve, arterial → ventricular side: lamina arterialis → fibrosa → spongiosa → ventricularis",
    ],
    vs: [
      ["Skeletal muscle", "Skeletal: unbranched, multiple PERIPHERAL nuclei, no intercalated discs"],
      ["Smooth muscle", "Smooth: spindle cells with cigar-shaped central nucleus, no striations"],
    ],
    path: "Myocardial infarction (coagulative necrosis → neutrophils → granulation → scar), myocarditis, hypertrophy (boxcar nuclei), rheumatic heart disease (Aschoff bodies).",
  },
  {
    id: "aorta", name: "Aorta (elastic artery)", system: "cv",
    images: [["blood vessel aorta.jpg", "Aorta"]],
    features: [
      "THICK tunica media made of many concentric fenestrated ELASTIC lamellae (40–70) with smooth muscle between",
      "Internal elastic lamina hard to distinguish from media lamellae",
      "Thin intima; adventitia with vasa vasorum",
      "Elastin stains (orcein/Verhoeff) show wavy black sheets",
    ],
    vs: [
      ["Muscular artery", "Muscular artery: media mostly smooth muscle with distinct internal (wavy) & external elastic laminae"],
      ["Vena cava", "Vena cava: THICK ADVENTITIA with longitudinal smooth muscle bundles; thin media"],
    ],
    path: "Atherosclerosis (intima), cystic medial degeneration (Marfan) → dissection, syphilitic aortitis (obliterative endarteritis of vasa vasorum), aneurysm.",
  },
  {
    id: "artery-vein", name: "Muscular artery & accompanying vein", system: "cv",
    images: [["blood vessel artery and vein.jpg", "Artery (round, thick) and vein (collapsed, thin)"]],
    features: [
      "ARTERY: round lumen, thick tunica media of circular smooth muscle; wavy, distinct INTERNAL elastic lamina; external elastic lamina",
      "VEIN: larger, irregular/collapsed lumen with blood; thin media; adventitia is the thickest layer; may show valves",
      "Wall-to-lumen ratio: artery high, vein low",
    ],
    vs: [
      ["Aorta", "Aorta media is mostly elastic lamellae"],
      ["Saphenous vein", "Saphenous is a vein with an unusually thick muscular media"],
      ["Vas deferens / ureter", "Those have an epithelium-lined lumen and no elastic laminae"],
    ],
    path: "Arteriosclerosis (hyaline/hyperplastic arteriolosclerosis), vasculitis (giant cell arteritis – fragmented IEL), varicose veins, thrombosis.",
  },
  {
    id: "saphenous", name: "Saphenous vein", system: "cv",
    images: [["blood vessel saphenous vein.jpg", "Great saphenous vein"]],
    features: [
      "Large vein with unusually THICK muscular wall (gravitational pressure in leg)",
      "THICK INTIMA containing longitudinal smooth muscle bundles; media of circular smooth muscle; no distinct IEL",
      "Adventitia thick; valves",
    ],
    vs: [
      ["Muscular artery", "Artery: sharp, wavy internal elastic lamina, compact circular media, round lumen"],
      ["Vena cava", "Vena cava: thin media, very thick adventitia with longitudinal smooth muscle"],
    ],
    path: "Varicose veins; used as CABG graft (vein graft disease = intimal hyperplasia).",
  },
  {
    id: "vena-cava", name: "Vena cava (large vein)", system: "cv",
    images: [["blood vessel vena cava.jpg", "Inferior vena cava"]],
    features: [
      "Thin intima and thin, poorly developed media",
      "ADVENTITIA is THICKEST layer and contains LONGITUDINAL bundles of smooth muscle (seen in cross-section as islands) — KEY",
      "Wide irregular lumen",
    ],
    vs: [
      ["Aorta", "Aorta: thick elastic media, thin adventitia"],
      ["Saphenous vein", "Saphenous: thick muscular media"],
    ],
    path: "IVC thrombosis, tumour thrombus (renal cell carcinoma).",
  },

  // ─────────────────────── RESPIRATORY ───────────────────────
  {
    id: "trachea", name: "Trachea", system: "resp",
    images: [["respiratory system trachea.jpg", "Trachea"]],
    features: [
      "Respiratory epithelium: pseudostratified ciliated columnar with goblet cells, THICK basement membrane",
      "Submucosa with seromucous (tracheal) glands",
      "C-shaped HYALINE cartilage rings; trachealis smooth muscle bridges the open posterior ends",
      "Adventitia",
    ],
    vs: [
      ["Bronchus", "Bronchus: cartilage as irregular PLATES, a distinct smooth muscle layer between mucosa and cartilage"],
      ["Esophagus", "Esophagus: stratified squamous, muscularis externa, no cartilage"],
      ["Epididymis", "Epididymis also pseudostratified but with stereocilia, no goblet cells, no cartilage"],
    ],
    path: "Squamous metaplasia in smokers (first step to SCC), tracheomalacia, intubation injury.",
  },
  {
    id: "bronchus", name: "Bronchus (intrapulmonary)", system: "resp",
    images: [["respiratory system bronchus.jpg", "Bronchus"]],
    features: [
      "Respiratory epithelium (pseudostratified ciliated columnar + goblet cells), folded mucosa",
      "Continuous spiral layer of SMOOTH MUSCLE between lamina propria and submucosa",
      "Irregular PLATES of hyaline cartilage (not rings)",
      "Seromucous glands; surrounded by lung alveoli; accompanied by pulmonary artery branch",
    ],
    vs: [
      ["Trachea", "Trachea: C-shaped ring, no separate muscle layer except trachealis"],
      ["Bronchiole", "Bronchiole: NO cartilage, NO glands; simple ciliated columnar → cuboidal + club cells"],
    ],
    path: "Asthma (thick BM, smooth muscle & goblet hyperplasia, eosinophils), chronic bronchitis (Reid index ↑ gland hypertrophy), bronchiectasis, lung carcinoma.",
  },

  // ─────────────────────── URINARY ───────────────────────
  {
    id: "kidney", name: "Kidney", system: "urinary",
    images: [["kidney (monkey).jpg", "Cortical labyrinth (glomeruli) vs medullary ray"], ["kidney cortical labyrinth (monkey).jpg", "Cortical labyrinth – glomeruli, PCT, DCT"], ["kidney medullary rays (monkey).jpg", "Medullary rays"], ["kidney outer medulla (monkey).jpg", "Outer medulla – thick limbs, collecting ducts"], ["kidney inner medullar (monkey).jpg", "Inner medulla – thin limbs, collecting ducts"]],
    features: [
      "Cortex: RENAL CORPUSCLES (glomerulus + Bowman space + capsule) — pathognomonic",
      "PCT: eosinophilic cuboidal cells, brush border (fuzzy lumen), few nuclei per cross-section, most numerous",
      "DCT: paler, smaller cells, more nuclei per section, clear lumen; macula densa at vascular pole",
      "Medullary rays: straight tubules (PST, thick ascending limb, collecting ducts) projecting into cortex",
      "Medulla: thin limbs (squamous, like capillaries without RBCs), collecting ducts (pale cuboidal→columnar with distinct cell borders), vasa recta",
    ],
    vs: [
      ["Thyroid", "Thyroid follicles contain colloid, no glomeruli"],
      ["Adrenal", "Adrenal cortex is cords of cells, no tubules or glomeruli"],
    ],
    path: "Glomerulonephritides (proliferation, crescents, BM changes), acute tubular injury (PCT most vulnerable), pyelonephritis, renal cell carcinoma (clear cell, from PCT).",
  },
  {
    id: "ureter", name: "Ureter", system: "urinary",
    images: [["ureter.jpg", "Ureter"]],
    features: [
      "STAR-shaped (stellate) lumen lined by TRANSITIONAL epithelium (urothelium) with dome-shaped umbrella cells",
      "No muscularis mucosae, no submucosa",
      "Muscularis: inner LONGITUDINAL + outer circular (upper 2/3); extra outer longitudinal in lower 1/3 (opposite of GI!)",
      "Adventitia with fat",
    ],
    vs: [
      ["Vas deferens", "Vas: pseudostratified with stereocilia; MUCH thicker 3-layer muscle relative to lumen"],
      ["Urinary bladder", "Bladder: thicker, haphazard 3-layer detrusor, large flat lumen"],
      ["Uterine tube", "Tube: highly branched mucosal folds with ciliated + peg cells, thin muscle"],
      ["Esophagus", "Esophagus: thicker stratified squamous, submucosal glands"],
    ],
    path: "Urolithiasis (obstruction at UPJ, pelvic brim, UVJ), hydroureter, urothelial carcinoma.",
  },
  {
    id: "bladder", name: "Urinary bladder", system: "urinary",
    images: [["urinary bladder.jpg", "Urinary bladder"]],
    features: [
      "TRANSITIONAL epithelium (5–7 layers when empty), large dome-shaped umbrella cells, some binucleate",
      "Lamina propria with blood vessels; no glands; no true muscularis mucosae (scattered bundles)",
      "Thick DETRUSOR muscle: 3 interwoven layers of smooth muscle in irregular bundles (not neat layers)",
      "Serosa (dome) / adventitia",
    ],
    vs: [
      ["Ureter", "Ureter: small stellate lumen, thinner 2–3 muscle layers"],
      ["Esophagus / vagina", "Stratified squamous – flattened top cells, not umbrella cells"],
    ],
    path: "Urothelial carcinoma (staging depends on muscularis propria invasion), cystitis, squamous metaplasia (Schistosoma → SCC).",
  },

  // ─────────────────────── MALE ───────────────────────
  {
    id: "testis", name: "Testis", system: "male",
    images: [["testis.jpg", "Testis – capsule, septa, lobules, rete testis"]],
    features: [
      "Thick capsule = TUNICA ALBUGINEA (dense CT); septa divide the testis into LOBULES converging on the mediastinum with the RETE TESTIS (anastomosing channels, low cuboidal)",
      "Round SEMINIFEROUS TUBULES with stratified germinal epithelium: spermatogonia (base) → primary spermatocytes (large, coarse chromatin) → spermatids → sperm in lumen",
      "Sertoli cells: pale, triangular nucleus with prominent nucleolus, basal",
      "Interstitial LEYDIG cells: clusters of eosinophilic polygonal cells between tubules (testosterone; Reinke crystals)",
    ],
    vs: [
      ["Epididymis", "Epididymis: uniform pseudostratified epithelium with stereocilia, sperm in lumen, no spermatogenesis"],
      ["Ovary", "Ovary has cortex with follicles; no tubules"],
    ],
    path: "Germ cell tumours (seminoma, from intratubular germ cell neoplasia), Sertoli-cell-only syndrome, cryptorchidism (atrophy), orchitis.",
  },
  {
    id: "epididymis", name: "Epididymis", system: "male",
    images: [["ductus deferens and epididymus.jpg", "Epididymis next to ductuli efferentes"]],
    features: [
      "One highly coiled duct cut many times: many round profiles with smooth, round lumens full of SPERM",
      "Tall PSEUDOSTRATIFIED columnar epithelium with long STEREOCILIA (non-motile)",
      "Uniform height epithelium (smooth luminal border); thin circular smooth muscle layer",
      "Neighbouring DUCTULI EFFERENTES (head of epididymis): SCALLOPED/wavy lumen from alternating tall ciliated and short cuboidal cells, little sperm",
    ],
    vs: [
      ["Ductus efferens", "Efferent ductules: scalloped lumen (alternating tall ciliated & short cells)"],
      ["Vas deferens", "Vas: ONE lumen with very thick 3-layer muscular wall"],
      ["Seminal vesicle", "SV: highly folded mucosa, eosinophilic secretion (no sperm)"],
    ],
    path: "Epididymitis (Chlamydia/gonorrhea in young; E. coli in older), spermatocele, adenomatoid tumour.",
  },
  {
    id: "vas", name: "Vas (ductus) deferens", system: "male",
    images: [["vas deferens.jpg", "Vas deferens – inner L, middle C, outer L muscle"], ["vas deferens epi.jpg", "Vas deferens – epithelium with stereocilia"]],
    features: [
      "Small, irregular/star-shaped lumen with VERY THICK muscular wall (3 layers: inner longitudinal, middle circular, outer longitudinal)",
      "Pseudostratified columnar epithelium with STEREOCILIA (shorter than in epididymis)",
      "Mucosa in longitudinal folds; adventitia; part of spermatic cord (with pampiniform plexus, cremaster)",
    ],
    vs: [
      ["Ureter", "Ureter: transitional epithelium, thinner muscle relative to lumen"],
      ["Muscular artery", "Artery has endothelium + internal elastic lamina, no tall epithelium"],
      ["Uterine tube", "Tube: elaborate branching folds, thin muscle"],
    ],
    path: "Vasectomy (sperm granuloma), congenital bilateral absence in cystic fibrosis.",
  },
  {
    id: "seminal-vesicle", name: "Seminal vesicle", system: "male",
    images: [["seminal vesicle.jpg", "Seminal vesicle – low power"], ["seminal vesicle mid.jpg", "Seminal vesicle – branching folds"]],
    features: [
      "Highly FOLDED, anastomosing mucosa forming many crypt-like spaces (honeycomb) – all communicating with a central lumen",
      "Pseudostratified (or simple) columnar epithelium; cells contain yellow LIPOFUSCIN; some atypical nuclei normal",
      "Lumen with EOSINOPHILIC secretion (fructose-rich); sperm usually absent",
      "Thick smooth muscle wall (inner circular, outer longitudinal)",
    ],
    vs: [
      ["Prostate", "Prostate: many separate tubuloalveolar glands embedded in fibromuscular stroma, corpora amylacea"],
      ["Gallbladder", "Gallbladder: simple tall columnar, NO lipofuscin, thin muscle, bile not eosinophilic secretion"],
      ["Uterine tube", "Tube: ciliated cells, thin muscle, folds don't fuse into honeycomb"],
    ],
    path: "Rarely primary disease; seminal vesicle epithelium in prostate biopsy can mimic cancer (atypical nuclei + lipofuscin).",
  },
  {
    id: "prostate", name: "Prostate", system: "male",
    images: [["prostate.jpg", "Prostate – prostatic alveoli around the prostatic urethra"], ["prostate mid.jpg", "Prostate – folded glands in smooth-muscle stroma"]],
    features: [
      "30–50 branched TUBULOALVEOLAR glands with papillary infoldings, embedded in a FIBROMUSCULAR stroma (smooth muscle + CT) — KEY",
      "Epithelium: two layers – secretory columnar + basal cells (basal layer lost in cancer)",
      "CORPORA AMYLACEA: concentric lamellated eosinophilic concretions in lumen (increase with age) — characteristic",
      "Prostatic urethra (transitional epithelium) may be seen; zones: peripheral, central, transition",
    ],
    vs: [
      ["Seminal vesicle", "SV: one convoluted sac with honeycomb mucosa, muscle wall not a stroma, no corpora amylacea"],
      ["Thyroid", "Thyroid follicles: simple cuboidal, homogeneous colloid, no muscle stroma"],
      ["Lactating breast", "Breast: alveoli in fat/CT lobules, no smooth muscle stroma"],
    ],
    path: "BPH (transition zone, nodular glands + stroma), adenocarcinoma (peripheral zone; small crowded glands without basal cells, Gleason grade), prostatitis.",
  },
  {
    id: "penis", name: "Penis", system: "male",
    images: [["penis.jpg", "Penis – corpus cavernosum and corpus spongiosum with tunica albuginea (TA)"], ["penis corpus cavernosum.jpg", "Corpus cavernosum – erectile tissue"], ["penis corpus spongiosum.jpg", "Corpus spongiosum with urethra"]],
    features: [
      "Two dorsal CORPORA CAVERNOSA + one ventral CORPUS SPONGIOSUM containing the penile URETHRA",
      "Erectile tissue: irregular vascular spaces lined by endothelium, separated by trabeculae with smooth muscle",
      "Thick TUNICA ALBUGINEA around cavernosa (thinner around spongiosum); deep dorsal vein, dorsal arteries & nerves",
      "Helicine arteries; thin skin without fat",
      "Penile urethra: pseudostratified/stratified columnar; glands of Littré",
    ],
    vs: [
      ["Hemangioma / spleen red pulp", "Erectile spaces are organised within a tunica albuginea and contain few cells"],
    ],
    path: "Peyronie disease (fibrosis of tunica albuginea), SCC (HPV), priapism, hypospadias.",
  },

  // ─────────────────────── FEMALE ───────────────────────
  {
    id: "ovary", name: "Ovary", system: "female",
    images: [["ovary.jpg", "Ovary – germinal epithelium, tunica albuginea, primordial follicles"], ["ovary corpus luteum.jpg", "Corpus luteum"], ["ovary corpus luteum and corpus albicans.jpg", "Corpus luteum and corpus albicans"]],
    features: [
      "Surface 'germinal' epithelium (really a modified mesothelium, does NOT make germ cells): simple cuboidal; tunica albuginea beneath",
      "CORTEX: cellular spindle-cell stroma with FOLLICLES at all stages – primordial (flat cells), primary (cuboidal, zona pellucida), secondary (antrum), Graafian (cumulus oophorus, theca interna/externa)",
      "Medulla: loose CT with large coiled vessels",
      "Corpus luteum: large folded structure of pale granulosa lutein cells (big) + smaller dark theca lutein cells at periphery",
      "Corpus albicans: pale, hyaline, acellular scar (white)",
    ],
    vs: [
      ["Testis", "Testis has tubules, no follicles"],
      ["Adrenal cortex", "Corpus luteum vs adrenal: CL is a folded rim with central clot/space, inside ovarian stroma"],
    ],
    path: "Functional cysts (follicular, CL), PCOS (multiple cystic follicles, thick cortex), surface epithelial tumours (serous, mucinous), germ cell tumours (teratoma), granulosa cell tumour (Call–Exner bodies).",
  },
  {
    id: "uterine-tube", name: "Uterine (fallopian) tube", system: "female",
    images: [["uterine tube.jpg", "Uterine tube – ampulla"]],
    features: [
      "Very elaborate, branched longitudinal MUCOSAL FOLDS (labyrinthine lumen, most in ampulla)",
      "Simple columnar epithelium: CILIATED cells + non-ciliated secretory PEG cells",
      "Thin muscularis (inner circular, outer longitudinal) – no submucosa; serosa",
    ],
    vs: [
      ["Seminal vesicle", "SV: honeycomb folds, lipofuscin, NO cilia, thick muscle"],
      ["Gallbladder", "Gallbladder folds are simpler; no cilia"],
      ["Ureter / vas", "Ureter: urothelium; vas: stereocilia + very thick muscle"],
    ],
    path: "Ectopic pregnancy (ampulla), salpingitis (PID), serous tubal intraepithelial carcinoma (STIC → high-grade serous ovarian carcinoma).",
  },
  {
    id: "uterus", name: "Uterus (endometrium phases)", system: "female",
    images: [["uterus.jpg", "Early proliferative vs late proliferative vs secretory (low power)"], ["uterus early proliferative.jpg", "Early proliferative endometrium"], ["uterus late proliferative.jpg", "Late proliferative endometrium"], ["uterus secretory.jpg", "Secretory endometrium"]],
    features: [
      "ENDOMETRIUM: simple columnar epithelium + tubular glands in a cellular stroma; functional layer (shed) and basal layer",
      "MYOMETRIUM: very thick smooth muscle in interlacing bundles (stratum vasculare with large vessels)",
      "PROLIFERATIVE (estrogen): straight, narrow tubular glands, mitoses, pseudostratified nuclei; thin → thicker",
      "SECRETORY (progesterone): coiled, SAW-TOOTHED glands, subnuclear then supranuclear vacuoles, secretion in lumen, stromal edema, spiral arteries, predecidual change",
      "Menstrual: breakdown, hemorrhage, stromal collapse",
    ],
    vs: [
      ["Cervix", "Cervix: branched mucous endocervical glands, dense fibrous stroma, little muscle"],
      ["Uterine tube", "Tube: elaborate folds, ciliated epithelium, thin muscle"],
    ],
    path: "Endometrial hyperplasia → endometrioid carcinoma (unopposed estrogen), leiomyoma (myometrium), adenomyosis, endometriosis, dating biopsies for infertility.",
  },
  {
    id: "cervix", name: "Cervix", system: "female",
    images: [["cervix.jpg", "Cervix"]],
    features: [
      "ENDOCERVIX: simple tall columnar MUCUS-secreting epithelium with large branched cleft-like glands; no goblet cells",
      "Nabothian cysts (mucus-filled dilated glands)",
      "ECTOCERVIX: stratified squamous non-keratinized (glycogenated) epithelium",
      "TRANSFORMATION ZONE: abrupt squamocolumnar junction",
      "Stroma: dense collagenous CT with little smooth muscle",
    ],
    vs: [
      ["Uterine body", "Uterus: endometrial glands in cellular stroma + thick myometrium"],
      ["Vagina", "Vagina: no glands at all"],
      ["Recto-anal junction", "Anal: colorectal crypts with goblet cells → squamous"],
    ],
    path: "HPV-related CIN/SCC arises in the transformation zone (Pap smear target); adenocarcinoma of endocervix; cervicitis.",
  },
  {
    id: "vagina", name: "Vagina", system: "female",
    images: [["vigina.jpg", "Vagina – low power"], ["vigina mid.jpg", "Vagina – glycogen-rich epithelium"]],
    features: [
      "Thick stratified squamous NON-keratinized epithelium with pale, GLYCOGEN-rich cells (clear cytoplasm)",
      "NO GLANDS in the wall (lubrication from cervix & transudate) — KEY",
      "Lamina propria rich in elastic fibres and thin-walled veins; NO muscularis mucosae, no submucosa",
      "Smooth muscle (inner circular, outer longitudinal) – often interlacing; adventitia",
    ],
    vs: [
      ["Esophagus", "Esophagus: muscularis mucosae + submucosal mucous glands, skeletal/smooth muscularis externa"],
      ["Ectocervix", "Ectocervix overlies dense fibrous stroma with endocervical glands nearby"],
      ["Skin", "Skin is keratinized with adnexa"],
    ],
    path: "Vaginal intraepithelial neoplasia / SCC, clear cell adenocarcinoma (DES exposure – adenosis), atrophic vaginitis.",
  },
  {
    id: "placenta", name: "Placenta", system: "female",
    images: [["placenta.jpg", "Placenta – chorionic villi"]],
    features: [
      "Numerous CHORIONIC VILLI cut in all planes floating in maternal blood (intervillous space)",
      "Villus covering: outer SYNCYTIOTROPHOBLAST (dark multinucleate, syncytial knots) + inner CYTOTROPHOBLAST (decreases in 3rd trimester)",
      "Villous core: mesenchyme with fetal capillaries and Hofbauer cells (macrophages)",
      "Decidua (large pale decidual cells) on maternal side; fibrinoid deposits",
    ],
    vs: [
      ["Lung", "Lung alveoli are air spaces lined by flat cells; villi are solid projections surrounded by blood"],
      ["Choroid plexus", "Choroid plexus: cuboidal epithelium on vascular cores in a ventricle"],
    ],
    path: "Hydatidiform mole (swollen hydropic villi, trophoblast proliferation), chorioamnionitis, placental infarcts, accreta (villi directly on myometrium – no decidua).",
  },
  {
    id: "breast", name: "Mammary gland", system: "female",
    images: [["mammary gland.jpg", "Inactive → pregnant → lactating mammary gland"]],
    features: [
      "Lobules (TDLU) of small ducts/alveoli embedded in loose intralobular CT, surrounded by dense interlobular CT and FAT",
      "Two-layered epithelium: luminal cuboidal/columnar + basal MYOEPITHELIAL cells",
      "INACTIVE: few small ducts, mostly CT + fat",
      "PREGNANT: lobules enlarge, alveoli proliferate, stroma reduced",
      "LACTATING: distended alveoli with secretion and lipid vacuoles, thin septa only",
      "Lactiferous ducts → nipple with stratified squamous epithelium & smooth muscle",
    ],
    vs: [
      ["Lactating breast vs thyroid", "Thyroid colloid is homogeneous and fills follicles evenly; breast secretion is vacuolated (lipid droplets) and has myoepithelium"],
      ["Prostate", "Prostate has smooth muscle stroma and corpora amylacea"],
      ["Sweat glands", "Sweat glands are coiled tubules in dermis, not lobules in fat"],
    ],
    path: "Fibroadenoma, fibrocystic change, DCIS/invasive ductal carcinoma (loss of myoepithelial layer = invasion), lobular carcinoma (E-cadherin loss).",
  },

  // ─────────────────────── ENDOCRINE ───────────────────────
  {
    id: "pituitary", name: "Pituitary gland (hypophysis)", system: "endo",
    images: [["pituitary gland.jpg", "Pituitary – whole"], ["pituitary gland pars distalis.jpg", "Pars distalis – acidophils, basophils, chromophobes"], ["pituitary gland pars intermedia.jpg", "Pars intermedia – Rathke cysts"], ["pituitary gland pars nervosa.jpg", "Pars nervosa – Herring bodies"]],
    features: [
      "Two halves side by side: dark-staining ADENOHYPOPHYSIS + pale fibrous NEUROHYPOPHYSIS",
      "Pars distalis: cords of cells around sinusoidal capillaries – ACIDOPHILS (pink: GH, PRL), BASOPHILS (blue: ACTH, TSH, FSH, LH), CHROMOPHOBES (pale)",
      "Pars intermedia: RATHKE CYSTS (colloid-filled follicles) + basophils between distalis and nervosa",
      "Pars nervosa: unmyelinated axons, PITUICYTES (glial nuclei), HERRING BODIES (axonal swellings storing ADH/oxytocin) – looks like nervous tissue",
    ],
    vs: [
      ["Thyroid", "Rathke cysts look like thyroid follicles, but sit between distalis and nervosa"],
      ["Adrenal", "Adrenal: concentric zonation, no nervous tissue part"],
      ["Pineal", "Pineal: pinealocytes in lobules + brain sand"],
    ],
    path: "Pituitary adenomas (prolactinoma commonest; GH → acromegaly; ACTH → Cushing disease), Sheehan syndrome (postpartum infarction), craniopharyngioma (Rathke pouch remnant).",
  },
  {
    id: "pineal", name: "Pineal body", system: "endo",
    images: [["pineal body.jpg", "Pineal – low power"], ["pineal body mid.jpg", "Pineal – pinealocytes and brain sand"]],
    features: [
      "Lobules of PINEALOCYTES (pale cells, large round/lobulated nuclei) + interstitial (glial/astrocyte) cells with darker elongated nuclei, separated by pia-derived septa",
      "CORPORA ARENACEA ('brain sand'): basophilic, concentric calcified concretions — KEY (increase with age, visible on X-ray/CT)",
      "No colloid follicles, no glands",
    ],
    vs: [
      ["Prostate corpora amylacea", "Both have concretions; prostate has glands in fibromuscular stroma"],
      ["Pituitary pars nervosa", "Pars nervosa: Herring bodies, no brain sand, adjacent adenohypophysis"],
    ],
    path: "Pinealoma/germinoma → Parinaud syndrome (compression of tectum), obstructive hydrocephalus; calcified pineal as midline marker.",
  },
  {
    id: "thyroid", name: "Thyroid gland", system: "endo",
    images: [["thyriod.jpg", "Thyroid follicles"], ["thyriod and parathyroid.jpg", "Thyroid with adjacent parathyroid"]],
    features: [
      "Round FOLLICLES of various sizes lined by simple cuboidal follicular cells, filled with homogeneous pink COLLOID (thyroglobulin)",
      "Active gland: taller cells, scalloped/vacuolated colloid edge; inactive: flattened cells, abundant colloid",
      "Parafollicular C cells: pale, larger, between follicles (calcitonin)",
      "Rich capillary network; thin capsule",
    ],
    vs: [
      ["Parathyroid", "Parathyroid: solid cords/sheets of chief cells (+ oxyphils, fat), no colloid follicles (except occasional)"],
      ["Pituitary pars intermedia", "Rathke cysts are few, small, beside neural tissue"],
      ["Lactating breast", "Breast: myoepithelial cells, lipid vacuoles in secretion"],
      ["Kidney", "Kidney has glomeruli and tubules with brush borders"],
    ],
    path: "Graves (tall hyperplastic cells, scalloped colloid), Hashimoto (lymphoid follicles, Hürthle cells), papillary carcinoma (Orphan Annie nuclei, psammoma bodies), medullary carcinoma (C cells, amyloid).",
  },
  {
    id: "parathyroid", name: "Parathyroid gland", system: "endo",
    images: [["parathyriod.jpg", "Parathyroid"], ["thyriod and parathyroid.jpg", "Parathyroid beside thyroid"]],
    features: [
      "Densely packed CORDS/SHEETS of cells with rich capillaries — no follicles",
      "CHIEF cells: small, numerous, pale-to-slightly eosinophilic cytoplasm, central nucleus (PTH)",
      "OXYPHIL cells: larger, strongly eosinophilic (mitochondria-rich), in clusters, increase with age",
      "Adipocytes increase with age; thin capsule; often embedded in/next to thyroid",
    ],
    vs: [
      ["Thyroid", "Thyroid = colloid-filled follicles"],
      ["Adrenal cortex", "Adrenal: zonated cords with lipid-rich (foamy) cells, medulla"],
      ["Lymph node", "Lymphocytes are smaller with scant cytoplasm; LN has sinuses and follicles"],
    ],
    path: "Parathyroid adenoma (commonest cause of primary hyperparathyroidism – loss of fat), hyperplasia (in CKD), accidental removal at thyroidectomy → hypocalcemia.",
  },
  {
    id: "adrenal", name: "Adrenal gland", system: "endo",
    images: [["adrenal gland.jpg", "Adrenal – cortex and medulla"], ["adrenal gland mid.jpg", "Adrenal – zones of cortex"]],
    features: [
      "Capsule → CORTEX (yellow, lipid) → MEDULLA (basophilic) — 'GFR' zonation",
      "Zona GLOMERULOSA: thin, rounded clusters/arches (aldosterone)",
      "Zona FASCICULATA: thickest; long straight cords of large pale vacuolated 'SPONGIOCYTES' (lipid) (cortisol)",
      "Zona RETICULARIS: anastomosing cords of smaller eosinophilic cells with lipofuscin (androgens)",
      "MEDULLA: chromaffin cells (basophilic, granular) in clusters + large central vein with thick longitudinal smooth muscle; occasional ganglion cells",
    ],
    vs: [
      ["Liver", "Liver: plates around central veins + portal triads; no zonation of this type"],
      ["Corpus luteum", "CL: folded luteinized cells in ovary"],
      ["Kidney", "Kidney has glomeruli/tubules (adrenal sits on top of it)"],
    ],
    path: "Cushing (fasciculata hyperplasia/adenoma), Conn (glomerulosa adenoma), Addison (autoimmune atrophy/TB), pheochromocytoma (medulla), neuroblastoma (children), CAH (reticularis/fasciculata hyperplasia).",
  },

  // ─────────────────────── NERVOUS ───────────────────────
  {
    id: "cerebral-cortex", name: "Cerebral cortex", system: "neuro",
    images: [["cerebral cortex.jpg", "Grey matter (cortex) vs white matter (medulla), choroid plexus"], ["cerebral cortex grey matter.jpg", "Grey matter – pyramidal neuron and glia"]],
    features: [
      "Grey matter on the outside, white matter inside; pia mater on surface",
      "6 layers (neocortex): molecular (few cells), external granular, external PYRAMIDAL, internal granular, internal pyramidal (giant Betz cells in motor cortex), multiform",
      "PYRAMIDAL neurons: triangular cell body, apical dendrite pointing to surface, Nissl substance, large nucleus with nucleolus",
      "Neuropil: pink fibrillary background; glia – astrocytes (large pale oval nucleus), oligodendrocytes (small round dark nucleus with perinuclear halo), microglia (small elongated dark nucleus)",
    ],
    vs: [
      ["Cerebellum", "Cerebellum: 3 layers – molecular, single row of Purkinje cells, densely dark granular layer; folia"],
      ["Spinal cord", "Spinal cord: grey matter INSIDE (butterfly) surrounded by white matter"],
    ],
    path: "Red neurons (acute ischemia, 12–24 h), gliosis, Alzheimer (plaques & tangles), infarct liquefactive necrosis, gliomas.",
  },
  {
    id: "choroid-plexus", name: "Choroid plexus", system: "neuro",
    images: [["cerebral cortex choriod plexus.jpg", "Choroid plexus in a ventricle"]],
    features: [
      "Papillary/frond-like projections into a VENTRICLE",
      "Simple CUBOIDAL epithelium (modified ependyma, with microvilli) covering cores of loose CT + fenestrated capillaries",
      "Produces CSF; may contain calcifications (psammoma-like)",
    ],
    vs: [
      ["Placenta", "Placental villi float in blood and are covered by syncytiotrophoblast"],
      ["Papillary thyroid carcinoma", "Papillae with ground-glass nuclei in thyroid, not cuboidal ependyma in a ventricle"],
    ],
    path: "Choroid plexus papilloma (children, lateral ventricle; hydrocephalus via CSF overproduction).",
  },
  {
    id: "spinal-cord", name: "Spinal cord", system: "neuro",
    images: [["spinal cord ventral horn.jpg", "Ventral horn – motor neurons"], ["spinal cord central canal.jpg", "Central canal lined by ependyma"]],
    features: [
      "Butterfly/H-shaped GREY matter INSIDE, surrounded by WHITE matter (myelinated tracts)",
      "VENTRAL horn: large multipolar MOTOR neurons with abundant Nissl substance, large nucleus & nucleolus",
      "Dorsal horn: smaller neurons; lateral horn in T1–L2 (sympathetic)",
      "CENTRAL CANAL lined by ciliated cuboidal/columnar EPENDYMAL cells (often obliterated in adults)",
      "Ventral median fissure (deep) vs dorsal median sulcus (shallow); meninges",
    ],
    vs: [
      ["Cerebral cortex", "Brain has grey matter OUTSIDE"],
      ["Spinal ganglion", "Ganglion: large round pseudounipolar neurons surrounded by satellite cells, no grey/white organisation"],
    ],
    path: "ALS & polio (loss of ventral horn motor neurons), syringomyelia (central canal expansion), B12 deficiency (dorsal columns), tabes dorsalis.",
  },
  {
    id: "spinal-ganglion", name: "Spinal (dorsal root) ganglion", system: "neuro",
    images: [["spinal ganglion.jpg", "Dorsal root ganglion"]],
    features: [
      "Clusters of LARGE ROUND pseudounipolar neuron cell bodies (no dendrites), central nucleus, prominent nucleolus",
      "Each neuron surrounded by a complete ring of small SATELLITE cells",
      "Bundles of nerve fibres pass between groups of neurons; CT capsule continuous with epineurium",
      "Lipofuscin in older neurons",
    ],
    vs: [
      ["Autonomic (sympathetic) ganglion", "Autonomic: smaller multipolar neurons, eccentric nuclei, INCOMPLETE satellite cell ring, neurons scattered evenly"],
      ["Spinal cord ventral horn", "Motor neurons are multipolar with processes, in neuropil, no satellite capsule"],
    ],
    path: "Herpes zoster / HSV latency in sensory ganglia; ganglioneuroma.",
  },

  // ─────────────────────── SKIN ───────────────────────
  {
    id: "skin", name: "Skin", system: "skin",
    images: [["skin.jpg", "Epidermis – melanin in basal layer, dermal papillae"]],
    features: [
      "Keratinized stratified squamous EPIDERMIS: stratum basale (melanin, melanocytes), spinosum (intercellular bridges, Langerhans cells), granulosum (keratohyalin granules), (lucidum in thick skin), corneum",
      "Dermal papillae interdigitate with epidermal rete ridges",
      "Dermis: papillary (loose CT, capillaries, Meissner corpuscles) + reticular (dense irregular CT)",
      "THICK skin (palm/sole): thick corneum, stratum lucidum, no hair; THIN skin: thin corneum, hair follicles & sebaceous glands",
      "Eccrine sweat glands: coiled; secretory part pale, duct 2-layered cuboidal & darker",
    ],
    vs: [
      ["Esophagus / vagina", "Non-keratinized: nuclei persist to surface, no granulosum or corneum"],
      ["Scalp", "Scalp: thin skin crowded with large terminal hair follicles extending into subcutis"],
      ["Lip", "Lip has skin + vermilion + oral mucosa + skeletal muscle"],
    ],
    path: "Basal cell carcinoma, SCC, melanoma (melanocytes at DE junction), psoriasis (parakeratosis, thin granulosum), eczema (spongiosis).",
  },
  {
    id: "scalp", name: "Scalp (thin skin with hair)", system: "skin",
    images: [["skin scalp.jpg", "Scalp – hair follicles and sebaceous glands"]],
    features: [
      "Thin keratinized epidermis",
      "Very numerous, large terminal HAIR FOLLICLES reaching deep into subcutaneous fat, cut at various levels",
      "Hair follicle: hair shaft, inner & outer root sheath, glassy membrane; hair bulb with dermal papilla",
      "SEBACEOUS glands (holocrine, foamy cells) opening into follicles; arrector pili smooth muscle; sweat glands",
    ],
    vs: [
      ["Thick skin", "Thick skin: no hair follicles, very thick stratum corneum, stratum lucidum"],
      ["Eyelid", "Eyelid: thin skin + tarsal plate, Meibomian glands, conjunctiva"],
    ],
    path: "Alopecia (scarring vs non-scarring), trichilemmal cysts, sebaceous hyperplasia.",
  },
  {
    id: "nail", name: "Nail", system: "skin",
    images: [["nail.jpg", "Nail – plate, bed, matrix"]],
    features: [
      "NAIL PLATE: hard, homogeneous eosinophilic keratin (no nuclei) resting on the nail bed",
      "NAIL BED: epidermis without granular layer; longitudinal ridges; dermis anchored to periosteum of distal phalanx",
      "NAIL MATRIX (proximal): proliferating epithelium forming the plate; eponychium (cuticle), hyponychium distally",
      "Distal phalanx bone usually in the section",
    ],
    vs: [
      ["Thick skin", "Skin corneum is layered/basket-weave, not a compact plate; has sweat glands"],
    ],
    path: "Onychomycosis, subungual melanoma (Hutchinson sign), psoriatic nail pitting, glomus tumour.",
  },

  // ─────────────────────── EYE & EAR ───────────────────────
  {
    id: "eye", name: "Eye (whole globe)", system: "senses",
    images: [["eye.jpg", "Eye – overview"]],
    features: [
      "Three tunics: outer fibrous (cornea + SCLERA), middle vascular UVEA (choroid, ciliary body, iris), inner RETINA",
      "Lens: elongated lens fibres in a thick capsule, anterior epithelium only",
      "Ciliary body with ciliary processes and ciliary muscle; limbus = corneoscleral junction (canal of Schlemm)",
      "Anterior chamber, posterior chamber, vitreous body",
    ],
    vs: [
      ["Cornea / iris / retina cards", "Use these for higher-power identification of each layer"],
    ],
    path: "Glaucoma (blocked angle/canal of Schlemm), cataract, retinoblastoma, uveal melanoma.",
  },
  {
    id: "cornea", name: "Cornea", system: "senses",
    images: [["cornea.jpg", "Cornea – 5 layers"]],
    features: [
      "5 layers: (1) stratified squamous NON-keratinized epithelium (5–7 layers), (2) Bowman membrane, (3) STROMA – orderly lamellae of collagen with flat keratocytes (≈90%), (4) Descemet membrane (thick BM), (5) endothelium (simple squamous/cuboidal)",
      "AVASCULAR; regularly arranged collagen gives transparency",
      "Continuous with sclera at the limbus",
    ],
    vs: [
      ["Esophagus / vagina", "Those have papillae, glands or vessels below; cornea has avascular regular stroma with Descemet + endothelium"],
      ["Sclera", "Sclera: irregular collagen, opaque, no epithelium on surface (covered by conjunctiva)"],
    ],
    path: "Keratoconus (Bowman breaks), Fuchs endothelial dystrophy (guttae, endothelial loss), corneal ulcer, Kayser-Fleischer ring (copper in Descemet).",
  },
  {
    id: "iris", name: "Iris", system: "senses",
    images: [["iris.jpg", "Iris"]],
    features: [
      "Anterior surface: incomplete layer of fibroblasts & melanocytes (labelled 'endothelium' on some slides – not a true epithelium) with crypts",
      "Stroma: loose vascular CT with melanocytes",
      "SPHINCTER pupillae (smooth muscle near pupillary margin) and DILATOR pupillae (myoepithelial)",
      "Posterior: 2 layers of heavily PIGMENTED epithelium — anterior pigment MYOEPITHELIUM (= dilator) + posterior pigment epithelium",
    ],
    vs: [
      ["Ciliary body", "Ciliary body has ciliary processes and a large ciliary muscle; double epithelium (only outer pigmented)"],
      ["Retina", "Retina is multi-layered neural tissue"],
    ],
    path: "Iris melanoma / nevus, neovascularization (rubeosis iridis in diabetes), iritis.",
  },
  {
    id: "retina", name: "Retina", system: "senses",
    images: [["retina monkey.jpg", "Retina – 10 layers"]],
    features: [
      "10 layers (outer → inner): RPE, rods & cones (photoreceptor segments), outer limiting membrane, OUTER NUCLEAR (photoreceptor nuclei), outer plexiform, INNER NUCLEAR (bipolar, horizontal, amacrine, Müller), inner plexiform, GANGLION CELL layer, nerve fibre layer, inner limiting membrane",
      "Easy pattern: three nuclear (dark) bands alternating with pale plexiform/segment layers",
      "Bruch's membrane under the RPE, then choroid (vascular, pigmented) and sclera",
      "Fovea: only cones, inner layers displaced",
    ],
    vs: [
      ["Cerebellum", "Cerebellum: molecular/Purkinje/granular, not 3 nuclear bands with segments"],
      ["Olfactory epithelium", "Single pseudostratified sheet, not layered neural tissue"],
    ],
    path: "Retinal detachment (between RPE and photoreceptors), diabetic retinopathy, retinoblastoma (Flexner-Wintersteiner rosettes), macular degeneration.",
  },
  {
    id: "eyelid", name: "Eyelid", system: "senses",
    images: [["eyelid.jpg", "Eyelid – full thickness"], ["eyelid tarsal gland.jpg", "Tarsal (Meibomian) gland"]],
    features: [
      "Outer surface THIN SKIN (hair follicles, sweat glands); inner surface palpebral CONJUNCTIVA (stratified columnar with goblet cells)",
      "TARSAL PLATE: dense fibrous CT containing large sebaceous MEIBOMIAN (tarsal) glands — KEY",
      "Orbicularis oculi skeletal muscle; eyelashes with glands of Zeis (sebaceous) and Moll (apocrine)",
      "Superior tarsal (Müller) smooth muscle in upper lid",
    ],
    vs: [
      ["Lip", "Lip: vermilion zone, minor salivary glands, no tarsal plate/Meibomian glands"],
      ["Scalp", "Scalp has no conjunctiva or tarsal plate"],
    ],
    path: "Chalazion (lipogranuloma of Meibomian gland), hordeolum/stye (Zeis gland infection), sebaceous carcinoma, BCC (lower lid).",
  },
  {
    id: "lacrimal", name: "Lacrimal gland", system: "senses",
    images: [["lacrimal gland.jpg", "Lacrimal gland – low power"], ["lacrimal gland mid.jpg", "Lacrimal gland – serous tubuloacini"]],
    features: [
      "SEROUS tubuloacinar gland with LARGER, irregular lumens than salivary acini",
      "Acinar cells: pale granular cytoplasm, surrounded by myoepithelial cells",
      "NO STRIATED DUCTS (intralobular ducts are simple)",
      "Plasma cells & lymphocytes in interstitium (IgA); lobules separated by CT",
    ],
    vs: [
      ["Parotid", "Parotid: small-lumen acini, prominent striated ducts, adipocytes"],
      ["Pancreas", "Pancreas: centroacinar cells, islets, intense basophilia"],
      ["Mammary gland", "Breast lobules sit in fat with intralobular CT"],
    ],
    path: "Sjögren syndrome (dry eyes), IgG4-related dacryoadenitis, pleomorphic adenoma, lymphoma.",
  },
  {
    id: "inner-ear", name: "Inner ear", system: "senses",
    images: [["inner ear.jpg", "Inner ear – cochlea and vestibule"], ["inner ear mid.jpg", "Cochlea – scala vestibuli, media, tympani"]],
    features: [
      "Spaces carved in the dense PETROUS temporal bone",
      "COCHLEA: spiral canal around the bony modiolus (spiral ganglion inside); in cross-section each turn shows 3 compartments – scala vestibuli, scala media (cochlear duct, endolymph), scala tympani",
      "Reissner (vestibular) membrane on top of scala media; basilar membrane below with ORGAN OF CORTI (hair cells, tectorial membrane, tunnel)",
      "Stria vascularis on the lateral wall (vascular epithelium producing endolymph)",
      "VESTIBULE: utricle & saccule with maculae (otoliths); semicircular canals with cristae ampullaris",
    ],
    vs: [
      ["Bone / marrow", "Look for membranous labyrinth spaces and the spiral ganglion within bone"],
    ],
    path: "Sensorineural hearing loss (hair cell loss – noise, aminoglycosides), Ménière disease (endolymphatic hydrops), vestibular schwannoma (CN VIII).",
  },
];

// ─────────────────────── COMPARISON TABLES ───────────────────────
const COMPARISONS = [
  {
    id: "gi-master", system: "gi", title: "GI tract – layer-by-layer master table",
    intro: "Work through the wall from lumen outward. The single best discriminator for each segment is bolded in the last column.",
    headers: ["Segment", "Epithelium", "Mucosa (glands / surface)", "Submucosa", "Muscularis externa", "Outer layer", "KEY clue"],
    rows: [
      ["Esophagus", "Strat. squamous non-keratinized", "No glands in LP (cardiac-type glands only near ends); thick longitudinal MM", "Esophageal glands proper (mucous)", "Skeletal (upper 1/3) → mixed → smooth (lower 1/3)", "Adventitia", "**Squamous + submucosal glands + skeletal/smooth muscle**"],
      ["Stomach – cardia", "Simple columnar mucous, no goblet", "Moderate pits; simple branched tubular MUCOUS glands", "No glands", "3 layers (oblique, circular, longitudinal)", "Serosa", "**Mucous glands right next to GE junction**"],
      ["Stomach – fundus/body", "Simple columnar mucous, no goblet", "Shallow pits (1/4), long straight glands with PARIETAL (pink) + CHIEF (blue) cells", "No glands; rugae", "3 layers", "Serosa", "**Parietal + chief cells**"],
      ["Stomach – pylorus", "Simple columnar mucous, no goblet", "DEEP pits (1/2), simple coiled tubular MUCOUS glands, G cells", "No glands", "Thick circular = pyloric sphincter", "Serosa", "**Deep pits + mucous glands + sphincter**"],
      ["Duodenum", "Columnar + brush border + goblet", "Leaf-like villi, crypts, Paneth cells", "**BRUNNER glands** (mucous)", "2 layers", "Serosa / adventitia (retroperitoneal)", "**Brunner glands**"],
      ["Jejunum", "Columnar + brush border + goblet", "Tallest finger-like villi; prominent plicae", "No glands, no Peyer patches", "2 layers", "Serosa", "**Tall villi, nothing extra (diagnosis of exclusion)**"],
      ["Ileum", "Columnar + more goblet cells", "Shorter villi; Peyer patches with M-cell dome", "**PEYER PATCHES** extend into submucosa", "2 layers", "Serosa", "**Peyer patches**"],
      ["Appendix", "Columnar + goblet cells", "NO villi; sparse irregular crypts; ring of lymphoid follicles", "Lymphoid tissue, fat", "2 complete layers (no taeniae)", "Serosa", "**Small lumen with ring of lymphoid follicles**"],
      ["Colon", "Columnar + MANY goblet cells", "NO villi; straight regular test-tube crypts", "No glands", "Inner circular + 3 TAENIAE COLI", "Serosa (appendices epiploicae)", "**No villi + goblet-rich crypts + taeniae**"],
      ["Rectum", "Columnar + many goblet", "Longer crypts; transverse folds", "No glands", "Complete longitudinal layer", "Adventitia", "**Colonic mucosa, no taeniae**"],
      ["Anal canal", "Columnar → transitional → strat. squamous non-ker. → keratinized", "Crypts end at pectinate line; anal columns", "Venous (hemorrhoidal) plexus", "Internal sphincter (smooth) + external (skeletal)", "Adventitia", "**Epithelial transition + sphincters**"],
    ],
  },
  {
    id: "gi-features", system: "gi", title: "GI tract – 'where is it found?' feature finder",
    intro: "Use when you spot one distinctive structure and need to place it.",
    headers: ["Feature", "Found in", "Not in / pitfall"],
    rows: [
      ["Goblet cells", "Small intestine, colon, rectum, appendix (also respiratory epithelium, conjunctiva)", "NOT in normal stomach or esophagus → their presence there = intestinal metaplasia (Barrett / chronic gastritis)"],
      ["Villi", "Small intestine only (duodenum, jejunum, ileum)", "Gallbladder & seminal vesicle folds can mimic villi; placenta villi are different"],
      ["Submucosal glands", "Esophagus (esophageal glands proper), Duodenum (Brunner)", "All other GI segments: none in submucosa"],
      ["Paneth cells (eosinophilic granules at crypt base)", "Small intestine, appendix, right colon (few)", "In left colon = Paneth cell metaplasia (chronic IBD)"],
      ["Large lymphoid aggregates", "Ileum (Peyer patches), appendix (ring), tonsils", "Solitary nodules anywhere in gut"],
      ["Skeletal muscle in muscularis", "Upper esophagus, external anal sphincter (+ tongue, lip)", "Rest of tract: smooth"],
      ["3-layer muscularis externa", "Stomach (extra inner oblique)", "Everywhere else: 2 layers"],
      ["Taeniae coli", "Caecum & colon", "Absent in rectum, appendix"],
      ["Stratified squamous epithelium", "Oral cavity, esophagus, anal canal", "Everything between: simple columnar"],
    ],
  },
  {
    id: "stomach", system: "gi", title: "Stomach regions",
    headers: ["", "Cardia", "Fundus / body", "Pylorus"],
    rows: [
      ["Pit depth", "Moderate", "Short (~1/4)", "**Deep (~1/2)**"],
      ["Gland type", "Simple branched tubular", "Simple tubular", "Simple coiled tubular"],
      ["Glands", "Short, mucous", "**Long, straight, parietal + chief cells**", "Short, coiled, mucous"],
      ["Dominant cells", "Mucous cells", "Parietal (pink, HCl/IF), chief (blue, pepsinogen), mucous neck", "Mucous cells, G cells (gastrin)"],
      ["Muscle", "3 layers", "3 layers", "**Thick circular sphincter**"],
      ["Pathology", "Reflux carditis", "Autoimmune gastritis → pernicious anemia", "H. pylori gastritis, ulcers"],
    ],
  },
  {
    id: "small-int", system: "gi", title: "Small intestine: duodenum vs jejunum vs ileum",
    headers: ["", "Duodenum", "Jejunum", "Ileum"],
    rows: [
      ["Villi", "Broad, leaf-like", "**Tallest, finger-like**", "Shorter, club-shaped"],
      ["Plicae circulares", "Start here", "**Most prominent**", "Few / absent distally"],
      ["Goblet cells", "Fewest", "Moderate", "**Most**"],
      ["Submucosa", "**Brunner glands**", "Nothing special", "**Peyer patches**"],
      ["Outer layer", "Mostly adventitia (retroperitoneal)", "Serosa", "Serosa"],
      ["Pathology", "Celiac biopsy, peptic ulcer", "—", "Crohn, typhoid, B12 absorption"],
    ],
  },
  {
    id: "junctions", system: "gi", title: "GI junctions",
    headers: ["Junction", "From → To", "Clues"],
    rows: [
      ["Esophago-gastric", "Strat. squamous → simple columnar mucous (no goblet)", "Esophageal submucosal glands on one side; gastric pits on the other"],
      ["Gastro-duodenal", "Gastric pits / pyloric glands → villi with goblet cells", "Brunner glands appear in submucosa; thick pyloric sphincter"],
      ["Ileo-caecal", "Villi → no villi", "Thickened circular muscle (ileocaecal valve)"],
      ["Recto-anal", "Columnar crypts with goblet cells → transitional → strat. squamous → skin", "Crypts end at pectinate line; internal anal sphincter; hemorrhoidal veins"],
    ],
  },
  {
    id: "glands", system: "gi-glands", title: "Serous / mixed exocrine glands – salivary, pancreas, lacrimal",
    intro: "All look like 'purple bunches of grapes'. Decide by acinus type, striated ducts and extras.",
    headers: ["", "Parotid", "Submandibular", "Sublingual", "Pancreas", "Lacrimal"],
    rows: [
      ["Acini", "**Pure serous**", "Mixed, **mostly serous**", "Mixed, **mostly mucous**", "Pure serous (very basophilic)", "Serous tubuloacinar, **large lumens**"],
      ["Mucous tubules / demilunes", "None", "Some, with serous demilunes", "Many, with demilunes", "None", "None"],
      ["Striated ducts", "Prominent", "**Longest / most**", "Short, few", "**None**", "**None**"],
      ["Special", "Adipocytes, facial nerve", "—", "No real capsule", "**Centroacinar cells + islets**", "Plasma cells (IgA)"],
      ["Pathology", "Pleomorphic adenoma, Warthin, mumps", "Stones", "Ranula", "Adenocarcinoma, pancreatitis", "Sjögren"],
    ],
  },
  {
    id: "hepatobiliary", system: "gi-glands", title: "Liver, gallbladder, bile duct",
    headers: ["", "Liver", "Gallbladder", "Extrahepatic bile duct"],
    rows: [
      ["Architecture", "Hepatocyte plates + sinusoids around central vein; portal triads", "Hollow sac, highly folded mucosa", "Round tube"],
      ["Epithelium", "— (bile ductules cuboidal in triad)", "Simple tall columnar, no goblet", "Simple columnar"],
      ["MM / submucosa", "—", "**Absent**", "Absent"],
      ["Muscle", "—", "Thin irregular smooth muscle", "Scattered smooth muscle in CT"],
      ["Clue", "**Portal triads**", "**Folds + no MM/submucosa + R-A sinuses**", "**CT wall, round lumen**"],
    ],
  },
  {
    id: "lymphoid", system: "lymphoid", title: "Lymphoid organs",
    headers: ["", "Lymph node", "Spleen", "Thymus", "Tonsils", "Peyer patch / appendix"],
    rows: [
      ["Capsule", "Complete, with trabeculae", "Thick, with trabeculae", "Thin, septa into lobules", "Partial (deep side)", "None"],
      ["Surface epithelium", "None", "None", "None", "**Yes** (squamous or respiratory)", "Yes (columnar + M cells)"],
      ["Cortex / medulla", "Yes", "No – white/red pulp", "**Yes, per lobule**", "No", "No"],
      ["Follicles / germinal centres", "Yes (outer cortex)", "Yes (white pulp)", "**NO**", "Yes", "Yes"],
      ["Sinuses", "**Subcapsular**, cortical, medullary", "Venous sinusoids in red pulp", "None", "None", "None"],
      ["Pathognomonic", "Subcapsular sinus, HEVs", "**Central arteriole in white pulp**", "**Hassall corpuscles**", "Crypts", "Within gut wall"],
      ["Filters", "Lymph", "Blood", "— (T-cell education)", "—", "—"],
    ],
  },
  {
    id: "tonsils", system: "lymphoid", title: "Tonsils",
    headers: ["", "Palatine", "Lingual", "Pharyngeal (adenoid)"],
    rows: [
      ["Epithelium", "Strat. squamous non-ker.", "Strat. squamous non-ker.", "**Pseudostratified ciliated (respiratory)**"],
      ["Crypts", "**10–20 deep, branched**", "**One shallow crypt each**", "None – folds/pleats"],
      ["Capsule", "Partial, dense", "Thin / poorly defined", "Thin"],
      ["Glands", "None drain into crypts", "**Mucous glands drain into crypt**", "Seromucous glands beneath"],
      ["Underneath", "Pharyngeal muscle", "Tongue skeletal muscle", "—"],
    ],
  },
  {
    id: "vessels", system: "cv", title: "Blood vessels",
    headers: ["", "Aorta (elastic)", "Muscular artery", "Saphenous vein", "Vena cava", "Typical medium vein"],
    rows: [
      ["Thickest layer", "**Media**", "**Media**", "Media", "**Adventitia**", "Adventitia"],
      ["Media", "Many elastic lamellae", "Circular smooth muscle", "Thick smooth muscle bundles", "Thin", "Thin"],
      ["Internal elastic lamina", "Indistinct", "**Prominent & wavy**", "Indistinct", "Indistinct", "Indistinct"],
      ["Adventitia", "Thin, vasa vasorum", "Moderate", "Thick", "**Very thick, longitudinal smooth muscle**", "Thick"],
      ["Lumen", "Large, round", "Round", "Irregular", "Large, irregular", "Collapsed, valves"],
    ],
  },
  {
    id: "airway", system: "resp", title: "Airway comparison",
    headers: ["", "Trachea", "Bronchus", "Bronchiole (for reference)"],
    rows: [
      ["Epithelium", "Pseudostrat. ciliated + goblet", "Pseudostrat. ciliated + goblet", "Simple ciliated columnar → cuboidal, club cells"],
      ["Cartilage", "**C-shaped rings**", "**Irregular plates**", "None"],
      ["Smooth muscle", "Trachealis (posterior only)", "**Continuous spiral layer**", "Prominent relative to wall"],
      ["Glands", "Seromucous", "Seromucous", "None"],
    ],
  },
  {
    id: "kidney-zones", system: "urinary", title: "Kidney – what's in each zone",
    headers: ["Zone", "Contents", "How to recognize"],
    rows: [
      ["Cortical labyrinth", "Renal corpuscles, PCT, DCT", "Glomeruli + mostly eosinophilic convoluted tubules"],
      ["Medullary rays", "PST, thick ascending limb, cortical collecting ducts", "Parallel straight tubules in cortex, no glomeruli"],
      ["Outer medulla", "Thick limbs, thin limbs, collecting ducts", "Mix of thick pink and pale tubules cut longitudinally/transversely"],
      ["Inner medulla / papilla", "Thin limbs, large collecting ducts (of Bellini), vasa recta", "Squamous thin limbs + pale columnar collecting ducts with clear borders"],
    ],
  },
  {
    id: "tubules", system: "urinary", title: "Tubular / stellate-lumen lookalikes (cross-system)",
    intro: "A muscular tube with a small, folded lumen — which is it?",
    headers: ["", "Ureter", "Vas deferens", "Uterine tube", "Esophagus", "Extrahepatic bile duct"],
    rows: [
      ["Epithelium", "**Transitional**", "**Pseudostrat. + stereocilia**", "**Simple columnar ciliated + peg**", "Strat. squamous", "Simple columnar"],
      ["Folds", "Stellate lumen", "Few longitudinal folds", "**Very branched, labyrinthine**", "Longitudinal folds", "Few"],
      ["Muscle", "2–3 layers, moderate", "**Very thick, 3 layers**", "Thin, 2 layers", "Thick, 2 layers", "Scattered in CT"],
      ["Extras", "Adventitial fat", "Spermatic cord structures", "Serosa", "Submucosal glands", "Peribiliary glands"],
    ],
  },
  {
    id: "male-glands", system: "male", title: "Male genital tract",
    headers: ["", "Testis", "Epididymis", "Vas deferens", "Seminal vesicle", "Prostate"],
    rows: [
      ["Epithelium", "Germinal epithelium + Sertoli", "**Tall pseudostrat. + long stereocilia**", "Pseudostrat. + stereocilia", "Pseudostrat./columnar, **lipofuscin**", "Columnar + basal cells (2 layers)"],
      ["Lumen", "Sperm developing", "**Sperm-filled, smooth lumen**", "Small, folded", "Eosinophilic secretion, honeycomb folds", "**Corpora amylacea**"],
      ["Wall / stroma", "Tunica albuginea; Leydig cells", "Thin smooth muscle", "**Very thick 3-layer muscle**", "Thick 2-layer muscle", "**Fibromuscular stroma**"],
      ["Pathology", "Seminoma", "Epididymitis", "CF absence", "Mimics cancer on biopsy", "BPH, adenocarcinoma"],
    ],
  },
  {
    id: "female-tract", system: "female", title: "Female tract – epithelium & wall",
    headers: ["", "Uterine tube", "Endometrium", "Endocervix", "Ectocervix", "Vagina"],
    rows: [
      ["Epithelium", "Simple columnar ciliated + peg", "Simple columnar", "Simple columnar mucous", "Strat. squamous non-ker.", "Strat. squamous non-ker., glycogen"],
      ["Glands", "None", "**Tubular glands in cellular stroma**", "**Branched mucous clefts, Nabothian cysts**", "None", "**None**"],
      ["Wall", "Thin muscle", "Thick myometrium", "Dense fibrous stroma", "Dense fibrous stroma", "Smooth muscle, elastic LP"],
    ],
  },
  {
    id: "endometrium", system: "female", title: "Endometrial cycle",
    headers: ["", "Early proliferative", "Late proliferative", "Secretory", "Menstrual"],
    rows: [
      ["Hormone", "Estrogen", "Estrogen", "Progesterone", "Withdrawal"],
      ["Glands", "Few, straight, narrow", "Longer, slightly tortuous, pseudostratified, mitoses", "**Coiled, saw-tooth, sub→supranuclear vacuoles, luminal secretion**", "Fragmented"],
      ["Stroma", "Compact", "Mitoses, mild edema", "Edema, spiral arteries, predecidua", "Hemorrhage, collapse"],
      ["Thickness", "Thin", "Thicker", "Thickest", "Shed"],
    ],
  },
  {
    id: "squamous", system: "skin", title: "Stratified squamous epithelium – where am I?",
    headers: ["Site", "Keratin", "Extras that identify it"],
    rows: [
      ["Thick skin", "Thick keratinized, stratum lucidum", "No hair, many eccrine glands"],
      ["Thin skin / scalp", "Thin keratinized", "Hair follicles, sebaceous glands"],
      ["Lip", "Keratinized → non-keratinized", "Skin + vermilion + mucosa + skeletal muscle core"],
      ["Tongue", "Para/keratinized filiform", "Papillae + 3-plane skeletal muscle"],
      ["Esophagus", "Non-keratinized", "Muscularis mucosae, submucosal glands"],
      ["Vagina / ectocervix", "Non-keratinized, glycogen-rich pale cells", "No glands (vagina); endocervical glands nearby (cervix)"],
      ["Palatine / lingual tonsil", "Non-keratinized", "Crypts + lymphoid follicles"],
      ["Cornea", "Non-keratinized, 5–7 layers", "Bowman membrane, avascular regular stroma, Descemet + endothelium"],
      ["Anal canal", "Non-ker. → keratinized", "Columnar crypts proximally, sphincters"],
    ],
  },
  {
    id: "follicles-endo", system: "endo", title: "Endocrine glands",
    headers: ["", "Pituitary", "Pineal", "Thyroid", "Parathyroid", "Adrenal"],
    rows: [
      ["Architecture", "Glandular part + neural part", "Lobules of pinealocytes", "**Colloid follicles**", "**Solid cords/sheets**", "**Zonated cortex + medulla**"],
      ["Key cells", "Acidophils, basophils, chromophobes; pituicytes", "Pinealocytes, astrocytes", "Follicular cells, C cells", "Chief + oxyphil cells, fat", "Spongiocytes (fasciculata), chromaffin cells"],
      ["Pathognomonic", "Herring bodies, Rathke cysts", "**Brain sand**", "Colloid", "Oxyphils + fat, no colloid", "Fasciculata cords, central vein"],
    ],
  },
  {
    id: "neural", system: "neuro", title: "Nervous tissue",
    headers: ["", "Cerebral cortex", "Spinal cord", "Spinal ganglion", "Pituitary pars nervosa"],
    rows: [
      ["Grey matter position", "**Outside**", "**Inside (butterfly)**", "No grey/white", "—"],
      ["Neurons", "Pyramidal, layered", "Multipolar motor neurons in ventral horn", "**Large round pseudounipolar + satellite ring**", "None (axons only)"],
      ["Other", "6 layers; pia", "Central canal with ependyma", "Nerve bundles between", "Herring bodies, pituicytes"],
    ],
  },
  {
    id: "eye", system: "senses", title: "Eye structures",
    headers: ["", "Cornea", "Iris", "Retina", "Eyelid"],
    rows: [
      ["Surface", "Strat. squamous non-ker.", "No epithelium anteriorly", "Inner limiting membrane", "Skin outside, conjunctiva inside"],
      ["Body", "Regular collagen stroma, avascular", "Vascular stroma with melanocytes, sphincter & dilator", "10 layers: 3 nuclear bands", "Tarsal plate + Meibomian glands, orbicularis oculi"],
      ["Back", "Descemet + endothelium", "2-layer pigmented epithelium", "RPE → choroid → sclera", "—"],
    ],
  },
];
