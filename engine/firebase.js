
/* Initialisation de Firebase */
const config = {
  apiKey: "AIzaSyD0MmF-MK1JM6k3k2fcpHsbXPBtmz4Uc7U",
  authDomain: "r8f6jdmzsvjy.firebaseapp.com",
  databaseURL: "https://r8f6jdmzsvjy.firebaseio.com",
  projectId: "r8f6jdmzsvjy",
  storageBucket: "r8f6jdmzsvjy.appspot.com",
  messagingSenderId: "494033147650"
};

firebase.initializeApp(config);

/* Initialisation de Facebook */
window.fbAsyncInit = function() {
  FB.init({
    appId      : '1306889219440575',
    cookie     : true,
    xfbml      : true,
    status     : true,
    version    : 'v2.10'
  });
    
  FB.AppEvents.logPageView();   
    
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

/* Global Variables */
let provider = new firebase.auth.FacebookAuthProvider();


/* Interface avec Firebase */
function emailLogin(email, password) {
  return new Promise((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
        //console.log('Logged');
        resolve(res);
    })
    .catch(err => {
      var errorCode = err.code;
      var errorMess = err.message;
      if(errorCode == "auth/invalid-email"){
        UIkit.notification('<span uk-icon="icon: ban"></span> L\' adresse email est incorrecte', {
          status:'warning'
        });
      }else if(errorCode == 'auth/user-disabled') {
        UIkit.notification('<span uk-icon="icon: ban"></span> L\' adresse email est désactivé', {
          status:'warning'
        });
      }
      else if(errorCode == "auth/user-not-found"){
        UIkit.notification('<span uk-icon="icon: ban"></span> Aucun utilisateur correspond a cette adresse mail.', {
          status:'warning'
        });
      } else if(errorCode == "auth/wrong-password"){
        UIkit.notification('<span uk-icon="icon: ban"></span> Le mot de passe est incorrecte', {
          status:'warning'
        });
      }  
        //console.log('Not Logged');
        
        reject(err);
    });
  });
}

function facebookLogin() {
  provider.addScope('email');
  provider.addScope('user_birthday');
  firebase.auth().signInWithPopup(provider)
  .then(result => {

    var token = result.credential.accessToken;
    //console.log(result.user);
    var user = firebase.auth().currentUser;
    var prenom = user.providerData[0].displayName;
  
    if (user != null) {
      user.updateEmail(user.providerData[0].email);
    }

    userStateFirebase()
    .then((user) => {
      return Promise.all([getFacebookUserInfo(),user.uid]);
    })
    
    .then(([fbDatas, uid]) => {
      //console.log('INFO');
      //console.log(uid);
      //console.log(fbDatas);
      return insertUser(uid, fbDatas.first_name, fbDatas.last_name, fbDatas.birthday, fbDatas.picture);
    })
    .then(() => {
      window.location = "../organisateur/organisateur.html";
    })
  }).catch(error => {
    console.log(error.code);
    console.log(error.message);
  })
}

function inscription(prenom, nom, birthday, email, password){
  firebase.auth().createUserWithEmailAndPassword(email,password)
  .then(res => {
    userStateFirebase()
    .then(user => {
      return insertUser(user.uid, prenom, nom, birthday, picture);
    })
    .then(() => {
      window.location = '../organisateur/organisateur.html';
    })
  })
  .catch(err => {
    var errorCode = err.code;
    var errorMessage = err.message;
    if(errorCode == "auth/email-already-in-use"){
      UIkit.notification('<span uk-icon="icon: ban"></span> L\' adresse email est déjà utiliser', {
        status:'warning'
      });
    }else if(errorCode == 'auth/invalid-email') {
      UIkit.notification('<span uk-icon="icon: ban"></span> L\' adresse email n\'est pas valide', {
        status:'warning'
      });
    }
    else if(errorCode == "auth/weak-password"){
      UIkit.notification('<span uk-icon="icon: ban"></span> Le mot de passe doit contenir au minimum 6 caractères.', {
        status:'warning'
      });
    }
    console.log(err);
  })
}

function userStateFirebase() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(function(user) {
      if(user != null) {
        resolve(user);
      }
      else {
        window.location = '../../index.html';
        reject();
      }
    });
  });
}

function insertUser(uid, prenom, nom, birthday, picture) {
  return new Promise((resolve, reject) => {
    let database = firebase.database().ref(`users/${uid}/`);
    database.set({
      firstname : prenom,
      lastname  : nom,
      birthday  : birthday,
      pictureURL  : picture.data.url
    })
    .then(() => {
      resolve();
    })
    .catch(() => {
      reject();
    })
  });
}

function getFacebookUserInfo(){
  return new Promise((resolve, reject) => {
    FB.getLoginStatus(function(response) {
      if(response.status === 'connected'){
        var IdFB = response.authResponse.userID;
        //console.log(IdFB);

        FB.api('/'+IdFB, {fields: 'last_name, first_name, birthday, picture.width(200).height(200)'} , function(response){
          resolve(response);
        });
      }
      else {
        reject();
      }
    })
  });
}

function deconnexion(){
  return new Promise((resolve, reject) => {
   firebase.auth().signOut()
   .then(() => {
     userStateFirebase();
   })
  });
}

function reinitPass(email){
  return new Promise((resolve, reject) => {
    firebase.auth().sendPasswordResetEmail(email)
    .then(res => {
      console.log("sent email");
      resolve(res);
    })
    .catch(err => {
      console.log("email non envoyer");
      reject(err)
    })
  });
}

function userConnect(){
  userStateFirebase()
  .then(user => {
    return firebase.database().ref('/users/' +user.uid).once('value')
    .then(snapshot => {
        var lastname = snapshot.val().lastname;
        var firstname = snapshot.val().firstname;

        document.getElementById("user").innerHTML = lastname+" "+firstname;
    })
  })
}

function updateUser(statut, bio){
  return new Promise((resolve, reject) => {
    userStateFirebase()
    .then(user =>{
      firebase.database().ref('users/' + user.uid).update({
        statut: statut,
        biography: bio
      });
      //console.log("Success");
      resolve(user);
    })
    .catch(err => {
      reject(err);
    })
    
  });
}
