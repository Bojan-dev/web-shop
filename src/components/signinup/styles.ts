import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { StyledInput } from '../../styles/global';

interface ButtonProps {
  readonly google?: boolean;
}

interface InputProps {
  readonly isError?: boolean;
}

interface FormWrapperProps {
  readonly isError?: boolean;
}

export const MainSign = styled.main`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SignInFormWrapper = styled.div<FormWrapperProps>`
  margin-top: 2em;
  padding: 3em 10%;
  width: 100%;
  max-width: 40em;
  border: 1px solid
    ${({ theme, isError }) => (isError ? theme.error : theme.text)};
  border-radius: 20px;
  -webkit-box-shadow: 7px 7px 7px -2px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 7px 7px 7px -2px rgba(0, 0, 0, 0.2);
  box-shadow: 7px 7px 7px -2px rgba(0, 0, 0, 0.2);
`;

export const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5em;
  width: 100%;
  margin-bottom: 2em;
`;

export const SignInInput = styled.input<InputProps>`
  ${StyledInput}
  border-bottom: 2px solid
    ${({ theme, isError }) => (isError ? theme.error : 'white')};
`;

export const InputErr = styled.p`
  color: ${({ theme }) => theme.error};
  margin-top: 0.5em;
`;

export const SignInInputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:last-of-type {
    margin-bottom: 1em;
  }
`;

export const EyeIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 0;
  transform: translate(-100%, 80%);
  cursor: pointer;
  color: ${({ theme }) => theme.text};
`;

export const SignInButton = styled.button<ButtonProps>`
  background-color: ${({ theme, google }) =>
    google ? theme.secondary : theme.primary};
  width: 75%;
  color: white;
  padding: 0.75em 0;
  font-weight: 500;
  border-radius: 5px;
  font-size: 1.125rem;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    outline-width: 2px;
    background-color: ${({ theme, google }) =>
      google ? theme.sDark : theme.pDark};
  }

  :disabled {
    background-color: ${({ theme }) => theme.pDisabled};
  }
`;

export const GoogleIcon = styled.img`
  width: 1.5em;
  margin-right: 0.5em;
`;

export const LinkTag = styled(Link)`
  outline: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 5px;
  color: ${({ theme }) => theme.secondary};
  font-weight: 500;
  width: 50%;
  font-size: 1.125rem;
  display: inline-block;
  padding: 0.5em 0;
  margin-top: 1.25em;

  :hover {
    outline-width: 2px;
  }
`;
