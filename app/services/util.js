'use strict';

var Util = {};

// Util.DATETIME2_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS[0000]';
Util.DATETIME2_FORMAT = 'YYYY-MM-DD HH:mm:ss';

var _to2DigitsZerofilledString = function(number) {
  if (number < 10) return '0' + number;

  return number.toString();
};

Util.dateToDatetime2String = function(date) {
  if (!_.isDate(date)) console.error('dateにはDateを渡してください！');

  return date.getUTCFullYear() +
    '-' + _to2DigitsZerofilledString(date.getUTCMonth() + 1) +
    '-' + _to2DigitsZerofilledString(date.getUTCDate()) +
    ' ' + _to2DigitsZerofilledString(date.getUTCHours()) +
    ':' + _to2DigitsZerofilledString(date.getUTCMinutes()) +
    ':' + _to2DigitsZerofilledString(date.getUTCSeconds())// +
    //'.' + (date.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5);
};

Util.datetime2StringToDate = function(datetime2String) {
  if (!_.isString(datetime2String)) console.error('datetime2StringにはStringを渡してください！');

  var pattern = /^([1-9][0-9]{3})-([0-2][0-9])-([0-3][0-9])T([0-2][0-9]):([0-5][0-9]):([0-5][0-9])(\.[0-9]{1,7})?$/;
  var result  = regexp.exec(datetime2String);

  if (!result) console.error('datetime2フォーマットのStringではありません！');

  var year     = result[1];
  var month    = result[2];
  var day      = result[3];
  var hour     = result[4];
  var min      = result[5];
  var sec      = result[6];
  var millisec = result[7].slice(1);  // .を除外する

  return new Date(year, month - 1, day, hour, min, sec, millisec);
};

Util.getUnixEpochDate = function() {
  return new Date(1990, 0, 1, 9);
};

Util.getRandomString = function() {
  return Math.random().toString();
};

module.exports = Util;
