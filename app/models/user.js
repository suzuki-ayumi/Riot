'use strict';

var _        = require('lodash');
var Division = require('./division');
var Ajax     = require('../services/ajax');

var User = function(prop) {
  var prop = prop || {}

  this.id            = prop.id;
  this.name          = prop.name;
  this.thumbUrl      = prop.thumbUrl;
  this.division      = prop.division;
  this.positionName  = prop.positionName;
  this.favoriteTags  = prop.favoriteTags;
  this.expAmount     = prop.expAmount;
  this.phoneNumber   = prop.phoneNumber
  this.email         = prop.email;
  this.description   = prop.description;
  this.pastDivisions = prop.pastDivisions;
};

User.prototype.isExist = function() {
  return this > 0;
};

User.prototype.update = function() {
  return Ajax.post('/user/update', {
    id:          this.id,
    description: this.description,
    tags:        this.favoriteTags,
    thumbUrl:    this.thumbUrl,
  }, function(json, resolve, reject) {
    if (!json.user) return reject();

    User.me = User.parse(json.user);
    resolve(User.parse(json.user));
  });
};

User.fetchUserById = function(id) {
  return Ajax.post('/user/info', {
    user_id: id
  }, function(json, resolve, reject) {
    if (!json.user) return reject(new Error('USER_FIELD_HAS_UNDEFINED'));

    resolve(User.parse(json.user));
  });
};

User.fetchUsersByDivisionId = function(divisionId) {
  return Ajax.post('/division/members', { division_id: divisionId }, function(json, resolve, reject) {
    if (!json) return reject();
    var json_data = {};
    json_data.users = User.parse(json.users);
    json_data.division = json.division;

    resolve(json_data);
  });
};

User.fecthIsAdministrator = function(userId) {
  //TODO APIできたらURLを!!
  return Ajax.post('/user/check-administrator', { user_id: userId }, function(json, resolve, reject) {
    resolve(!!json.administrator_flg);
  });
};

User.getAnonymous = function() {
  return new User({
    id:           0,
    name:         '匿名',
    positionName: '',
    thumbUrl:     '',
    division:     new Division({ id: '0', name: '', phoneNumber: '' }),
    description:  '',
    favoriteTags: [],
    expAmount:    0,
    phoneNumber:  '',
    email:        '',
  });
};

User.parse = function(jsonOrJsons) {
  var parse = function(json) {
    var prop = {};

    prop.id       = json.user_id;
    prop.name     = json.last_name + json.first_name;
    prop.positionName = json.post_name;
    prop.thumbUrl = json.user_img || '';

    prop.division = Division.parse({
      division_id: json.division_id && json.division_id.toString() || '',
      division_name: json.division_name,
      extension_number: '',
    });

    prop.description   = json.user_description       || '';
    prop.favoriteTags  = [];
    prop.expAmount     = parseInt(json.user_exp, 10) || 0;
    prop.phoneNumber   = json.phs_number             || '';
    prop.email         = json.email.trim()           || '';
    prop.pastDivisions = Division.parse(json.division_history);

    if (_.isArray(json.favorite_tags)) {
      prop.favoriteTags = json.favorite_tags.map(function(t) {
        return t.tag_name;
      });
    }

    return new User(prop);
  };

  if (_.isArray(jsonOrJsons)) {
    return jsonOrJsons.map(function(json) {
      return User.parse(json);
    });
  }

  if (_.isPlainObject(jsonOrJsons)) {
    return parse(jsonOrJsons);
  }
};

User.fetchMe = function() {
  return Ajax.post('/user/me', {}, function(json, resolve, reject) {
    if (!json.user) return reject();

    User.me = User.parse(json.user);
    resolve(User.parse(json.user));
  });
};

User.me = null;

module.exports = User;
