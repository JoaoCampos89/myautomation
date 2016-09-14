import './create.js';
import './view.js';
import './index.html';

import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import Automation from '/imports/api/automation';



const templateName = 'appRulesPage';
Template[templateName].onCreated(function(){

});

Template[templateName].helpers({
  rules:function(){
    return Automation.findOne({place:"home"}).rules;
  }
});

Template[templateName].events({

});
