const fs = require('fs');
const glob = require('glob');

const files = glob.sync('/Users/mac/portfolio/src/app/admin/**/*.tsx');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Make handler async if it contains setStored
  content = content.replace(/const (handle\w+) = \(e: React\.FormEvent\) => \{/g, (match, name) => {
    changed = true;
    return `const ${name} = async (e: React.FormEvent) => {`;
  });
  
  // Make delete handlers async
  content = content.replace(/const (handleDelete\w+) = \((.*?)\) => \{/g, (match, name, args) => {
    changed = true;
    return `const ${name} = async (${args}) => {`;
  });
  
  // Also generic handlers like handleDelete
  content = content.replace(/const handleDelete = \((.*?)\) => \{/g, (match, args) => {
    changed = true;
    return `const handleDelete = async (${args}) => {`;
  });

  // Await all setStored calls
  content = content.replace(/(?<!await\s)setStored/g, (match) => {
    changed = true;
    return `await setStored`;
  });

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
