
import { useEffect, useState } from "react";
import { getRedirectResult } from 'firebase/auth'

import {
    auth,
    signInWithGooglePopup,
    // signInWithGoogleRedirect,
    createUserDocumentFromAuth,
    signInAuthWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from '../../components/form-input/form-input.component'
import Button from "../button/button.component";

import './sign-in-form.styles.scss'


const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password, } = formFields;

    useEffect(() => {

        async function signInWithRedirect() {
            const response = await getRedirectResult(auth);
            if (response) {
                await createUserDocumentFromAuth(response.user);
            }
        }

        signInWithRedirect();

    }, []);

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await signInAuthWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case "auth/user-not-found":
                    alert("no user exist")
                    break;
                case "auth/wrong-password":
                    alert("incorrect password for email")
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>


                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email} />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password} />


                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>
                        Google Sign-in</Button>
                    {/*
                        <Button buttonType="google" onClick={signInWithGoogleRedirect}>
                                                Google Sign-in redirect</Button>
                    */}
                </div>

            </form>
        </div>
    )
}

export default SignInForm;