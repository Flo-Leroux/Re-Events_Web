
function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    //console.log(email + ' ' + password);
    

    if(email!='' && password!='') {
        emailLogin(email, password)
        .then(res => {
            console.log(UIkit);
            UIkit.notification('<span uk-icon="icon: check"></span> LLogged', {
                                            status:'success'
                                        });
            window.location = "../organisateur/organisateur.html";
        })
        .catch(err => {
            UIkit.notification('<span uk-icon="icon: ban"></span> L\' email ou le mot de passe sont incorrectes', {
                status:'warning'
            });
        })
    }
}

function fbLogin(){
    facebookLogin()
    .then(result => {
        console.log(UIkit);
        UIkit.notification('<span uk-icon="icon: check"></span> Logged', {
                                        status:'success'
                                    });
    })
    .catch(error => {
        UIkit.notification('<span uk-icon="icon: ban"></span> Not Logged', {
            status:'warning'
        });
    })
}