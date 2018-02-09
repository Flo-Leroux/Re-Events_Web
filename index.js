'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Shorten URL
const request = require('request-promise');
exports.shortenUrl = functions.database.ref('/users/{uid}/pictureURL').onWrite(event => {
    const snapshot = event.data.val();
    
    return request({
    // Dont forget to get your API key
    uri: 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyATRMEGrC8ksNNceJEnN5jciqqIgnWhsLs',
          method: 'POST',
          body: {
            longUrl: snapshot
          },
          json: true,
          resolveWithFullResponse: true,
       }).then((res) => {
    // Get the short URL
    let body = res.body;
    let url = body.id;
    // Write to short URL to database under 
    // user/user1/files/file1/downloadURL
    return event.data.ref.parent.child('pictureURL').set(url);
    })
    .catch((err) => console.log(err));
});