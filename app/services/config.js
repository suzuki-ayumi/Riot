'use strict';

var Config = require('../config.json');

var initialDataEl = window.document.getElementById('initialData');
var baseUrl = 'http://localhost:3000';
if (initialDataEl) baseUrl = initialDataEl.getAttribute('data-base-url');

Config.baseUrl = baseUrl;

module.exports = Config;
