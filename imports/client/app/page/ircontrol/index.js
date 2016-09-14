import './index.html';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import Automation from '/imports/api/automation';
import moment from 'moment';


const templateName = 'appIrcontrolPage';
Template[templateName].onCreated(function(){
  //  this.subscribe('roomAutomation');
    console.log(Automation.findOne({place:'home'}));
});

Template[templateName].helpers({
  record: function(){
    console.log(Automation.findOne({place:'home'}));
    return Automation.findOne({place:'home'}).room.ir.recording;
  },
  commandRecorded: function(){
    return Automation.findOne({place:'home'}).room.ir.commandRecorded;
  },
  commands: function(){
    return Automation.findOne({place:'home'}).room.ir.commands;
  }
});

Template[templateName].events({
  "click .js-recording": function(){
    Meteor.call('mqtt.ir.recording');
  },
  "click .js-save-command": function(event, template){
    var commandName = template.$('input[name=command]').val();
    Meteor.call('automation.saveircommand', commandName);
  },
  "click .js-send-command": function(event, template){
    var commandName = template.$('.js-send-command').val();
    Meteor.call('mqtt.sendircommand', commandName);
  }
});
