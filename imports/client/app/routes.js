import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import {AccountsTemplates} from 'meteor/useraccounts:core';

// all routes for game
var appRoutes = FlowRouter.group({
  prefix: '/game',
  name: 'game',
  triggersEnter: [
    AccountsTemplates.ensureSignedIn
  ]
});

// game layout page
var layoutPage = 'layoutPage';

var gameLayoutPage = "gameLayoutPage";
// game sidebarPage
var sideBarPage = "gameSideBarPage";


// handling /game route
gameRoutes.route('/', {
  action: function() {
    return BlazeLayout.render(layoutPage, {
      sideBar: sideBarPage,
      main: gameLayoutPage,
      page: 'gamePage'
    });
  },
  triggersEnter: [function(context, redirect) {
    console.log('running /game trigger');
  }]
});
