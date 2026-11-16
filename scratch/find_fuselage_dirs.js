const fs = require('fs');
const path = require('path');

const dir = 'app/(pages)/afs-foils';
const entries = fs.readdirSync(dir, { withFileTypes: true });
const fuselageDirs = entries.filter(e => e.isDirectory() && e.name.includes('fus')).map(e => e.name);
console.log('Fuselage dirs:', fuselageDirs);
