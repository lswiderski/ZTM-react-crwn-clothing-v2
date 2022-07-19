import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCcaFrav_uNYDKQ1HFsnW3fTNAjBwj6hP4",
    authDomain: "crwn-clothing-db-367e5.firebaseapp.com",
    projectId: "crwn-clothing-db-367e5",
    storageBucket: "crwn-clothing-db-367e5.appspot.com",
    messagingSenderId: "392024680710",
    appId: "1:392024680710:web:4e6df044fef959b415d687"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    promt: "select_acoount"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);