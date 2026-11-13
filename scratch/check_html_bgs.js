const fs = require('fs');

const content = fs.readFileSync('app/(pages)/afs-foils/silk-v2-front-wing/silk-html.ts', 'utf8');

const regex = /bg-\[([^\]]+)\]/g;
let match;
const bgs = new Set();
while ((match = regex.exec(content)) !== null) {
  bgs.add(match[1]);
}
console.log('bg-[...] in silk-html:', [...bgs]);

const twRegex = /class=\\"[^\\"]*?\b(bg-(?:black|white|transparent|red-[0-9]+|blue-[0-9]+|gray-[0-9]+))\b/g;
const twBgs = new Set();
while ((match = twRegex.exec(content)) !== null) {
  twBgs.add(match[1]);
}
console.log('Standard bg in silk-html:', [...twBgs]);

const styleRegex = /style=\\"([^\\"]*?background[^\\"]*?)\\"/gi;
const styles = new Set();
while ((match = styleRegex.exec(content)) !== null) {
  styles.add(match[1]);
}
console.log('Style backgrounds:', [...styles]);
