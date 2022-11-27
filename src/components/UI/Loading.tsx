import { SpinnerWrapper, SpinnerIcon } from './styles';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loading = () => {
  return (
    <SpinnerWrapper>
      <SpinnerIcon icon={faSpinner} />
    </SpinnerWrapper>
  );
};

export default Loading;
