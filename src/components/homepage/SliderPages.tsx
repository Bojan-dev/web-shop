import { useState } from 'react';
import {
  faChevronLeft,
  faChevronRight,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  SliderMain,
  SliderArrowsWrapper,
  SliderPagePickerWrapper,
  SliderPagePicker,
} from './styles';
import { PromotionProps } from '../admin/AddPromotion';

const SliderPages: React.FC<{ promotions: PromotionProps[] }> = ({
  promotions,
}) => {
  const [currPage, setCurrPage] = useState(0);

  const nextPage = () => {
    if (currPage === 2) {
      setCurrPage(0);
      return;
    }
    setCurrPage((prevPage) => prevPage + 1);
  };

  const previousPage = () => {
    if (currPage === 0) {
      setCurrPage(2);
      return;
    }
    setCurrPage((prevPage) => prevPage - 1);
  };

  return (
    <SliderMain currPage={0}>
      <SliderArrowsWrapper>
        <FontAwesomeIcon icon={faChevronLeft} onClick={previousPage} />
        <FontAwesomeIcon icon={faChevronRight} onClick={nextPage} />
      </SliderArrowsWrapper>
      <SliderPagePickerWrapper>
        <SliderPagePicker icon={faCircle} pagenumber={0} currpage={currPage} />
        <SliderPagePicker icon={faCircle} pagenumber={1} currpage={currPage} />
        <SliderPagePicker icon={faCircle} pagenumber={2} currpage={currPage} />
      </SliderPagePickerWrapper>
    </SliderMain>
  );
};

export default SliderPages;
