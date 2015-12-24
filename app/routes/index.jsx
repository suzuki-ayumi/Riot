'use strict';

var React = require('react');
var Inner = require('../components/topInner.jsx');

var IndexRoute = React.createClass({

  render: function() {
    return (
      <Inner />
    );
  }
  // render: function() {
  //   return (
  //     <ArticleSearchContainer
  //       initialRender={this._renderInitialInner}
  //     />
  //   );
  // },
  //
  // _renderInitialInner: function() {
  //   return <Inner />
  // },
});

module.exports = IndexRoute;
