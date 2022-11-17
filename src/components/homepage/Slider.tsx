import { useFirestoreQueryData } from '@react-query-firebase/firestore';
import { promotionsColRef } from '../../config/firebaseConfig';
import SliderPages from './SliderPages';
import { PromotionProps } from '../admin/AddPromotion';

const Slider = () => {
  const promotionsQuery = useFirestoreQueryData(
    ['promotions'],
    promotionsColRef
  );

  if (promotionsQuery.isLoading || promotionsQuery.isError) return <></>;

  return <SliderPages promotions={promotionsQuery.data as PromotionProps[]} />;
};

export default Slider;
