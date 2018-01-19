

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

function register(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPass = document.getElementById('passwordConfirm').value;
    var prenom = document.getElementById('firstName').value;
    var nom = document.getElementById('lastName').value;
    var day = document.getElementById('birth-day').value;
    var month = document.getElementById('birth-month').value;
    var year = document.getElementById('birth-year').value;
    var birthday = day+"/"+month+"/"+year;
    console.log(birthday);

    if(prenom == '' || nom == ''){
        UIkit.notification('<span uk-icon="icon: ban"></span> Le champ du Prénom ou du Nom n\est pas complété', {
            status:'warning'
        });
    } else if(password != confirmPass) {
        UIkit.notification('<span uk-icon="icon: ban"></span> Le mot de passe de confirmation ne correspond pas au mot de passe ci-dessus', {
            status:'warning'
        });
    } else {
        //insertUser(prenom, nom, birthday);
        inscription(prenom, nom, birthday, email, password);
    }
}