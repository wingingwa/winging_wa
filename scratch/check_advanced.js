const fs = require('fs');

const p = 'app/(pages)/afs-foils/fuselage-advanced/fuselage-advanced-html.ts';
if (fs.existsSync(p)) {
  const c = fs.readFileSync(p, 'utf8');
  console.log('fuselage-advanced exists, length:', c.length);
  console.log('has md:grid-cols-[1.35fr:', c.includes('md:grid-cols-[1.35fr'));
  console.log('has fus-choose-grid:', c.includes('fus-choose-grid'));
} else {
  console.log('fuselage-advanced-html.ts does not exist');
}
