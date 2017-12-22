

(function()  {
    var config = {
    apiKey: "AIzaSyD0MmF-MK1JM6k3k2fcpHsbXPBtmz4Uc7U",
    authDomain: "r8f6jdmzsvjy.firebaseapp.com",
    databaseURL: "https://r8f6jdmzsvjy.firebaseio.com",
    projectId: "r8f6jdmzsvjy",
    storageBucket: "r8f6jdmzsvjy.appspot.com",
    messagingSenderId: "494033147650"
};
firebase.initializeApp(config);
    var txtemail = document.getElementById('email');
    var pass = document.getElementById('password');
    var btnLogin = document.getElementById('submit');

    btnLogin.addEventListener('click', e => {
        var email = txtemail.value;
        var password = pass.value;

        var auth = firebase.auth();

        var promise = auth.signInWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));
    })
})
