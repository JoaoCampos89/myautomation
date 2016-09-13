import './index.html';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import Automation from '/imports/api/automation';
import moment from 'moment';


const templateName = 'appRoomPage';
Template[templateName].onCreated(function(){
    this.subscribe('roomAutomation');
    console.log(Automation.find({}).fetch());
});

Template[templateName].helpers({
  title:function(){
    return "Graca";
  },
  room: function(){
    return Automation.findOne({place:'home'}).room;
  },
  mqttStatus:function(){
    return Number(Automation.findOne({place:'home'}).settings.mqtt.status);
  },
  lampStatus: function(){
    return Number(Automation.findOne({place:'home'}).room.lamp.status);
  },
  formatDate:function(date){
    return moment(date).format();
  },
  classLamp:function(status){
    if(status){
      return 'btn-success';
    }else {
      return 'btn-danger';
    }
  },
  formatLampHtml:function(status){
    if(status){
      return 'ON';
    }else {
      return 'OFF';
    }
  }
});

Template[templateName].events({
  "click #lamp": function(){
    var lamp = document.getElementById("lamp");
    var status  = 0;
        // Todo client can modify the html
        if(lamp.innerHTML == "ON"){
         status = 0;
         Meteor.call('mqtt.toggleLamp', status);
        }else if (lamp.innerHTML == "OFF") {
          status = 1;
          Meteor.call('mqtt.toggleLamp', status);
        }{
        }
  }
});
