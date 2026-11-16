const fs = require('fs');

['fuselage-titanium', 'fuselage-advanced'].forEach(name => {
  const contentPath = `app/(pages)/afs-foils/${name}/${name}-content.tsx`;
  console.log(`=== ${name} ===`);
  const c = fs.readFileSync(contentPath, 'utf8');
  console.log(c.substring(c.indexOf('return'), c.length));
});
