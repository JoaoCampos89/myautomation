import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Roles} from 'meteor/alanning:roles';
import {Automation} from '../automation';
import mqttClient from './index.js';

export function toggleLamp (status){
  check(status, Number);
  if(Roles.userIsInRole(this.userId,'super-admin')){
    mqttClient.publish("home/lamp/toggle",status.toString());
  }
    else {
      throw new Meteor.Error("not allowed", "Sorry you have to be super-admin to do this thing.");

    }
}

export function startRecording (){

  if(Roles.userIsInRole(this.userId,'super-admin')){
    mqttClient.publish("home/ir/record");
  }
    else {
      throw new Meteor.Error("not allowed", "Sorry you have to be super-admin to do this thing.");

    }
}

Meteor.methods({
  "mqtt.toggleLamp": toggleLamp,
  "mqtt.startRecording": startRecording
});
