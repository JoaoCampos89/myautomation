import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ValidationError}from 'meteor/mdg:validation-error'
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Roles} from 'meteor/alanning:roles';
import Automation from './index.js';
import {Meteor} from 'meteor/meteor';

export const createPlace = new ValidatedMethod({
  name: 'automation.createPlace',
  validate: new SimpleSchema({
    place: { type: String }
  }).validator(),
  run({ place }) {

    if(Roles.userIsInRole(this.userId,'super-admin')){
            return Automation.insert({userId:this.userId, place:place});
    }
      else {
        throw new ValidationError([
            {
              name: 'server',
              type: 'NOT_ALLOWED',
              description : "Sorry you have to be super-admin to do this thing."
            }
          ]);
        //throw new Meteor.Error("not allowed", "Sorry you have to be super-admin to do this thing.");

      }
  }
});
