import './create.html';
import './create.css';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import Automation from '/imports/api/automation';
import moment from 'moment';
import {ReactiveVar} from 'meteor/reactive-var';
import _ from 'underscore';

const templateName = 'appRulesCreatePage';
Template[templateName].onCreated(function(){
    this.rules = new ReactiveVar();
    this.actions = new ReactiveVar();
    var rules = [{index:0}];
    this.rules.set(rules);
    var actions = [{index:0}];
    this.actions.set(actions);
});

Template[templateName].helpers({
  rules:function(){
    return Template.instance().rules.get();
  },
  actions: function(){
    return Template.instance().actions.get();
  },
  moreThanOneRule:function(index){
    return index != 0;
  }
});

Template[templateName].events({
  "click .js-add-rule": function(event,template){
     event.preventDefault();
      var rules = template.rules.get();
      _.each(rules,function(rule){
          rules[rule.index].sensor = template.$('#ruleSensor'+rule.index).val();
          rules[rule.index].operator = template.$('#ruleOperator'+rule.index).val();
          rules[rule.index].value = template.$('#ruleValue'+rule.index).val();
      });
      var lastRule = _.last(rules);
      if(lastRule){
          rules.push({index: lastRule.index+1});
          }
        else {
          rules.push({index: 0});
        }
      template.rules.set(rules);
  },
  "click .js-remove-rule": function(event,template){
     event.preventDefault();
      var rules = template.rules.get();
      rules.pop();
      template.rules.set(rules);
  },

  "click .js-add-action": function(event,template){
     event.preventDefault();
      var actions = template.actions.get();
      _.each(actions,function(action){
          actions[action.index].actuator = template.$('#actuator'+action.index).val();
          actions[action.index].operator = template.$('#actuatorOperator'+action.index).val();
          actions[action.index].value = template.$('#actionValue'+action.index).val();
      });
      var lastAction = _.last(actions);
      if(lastAction){
          actions.push({index: lastAction.index+1});
          }
        else {
          actions.push({index: 0});
        }
      template.actions.set(actions);



  },
  "click .js-remove-action": function(event,template){
     event.preventDefault();
      var actions = template.actions.get();
      actions.pop();
      template.actions.set(actions);
  },
  "click .js-save-rule": function(event,template){
     event.preventDefault();
      var actions = template.actions.get();
      var rules = template.rules.get();

      var saveRule = {};
      saveRule.actions = actions;
      saveRule.rules = rules;
      saveRule.ruleName = template.$('#ruleName').val();
      Meteor.call("rule.saveRule", saveRule, function(error){
        if(!error)
          FlowRouter.go("appRulesPage");
      });
  }



});
