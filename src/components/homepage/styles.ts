import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import hero_1 from '../../imgs/hero_1.jpg';
import hero_2 from '../../imgs/hero_2.jpg';
import hero_3 from '../../imgs/hero_3.jpg';

type PageProp = {
  readonly currPage: number;
};

type PagePickerProps = {
  readonly pagenumber: number;
  readonly currpage: number;
};

export const SliderMain = styled.main<PageProp>`
  position: relative;
  min-height: calc(100vw * 900 / 2200);
  background: url(${hero_3});
  background-size: cover;
  background-repeat: no-repeat;
`;

export const SliderArrowsWrapper = styled.div`
  position: absolute;
  width: 100%;
  color: white;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 2em;

  & > * {
    cursor: pointer;
  }
`;

export const SliderPagePickerWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -100%);
  display: flex;
  gap: 0.75em;
  color: white;
  font-size: 0.75em;
`;

export const SliderPagePicker = styled(FontAwesomeIcon)<PagePickerProps>`
  color: ${({ theme, pagenumber, currpage }) =>
    pagenumber === currpage ? theme.secondary : 'white'};
  border-radius: 50%;
  cursor: pointer;
`;
