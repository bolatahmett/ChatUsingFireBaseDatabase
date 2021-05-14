import firebase from 'firebase/app'
import 'firebase/database';
const config = {
    apiKey: process.env.REACT_APP_API_FB_KEY,
    authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FB_DATABASE_URL,
    projectId: process.env.REACT_APP_FB_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MID
};

firebase.initializeApp(config);
const database = firebase.database();

export { database };
export default firebase;