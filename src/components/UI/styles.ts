import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type IconType = {
  readonly isRed: boolean;
};

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.35;
  z-index: 50;
  background-color: black;
`;

export const Wrapper = styled.div`
  position: fixed;
  z-index: 51;
  top: 40%;
  left: 50%;
  transform: translate(-50%);
  background-color: white;
  padding: 2em;
  border-radius: 10px;
  text-align: center;
  white-space: nowrap;
`;

export const SuccessIcon = styled(FontAwesomeIcon)<IconType>`
  color: ${({ theme, isRed }) => (isRed ? theme.error : theme.success)};
`;

export const SuccessH2 = styled.h2`
  margin-bottom: 1em;
  margin-top: 0.75em;
`;

const dotOpacityAnim = keyframes`
to {
    clip-path: inset(0 -1ch 0 0)
  }
`;

export const AnimatedDots = styled.div`
  font-weight: bold;
  display: inline-block;
  font-family: monospace;
  color: ${({ theme }) => theme.primary};
  font-size: 30px;
  clip-path: inset(0 3ch 0 0);
  animation: ${dotOpacityAnim} 1s steps(4) infinite;
`;

const spinAnim = keyframes`
from{
  transform: rotate(0deg);
}to{
  transform: rotate(360deg);
}
`;

export const SpinnerWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

export const SpinnerIcon = styled(FontAwesomeIcon)`
  text-align: center;
  animation: ${spinAnim} 2s infinite;
  color: ${({ theme }) => theme.text};
  font-size: 2rem;
`;
