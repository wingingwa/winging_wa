const fs = require('fs');
const path = require('path');

const base = 'app/(pages)/afs-foils';
const dirs = fs.readdirSync(base, { withFileTypes: true }).filter(d => d.isDirectory() && d.name !== '[id]');

for (const d of dirs) {
  const p = path.join(base, d.name);
  const cssFiles = fs.readdirSync(p).filter(f => f.endsWith('.css'));
  for (const f of cssFiles) {
    const c = fs.readFileSync(path.join(p, f), 'utf8');
    const rootMatches = c.match(/(?:body|html|\.lp-root|:\s*root)[^{]*\{[^}]*\}/gi) || [];
    if (rootMatches.length > 0) {
      console.log(d.name, f, 'root rules:', rootMatches.slice(0, 3));
    }
  }
}
