
function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    //console.log(email + ' ' + password);
    

    if(email!='' && password!='') {
        emailLogin(email, password)
        .then(res => {
            //console.log(UIkit);
            UIkit.notification('<span uk-icon="icon: check"></span> Logged', {
                                            status:'success'
                                        });
            window.location = "../organisateur/organisateur.html";
        })
        .catch(err => {

        })
    }
}

function fbLogin(){
    facebookLogin();
}