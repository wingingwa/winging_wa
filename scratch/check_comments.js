const fs = require('fs');
const c = fs.readFileSync('app/(pages)/afs-foils/fuselage-titanium/fuselage-titanium.css', 'utf8');
const comments = c.match(/\/\*[\s\S]*?\*\//g);
console.log('Comments count:', comments ? comments.length : 0);
if (comments) {
  console.log('Comments:', comments);
}
