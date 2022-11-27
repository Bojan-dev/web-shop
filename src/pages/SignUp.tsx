import useSetDocTitle from '../hooks/useSetDocTitle';
import { auth } from '../config/firebaseConfig';
import { useAuthCreateUserWithEmailAndPassword } from '@react-query-firebase/auth';
import { useGetCurrentUser } from '../store/login-ctx';
import LogoutFirst from '../components/signinup/LogoutFirst';

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MainSign,
  SignInForm,
  SignInInput,
  SignInInputWrapper,
  SignInFormWrapper,
  SignInButton,
  LinkTag,
  InputErr,
  EyeIcon,
} from '../components/signinup/styles';
import { ErrorP } from '../styles/global';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EMAIL_REG } from '../components/signinup/Regex';
import { faEye, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ActionOverlay from '../components/UI/ActionOverlay';

type FormValues = {
  email: string;
  password: string;
  repeatPass: string;
};

const Register = () => {
  useSetDocTitle('Sign Up');
  const navigate = useNavigate();
  const { isLoggedIn } = useGetCurrentUser();
  const passRef = useRef<null | HTMLInputElement>(null);
  const repeatPassRef = useRef<null | HTMLInputElement>(null);
  const [authError, setAuthError] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      repeatPass: '',
    },
  });

  let promiseState;

  const mutation = useAuthCreateUserWithEmailAndPassword(auth, {
    onSuccess() {
      auth.signOut();
      setTimeout(() => {
        navigate('/sign-in');
      }, 2000);
    },
    onError(err) {
      const [, errMessage] = err.message.split(':');
      setAuthError(errMessage.replaceAll('-', ' '));
    },
  });

  promiseState = mutation.isLoading ? (
    <LoadingOverlay />
  ) : mutation.isSuccess ? (
    <ActionOverlay
      heading="Successfully created account"
      paragraph="Please, login now."
      icon={faUserPlus}
    />
  ) : (
    ''
  );

  const { ref: passwordRef } = register('password');
  const { ref: rPasswordRef } = register('repeatPass');
  const passVal = watch('password');
  const repeatPassVal = watch('repeatPass');

  const onFormSubmit: SubmitHandler<FormValues> = (data) =>
    mutation.mutate({ email: data.email, password: data.password });

  const handlePassVisibility = (ref: typeof passRef) => {
    if (ref.current?.type)
      ref.current.type = ref.current?.type === 'password' ? 'type' : 'password';
  };

  if (isLoggedIn) return <LogoutFirst />;

  return (
    <>
      {promiseState}
      <MainSign>
        <h1>Register to TC Shop</h1>
        <SignInFormWrapper isError={mutation.isError}>
          <SignInForm
            onSubmit={handleSubmit(onFormSubmit)}
            onFocus={() => mutation.reset()}
          >
            <SignInInputWrapper>
              <SignInInput
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: EMAIL_REG,
                    message: 'Please provide a valid email',
                  },
                })}
                type="email"
                placeholder="Your email*"
                required
                isError={errors.email?.message ? true : false}
              />
              {errors.email?.message && (
                <InputErr>{errors.email.message}</InputErr>
              )}
            </SignInInputWrapper>
            <SignInInputWrapper>
              <SignInInput
                {...register('password', {
                  required: true,
                  minLength: {
                    value: 8,
                    message: 'Password needs to be at least 8 characters long',
                  },
                  maxLength: {
                    value: 16,
                    message: 'Password can only be 16 characters long',
                  },
                })}
                type="password"
                placeholder="Your password*"
                required
                ref={(e) => {
                  passwordRef(e);
                  passRef.current = e;
                }}
                isError={errors.password?.message ? true : false}
              />
              {passVal.length > 0 && (
                <EyeIcon
                  onClick={handlePassVisibility.bind(this, passRef)}
                  icon={faEye}
                />
              )}
              {errors.password?.message && (
                <InputErr>{errors.password.message}</InputErr>
              )}
            </SignInInputWrapper>
            <SignInInputWrapper>
              <SignInInput
                {...register('repeatPass', {
                  required: true,
                  minLength: {
                    value: 8,
                    message: 'Password needs to be at least 8 characters long',
                  },
                  maxLength: {
                    value: 16,
                    message: 'Password can only be 16 characters long',
                  },
                  validate: (val) => {
                    return (
                      val === passVal || 'Please provide the same password'
                    );
                  },
                })}
                type="password"
                placeholder="Repeat your password*"
                required
                ref={(e) => {
                  rPasswordRef(e);
                  repeatPassRef.current = e;
                }}
                isError={errors.repeatPass?.message ? true : false}
              />
              {repeatPassVal.length > 0 && (
                <EyeIcon
                  onClick={handlePassVisibility.bind(this, repeatPassRef)}
                  icon={faEye}
                />
              )}
              {errors.repeatPass?.message && (
                <InputErr>{errors.repeatPass.message}</InputErr>
              )}
            </SignInInputWrapper>
            {mutation.isError && <ErrorP>{authError}</ErrorP>}
            <SignInButton disabled={mutation.isLoading}>Register</SignInButton>
          </SignInForm>
          <p>Already have an account?</p>
          <LinkTag to={'/sign-in'}>Login</LinkTag>
        </SignInFormWrapper>
      </MainSign>
    </>
  );
};

export default Register;
