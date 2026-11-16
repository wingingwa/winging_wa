const fs = require('fs');

['fuselage-titanium', 'fuselage-advanced'].forEach(name => {
  const pagePath = `app/(pages)/afs-foils/${name}/page.tsx`;
  const contentPath = `app/(pages)/afs-foils/${name}/${name}-content.tsx`;
  console.log(`=== ${name} ===`);
  if (fs.existsSync(pagePath)) {
    console.log(pagePath, fs.readFileSync(pagePath, 'utf8').substring(0, 300));
  }
  if (fs.existsSync(contentPath)) {
    console.log(contentPath, fs.readFileSync(contentPath, 'utf8').substring(0, 300));
  }
});
