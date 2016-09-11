
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {HTTP} from 'meteor/http';
import {Roles} from 'meteor/alanning:roles';
import _ from 'underscore';

var userId = [];
var users = {};
var User = Meteor.users;

Meteor.users.generateUser = function(){
  if (User.find({}).count() === 0) {
    var userObject = {
      //  username: Fake.word(),
      username: "joao",
      email: "j.campos893@gmail.com",
      password: "secret"
    };



    Accounts.createUser(userObject);
    var user = User.findOne({username:'joao'});
    Roles.addUsersToRoles(user._id, 'super-admin', Roles.GLOBAL_GROUP);

  }


}




Meteor.users.generateFixtures = function(){
  if (User.find({}).count() === 0) {
    // remove all users and populate them
    User.remove({});


    _(11).times(function(n) {

      var userObject = {
        //  username: Fake.word(),
        username: "user" + n,
        email: "email" + n + "@email.com",
        password: "password" + n
      };



     Accounts.createUser(userObject);


    });
    // getting fake users
    var response = HTTP.call("GET",
      "https://randomuser.me/api/?results=11");
    users = User.find({}).fetch();
    userId = _.map(users, function(user) {
      return user._id;
    });

    // populating the user profile
    _(11).times(function(n) {
    //  var sequence = getNextSequence("userid");
      if (n === 0) {
        User.update({
          _id: userId[n]
        }, {
          $set: {
          //  "localid": sequence,
            "profile.picture": response.data.results[n].user.picture
              .thumbnail,
            "profile.username": response.data.results[n].user.username,
            "profile.game.globalStats": _.random(0, 5),
            "profile.game.totalPlayed": _.random(30, 100),
            "game.logged": false
  //          "targetGroup.allowed": [targetGroupsId[_.random(0, 5)]],
          }

        });
        Roles.addUsersToRoles(userId[n], 'super-admin', Roles.GLOBAL_GROUP);
      } else {
        User.update({
          _id: userId[n]
        }, {
          $set: {
          //  "localid": sequence,
            "profile.picture": response.data.results[n].user.picture
              .thumbnail,
            "profile.username": response.data.results[n].user.username,
            "profile.game.globalStats": _.random(0, 5),
            "profile.game.totalPlayed": _.random(30, 100),
            "game.logged": false
//            "targetGroup.allowed": [targetGroupsId[_.random(0, 5)]],
//            "loggedTargetGroup": targetGroupsId[0]
          }

        });
        if (n < 5) {
          Roles.addUsersToRoles(userId[n], 'admin', 'admin');
        } else {
          Roles.addUsersToRoles(userId[n], ['see-game', 'play-game'],
            'player');
        }

      }

    });

  }

}
