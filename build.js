const fs = require('fs');
let enc = fs.readFileSync('node_modules/gifenc/dist/gifenc.js', 'utf8').replace(/\/\/# sourceMappingURL=.*$/m, '');
if (enc.includes('</script')) throw new Error('unsafe');
const src = fs.readFileSync('src/index.src.html', 'utf8');
if (!src.includes('/*__GIFENC__*/')) throw new Error('placeholder missing');

fs.writeFileSync('index.html', src.replace('/*__GIFENC__*/', () => enc));
console.log('built', fs.statSync('index.html').size, 'bytes');
