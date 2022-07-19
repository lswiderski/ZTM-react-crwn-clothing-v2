import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userdocRef = await createUserDocumentFromAuth(user);
    }
    return (<div>
        <h1>Sign-in Page</h1>
        <button onClick={logGoogleUser}>
            Sign with google popup</button>
    </div>)
}

export default SignIn;