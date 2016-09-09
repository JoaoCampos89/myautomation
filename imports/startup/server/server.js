import {Meteor} from 'meteor/meteor';
import '../../api/accounts/index.js';
//import '../../api/game/index.js';
import '../../api/user/index.js';
//import '../../api/mysensors/index.js';
//import '../client/accounts/index.js';



var generateFixtures = false;

if (generateFixtures){
  Meteor.startup(function() {
    // generate users for app
    Meteor.users.generateFixtures();


  });

}
