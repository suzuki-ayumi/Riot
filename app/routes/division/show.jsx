'use strict';

var React                   = require('react');
var State                   = require('react-router').State;
var DivisionDetailContainer = require('../../components/division-detail-container.jsx');

var DivisionShowRoute = React.createClass({
  mixins: [State],

  render: function() {
    var divisionId = this.getParams().id;
    return (
      <div>
        <DivisionDetailContainer divisionId={divisionId}/>
      </div>
    );
  }
});

module.exports = DivisionShowRoute;
