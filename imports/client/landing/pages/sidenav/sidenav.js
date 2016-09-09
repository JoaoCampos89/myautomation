import './sidenav.html';
import './sidenav.css';
import {Template} from 'meteor/templating';
//import {AccountsTemplates} from 'meteor/useraccounts:core';

const templateName = 'sidenavPage';

Template[templateName].events({
  "click .js-toggle-nav": function(event, template) {
      event.preventDefault();
      document.getElementById("mySidenav").classList.toggle("visible");


  //  AccountsTemplates.logout();
  }
});
