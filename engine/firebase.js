
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
        console.log('Logged');
        resolve(res);
    })
    .catch(err => {
        console.log('Not Logged');
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
    console.log(result.user);
    var user = firebase.auth().currentUser;

    if (user != null) {
      user.updateEmail(user.providerData[0].email);
    }

    getUID()
    .then(uid => {
      return insertUser(uid, 'Flo', 'Leroux', '19/05/1996');
    })
    .then(() => {
      window.location = "../organisateur/organisateur.html";
    })
  }).catch(error => {
    console.log(error.code);
    console.log(error.message);
  })
}

function inscription(prenom, nom, birthday, email, password, passConf){
  firebase.auth().createUserWithEmailAndPassword(email,password)
  .then(res => {
    getUID()
    .then(uid => {
      return insertUser(uid, prenom, nom, birthday);
    })
    .then(() => {
      window.location = '../organisateur/organisateur.html';
    })
  })
  .catch(err => {
    var errorCode = err.code;
    var errorMessage = err.message;
    if(errorCode == "auth/email-already-in-use"){
      console.log(UIkit);
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
    } else if(password != passconf){
      UIkit.notification('<span uk-icon="icon: ban"></span> Le mot de passe de confirmation n\'est pas le même que le mot de passe', {
        status:'warning'
      });
    }
    console.log(err);
  })
}

function getUID() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(function(user) {
      if(user != null) {
        resolve(user.uid);
      }
      else {
        window.location = '../../index.html';
        reject();
      }
    });
  });
}

function insertUser(uid, prenom, nom, birthday) {
  return new Promise((resolve, reject) => {
    let database = firebase.database().ref(`users/${uid}/`);
    database.set({
      firstname : prenom,
      lastname  : nom,
      birthday  : birthday
    })
    .then(() => {
      resolve();
    })
    .catch(() => {
      reject();
    })
  });
}
