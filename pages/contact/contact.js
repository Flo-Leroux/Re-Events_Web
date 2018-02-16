
/*var clientId = "91170523520-is44lmrelgi9k9te7ukk2s2lv1k9nkk1.apps.googleusercontent.com";
var apiKey = "AIzaSyCiGmuNLghmzFIxXZl-iWAKreeO8Yxlv50"
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];
var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';*/

function submitForm(){
  var name = document.getElementById('nomPrenom').value;
  var email = document.getElementById('email').value;
  var subject = document.getElementById('subject').value;
  var message = document.getElementById('message').value;
  var dataString = name + subject + email + message ;

  if (dataString == ""){
    UIkit.notification('<span uk-icon="icon: ban"></span> Merci de remplir tout les champs', {
      status:'warning'
    });
  }else if(name == ""){
    UIkit.notification('<span uk-icon="icon: ban"></span> Merci de remplir votre Nom et Prénom', {
      status:'warning'
    });
  }else if(email == ""){
    UIkit.notification('<span uk-icon="icon: ban"></span> Merci de remplir votre email ou l\'email est invalide', {
      status:'warning'
    });
  }else if(subject == ""){
    UIkit.notification('<span uk-icon="icon: ban"></span> Merci de remplir le sujet du message', {
      status:'warning'
    });
  }else if(message == ""){
    UIkit.notification('<span uk-icon="icon: ban"></span> Merci de remplir le message', {
      status:'warning'
    });
  }else {
    $.ajax({
      type: "POST",
      url : "contact.php",
      data: "name=" + name + "&subject=" + subject +  "&email=" + email + "&message=" + message,
      success: function(){
        console.log("Formulaire bien envoyer");
      },
      error: function(){
        console.log("Le formulaire a echouer");
      }
    });
  }
}

$("#contact").submit(function(event){
  // cancels the form submission
  event.preventDefault();
  submitForm();
});





