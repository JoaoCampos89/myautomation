import {Meteor} from 'meteor/meteor';
import '../../api/accounts/index.js';
//import '../../api/game/index.js';
import '../../api/user/index.js';
import Automation from '../../api/automation';
import '../../api/automation/validated-methods.js';
import mqttSettings from '../../api/mqtt/settings.js';
import mqttClient from '../../api/mqtt';
import  '../../api/mqtt/methods.js';
//import '../../api/mysensors/index.js';
//import '../client/accounts/index.js';

var init = 1;
Meteor.startup(function() {
if(init){
  if(Automation.find({}).count()==0){
      var automation = {};
      automation.place = "home";
      automation.room = {};
      automation.room.lamp = {};
      automation.room.lamp.status = false;
      automation.room.lamp.at = new Date();
      automation.room.ldr = {};
      automation.room.ldr.id = 1;
      automation.room.ldr.value = 80;
      automation.room.ldr.at = new Date();
      automation.room.ldr.changed = {};
      automation.room.ldr.changed.at = new Date();
      automation.room.ldr.changed.value = 80;
      automation.room.ir = {};
      automation.room.ir.recording = false;
      automation.room.ir.recorded = {};
      automation.room.ir.recorded.at = new Date();
      automation.room.ir.recorded.command = 1;
      automation.room.ir.recorded.protocol = 'NEC';
      automation.room.ir.commands = {};
      automation.room.ir.commands[0].protocol = 'NEC';
      automation.room.ir.commands[0].command = 2;
      automation.room.ir.commands[0].at = new Date();
      automation.settings = {};
      automation.settings.mqtt = mqttSettings;
      Automation.insert(automation);
  }

  if(Meteor.users.find({}).count()==0){
      Meteor.users.generateUser();
  }

}

});

var generateFixtures = false;

if (generateFixtures){
  Meteor.startup(function() {
    // generate users for app
    Meteor.users.generateFixtures();


  });

}
