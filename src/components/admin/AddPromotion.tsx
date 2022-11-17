import { ChangeEvent, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AdminForms, InputLabelWrapper, AdminInput, AdminBtn } from './styles';
import { ErrorP } from '../../styles/global';
import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { promotionsColRef } from '../../config/firebaseConfig';
import ActionOverlay from '../UI/ActionOverlay';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export type PromotionProps = {
  imgUrl: string;
  url: string;
};

const AddPromotion = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PromotionProps>();
  const [formInputs, setFormInputs] = useState({
    imgUrl: true,
    url: true,
  });
  const addPromotionMutation = useFirestoreCollectionMutation(promotionsColRef);

  const imgUrlErr = errors.imgUrl ? true : false;
  const urlErr = errors.url ? true : false;

  const onHandleInputValueChange = (
    e: ChangeEvent<HTMLInputElement>,
    input: keyof PromotionProps
  ) => {
    if (e.target.value.length > 1 && !formInputs[input]) return;

    setFormInputs((prevState) => {
      if (e.target.value.length > 0)
        return { ...prevState, [`${input}`]: false };

      if (e.target.value.length === 0)
        return { ...prevState, [`${input}`]: true };

      return prevState;
    });
  };

  const onAddPromotionSubmit: SubmitHandler<PromotionProps> = (data) => {
    addPromotionMutation.mutate(data);
  };

  if (addPromotionMutation.isSuccess) {
    setTimeout(() => {
      navigate(0);
    }, 1500);

    return (
      <ActionOverlay
        heading="Promotion Added"
        icon={faCheck}
        paragraph={'New promotion successfully added'}
      />
    );
  }

  return (
    <AdminForms onSubmit={handleSubmit(onAddPromotionSubmit)}>
      <InputLabelWrapper>
        <AdminInput
          {...register('imgUrl', {
            required: 'Please, provide a promotion image url',
            pattern: {
              value: /\/\/(\S+?(?:jpe?g|png|gif))/gi,
              message: 'Please, provide an image url',
            },
            onChange: (e) => onHandleInputValueChange(e, 'imgUrl'),
          })}
          type="text"
          placeholder="Promotion image url"
          isError={imgUrlErr}
        />
        {errors.imgUrl ? <ErrorP>{errors.imgUrl.message}</ErrorP> : ''}
        <AdminInput
          {...register('url', {
            required: 'Please, provide a promotion url',
            onChange: (e) => onHandleInputValueChange(e, 'url'),
            pattern: {
              value:
                /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
              message: 'Please, provide an url to promotion',
            },
          })}
          type="text"
          placeholder="Promotion url"
          isError={urlErr}
        />
        {errors.url ? <ErrorP>{errors.url?.message}</ErrorP> : ''}
      </InputLabelWrapper>
      <AdminBtn disabled={formInputs.imgUrl || formInputs.url}>
        Add Promotion
      </AdminBtn>
    </AdminForms>
  );
};

export default AddPromotion;
