import {AccountsTemplates} from 'meteor/useraccounts:core';


//Routes
//AccountsTemplates.configureRoute('changePwd');
//AccountsTemplates.configureRoute('forgotPwd');
//AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn', {
  layoutType: 'blaze',
  name: 'signin',
  path: '/signin',
  //  template: 'myLogin',
  layoutTemplate: 'accountLayout',
  contentRegion: 'main'
});
AccountsTemplates.configureRoute('signUp', {
  layoutType: 'blaze',
  name: 'signUp',
  path: '/sign-up',
  //  template: 'myLogin',
  layoutTemplate: 'accountLayout',
  contentRegion: 'main'
});
