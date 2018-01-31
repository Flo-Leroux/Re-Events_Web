function userInfo(){
    userStateFirebase()
    .then(user => {
        return firebase.database().ref('/users/' +user.uid).once('value')
        .then(snapshot => {
            var lastname = snapshot.val().lastname;
            var firstname = snapshot.val().firstname;
            var birthday = snapshot.val().birthday;
            var statut = snapshot.val().statut;
            var bio = snapshot.val().biography;
            var picture = snapshot.val().pictureURL;
            document.getElementById("nom").innerHTML = lastname;
            document.getElementById("prenom").innerHTML = firstname;
            document.getElementById("birthday").innerHTML = birthday;
            document.getElementsByName("statut").innerHTML = statut;
            document.getElementById("bio").innerHTML = bio;
            document.getElementById("photo").innerHTML = "<img src='" + picture + "'>";

        })
    })
}

function update(){
    var statut = document.getElementById("statut").value;
    var bio = document.getElementById("bio").value;
    updateUser(statut, bio);
    UIkit.notification('<span uk-icon="icon: check"></span> Mise à jour du profil effectué', {
        status:'success'
    });
    userInfo();
}