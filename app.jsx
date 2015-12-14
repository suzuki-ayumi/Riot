// 'use strict';
//
// var React                  = require('react');
// var Router                 = require('react-router');
// var Route                  = Router.Route;
// var RouteHandler           = Router.RouteHandler;
// var DefaultRoute           = Router.DefaultRoute;
//
// var Dispatcher       = require('./services/dispatcher');
// var globalDispatcher = new Dispatcher('global');
// var User             = require('./models/user');
// var Demand           = require('./models/demand');
// var ie8fix           = require('./services/ie8fix');
//
// //
// // Route handlers
// //
// var IndexRoute              = require('./routes/index.jsx');
// var SearchIndexRoute        = require('./routes/search/index.jsx');
// var KnowledgeRecentlyRoute   = require('./routes/knowledge/recently.jsx');
// var KnowledgeCreateRoute    = require('./routes/knowledge/create.jsx');
// var KnowledgeShowRoute      = require('./routes/knowledge/show.jsx');
// var QuestionRecentlyRoute   = require('./routes/question/recently.jsx');
// var QuestionCreateRoute     = require('./routes/question/create.jsx');
// var QuestionShowRoute       = require('./routes/question/show.jsx');
// var DivisionShowRoute       = require('./routes/division/show.jsx');
// var UserShowRoute           = require('./routes/user/show.jsx');
// var UserEditRoute           = require('./routes/user/edit.jsx');
// var NotificationDetailRoute = require('./routes/notification/detail.jsx');
//
// var GlobalHeader            = require('./components/global-header.jsx');
// var RecentlyDemandsShowcase = require('./components/recently-demands-showcase.jsx');
// var OpenableDemandsShowcase = require('./components/openable-demands-showcase.jsx');
//
// // Initilize for IE8
// ie8fix();
//
// var App = React.createClass({
//   _onWrapperClick: function() {
//     globalDispatcher.dispatch();
//   },
//
//   render: function() {
//     return (
//       <section className="wrapper" onClick={this._onWrapperClick}>
//         <GlobalHeader />
//
//         <section className="globalLeftPanel">
//           <RecentlyDemandsShowcase />
//         </section>
//
//         <section className="globalRightPane">
//           <RouteHandler />
//         </section>
//
//         <OpenableDemandsShowcase />
//       </section>
//     );
//   }
// });
//
// var routes = (
//   <Route name="app" path="/" handler={App}>
//     <Route name="index"              path="/"                        handler={IndexRoute} />
//     <Route                           path="/search"                  handler={SearchIndexRoute} />
//     <Route name="search"             path="/search/:keyword"         handler={SearchIndexRoute} />
//     <Route name="knowledgeCreate"    path="/knowledge/create"        handler={KnowledgeCreateRoute} />
//     <Route                           path="/knowledge/recently"       handler={KnowledgeRecentlyRoute} />
//     <Route name="knowledgeRecently"  path="/knowledge/recently/:page" handler={KnowledgeRecentlyRoute} />
//     <Route name="knowledgeShow"      path="/knowledge/:id"           handler={KnowledgeShowRoute} />
//     <Route name="questionCreate"     path="/question/create"         handler={QuestionCreateRoute} />
//     <Route                           path="/question/recently"       handler={QuestionRecentlyRoute} />
//     <Route name="questionRecently"   path="/question/recently/:page" handler={QuestionRecentlyRoute} />
//     <Route name="questionShow"       path="/question/:id"            handler={QuestionShowRoute} />
//     <Route name="divisionShow"       path="/division/:id"            handler={DivisionShowRoute} />
//     <Route name="userShow"           path="/user/:id"                handler={UserShowRoute} />
//     <Route name="userEdit"           path="/user/:id/edit"           handler={UserEditRoute} />
//     <Route name="notificationDetail" path="/notification"            handler={NotificationDetailRoute} />
//   </Route>
//
// );
//
// //
// // Application initialize
// //
// (function() {
//   var handler = function() {
//     User.fetchMe().then(function() {
//       Router.run(routes, null, function(Handler) {
//         React.render(<Handler />, document.body);
//       });
//     }, function() {
//       console.error('User fetch error!');
//     })
//   };
//
//   if (!document.addEventListener) {
//     return window.attachEvent('onload', handler);
//   }
//
//   return document.addEventListener('DOMContentLoaded', handler);
// })();
