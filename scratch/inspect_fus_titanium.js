const fs = require('fs');
const c = fs.readFileSync('app/(pages)/afs-foils/fuselage-titanium/fuselage-titanium-html.ts', 'utf8');

const regexes = [
  /class=\\"relative grid grid-cols-1 md:grid-cols-\[1\.35fr_minmax\(0px,1fr\)\][^"]*\\"/g,
  /class=\\"ultimate relative max-w-\[1920px\] grid grid-cols-1 md:grid-cols-\[minmax\(0px,1fr\)_minmax\(0px,1fr\)\][^"]*\\"/g,
  /class=\\"relative grid grid-cols-1 md:grid-cols-\[minmax\(0,1fr\)_minmax\(0,1\.05fr\)\][^"]*\\"/g
];

regexes.forEach((r, i) => {
  let m;
  while ((m = r.exec(c)) !== null) {
    console.log(`Regex ${i}:`, m[0]);
  }
});
