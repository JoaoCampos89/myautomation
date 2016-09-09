T9n.setLanguage('pt');

AccountsTemplates.removeField('email');
AccountsTemplates.removeField('password');

/*if (Meteor.isServer) {
  Meteor.methods({
    "userExists": function(username) {
      return !!Meteor.users.findOne({
        username: username
      });
    },
  });
}*/
// adding field username
AccountsTemplates.addField({
  _id: 'username',
  type: 'text',
  required: true,
  func: function(value) {
    if (Meteor.isClient) {
      console.log("Validating username...");
      var self = this;
      Meteor.call("userExists", value, function(err, userExists) {
        if (!userExists)
          self.setSuccess()
        else
          self.setError(userExists);
        self.setValidating(false);
      });
      return;
    }
    // Server
    return Meteor.call("userExists", value);
  },
});


AccountsTemplates.addField({
  _id: 'email',
  type: 'email',
  required: false,
  /*  minLength: 6,
    re: /(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
    errStr: 'At least 1 digit, 1 lower-case and 1 upper-case',*/
});

// adding field password
AccountsTemplates.addField({
  _id: 'password',
  type: 'password',
  required: true,
  /*  minLength: 6,
    re: /(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
    errStr: 'At least 1 digit, 1 lower-case and 1 upper-case',*/
});

var mySubmitFunc = function(error, state) {
  if (!error) {
    if (state === "signIn") {
      if (Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'],
          'admin')) {
        FlowRouter.go("/admin");
      }
      if (Roles.userIsInRole(Meteor.userId(), ['see-game', 'play-game'],
          'player')) {
        FlowRouter.go("/game");
      }
    }
    if (state === "signUp") {
      FlowRouter.go("/game");
    }
  }
};

var myLogoutFunc = function() {
  FlowRouter.go('/');
};

AccountsTemplates.configure({
  defaultLayout: 'accountLayout',
  defaultLayoutRegions: {},
  defaultContentRegion: 'main',


  // Behavior
  confirmPassword: true,
  enablePasswordChange: true,
  forbidClientAccountCreation: false,
  overrideLoginErrors: true,
  sendVerificationEmail: false,
  lowercaseUsername: false,
  focusFirstInput: true,

  // Appearance
  showAddRemoveServices: false,
  showForgotPasswordLink: false,
  showLabels: true,
  showPlaceholders: true,
  showResendVerificationEmailLink: false,

  // Client-side Validation
  continuousValidation: false,
  negativeFeedback: false,
  negativeValidation: true,
  positiveValidation: true,
  positiveFeedback: true,
  showValidating: true,

  // Privacy Policy and Terms of Use
  privacyUrl: 'privacy',
  termsUrl: 'terms-of-use',

  // Redirects
  homeRoutePath: '/',
  redirectTimeout: 4000,

  // Hooks
  onLogoutHook: myLogoutFunc,
  onSubmitHook: mySubmitFunc,
  /*  preSignUpHook: myPreSubmitFunc,
  postSignUpHook: myAfterRegisterHook,
*/
  // Texts
  texts: {
    button: {
      signUp: "Register Now!"
    },
    socialSignUp: "Register",
    socialIcons: {
      "meteor-developer": "fa fa-rocket"
    },
    title: {
      forgotPwd: "Recover Your Password",
      signIn: "",
    },
  },
});
