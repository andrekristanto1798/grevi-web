const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '../'),
  outputPath: path.resolve(__dirname, '../', 'build'),
  entryDirPath: path.resolve(__dirname, '../', 'src/'),
  entryPath: path.resolve(__dirname, '../', 'src/app.jsx'),
  templatePath: path.resolve(__dirname, '../', 'src/templates/public.html'),
  imagesFolder: 'images',
  imagesAliasFolder: path.resolve(__dirname, '../', 'assets/images'),
  fontsFolder: 'fonts',
  cssFolder: 'css',
  jsFolder: 'js',
};
