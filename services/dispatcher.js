'use strict';

var PREFIX = 'ID_';
var dispatchers = {};

var Dispatcher = function(name) {
  this._callbacks = {};
  this._lastId = 1;

  if (name) dispatchers[name.toString()] = this;
};

Dispatcher.find = function(name) {
  if (dispatchers[name]) return dispatchers[name];

  return new Dispatcher(name);
};

Dispatcher.prototype.register = function(callback) {
  var id = PREFIX + this._lastId++;

  this._callbacks[id] = callback;

  return id;
};

Dispatcher.prototype.unregister = function(id) {
  delete this._callbacks[id];
};

Dispatcher.prototype.dispatch = function(payload) {
  var results = {};

  Object.keys(this._callbacks).forEach(function(id) {
    if (this._callbacks[id]) results[id] = this._callbacks[id](payload);
  }, this)

  return results;
};

module.exports = Dispatcher;
