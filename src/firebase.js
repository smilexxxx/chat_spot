import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyD1puLi7hKfyEnYW6YunC4jjp695aJyC2A",
    authDomain: "hello-app-484a5.firebaseapp.com",
    projectId: "hello-app-484a5",
    storageBucket: "hello-app-484a5.appspot.com",
    messagingSenderId: "571307623121",
    appId: "1:571307623121:web:1c8ecacea93c650c757bf0",
  })
  .auth();
