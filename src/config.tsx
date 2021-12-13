import firebase from "firebase/app"
import "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyD8eE6IMpIu2WVsqzD9mL3fNklbzQ3SMuQ",
  authDomain: "service-provider-308210.firebaseapp.com",
  databaseURL: "https://service-provider-308210-default-rtdb.firebaseio.com",
  projectId: "service-provider-308210",
  storageBucket: "service-provider-308210.appspot.com",
  messagingSenderId: "298853734814",
  appId: "1:298853734814:web:e83a5c1532a238b60a1e8f"
};

const fireBaseApp = firebase.initializeApp(firebaseConfig)
  /*{
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  })*/

  export const auth = fireBaseApp.auth()
  export default fireBaseApp