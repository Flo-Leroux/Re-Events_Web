
var clientId = "91170523520-is44lmrelgi9k9te7ukk2s2lv1k9nkk1.apps.googleusercontent.com";
var apiKey = "AIzaSyCiGmuNLghmzFIxXZl-iWAKreeO8Yxlv50"
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];
var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';


function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }


  function initClient() {
    gapi.client.init({
      discoveryDocs: DISCOVERY_DOCS,
      clientId: clientId,
      scope: SCOPES
    }).then(function () {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    });
  }
function loadGmailApi() {
    gapi.client.load('gmail', 'v1', function() {
        console.log("Loaded GMail API");
    });
}





