const fs = require('fs');
const path = require('path');

const base = 'app/(pages)/afs-foils';
const dirs = fs.readdirSync(base, { withFileTypes: true }).filter(d => d.isDirectory() && d.name !== '[id]');

const allColors = new Set();
const bgColors = new Set();
const textColors = new Set();

for (const d of dirs) {
  const p = path.join(base, d.name);
  const files = fs.readdirSync(p).filter(f => f.endsWith('-html.ts') || f === 'silk-html.ts');
  for (const f of files) {
    const c = fs.readFileSync(path.join(p, f), 'utf8');
    const hexMatches = c.match(/#[0-9a-fA-F]{3,8}\b/g) || [];
    for (const h of hexMatches) allColors.add(h.toLowerCase());

    const bgMatches = c.match(/bg-\[([^\]]+)\]/g) || [];
    for (const b of bgMatches) bgColors.add(b);

    const txtMatches = c.match(/text-\[([^\]]+)\]/g) || [];
    for (const t of txtMatches) textColors.add(t);
  }
}

console.log('Total unique hex colors:', allColors.size);
console.log('Sample hex colors:', [...allColors].slice(0, 30));
console.log('\nUnique bg-[...]:', [...bgColors]);
console.log('\nUnique text-[...]:', [...textColors]);
