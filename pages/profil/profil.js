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
            document.getElementById("statut").innerHTML = statut;
        
            if(picture != null){
                document.getElementById("photo").innerHTML = "<img src='" + picture + "'>";
                
            }else { 
                document.getElementById("photo").innerHTML = "<img src='../../assets/imgs/default-user.png'>";
                
            }

            if(bio != null){
                document.getElementById("bio").innerHTML = bio;
            }else{
                document.getElementById("bio").innerHTML = "Veuillez entrer une petite biographie de vous";
            }
        });
    });
}

function update(){
    var statut = document.getElementById("statut").value;
    var bio = document.getElementById("bio").value;
        userInfo();    
        updateUser(statut, bio);
        UIkit.notification('<span uk-icon="icon: check"></span> Mise à jour du profil effectué', {
            status:'success'
        });
}

function userImg(){
    UIkit.upload('.js-upload', {
        url: '',
        multiple: false,
        allow: '*.(jpg|jpeg|gif|png)',

        beforeSend: function () {
            console.log('beforeSend', arguments);
        },

        beforeAll: function() {
            console.log('beforeAll', arguments);
        },

        load: function () {
            console.log('load', arguments);
        },

        error: function () {
            console.log('error', arguments);
        },

        complete: function () {
            console.log('complete', arguments);
        },

        loadStart: function () {
            console.log('loadStart', arguments);
        },

        loadEnd: function () {
            console.log('loadEnd', arguments);
        },

        completeAll: function () {
            console.log('completeAll', arguments);

            alert('telechargement terminer');
        }
    });
}

