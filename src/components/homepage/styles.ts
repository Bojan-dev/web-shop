import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';
import { devices } from '../../styles/breakpoints';

type NumOfImgsProp = {
  readonly imgsNum: number;
  readonly transition: string;
};

type ImgProp = {
  readonly imgUrl: string;
};

type PagePickerProps = {
  readonly pagenumber: number;
  readonly currpage: number;
};

export const SliderMain = styled.main`
  position: relative;
  height: calc(100vw * 1000 / 2200);
  width: 100vw;
  transform: translateX(-5vw);
  max-height: 35em;
  overflow: hidden;
  margin-top: -1.5em;

  &:hover {
    svg {
      display: block;
    }
  }

  @media ${devices.tablet} {
    margin-top: 0;
    width: initial;
    transform: translateX(0);
    height: calc(100vw * 800 / 2200);
  }
`;

export const SliderMainImgsWrapper = styled.div<NumOfImgsProp>`
  position: absolute;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: calc(${({ imgsNum }) => imgsNum} * 100%);
  background-color: ${({ theme }) => theme.primary};
  transition: ${({ transition }) => transition};
`;

export const SliderImg = styled.div<ImgProp>`
  position: relative;
  width: 100%;
  background: url(${({ imgUrl }) => imgUrl});
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;

const Arrow = css`
  display: none;
  position: absolute;
  cursor: pointer;
  top: 50%;
  font-size: 1.5em;
  transform: translateY(-50%);
  color: white;
  transition: 0.35s transform ease-in-out;

  &:hover {
    transform: translateY(-50%) scale(1.1);
  }

  @media ${devices.mobileL} {
    font-size: 2.25em;
  }
`;

export const SliderArrowLeft = styled(FontAwesomeIcon)`
  ${Arrow}
  left: 0;
  margin-left: 0.25em;

  @media ${devices.tablet} {
    margin-left: 0.5em;
  }
`;

export const SliderArrowRight = styled(FontAwesomeIcon)`
  ${Arrow}
  right: 0;
  margin-right: 0.25em;

  @media ${devices.tablet} {
    margin-right: 0.5em;
  }
`;

export const SliderPagePickerWrapper = styled.div`
  display: flex;
  z-index: 3;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -75%);
  gap: 0.75em;
  color: white;
  font-size: 0.5em;

  @media ${devices.tablet} {
    font-size: 0.825em;
    transform: translate(-50%, -100%);
  }
`;

export const SliderPagePicker = styled(FontAwesomeIcon)<PagePickerProps>`
  color: ${({ theme, pagenumber, currpage }) =>
    pagenumber === currpage ? theme.secondary : 'white'};
  border-radius: 50%;
  cursor: pointer;
`;
