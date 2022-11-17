import styled, { keyframes } from 'styled-components';
import { Overlay, Wrapper } from './styles';

const rotate = keyframes`
  from{
    transform:rotate(0deg);
  }to{
    transform: rotate(360deg);
  }
`;

const Spinner = styled.span`
  width: 48px;
  height: 48px;
  border: 5px solid ${({ theme }) => theme.primary};
  border-bottom-color: ${({ theme }) => theme.secondary};
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotate} 1s linear infinite;
`;

const LoadingOverlay = () => {
  return (
    <>
      <Overlay />
      <Wrapper>
        <Spinner />
      </Wrapper>
    </>
  );
};

export default LoadingOverlay;
