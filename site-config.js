// Site build: histology + Micro II only. Other pathology cards are hidden (kept only so past-exam links resolve).
const SITE_EXAMS = ["m2"];
const PATHO_HIDDEN = [];
for (let i = PATHO.length - 1; i >= 0; i--)
  if (!SITE_EXAMS.includes(examOf(PATHO[i]))) PATHO_HIDDEN.unshift(...PATHO.splice(i, 1));
PATHO_HIDDEN.forEach(p => { p.images = []; });
const siteExam = v => SITE_EXAMS.includes(v) ? v : SITE_EXAMS[0];
PATH_EXAMS.splice(0, PATH_EXAMS.length, ...PATH_EXAMS.filter(e => SITE_EXAMS.includes(e.id)));
