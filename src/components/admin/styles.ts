import styled, { css } from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { StyledInput } from '../../styles/global';

type AdminInputErr = {
  isError?: boolean;
};

export const LinksWrapper = styled.main`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.5em;
`;

export const AdminNavLink = styled(NavLink)`
  color: white;
  background-color: ${({ theme }) => theme.sDark};
  padding: 0.5em;
  font-weight: 500;
  box-shadow: 4px 4px ${({ theme }) => theme.sDarker};

  &:hover {
    background-color: ${({ theme }) => theme.sDarker};
  }

  &:active {
    transform: scale(0.95);
  }

  &.active {
    background-color: ${({ theme }) => theme.sDarker};
  }
`;

export const GoToLink = styled(Link)`
  display: flex;
  color: ${({ theme }) => theme.primary};
  text-decoration: underline;
  font-weight: 500;
  gap: 0.5em;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.pDark};
  }
`;

export const AdminFormsWrapper = styled.div`
  margin-top: 3em;
`;

export const AdminForms = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5em;
  width: 100%;
  max-width: 35em;
  margin: 0 auto;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 10px;
  padding: 2em;
`;

export const SelectEl = styled.select`
  width: 100%;
  text-align: center;
  border-radius: 10px;
  padding: 0.75em 0;
  outline: 1px solid ${({ theme }) => theme.iLight};
  border: 2px solid white;
  font-size: 0.9rem;

  &:focus {
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }
`;

export const InputLabelWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75em;
`;

const AdminInputBase = css`
  text-align: center;
  font-size: 0.9rem;
  border: none;
  border-bottom: 2px solid white;
  padding: 0.75em 0;
`;

export const AdminInput = styled.input<AdminInputErr>`
  ${StyledInput}
  ${AdminInputBase}
  outline-color: ${({ theme, isError }) =>
    isError ? theme.error : theme.iLight};
`;

export const AdminTextarea = styled.textarea<AdminInputErr>`
  ${StyledInput}
  outline-color: ${({ theme, isError }) =>
    isError ? theme.error : theme.iLight};
  text-align: center;
  font-size: 0.9rem;
  border-bottom: 2px solid white;
  max-width: 100%;
`;

export const AdminBtn = styled.button`
  margin-top: 1em;
  width: 100%;
  background-color: ${({ theme }) => theme.primary};
  padding: 1em 0;
  font-size: 1rem;
  color: white;
  border-radius: 10px;
  font-weight: 600;

  &:disabled {
    background-color: ${({ theme }) => theme.disabled};
    cursor: initial;
  }
`;

export const OutletBtnsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3em;
`;

export const AddSpecBtn = styled.a`
  width: 100%;
  padding: 0.75em 0;
  border-radius: 10px;
  color: ${({ theme }) => theme.primary};
  background-color: white;
  border: 1px dashed ${({ theme }) => theme.primary};
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    border: 1px solid;
  }
`;

export const AddSpecWrapper = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  gap: 1em;
  margin-top: 1em;
`;

export const AddSpecInput = styled.input`
  ${StyledInput}
  ${AdminInputBase}
  outline-color: ${({ theme }) => theme.iLight};
`;

export const DeleteSpec = styled.div`
  position: absolute;
  z-index: 10;
  transform: translateY(-150%);
  background-color: ${({ theme }) => theme.error};
  width: 1em;
  height: 1em;
  border-radius: 5px;
  right: 0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  cursor: pointer;

  &:hover::after {
    content: 'Delete spec';
    position: absolute;
    width: fit-content;
    white-space: nowrap;
    right: -0.5em;
    background-color: ${({ theme }) => theme.pDisabled};
    color: white;
    padding: 0.25em;
    transform: translateX(100%);
    border-radius: 10px;
    font-size: 0.925rem;
  }
`;
