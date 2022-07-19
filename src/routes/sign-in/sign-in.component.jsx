import { useEffect } from "react";
import { getRedirectResult } from 'firebase/auth'

import {
    auth,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    useEffect(() => {

        async function signInWithRedirect() {
            const response = await getRedirectResult(auth);
            if (response) {
                const userdocRef = await createUserDocumentFromAuth(response.user);
            }
        }

        signInWithRedirect();

    }, []);

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userdocRef = await createUserDocumentFromAuth(user);
    }


    return (<div>
        <h1>Sign-in Page</h1>
        <button onClick={logGoogleUser}>
            Sign-in with google popup</button>
        <button onClick={signInWithGoogleRedirect}>
            Sign-in with google redirect</button>
    </div>)
}

export default SignIn;