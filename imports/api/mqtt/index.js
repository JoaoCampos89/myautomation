import Automation from '../automation';
import {Meteor} from 'meteor/meteor';
import mqttSettings from './settings.js';
var mqtt    = require('mqtt');
var mqttClient = {};

// code for INFRA RED 50153655;1

  var url = "mqtt://"+ mqttSettings.user+ ":" +mqttSettings.password + "@" + mqttSettings.server + ":" +mqttSettings.port;
  mqttClient = mqtt.connect(url); // you add a ws:// url here
  mqttClient.on("connect",Meteor.bindEnvironment(function(){
            Automation.update({place:"home"},{$set:{"settings.mqtt.status":true}});
            mqttClient.subscribe("home/ldr");
            mqttClient.subscribe("home/ldr/changed");
            mqttClient.subscribe("home/lamp/status");
            mqttClient.subscribe("home/ir/command");
            mqttClient.subscribe("home/$ip");
  }));

  mqttClient.on("message", Meteor.bindEnvironment(function(topic, payload) {
    console.log("topic: "+topic+" payload: "+payload);
    if(topic === "home/ldr"){
        Automation.update({place:"home"},{$set:{"room.ldr.value":payload.toString(),"room.ldr.at":new Date()}});

    }
    if(topic === "home/lamp/status"){
      Automation.update({place:"home"},{$set:{"room.lamp.status":payload.toString(),"room.lamp.at":new Date()}});
    }
    if(topic === "home/ldr/changed"){
      Automation.update({place:"home"},{$set:{"room.ldr.value":payload.toString(),"room.ldr.at":new Date()
            ,"room.ldr.changed.at":new Date(),"room.ldr.changed.value":payload.toString()}});
          }
    if(topic === "home/$ip"){
          Automation.update({place:"home"},{$set:{"settings.ip":payload.toString()}});
      }

  }));

  mqttClient.on("close",Meteor.bindEnvironment(function(){
        Automation.update({place:"home"},{$set:{"settings.mqtt.status":false}});
  }));








/*socket.on("home/lamp/toggle",function(status){
  mqttClient.publish("home/lamp/toggle",status);
});
socket.on("home/lamp/status",function(){
  mqttClient.publish("home/lamp/status/get");
});
socket.on("mailStatus",function(status){
      enableMail  = Number(status);
});
*/



export default mqttClient;
