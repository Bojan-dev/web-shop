import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import InputsSchema from './schemaTypes';
import { updateDoc, arrayUnion, collection } from 'firebase/firestore';
import { ErrorP } from '../../styles/global';
import { db } from '../../config/firebaseConfig';
import {
  AdminForms,
  SelectEl,
  InputLabelWrapper,
  AdminInput,
  AdminBtn,
} from './styles';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ActionOverlay from '../UI/ActionOverlay';
import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import useAdminFirestore from '../../hooks/useAdminFirestore';

const AddGroup = () => {
  const navigate = useNavigate();
  const [groupAddedText, setGroupAddedText] = useState('');
  //prettier-ignore
  const {handleSubmit,register, selectedType, productsQuery,productTypeChangeHandler,ref,errors, productBrands, setError, clearErrors } = useAdminFirestore();
  const [productGroupRef, setProductGroupRef] = useState(`products/fake/fake`);
  const addGroupMutation = useFirestoreCollectionMutation(
    collection(db, productGroupRef)
  );
  const onAddProductGroupHandler: SubmitHandler<InputsSchema> = async (
    data
  ) => {
    const groupToAdd = data.title.toLocaleLowerCase();

    if (productBrands.brands) {
      const doesGroupExist = productBrands.brands.includes(groupToAdd);

      if (doesGroupExist) {
        setError('description', { message: 'This group already exist' });
        return;
      }
    }

    setProductGroupRef(`/products/${selectedType}/${groupToAdd}`);

    await updateDoc(ref, {
      brands: arrayUnion(groupToAdd),
    });

    addGroupMutation.mutate({ fake: true });

    setGroupAddedText(
      `Group ${groupToAdd} is successfully addded to ${selectedType}!`
    );
  };

  if (addGroupMutation.isSuccess) {
    setTimeout(() => {
      navigate(0);
    }, 1500);
    return (
      <ActionOverlay
        heading="Group Added"
        icon={faCheck}
        paragraph={groupAddedText}
      />
    );
  }

  const isFormDisabled = !selectedType ? true : false;

  return (
    <AdminForms onSubmit={handleSubmit(onAddProductGroupHandler)}>
      <InputLabelWrapper>
        <label>Select Product Type:</label>
        <SelectEl
          defaultValue="--Choose the type--"
          {...register('select', {
            required: 'Please select product type',
            validate: (e) => {
              const isProductTypeSelected =
                e === '--Choose the type--' ? false : true;
              return isProductTypeSelected;
            },
            onChange: (e) => productTypeChangeHandler(e.target.value),
          })}
        >
          <option disabled>--Choose the type--</option>
          {productsQuery.data?.docs.map((doc) => (
            <option value={doc.id} key={doc.id}>
              {doc.id.toUpperCase()}
            </option>
          ))}
        </SelectEl>
      </InputLabelWrapper>
      {selectedType && (
        <InputLabelWrapper>
          <AdminInput
            placeholder="Product group to add"
            {...register('title', {
              required: 'Provide the group name you want to add',
              onChange: () => {
                if (errors.description) clearErrors('description');
              },
            })}
          />
          {errors.title && <ErrorP>{errors.title.message}</ErrorP>}
        </InputLabelWrapper>
      )}
      {errors.description && <ErrorP>{errors.description.message}</ErrorP>}
      <AdminBtn disabled={isFormDisabled}>Add Product Group</AdminBtn>
    </AdminForms>
  );
};

export default AddGroup;
