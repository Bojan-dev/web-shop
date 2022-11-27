import { useState, useEffect } from 'react';
import { useFirestoreQueryData } from '@react-query-firebase/firestore';
import { promotionsColRef } from '../../config/firebaseConfig';
import SliderPages from './SliderPages';
import { PromotionProps } from '../admin/AddPromotion';
import Loading from '../UI/Loading';

export interface ExtendedPromotionProps extends PromotionProps {
  clone?: 'firstClone' | 'lastClone';
}

const Slider = () => {
  const [promotionsList, setPromotionsList] = useState<
    ExtendedPromotionProps[]
  >([]);
  const promotionsQuery = useFirestoreQueryData(
    ['promotions'],
    promotionsColRef
  );

  useEffect(() => {
    if (promotionsQuery.isSuccess) {
      const promotions = promotionsQuery.data as PromotionProps[];

      const lastClone = {
        ...promotions[promotions.length - 1],
        clone: 'lastClone',
      };

      const firstClone = { ...promotions[0], clone: 'firstClone' };

      setPromotionsList([lastClone, ...promotions, firstClone]);
    }
  }, [promotionsQuery.isSuccess, promotionsQuery.data]);

  if (promotionsQuery.isSuccess)
    return <SliderPages promotions={promotionsList} />;

  return (
    <>
      <Loading />
    </>
  );
};

export default Slider;
