import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { devices } from '../styles/breakpoints';

import notFoundImg from '../imgs/not-found-page.svg';

const NotFoundWrapper = styled.main`
  margin-top: 5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const NotFoundImg = styled.img`
  height: 50vh;
`;

const LinkBack = styled(Link)`
  background-color: ${({ theme }) => theme.primary};
  text-align: center;
  padding: 1em 5em;
  margin-top: 2em;
  width: 100%;
  font-weight: 700;

  :hover {
    outline: 2px solid ${({ theme }) => theme.primary};
    background-color: white;
    color: ${({ theme }) => theme.primary};
  }

  @media ${devices.mobileL} {
    width: initial;
  }
`;

const NotFound = () => {
  return (
    <NotFoundWrapper>
      <h1>The page you requested does not exist.</h1>
      <NotFoundImg src={notFoundImg} alt="Wrong page" />
      <LinkBack to={'/'}>To Home Page</LinkBack>
    </NotFoundWrapper>
  );
};

export default NotFound;
