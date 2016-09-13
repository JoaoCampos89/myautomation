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
  name: 'appRoom',
  action: function() {
    return BlazeLayout.render(layoutPage, {
      main: 'appIndexPage'
    });
  },
  triggersEnter: [function(context, redirect) {
    console.log('running /game trigger');
  }]
});

// handling /game route
appRoutes.route('/ircontrol', {
  name: 'ircontrolPage',
  action: function() {
    return BlazeLayout.render(layoutPage, {
      main: 'appIrcontrolPage'
    });
  },
  triggersEnter: [function(context, redirect) {
    console.log('running /game trigger');
  }]
});
