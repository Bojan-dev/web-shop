import styled, { css } from 'styled-components';
import { devices } from '../../styles/breakpoints';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledContainer } from '../../styles/global';

const NavWrappers = css`
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

export const NavigationWrapper = styled.div`
  ${StyledContainer}
  ${NavWrappers}
  height: 5em;
`;

export const LinksWrapper = styled.div`
  padding: 0.325em 0;
  display: flex;
  gap: 1em;
`;

export const NavEl = styled.nav`
  display: none;
  align-items: center;
  gap: 1em;

  @media ${devices.tablet} {
    display: flex;
  }
`;

export const NavForm = styled.form`
  position: relative;
  width: 70%;
  max-width: 60em;

  @media ${devices.tablet} {
    width: 50%;
  }
`;

export const NavInput = styled.input`
  width: 100%;
  padding: 0.75em;
  transition: 0.5s all;

  :focus {
    transform: scaleX(1.05) scaleY(1.1);
  }
`;

export const NavSearchIconWrapper = styled.button`
  position: absolute;
  height: 100%;
  transform: translateX(-100%);
  background-color: ${({ theme }) => theme.secondary};
  aspect-ratio: 1/1;

  :hover {
    background-color: ${({ theme }) => theme.sDark};
  }
`;

export const CartItems = styled.p`
  position: absolute;
  top: 0;
  right: 0;
  background-color: white;
  color: ${({ theme }) => theme.primary};
  transform: translate(75%, -50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CartWrapper = styled.div`
  position: relative;
  cursor: pointer;

  &:hover ${CartItems} {
    background-color: ${({ theme }) => theme.secondary};
    color: white;
  }
`;

export const SignOutBtn = styled.button`
  font-size: 0.925rem;
  background-color: ${({ theme }) => theme.pDarker};
  border: 1px solid ${({ theme }) => theme.pDarker};
  color: white;
  padding: 0.125em 0.325em;

  :hover {
    border: 1px solid white;
  }
`;

export const ProductBarBtn = styled.button`
  display: flex;
  gap: 1.5em;
  align-items: center;
  background-color: ${({ theme }) => theme.sDark};
  color: white;
  padding: 0.5em 1.25em;
  font-size: 1rem;
  justify-content: space-between;
  user-select: none;

  &:hover {
    background-color: ${({ theme }) => theme.sDarker};
  }

  @media ${devices.mobileL} {
    padding: 0.5em 2.5em;
  }
`;

export const ProductsMenu = styled.div`
  position: fixed;
  color: ${({ theme }) => theme.text};
  top: 0;
  left: 0;
  font-size: 1rem;
  padding-top: 1em;
  height: 100vh;
  z-index: 100;
  background-color: white;
  user-select: none;
`;

export const MenuProdType = styled.li<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.5em 6em 0.5em 1.5em;
  margin: 0.5em 0;
  text-transform: capitalize;
  cursor: pointer;
  border-left: 5px solid
    ${({ theme, isActive }) => (isActive ? theme.secondary : 'white')};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.iLight : 'white'};

  &:hover {
    background-color: ${({ theme }) => theme.iLight};
    border-color: ${({ theme }) => theme.secondary};
  }
`;

export const MenuProdTypeArrow = styled(FontAwesomeIcon)`
  position: absolute;
  right: 1.5em;
  color: ${({ theme }) => theme.italic};
  font-size: 0.725rem;
`;

export const CloseMenuBtn = styled.button`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.error};
  padding: 1em 0;

  :hover > * {
    transform: scale(1.2);
  }
`;

export const CloseMenuIcon = styled(FontAwesomeIcon)`
  font-size: 1rem;
  color: white;
`;

export const BrandsMenu = styled.ul`
  list-style: none;
  position: absolute;
  right: 0;
  transform: translateX(100%);
  border-radius: 0 10px 10px 0;
  background-color: ${({ theme }) => theme.iLight};
  padding: 2em;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  text-transform: capitalize;

  & li {
    position: relative;
    margin-right: 3em;
    cursor: pointer;
    width: fit-content;

    &::before {
      content: '';
      position: absolute;
      height: 1px;
      width: 100%;
      background-color: ${({ theme }) => theme.secondary};
      bottom: 0;
      left: 0;
      transition: transform 0.3s ease-in-out;
      transform-origin: right;
      transform: scaleX(0);
    }

    &:hover::before {
      transform-origin: left;
      transform: scaleX(1);
    }
  }
`;

export const TopBtmNavigation = styled.div`
  ${StyledContainer}
  ${NavWrappers}
  position: relative;
  background-color: ${({ theme }) => theme.pDarker};
  font-size: 0.925rem;

  ${CartWrapper} {
    display: initial;
  }

  & a[href^='mailto'] {
    display: none;
  }

  @media ${devices.mobileL} {
    & a[href^='mailto'] {
      display: initial;
    }
  }

  @media ${devices.tablet} {
    ${CartWrapper} {
      display: none;
    }
  }
`;
