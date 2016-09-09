import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';

// layout page
var layoutPage = 'layoutPage';

var mainPage = 'indexPage';

// handling /game route
FlowRouter.route('/', {
  action: function() {
    return BlazeLayout.render(layoutPage, {
      main:mainPage
    });
  },
  triggersEnter: [function(context, redirect) {
    console.log('running /game trigger');
  }]
});
