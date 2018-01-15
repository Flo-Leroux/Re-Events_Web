

function verifMail(){
    var email = document.getElementById("email").value;
    var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-]+\.)+([a-zA-Z0-9]{2,4}))+$/;

    if(!re.test(email)) {
        console.log(UIkit);
        UIkit.notification('<span uk-icon="icon: ban"></span> L\' adresse email n\'est pas valide', {
            status:'warning'
        });
        //alert("veuiller fournir un adresse email valide");
        email.focus;
        return false;
    }
}