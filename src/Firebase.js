import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyB8N5071FSX3C63QA6seaegn-bRli6ep3g",
    authDomain: "youtube-jukebox-a1d3f.firebaseapp.com",
    databaseURL: "https://youtube-jukebox-a1d3f.firebaseio.com"
};

firebase.initializeApp(config)
export const Database = firebase.database()
export const Auth = firebase.auth