const fs = require('fs');

const htmlPath = 'app/(pages)/afs-foils/fuselage-titanium/fuselage-titanium-html.ts';
let html = fs.readFileSync(htmlPath, 'utf8');

const t1 = 'class=\\"relative grid grid-cols-1 md:grid-cols-[1.35fr_minmax(0px,1fr)] items-center gap-[clamp(32px,5vw,80px)] max-w-[1300px] mx-auto\\"';
const r1 = 'class=\\"fus-choose-grid relative grid items-center gap-[clamp(32px,5vw,80px)] max-w-[1300px] mx-auto\\"';

const t2 = '<section class=\\"ultimate relative max-w-[1920px] grid grid-cols-1 md:grid-cols-[minmax(0px,1fr)_minmax(0px,1fr)] items-center gap-[clamp(32px,5vw,80px)] mt-[clamp(-40px,-3vw,0px)] mx-auto mb-0 global-margin z-10 lg:px-0 px-[clamp(20px,4vw,64px)]\\">';
const r2 = '<section id=\\"fus-nothing-lost\\" class=\\"ultimate fus-nothing-lost relative max-w-[1920px] grid items-center gap-[clamp(32px,5vw,80px)] mt-[clamp(-40px,-3vw,0px)] mx-auto mb-0 global-margin z-10 lg:px-0 px-[clamp(20px,4vw,64px)]\\">';

const t3a = 'class=\\"relative grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] items-center gap-[clamp(32px,5vw,80px)] max-w-[1240px] mx-auto\\"';
const t3b = 'class=\\"relative grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] max-w-[1240px] gap-[clamp(32px,5vw,80px)] mx-auto\\"';
const r3 = 'class=\\"fus-showcase-grid relative grid items-center gap-[clamp(32px,5vw,80px)] max-w-[1240px] mx-auto\\"';

console.log('t1 match:', html.includes(t1));
console.log('t2 match:', html.includes(t2));
console.log('t3a match count:', html.split(t3a).length - 1);
console.log('t3b match count:', html.split(t3b).length - 1);

html = html.replace(t1, r1);
html = html.replace(t2, r2);
html = html.replaceAll(t3a, r3);
html = html.replaceAll(t3b, r3);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Updated fuselage-titanium-html.ts');

const cssPath = 'app/(pages)/afs-foils/fuselage-titanium/fuselage-titanium.css';
let css = fs.readFileSync(cssPath, 'utf8');
css = css.replace(/\/\*[\s\S]*?\*\//g, '');

const extraCss = `
.fuselage-titanium-page .fus-choose-grid {
  display: grid !important;
  grid-template-columns: 1fr !important;
  gap: 2.5rem !important;
}

@media (min-width: 768px) {
  .fuselage-titanium-page .fus-choose-grid {
    grid-template-columns: 1.35fr 1fr !important;
    gap: clamp(32px, 5vw, 80px) !important;
    align-items: center !important;
  }
}

.fuselage-titanium-page .fus-nothing-lost {
  display: grid !important;
  grid-template-columns: 1fr !important;
  gap: 2.5rem !important;
}

@media (min-width: 768px) {
  .fuselage-titanium-page .fus-nothing-lost {
    grid-template-columns: 1fr 1fr !important;
    gap: clamp(32px, 5vw, 80px) !important;
    align-items: center !important;
  }
}

.fuselage-titanium-page .fus-showcase-grid {
  display: grid !important;
  grid-template-columns: 1fr !important;
  gap: 2.5rem !important;
}

@media (min-width: 768px) {
  .fuselage-titanium-page .fus-showcase-grid {
    grid-template-columns: 1fr 1.05fr !important;
    gap: clamp(32px, 5vw, 80px) !important;
    align-items: center !important;
  }
}
`;

if (!css.includes('.fuselage-titanium-page .fus-choose-grid')) {
  css += extraCss;
}

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Updated fuselage-titanium.css');
