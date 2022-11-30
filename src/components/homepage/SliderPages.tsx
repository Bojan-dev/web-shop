import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
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
  const {
    currPage,
    setCurrPage,
    transitionRef,
    nextPromotion,
    previousPromotion,
    onTransitionEnd,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  } = useSlider(promotions);

  return (
    <SliderMain
      onDragStart={(e) => handleDragStart(e)}
      onDragOver={(e) => handleDragMove(e)}
      onDragEnd={() => handleDragEnd()}
      onTouchStart={(e) => handleDragStart(e)}
      onTouchMove={(e) => handleDragMove(e)}
      onTouchEnd={() => handleDragEnd()}
      draggable="true"
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
            onMouseDown={(e) => {
              if (e.stopPropagation) e.stopPropagation();
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

function useSlider(promotions: ExtendedPromotionProps[]) {
  const [currPage, setCurrPage] = useState(1);
  const [isAnimRunning, setIsAnimRunning] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [visibilityChange, setVisibilityChange] = useState(false);
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

  const handleDragStart = (e: React.DragEvent | React.TouchEvent) => {
    if ('clientX' in e) {
      dragStartRef.current = e.clientX;
      e.dataTransfer.setDragImage(dragImageRef.current, 0, 0);
      e.dataTransfer.effectAllowed = 'none';
    }

    if ('changedTouches' in e)
      dragStartRef.current = e?.changedTouches[0].clientX;

    dragStartPageValueRef.current = currPage;

    setIsDragActive(true);
  };

  const handleDragMove = (e: React.DragEvent | React.TouchEvent) => {
    let dragPercentage = 0;

    if ('clientX' in e)
      dragPercentage = -(e.clientX - dragStartRef.current) / window.innerWidth;

    if ('changedTouches' in e)
      dragPercentage =
        -(e.changedTouches[0].clientX - dragStartRef.current) /
        window.innerWidth;

    dragPercentageRef.current = dragPercentage;

    const movePercentage = dragStartPageValueRef.current + dragPercentage;

    setCurrPage(movePercentage);
  };

  const handleDragEnd = () => {
    setIsDragActive(false);

    transitionRef.current = 'transform 0.35s linear';

    setTimeout(() => {
      if (currPage < 0 || currPage >= promotions.length - 1) {
        setCurrPage(dragStartPageValueRef.current);
        return;
      }

      setCurrPage((prevState) => Math.round(prevState));
    }, 50);
  };

  useEffect(() => {
    if (visibilityChange) return;
    transitionRef.current = isDragActive ? 'none' : 'transform 0.35s linear';

    const timer = setInterval(() => {
      setCurrPage((prevPage) => prevPage + 1);
    }, 5 * 1000);

    return () => {
      clearInterval(timer);
    };
  }, [currPage, promotions, isDragActive, visibilityChange]);

  useEffect(() => {
    transitionRef.current = 'none';

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') setVisibilityChange(true);
      if (document.visibilityState === 'visible') setVisibilityChange(false);
    });
  }, []);

  return {
    currPage,
    setCurrPage,
    transitionRef,
    dragImageRef,
    nextPromotion,
    previousPromotion,
    onTransitionEnd,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  };
}

export default SliderPages;
