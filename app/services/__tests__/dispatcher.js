'use strict';

jest.autoMockOff();

var Dispatcher = require('../dispatcher');

describe('Dispatcherサービス', function() {
  it('Dispatcher#register()で関数を登録し、Dispatcher#unregister()で解除、Dispatcher#dispatch()で発火できる', function() {
    var dispatcher = new Dispatcher();
    var cb1Result, cb2Result;
    var cb3Result = true;

    var cb1 = dispatcher.register(function() {
      cb1Result = true;
    });

    var cb2 = dispatcher.register(function() {
      cb2Result = true;
    });

    var cb3 = dispatcher.register(function() {
      cb3Result = false;
    });

    dispatcher.unregister(cb3);

    dispatcher.dispatch();

    expect(cb1Result).toBe(true);
    expect(cb2Result).toBe(true);
    expect(cb3Result).toBe(true);
  });

  it('Dispatcher.find()で作成済みのdispatcherを探せる', function() {
    var dispatcher = new Dispatcher('myDispatcher');
    var cb1Result, cb2Result;

    var cb1 = dispatcher.register(function() {
      cb1Result = true;
    });

    var _dispatcher = Dispatcher.find('myDispatcher');

    var cb2 = _dispatcher.register(function() {
      cb2Result = true;
    });

    dispatcher.dispatch();

    expect(cb1Result).toBe(true);
    expect(cb2Result).toBe(true);
  });
});
