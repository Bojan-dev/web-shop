import { useState } from 'react';
import { auth } from '../../config/firebaseConfig';
import { NavLink } from 'react-router-dom';
import { useGetCurrentUser } from '../../store/login-ctx';
import {
  TopBtmNavigation,
  LinksWrapper,
  NavigationWrapper,
  NavEl,
  NavForm,
  CartWrapper,
  NavButton,
  NavInput,
  CartItems,
  SignOutBtn,
} from './styles';
import ProductsHambar from './ProductsHambar';
import ActionOverlay from '../UI/ActionOverlay';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faShoppingCart,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { isLoggedIn } = useGetCurrentUser();

  const linksCtx = isLoggedIn ? (
    <SignOutBtn
      onClick={() => {
        auth.signOut();
        setIsLoggingOut(true);
        setTimeout(() => {
          setIsLoggingOut(false);
        }, 1000);
      }}
    >
      Logout
    </SignOutBtn>
  ) : (
    <>
      <NavLink
        to="/sign-in"
        className={({ isActive }) => (isActive ? 'underline' : '')}
      >
        Sign In
      </NavLink>
      <NavLink
        to="/sign-up"
        className={({ isActive }) => (isActive ? 'underline' : '')}
      >
        Sign Up
      </NavLink>
    </>
  );

  return (
    <>
      {isLoggingOut && (
        <ActionOverlay
          heading="Logging Out..."
          paragraph="Please wait a second"
          icon={faRightFromBracket}
          isRed={true}
        />
      )}
      <TopBtmNavigation>
        <LinksWrapper>
          <a href="tel:+18156811182">(815) 681-1182</a>
          <a href="mailto:tc@tcshop.com">tc@tcshop.com</a>
        </LinksWrapper>
        <LinksWrapper>{linksCtx}</LinksWrapper>
      </TopBtmNavigation>
      <NavigationWrapper>
        <NavLink to="/" className="logo">
          TC SHOP
        </NavLink>
        <NavForm>
          <NavInput type="text" placeholder="Search" />
          <NavButton>
            <FontAwesomeIcon icon={faSearch} color="white" />
          </NavButton>
        </NavForm>
        <NavEl>
          <NavLink
            to={'/'}
            end
            className={({ isActive }) => (isActive ? 'underline' : '')}
          >
            Home
          </NavLink>

          <CartWrapper>
            <FontAwesomeIcon icon={faShoppingCart} />
            <CartItems>0</CartItems>
          </CartWrapper>
        </NavEl>
      </NavigationWrapper>
      <TopBtmNavigation>
        <ProductsHambar />
      </TopBtmNavigation>
    </>
  );
};

export default Navigation;
