import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyATXlBuezYvhrNYnkWF7uAupIlRGewM1sA",
	authDomain: "whatsapp-v2-f05f0.firebaseapp.com",
	projectId: "whatsapp-v2-f05f0",
	storageBucket: "whatsapp-v2-f05f0.appspot.com",
	messagingSenderId: "140411036421",
	appId: "1:140411036421:web:f0b0b28e816cd29d140d6c",
};

const app = !firebase.apps.length
	? firebase.initializeApp(firebaseConfig)
	: firebase.app();

const db = app.firestore();

const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();
export { db, auth, provider };
