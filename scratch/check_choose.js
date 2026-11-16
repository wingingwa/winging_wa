const fs = require('fs');
const c = fs.readFileSync('app/(pages)/afs-foils/fuselink-fuselage/fuselink-fuselage-html.ts', 'utf8');
const choose = c.match(/class=\\"fus-choose-grid[^"]*\\"/g);
const nothing = c.match(/<section[^>]*fus-nothing-lost[^>]*>/g);
console.log('choose:', choose);
console.log('nothing:', nothing);
