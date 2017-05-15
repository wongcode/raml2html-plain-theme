const glob = require('glob');
const raml2html = require('raml2html');
const fs = require('fs');

process.chdir(__dirname);

const config = raml2html.getConfigForTemplate('index.nunjucks');
const examples = glob.sync('examples/*.raml');

examples.forEach((ramlFile) => {
  console.log(ramlFile);
  raml2html.render(ramlFile, config).then((result) => {
    const filename = ramlFile.replace('.raml', '.html');
    fs.writeFileSync(filename, result);
  }, (error) => {
    console.log('error! ', error);
  });
});
