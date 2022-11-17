import { v4 as uuidv4 } from 'uuid';
import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminForms, AdminInput, AdminBtn, AddSpecBtn } from './styles';
import { ErrorP } from '../../styles/global';
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { doc } from 'firebase/firestore';
import { productsColRef } from '../../config/firebaseConfig';
import { useForm, SubmitHandler } from 'react-hook-form';
import ActionOverlay from '../../components/UI/ActionOverlay';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import ProductTypeAddSpec from './ProductTypeAddSpec';

interface Spec {
  [key: string]: string;
}

export type ProductType = {
  productType: string;
  spec: Spec;
};

export type ReducerAction = {
  type: 'ADD_SPEC' | 'DELETE_SPEC';
  payload: string;
};

const controlSpecReducer = (
  state: string[] | [],
  actions: ReducerAction
): string[] => {
  if (actions.type === 'ADD_SPEC') {
    return [...state, actions.payload];
  }
  if (actions.type === 'DELETE_SPEC') {
    const filteredState = state.filter((specId) => specId !== actions.payload);

    return filteredState;
  }
  return state;
};

const AddProductType = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(controlSpecReducer, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<ProductType>();
  const productTypeInput = watch('productType');
  const productType = productTypeInput ? productTypeInput : 'fake';
  const addProductTypeMutation = useFirestoreDocumentMutation(
    doc(productsColRef, productType)
  );
  const productTypeAddedText = `You have successfully added "${productType}" group.`;

  const handleAddProductSubmit: SubmitHandler<ProductType> = (data) => {
    const specsObj: { [key: string]: number } = {};

    if (data.spec) {
      const existingSpecsArr: [string, string][] = [];

      Object.entries(data.spec).forEach((spec) => {
        const doesSpecExist = state.includes(spec[0].split('_')[0]);

        if (doesSpecExist) {
          existingSpecsArr.push(spec);
        }
      });

      existingSpecsArr.forEach((spec) => {
        const specId = spec[0].split('_');

        if (specId[1] === 'chars') return;

        const specValue = existingSpecsArr.find(
          (spec) => `${specId[0]}_chars` === spec[0]
        );

        if (specValue) specsObj[spec[1]] = Number(specValue[1]);
      });
    }

    addProductTypeMutation.mutate({
      schema: {
        title: 100,
        image: 100,
        price: 5,
        description: 150,
        spec: specsObj,
      },
    });
  };

  if (addProductTypeMutation.isSuccess) {
    setTimeout(() => {
      navigate(0);
    }, 1500);

    return (
      <ActionOverlay
        heading="Product Type Added"
        paragraph={productTypeAddedText}
        icon={faCheck}
      />
    );
  }

  const isFormDisabled = !productTypeInput ? true : false;

  const addSpecInputs = () => {
    dispatch({
      type: 'ADD_SPEC',
      payload: uuidv4(),
    });
  };

  return (
    <AdminForms onSubmit={handleSubmit(handleAddProductSubmit)}>
      <AdminInput
        placeholder="Product type you want to add"
        {...register('productType', {
          required: 'You need to fill in the product type name',
        })}
      />
      {errors.productType && <ErrorP>{errors.productType.message}</ErrorP>}
      {state.map((specKey) => (
        <ProductTypeAddSpec
          key={specKey}
          id={specKey}
          register={register}
          dispatch={dispatch}
        />
      ))}
      <p style={{ textAlign: 'center' }}>
        Besides base specs every product type can have special specs you can
        declare:
      </p>
      <AddSpecBtn onClick={addSpecInputs}>Add Spec</AddSpecBtn>
      <AdminBtn type="submit" disabled={isFormDisabled}>
        Submit
      </AdminBtn>
    </AdminForms>
  );
};

export default AddProductType;
