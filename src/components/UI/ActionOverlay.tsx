import {
  Overlay,
  Wrapper,
  SuccessIcon,
  SuccessH2,
  AnimatedDots,
} from './styles';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

const ActionOverlay = ({
  heading,
  paragraph,
  icon,
  isRed = false,
}: {
  heading: string;
  paragraph: string;
  icon: IconDefinition;
  isRed?: boolean;
}) => {
  return (
    <>
      <Overlay />
      <Wrapper>
        <SuccessIcon icon={icon} isRed={isRed} size="xl" />
        <SuccessH2>{heading}</SuccessH2>
        <p>{paragraph}</p>
        <AnimatedDots>...</AnimatedDots>
      </Wrapper>
    </>
  );
};

export default ActionOverlay;
