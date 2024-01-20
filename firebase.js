// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAchaHCOUA-u8-V4azYfkBNH9eO49jUEWU',
	authDomain: 'maomorize-b2ccb.firebaseapp.com',
	projectId: 'maomorize-b2ccb',
	storageBucket: 'maomorize-b2ccb.appspot.com',
	messagingSenderId: '642953004391',
	appId: '1:642953004391:web:fc27f780443814ce08dbc2',
	measurementId: 'G-JWRF9CC2KB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
