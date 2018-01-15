
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
        console.log('Not Logged');
        reject(err);
    });
  });
}

var provider = new firebase.auth.FacebookAuthProvider();
function facebookLogin() {
  firebase.auth().signInWithPopup(provider)
  .then(result => {
    var token = result.credential.accessToken;
    var user = result.user;
    console.log(token);
    console.log(user);
  }).catch(error => {
    console.log(error.code);
    console.log(error.message);
  })
  window.location = "../organisateur/organisateur.html";
}
