

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
    var prenom = document.getElementById('firstName').value;
    var nom = document.getElementById('lastName').value;
    var day = document.getElementById('birth-day').value;
    var month = document.getElementById('birth-month').value;
    var year = document.getElementById('birth-year').value;
    var birthday = day+"-"+month+"-"+year;
    console.log(birthday);

    insertUser(prenom, nom, birthday);

    inscription(email,password)
    console.log(UIkit);
    UIkit.notification('<span uk-icon="icon: ban"></span> L\' inscription n\'est pas valide', {
                                        status:'warning'
                                    });
}

function insertUser(prenom, nom, birthday) {
    var database = firebase.database().ref("users");
    database.push({
        firstname:prenom,
        lastname:nom,
        birthday:birthday
    });
    console.log("Insert Success");

}