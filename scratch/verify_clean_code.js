const fs = require('fs');

const files = [
  'app/(pages)/afs-foils/fuselage-titanium/fuselage-titanium-html.ts',
  'app/(pages)/afs-foils/fuselage-titanium/fuselage-titanium.css',
  'app/(pages)/afs-foils/fuselage-titanium/fuselage-titanium-content.tsx',
  'app/(pages)/afs-foils/fuselage-titanium/page.tsx',
  'app/(pages)/afs-foils/fuselage-advanced/fuselage-advanced-html.ts',
  'app/(pages)/afs-foils/fuselage-advanced/fuselage-advanced.css',
  'app/(pages)/afs-foils/fuselage-advanced/fuselage-advanced-content.tsx',
  'app/(pages)/afs-foils/fuselage-advanced/page.tsx',
  'app/(pages)/afs-foils/fuselink-fuselage/fuselink-fuselage-html.ts',
  'app/(pages)/afs-foils/fuselink-fuselage/fuselink-fuselage.css'
];

let hasComments = false;
files.forEach(f => {
  if (!fs.existsSync(f)) return;
  const content = fs.readFileSync(f, 'utf8');
  const blockComments = content.match(/\/\*[\s\S]*?\*\//g);
  const lineComments = content.split('\n').filter(line => {
    const trimmed = line.trim();
    return trimmed.startsWith('//') && !trimmed.includes('https://') && !trimmed.includes('http://');
  });
  if (blockComments || lineComments.length > 0) {
    console.error(`File ${f} contains comments:`);
    if (blockComments) console.error('Block comments:', blockComments);
    if (lineComments.length > 0) console.error('Line comments:', lineComments);
    hasComments = true;
  } else {
    console.log(`File ${f}: CLEAN (0 comments)`);
  }
});

if (hasComments) {
  process.exit(1);
} else {
  console.log('ALL FILES CLEAN OF COMMENTS!');
}
