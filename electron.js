var fs = require('fs');
var ncp = require('ncp').ncp;
var packager = require('electron-packager');
var process = require('process');

var opts = {
  arch: 'all',
  dir: 'electron_build',
  platform: 'all',
  out: 'electron_out',
  overwrite: 'true',
  version: '0.37.1'
};

var packageJson = require('./package.json');
var electronPackageJson = {
  main: 'main.js',
  name: packageJson.name,
  version: packageJson.version
};

ncp('dist', 'electron_build', function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  ncp('electron', 'electron_build', function (err) {
    if (err) {
      console.error(err);
      process.exit(2);
    }
    fs.writeFile('electron_build/package.json', JSON.stringify(electronPackageJson), function (err) {
      if (err) {
        console.error(err);
        process.exit(3);
      }
      packager(opts, function done (err) {
        if (err) {
          console.error(err);
          process.exit(4);
        }
      });
    });
  });
});
