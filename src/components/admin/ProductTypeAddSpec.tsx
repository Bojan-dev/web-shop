import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { ProductType, ReducerAction } from './AddProductType';
import {
  AddSpecWrapper,
  AddSpecInput,
  DeleteSpec,
  InputLabelWrapper,
} from './styles';

type AddSpecProps = {
  register: UseFormRegister<ProductType>;
  dispatch: React.Dispatch<ReducerAction>;
  id: string;
};

const ProductTypeAddSpec: React.FC<AddSpecProps> = ({
  register,
  dispatch,
  id,
}) => {
  const deleteSpecInputs = () => {
    dispatch({ type: 'DELETE_SPEC', payload: id });
  };

  return (
    <AddSpecWrapper>
      <DeleteSpec onClick={deleteSpecInputs}>x</DeleteSpec>
      <InputLabelWrapper>
        <AddSpecInput
          {...register(`spec.${id}_name`, {
            required: 'Fill in the field',
          })}
          placeholder="Spec name"
        />
      </InputLabelWrapper>
      <InputLabelWrapper>
        <AddSpecInput
          type="number"
          {...register(`spec.${id}_chars`, {
            required: 'Fill in the field',
          })}
          placeholder="Number of chars"
        />
      </InputLabelWrapper>
    </AddSpecWrapper>
  );
};

export default React.memo(ProductTypeAddSpec);
