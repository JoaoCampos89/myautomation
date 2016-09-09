import {Template} from 'meteor/templating';



Template.registerHelper("$instance", function(argument, dict){
      if (dict){
          return Template.instance()['argument'].get(dict);
      }else{
          return Template.instance()['argument'].get();
      }
});
