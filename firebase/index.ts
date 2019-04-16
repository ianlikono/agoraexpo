import firebase from 'firebase/app';
import 'firebase/auth';
import credentials from '../credentials/client';

let fire;

if (!firebase.apps.length) {
  fire = firebase.initializeApp(credentials);
}

const facebookProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { fire, facebookProvider, googleProvider };
