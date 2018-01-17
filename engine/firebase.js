
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



/* Interface avec Firebase */
function emailLogin(email, password) {
  return new Promise((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
        console.log('Logged');
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
        console.log('Not Logged');
        
        reject(err);
    });
  });
}

function facebookLogin() {
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('email');
  firebase.auth().signInWithPopup(provider)
  .then(result => {
    var token = result.credential.accessToken;
    var user = firebase.auth().currentUser;

    if(user !=null){
      user.updateEmail(user.providerData[0].email);
    }
    console.log(token);
    console.log(user);
    window.location = "../organisateur/organisateur.html";
  }).catch(error => {
    console.log(error.code);
    console.log(error.message);
  })
  
}

function inscription(prenom, nom, birthday, email, password, passConf){
  firebase.auth().createUserWithEmailAndPassword(email,password)
  .then(res => {
    insertUser(prenom, nom, birthday);
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

function insertUser(prenom, nom, birthday) {
  getUID()
  .then(uid => {
    var database = firebase.database().ref(`users/${uid}/`);
    database.set({
      firstname : prenom,
      lastname  : nom,
      birthday  : birthday
    });
    console.log("Insert Success");
    console.log(uid);
  })
  .catch(err => {
    console.log(err);
  })
}
