import styled from 'styled-components';
import { StyledContainer } from '../../styles/global';

const ContainerDiv = styled.div`
  ${StyledContainer}
  margin-top: 2.5em;
`;

const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <ContainerDiv>{children}</ContainerDiv>;
};

export default Container;
