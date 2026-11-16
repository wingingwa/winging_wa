const fs = require('fs');
const c = fs.readFileSync('app/(pages)/afs-foils/fuselink-fuselage/fuselink-fuselage-html.ts', 'utf8');
['fus-choose-grid', 'fus-nothing-lost', 'fus-showcase-grid'].forEach(k => {
  let idx = 0;
  while ((idx = c.indexOf(k, idx)) !== -1) {
    console.log(k, idx, c.substring(idx - 40, idx + 60));
    idx += k.length;
  }
});
