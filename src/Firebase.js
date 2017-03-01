import firebase from 'firebase'
import {config} from './config/firebaseConfig'

firebase.initializeApp(config)
export const Database = firebase.database()
export const Auth = firebase.auth