'use strict';

var $       = require('jquery');
var Promise = require('bluebird');
var Config  = require('./config');

var Ajax = function(method, url, data, callback) {
  var method = method.toUpperCase();

  if (typeof data === 'function' && !callback) {
    callback = data;
    data = {};
  }

  var option = {
    method: method,
    url: Config.baseUrl + url,
    data: data || {},
    dataType: 'json',
  };

  if (method !== 'GET') {
    option.contentType = 'application/json;charset=utf-8';
    option.data = JSON.stringify(data);
  }

  return new Promise(function(resolve, reject) {
    var hookedReject = function(err, errorNames) {
      if (!err) return reject(new Error('UNKNOWN_ERROR'));

      return reject(err, errorNames)
    };

    $.ajax(option).done(function(json) {
      if (json.errors.length > 0) {
        return reject(new Error(json.errors[0]), json.errors);
      }

      if (callback && typeof callback === 'function') {
        return callback(json, resolve, hookedReject);
      }

      return resolve(json);
    }).fail(function(xhr) {
      reject(new Error(xhr.statusText + ' : ' + Config.baseUrl + url));
    });
  });
};

Ajax.get = function(url, data, callback) {
  return Ajax('GET', url, data, callback);
};

Ajax.post = function(url, data, callback) {
  return Ajax('POST', url, data, callback);
};

Ajax.getProtocol = function() {
  var protocol = 'http:';

  if (location && location.protocol) {
    protocol = location.protocol;
  }

  return protocol + '//';
};

module.exports = Ajax;
