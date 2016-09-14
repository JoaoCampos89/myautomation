import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import {AccountsTemplates} from 'meteor/useraccounts:core';

// all routes for game
var appRoutes = FlowRouter.group({
  prefix: '/app',
  name: 'app',
  triggersEnter: [
    AccountsTemplates.ensureSignedIn
  ]
});

// game layout page
var layoutPage = 'layoutPage';


// handling /game route
appRoutes.route('/room', {
  name: 'appRoomPage',
  action: function() {
    return BlazeLayout.render(layoutPage, {
      main: 'appRoomPage'
    });
  },
  triggersEnter: [function(context, redirect) {
    console.log('running /game trigger');
  }]
});

// handling /game route
appRoutes.route('/ircontrol', {
  name: 'appIrcontrolPage',
  action: function() {
    return BlazeLayout.render(layoutPage, {
      main: 'appIrcontrolPage'
    });
  },
  triggersEnter: [function(context, redirect) {
    console.log('running /game trigger');
  }]
});

// handling /game route
appRoutes.route('/rules', {
  name: 'appRulesPage',
  action: function() {
    return BlazeLayout.render(layoutPage, {
      main: 'appRulesPage'
    });
  }
});
// handling /game route
appRoutes.route('/rules/create', {
  name: 'appRulesCreatePage',
  action: function() {
    return BlazeLayout.render(layoutPage, {
      main: 'appRulesCreatePage'
    });
  }
});

// handling /game route
appRoutes.route('/rules/view/:id', {
  name: 'appRulesViewPage',
  action: function() {
    return BlazeLayout.render(layoutPage, {
      main: 'appRulesViewPage'
    });
  }
});

// handling /game route
appRoutes.route('/configuration', {
  name: 'appConfigurationPage',
  action: function() {
    return BlazeLayout.render(layoutPage, {
      main: 'appConfigurationPage'
    });
  }
});
