import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import {
  faChevronLeft,
  faChevronRight,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  SliderMain,
  SliderMainImgsWrapper,
  SliderImg,
  SliderArrowLeft,
  SliderArrowRight,
  SliderPagePickerWrapper,
  SliderPagePicker,
} from './styles';
import { ExtendedPromotionProps } from './Slider';

const SliderPages: React.FC<{ promotions: ExtendedPromotionProps[] }> = ({
  promotions,
}) => {
  const navigate = useNavigate();
  const [currPage, setCurrPage] = useState(1);
  const [isAnimRunning, setIsAnimRunning] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const transitionRef = useRef('transform 0.35s linear');
  const dragStartRef = useRef(0);
  const dragPercentageRef = useRef(0);
  const dragStartPageValueRef = useRef(0);
  const dragImageRef = useRef(new Image(0, 0));

  const nextPromotion = () => {
    if (currPage >= promotions.length - 1 || isAnimRunning) return;
    setCurrPage((prevPage) => prevPage + 1);
    setIsAnimRunning(true);
  };

  const previousPromotion = () => {
    if (currPage <= 0 || isAnimRunning) return;
    setCurrPage((prevPage) => prevPage - 1);
    setIsAnimRunning(true);
  };

  const onTransitionEnd = () => {
    setIsAnimRunning(false);
    if (promotions[currPage]?.clone === 'lastClone') {
      transitionRef.current = 'none';
      setCurrPage(promotions.length - 2);
      return;
    }

    if (promotions[currPage]?.clone === 'firstClone') {
      transitionRef.current = 'none';
      setCurrPage(1);
    }
  };

  useEffect(() => {
    transitionRef.current = isDragActive
      ? 'transform 0 linear'
      : 'transform 0.35s linear';
    const timer = setInterval(() => {
      if (currPage >= promotions.length - 1) return;

      if (!isDragActive) setCurrPage((prevState) => prevState + 1);
    }, 5125125 * 1000);

    return () => {
      clearInterval(timer);
    };
  }, [currPage, promotions, isDragActive]);

  return (
    <SliderMain
      onDragStart={(e) => {
        dragStartRef.current = e.clientX;

        dragStartPageValueRef.current = currPage;

        setIsDragActive(true);
      }}
      onDrag={(e) => {
        const dragPercentage =
          -(e.clientX - dragStartRef.current) / window.innerWidth;

        dragPercentageRef.current = dragPercentage;

        const movePercentage = dragStartPageValueRef.current + dragPercentage;

        setCurrPage(Number(movePercentage.toFixed(2)));
      }}
      onDragEnd={(e) => {
        setIsDragActive(false);

        transitionRef.current = 'transform 0.35s linear';

        if (currPage < 0 || currPage >= promotions.length - 1) {
          setCurrPage(dragStartPageValueRef.current);
          return;
        }

        setCurrPage((prevState) => Math.round(prevState));
      }}
      onTouchStart={(e) => {
        dragStartRef.current = e.changedTouches[0].clientX;

        dragStartPageValueRef.current = currPage;

        setIsDragActive(true);
      }}
      onTouchMove={(e) => {
        const dragPercentage =
          -(e.changedTouches[0].clientX - dragStartRef.current) /
          window.innerWidth;

        dragPercentageRef.current = dragPercentage;

        const movePercentage = dragStartPageValueRef.current + dragPercentage;

        setCurrPage(movePercentage);
      }}
      onTouchEnd={() => {
        setIsDragActive(false);

        transitionRef.current = 'transform 0.35s linear';

        if (currPage < 0 || currPage >= promotions.length - 1) {
          setCurrPage(dragStartPageValueRef.current);
          return;
        }

        setCurrPage((prevState) => Math.round(prevState));
      }}
    >
      <SliderMainImgsWrapper
        imgsNum={promotions.length}
        transition={transitionRef.current}
        onTransitionEnd={() => onTransitionEnd()}
        style={{
          transform: `translateX(calc(-100%/${promotions.length}*${currPage}))`,
        }}
      >
        {promotions.map((promotion, i) => (
          <SliderImg
            draggable="true"
            onDragStart={(e) => {
              e.dataTransfer.setDragImage(dragImageRef.current, 0, 0);
            }}
            key={i}
            imgUrl={promotion.imgUrl}
            onClick={() => {
              navigate(promotion.url);
            }}
          />
        ))}
      </SliderMainImgsWrapper>
      <SliderArrowLeft icon={faChevronLeft} onClick={previousPromotion} />
      <SliderArrowRight icon={faChevronRight} onClick={nextPromotion} />
      <SliderPagePickerWrapper>
        {promotions.map(
          (promotion, i) =>
            !promotion?.clone && (
              <SliderPagePicker
                key={i}
                icon={faCircle}
                pagenumber={i}
                currpage={currPage}
                onClick={() => setCurrPage(i)}
              />
            )
        )}
      </SliderPagePickerWrapper>
    </SliderMain>
  );
};

export default SliderPages;
