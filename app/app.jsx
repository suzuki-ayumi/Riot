var React                  = require('react');
var Router                 = require('react-router');
var ReactDOM               = require('react-dom');
var Route                  = Router.Route;
var RouteHandler           = Router.RouteHandler;
var DefaultRoute           = Router.DefaultRoute;

var Dispatcher       = require('./services/dispatcher');
var globalDispatcher = new Dispatcher('global');

//
// Application initialize
//
(function() {
  Router.run(routes, null, function(Handler) {
    ReactDOM.render(<Handler />, document.body);
  });

  if (!document.addEventListener) {
    return window.attachEvent('onload', handler);
  }

  return document.addEventListener('DOMContentLoaded', handler);
})();
