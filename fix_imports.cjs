const fs = require('fs');
const path = require('path');

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.ts')) {
      let content = fs.readFileSync(p, 'utf8');
      const original = content;
      content = content.replace(/\.ts(['"])/g, '.js$1');
      if (content !== original) {
        fs.writeFileSync(p, content);
        console.log('Fixed', p);
      }
    }
  });
}

walk('./backend');
walk('./api');
