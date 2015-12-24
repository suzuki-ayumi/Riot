'use strict';

var _ = require('lodash');

var DateDiff = function(origin, source) {
  this.origin = _.isDate(origin) ? origin : new Date(origin);
  this.source = _.isDate(source) ? source : new Date();
};

DateDiff.prototype.getDiffProp = function() {
  var sec, min, hour, day, month, year;
  var YEAR_STANDARD  = 365 * 24 * 60 * 60;
  var MONTH_STANDARD = 30 * 24 * 60 * 60;
  var DAY_STANDARD   = 24 * 60 * 60;
  var HOUR_STANDARD  = 60 * 60;
  var MIN_STANDARD   = 60;
  var diffSec        = Math.round((this.origin.getTime() - this.source.getTime()) / 1000);
  var isMinus        = false;

  if (diffSec < 0) {
    isMinus = true;
    diffSec = -diffSec;
  }

  year = Math.floor(diffSec / YEAR_STANDARD);
  diffSec -= year * YEAR_STANDARD;

  month = Math.floor(diffSec / MONTH_STANDARD);
  diffSec -= month * MONTH_STANDARD;

  day = Math.floor(diffSec / DAY_STANDARD);
  diffSec -= day * DAY_STANDARD;

  hour = Math.floor(diffSec / HOUR_STANDARD);
  diffSec -= hour * HOUR_STANDARD;

  min = Math.floor(diffSec / MIN_STANDARD);
  diffSec -= min * MIN_STANDARD;

  sec = diffSec;

  return {
    year: year,
    month: month,
    day: day,
    hour: hour,
    minute: min,
    second: sec,
    isMinus: isMinus,
  };
};

DateDiff.prototype.toString = function() {
  var diffProp = this.getDiffProp();
  var prefix = diffProp.isMinus ? '前' : '後';
  var resultString;

  if (diffProp.year >= 1) {
    resultString = diffProp.year + '年' + prefix;
  } else if (diffProp.month >= 1) {
    resultString = diffProp.month + 'ヶ月' + prefix;
  } else if (diffProp.day >= 1) {
    resultString = diffProp.day + '日' + prefix;
  } else if (diffProp.hour >= 1) {
    resultString = diffProp.hour + '時間' + prefix;
  } else if (diffProp.minute >= 1) {
    resultString = diffProp.minute + '分' + prefix;
  } else {
    resultString = diffProp.isMinus ? 'さっき' : 'すぐ後';
  }

  return resultString;
};

module.exports = DateDiff;
