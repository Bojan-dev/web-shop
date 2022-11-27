import useSetDocTitle from '../hooks/useSetDocTitle';
import { useNavigate } from 'react-router-dom';
import { useAuthSignInWithEmailAndPassword } from '@react-query-firebase/auth';
import { auth } from '../config/firebaseConfig';
import { useGetCurrentUser } from '../store/login-ctx';
import LogoutFirst from '../components/signinup/LogoutFirst';

import React, { useReducer, useState } from 'react';
import LoginInput from '../components/signinup/LoginInput';
import {
  MainSign,
  SignInFormWrapper,
  SignInForm,
  SignInButton,
  GoogleIcon,
  LinkTag,
} from '../components/signinup/styles';
import { ErrorP } from '../styles/global';
import googleIcon from '../imgs/google-plus-g.svg';
import ActionOverlay from '../components/UI/ActionOverlay';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

export enum ACTIONS {
  CHANGE = 'VALUE',
  BLUR = 'BLUR',
  ERR = 'ERROR',
}

type ActionChange = {
  type: ACTIONS.CHANGE;
  payload: string;
};

type ActionBlur = {
  type: ACTIONS.BLUR;
};

type ActionErr = {
  type: ACTIONS.ERR;
  payload: boolean;
};

export type InputActions = ActionChange | ActionBlur | ActionErr;

export const initialState = {
  value: '',
  blur: false,
  error: false,
};

const inputReducer = (state: typeof initialState, action: InputActions) => {
  switch (action.type) {
    case ACTIONS.CHANGE:
      return {
        ...state,
        value: action.payload,
      };
    case ACTIONS.BLUR:
      return {
        ...state,
        blur: true,
      };
    case ACTIONS.ERR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

const SignIn: React.FC = () => {
  useSetDocTitle('Sign In');
  const navigate = useNavigate();
  const { isLoggedIn } = useGetCurrentUser();
  const [authError, setAuthError] = useState('');
  const [emailState, emailDispatch] = useReducer(inputReducer, initialState);
  const [passState, passDispatch] = useReducer(inputReducer, initialState);
  const mutation = useAuthSignInWithEmailAndPassword(auth, {
    onSuccess() {
      navigate('/');
    },
    onError(err) {
      const [, errMessage] = err.message.split(':');
      setAuthError(errMessage.replaceAll('-', ' '));
    },
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailState.error || passState.error) return;

    mutation.mutate({ email: emailState.value, password: passState.value });
  };

  const handleLoginGoogle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  if (isLoggedIn) return <LogoutFirst />;

  return (
    <>
      {mutation.isLoading && (
        <ActionOverlay
          heading="Logging in"
          paragraph="Please wait"
          icon={faRightToBracket}
        />
      )}
      <MainSign>
        <h1>Sign in to your account</h1>
        <SignInFormWrapper isError={mutation.isError} id="login-form">
          <SignInForm
            onFocus={() => mutation.reset()}
            onSubmit={handleLogin.bind(this)}
          >
            <LoginInput
              type="email"
              state={emailState}
              dispatch={emailDispatch}
              id="email"
            />
            <LoginInput
              type="password"
              state={passState}
              dispatch={passDispatch}
            />
            {mutation.isError && <ErrorP>{authError}</ErrorP>}
            <SignInButton type="submit">Login</SignInButton>
            <SignInButton google={true} onClick={handleLoginGoogle.bind(this)}>
              <GoogleIcon src={googleIcon} alt="Google icon" />
              Login - Google
            </SignInButton>
          </SignInForm>
          <p>You don't have an acoount?</p>
          <LinkTag to="/sign-up">Register</LinkTag>
        </SignInFormWrapper>
      </MainSign>
    </>
  );
};

export default SignIn;
