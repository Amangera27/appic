const fs = require('fs');
function clean(path) {
  let c = fs.readFileSync(path, 'utf8');
  c = c.replace(/isDarkMode \? '([^']*)' : '([^']*)'/g, "'$2'");
  c = c.replace(/isDarkMode \? "([^"]*)" : "([^"]*)"/g, '"$2"');
  c = c.replace(/isDarkMode \? ([^ :?]+) : ([^ }]+)/g, '$2');
  c = c.replace(/isDarkMode=\{isDarkMode\}/g, '');
  c = c.replace(/, isDarkMode/g, '');
  c = c.replace(/isDarkMode,/g, '');
  c = c.replace(/\{ isDarkMode \}: [a-zA-Z]+Props/g, '');
  c = c.replace(/export default function ([A-Za-z0-9_]+)\([^)]*\) \{/g, 'export default function $1() {');
  fs.writeFileSync(path, c);
}
clean('src/components/SectionThree.tsx');
clean('src/components/EyeSection.tsx');
clean('src/components/Projects.tsx');
clean('src/components/FaqSection.tsx');
