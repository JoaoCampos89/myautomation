import './index.html';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {ReactiveVar} from 'meteor/reactive-var';
import {ReactiveDict} from 'meteor/reactive-dict';
import Automation from '/imports/api/automation';
import {createPlace} from '/imports/api/automation/validated-methods.js';
import _ from 'underscore';

const templateName = 'appConfigurationPage';
Template[templateName].onCreated(function(){
  this.createPlace = new ReactiveVar();
  this.createPlace.set(false);
  this.errors = new ReactiveDict();

});

Template[templateName].helpers({
      automations:function(){
        return Automation.find({userId: Meteor.userId()},{places:1});
      },
      createPlace:function(){
        return Template.instance().createPlace.get();
      },
      errors(fieldName) {
        return Template.instance().errors.get(fieldName);
      }



});

Template[templateName].events({
  'click .js-save-place': function(event,template){
       event.preventDefault();
       var data =  {};
       var place = template.$('input[name=place]').val();
       if (place)
          data.place = place;

      createPlace.call(data, function(error,result){
        if(error)
          handleErrors(error,template,['place']);


        if(result){
          clearErrors(template,['place']);
          template.createPlace.set(false);
        }

      });
  },
  'click .js-create-place': function(event,template){
          event.preventDefault();
          template.createPlace.set(true);
    }
});
/**
 * [clearErrors clear all errors in template erros dict]
 * @param  {[Template]} template [Template instance]
 * @param  {[array]} fields   [array of form fields]
 * @return {[null]}          [null]
 */
function clearErrors(template,fields){
    const errors = {};
  _.each(fields, function(field){
    errors[field] = [];
  });

  template.errors.set(errors);
}

/**
 * [handleErrors description]
 * @param  {[errors]} err      [errors returned by the method call]
 * @param  {[Template]} template [Template instance]
 * @param  {[array]} fields   [form fields]
 * @return {[null]}         
 */
function handleErrors(err,template,fields){
  clearErrors(template,fields)
  const errors = {};
  if (err.error === 'validation-error') {
          // Initialize error object
          // Go through validation errors returned from Method
          err.details.forEach((fieldError) => {
            // XXX i18n
            errors[fieldError.name].push(fieldError.type);
          });

          // Update ReactiveDict, errors will show up in the UI
          template.errors.set(errors);
        }
}
