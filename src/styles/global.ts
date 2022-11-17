import styled, { css } from 'styled-components';

import { devices } from './breakpoints';

export const StyledButton = styled.button``;

export const StyledContainer = css`
  width: 100vw;
  padding: 0 5vw;
  margin: 0 auto;

  @media ${devices.laptopL} {
    padding: 0 7.5vw;
  }
`;

export const StyledInput = css`
  position: relative;
  width: 100%;
  outline: 1px solid #888888;
  border-radius: 10px;
  padding: 1em;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

export const ErrorP = styled.p`
  color: ${({ theme }) => theme.error};
`;
