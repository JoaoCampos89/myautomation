//We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
var mailgun = new Mailgun({apiKey: api_key, domain: domain});

var data = {
//Specify email data
from: from_who,
//The email to contact
to: from_who,
//Subject and text data
subject: 'ALERTA-ALGUÉM ACENDEU A LUZ',
html: ' Graca foi buscar sapato, lembrar de ligar sirene<p></p><a href="http://gracahome.herokuapp.com/">Acessar webAPP</a>'
}
mailgun.messages().send(data, function (err, body) {
//If there is an error, render the error page
if (err) {

  console.log("got an error: ", err);
}
//Else we can greet    and leave
else {
  //Here "submitted.jade" is the view file for this landing page
  //We pass the variable "email" from the url parameter in an object rendered by Jade

  console.log("email sended");
}
});
