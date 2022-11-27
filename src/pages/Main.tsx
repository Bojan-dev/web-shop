import useSetDocTitle from '../hooks/useSetDocTitle';
import Slider from '../components/homepage/Slider';

const Main = () => {
  useSetDocTitle('Home');

  return (
    <>
      <Slider />
    </>
  );
};

export default Main;
