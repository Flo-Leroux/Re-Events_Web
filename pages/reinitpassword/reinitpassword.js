function reinitpass() {
    var email = document.getElementById('userEmail').value;
    //console.log(email + ' ' + password);
    

    if(email!='') {
        reinitPass(email)
        .then(res => {
            //console.log(UIkit);
            UIkit.notification('<span uk-icon="icon: check"></span> Mail envoyer', {
                                            status:'success'
                                        });
        })
        .catch(err => {
            UIkit.notification('<span uk-icon="icon: check"></span> veuillez entrez un email', {
                status:'warning'
            });
        })
    }
}