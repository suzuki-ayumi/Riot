var fs      = require('fs');
var path    = require('path');
var _       = require('lodash');

var config = {
  configDir: '../configs',
  dest: '../app/config.json',
  bundledFilename: 'config.json',
};

var environment = process.env.NODE_ENV;
var defaultConfigJSON = require(path.join(config.configDir, 'default.json'));

var generateBundledConfig = function() {
  var json = _.clone(defaultConfigJSON);
  var filenames = fs.readdirSync(path.resolve(__dirname, config.configDir));

  if (filenames.indexOf(environment + '.json') > -1) {
    json = _.assign(
      json,
      require(path.join(config.configDir, environment + '.json'))
    );
  }

  fs.writeFileSync(
    path.resolve(__dirname, config.dest),
    JSON.stringify(json)
  );
};

var task = { config: config };

task.bundle = generateBundledConfig;

module.exports = task;
