function userInfo(){
    userStateFirebase()
      .then(user => {
        return firebase.database().ref('/users/' +user.uid).once('value')
        .then(snapshot => {
            var lastname = snapshot.val().lastname;
            var firstname = snapshot.val().firstname;
            var birthday = snapshot.val().birthday;
            var status = snapshot.val().statut;
            var bio = snapshot.val().biography;
            document.getElementById("nom").innerHTML = lastname;
            document.getElementById("prenom").innerHTML = firstname;
            document.getElementById("birthday").innerHTML = birthday;
            document.getElementsByName("status").innerHTML = status;
            document.getElementById("bio").innerHTML = bio;
            
        })
      })
  }