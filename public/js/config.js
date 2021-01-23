

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCHSuZEKC8zAt0-jOxmr4nUht2sCNNrglA",
    authDomain: "chat-room-107062333-5b1b1.firebaseapp.com",
    databaseURL: "https://chat-room-107062333-5b1b1.firebaseio.com",
    projectId: "chat-room-107062333-5b1b1",
    storageBucket: "chat-room-107062333-5b1b1.appspot.com",
    messagingSenderId: "695386580379",
    appId: "1:695386580379:web:69dd99a77892708d2a6d3e",
    measurementId: "G-YL7CM9NPS4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
