import {Mongo} from 'meteor/mongo';


const Automation = new Mongo.Collection("automation");
// deny all client side operations
Automation.allow({
  insert: function () {
    return false;
  },
  update: function () {
    return false;
  },
  remove: function () {
    return false;
  }
});

export default Automation;
