import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { getRedirectResult } from 'firebase/auth';

import {
  auth,
  signInWithGooglePopup,
  // signInWithGoogleRedirect,
  createUserDocumentFromAuth,
  signInAuthWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import {
  googleSignInStart,
  emailSignInStart,
} from '../../store/user/user.action';

import FormInput from '../../components/form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  useEffect(() => {
    async function signInWithRedirect() {
      await getRedirectResult(auth);
    }
    signInWithRedirect();
  }, []);

  const signInWithGoogle = async () => {
    //  await signInWithGooglePopup();
    dispatch(googleSignInStart());
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      //const { user } = await signInAuthWithEmailAndPassword(email, password);
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      console.log('user sign in failed', error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />

        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button
            type='button'
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign-in
          </Button>
          {/*
                        <Button buttonType="google" onClick={signInWithGoogleRedirect}>
                                                Google Sign-in redirect</Button>
                    */}
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
