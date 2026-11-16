const fs = require('fs');
const c = fs.readFileSync('app/(pages)/afs-foils/fuselink-fuselage/fuselink-fuselage-html.ts', 'utf8');
const matches = c.match(/class=\\"fus-showcase-grid[^"]*\\"/g);
console.log(matches);
