'use strict';

var logger = {};

logger.log = function(message) {
  if (window.console) console.log(message);
};

logger.error = function(message) {
  
};

var complementConsole = function(isReplaceToAlert) {
  if (window.console) return;

  var CONSOLE_PROPERTIES = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml',
    'error', 'exception', 'group', 'groupCollapsed', 'groupEnd',
    'info', 'log', 'notifyFirebug', 'profile', 'profileEnd',
    'table', 'time', 'timeEnd', 'trace', 'warn'
  ];

  var fakeConsoleFunction = function() {};

  if (isReplaceToAlert) {
    fakeConsoleFunction = function(arg) {
      window.alert(arg);
    };
  }

  var mockFunction = function() {};

  CONSOLE_PROPERTIES.forEach(function(propertyName) {
    consoleMock[propertyName] = function() {};
  });

  window.console = consoleMock;
}
