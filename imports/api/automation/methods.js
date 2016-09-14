import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Roles} from 'meteor/alanning:roles';
import Automation from './index.js';

export function saveCommand (commandName){
  check(commandName, String);
  if(Roles.userIsInRole(this.userId,'super-admin')){
          var command = Automation.findOne({place:"home"}).room.ir.recorded;
          command.name = commandName;
          Automation.update({place:"home"},{$push:{"room.ir.commands":command}});
          Automation.update({place:"home"},{$unset:{"room.ir.recorded":""}});
  }
    else {
      throw new Meteor.Error("not allowed", "Sorry you have to be super-admin to do this thing.");

    }
}

/*export function createPlace(place){
  check(place, String);
  if(Roles.userIsInRole(this.userId,'super-admin')){
          Automation.insert({userId:this.userId},{place:place});
  }
    else {
      throw new Meteor.Error("not allowed", "Sorry you have to be super-admin to do this thing.");

    }
}
*/

Meteor.methods({
  "automation.saveircommand": saveCommand
});
