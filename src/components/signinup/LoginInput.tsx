import React, { useRef } from 'react';
import { SignInInputWrapper, SignInInput, InputErr, EyeIcon } from './styles';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { initialState, InputActions, ACTIONS } from '../../pages/SignIn';
import { EMAIL_REG } from './Regex';

type Props = {
  type: string;
  state: typeof initialState;
  dispatch: React.Dispatch<InputActions>;
  id?: string;
};

const LoginInput: React.FC<Props> = ({ type, state, dispatch, id }) => {
  const passRef = useRef<HTMLInputElement | null>(null);

  const inputPlaceholder = `Your ${type}`;

  const switchPassVisibility = () => {
    if (type === 'password' && passRef.current?.type) {
      passRef.current.type =
        passRef.current?.type === 'password' ? 'text' : 'password';
    }
  };

  return (
    <SignInInputWrapper>
      <SignInInput
        onChange={(e) => {
          dispatch({ type: ACTIONS.CHANGE, payload: e.target.value });
          if (type === 'email') {
            if (state.value.match(EMAIL_REG))
              dispatch({ type: ACTIONS.ERR, payload: false });
            return;
          }
          if (state.value.length < 8 || state.value.length > 16)
            dispatch({ type: ACTIONS.ERR, payload: false });
        }}
        onBlur={() => {
          dispatch({ type: ACTIONS.BLUR });
          if (type === 'email') {
            if (!state.value.match(EMAIL_REG))
              dispatch({ type: ACTIONS.ERR, payload: true });
            return;
          }
          if (state.value.length < 8 || state.value.length > 16)
            dispatch({ type: ACTIONS.ERR, payload: true });
        }}
        onFocus={() => dispatch({ type: ACTIONS.ERR, payload: false })}
        type={type}
        placeholder={`${inputPlaceholder}*`}
        ref={passRef}
        isError={state.error}
        id={id}
      />
      {type === 'password' && state.value.length > 0 && (
        <EyeIcon icon={faEye} onClick={switchPassVisibility} />
      )}
      {state.error && <InputErr>Please enter a valid {type}</InputErr>}
    </SignInInputWrapper>
  );
};

export default React.memo(LoginInput);
