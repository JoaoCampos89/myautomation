import './index.html';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import Automation from '/imports/api/automation';
import moment from 'moment';


const templateName = 'appIrcontrolPage';
Template[templateName].onCreated(function(){
    this.subscribe('roomAutomation');
    console.log(Automation.find({}).fetch());
});

Template[templateName].helpers({
  record: function(){
    return Automation.findOne({place:'home'}).room.ir.recording;
  },
  commandRecorded: function(){
    return Automation.findOne({place:'home'}).commandRecorded;
  },
  commands: function(){
    return Automation.findOne({place:'home'}).commands;
  }
});

Template[templateName].events({
  "click .js-recording": function(){
    Meteor.call('mqtt.ir.recording');
  },
  "click .js-save-command": function(event, template){
    var commandName = template.$('input[name=command]').value;
    Meteor.call('automation.saveircommand', commandName);
  }
});
