import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAdminFirestore from '../../hooks/useAdminFirestore';
import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { db } from '../../config/firebaseConfig';
import {
  AdminForms,
  SelectEl,
  InputLabelWrapper,
  AdminBtn,
  GoToLink,
} from './styles';
import NewProductInputs from './NewProductInputs';
import { SubmitHandler } from 'react-hook-form';
import { SpecType, BaseInputs, FormTypeSchema } from './schemaTypes';
import { collection } from 'firebase/firestore';
import ActionOverlay from '../UI/ActionOverlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const NewProducts = () => {
  const navigate = useNavigate();
  //prettier-ignore
  const {handleSubmit, register, productsQuery, selectedType, productTypeChangeHandler, productBrands, errors} = useAdminFirestore();
  const [productRef, setProductRef] = useState('/products/fake/fake');
  const addProductMutation = useFirestoreCollectionMutation(
    collection(db, productRef)
  );

  if (addProductMutation.isSuccess) {
    setTimeout(() => {
      navigate(0);
    }, 2000);

    const overlayText = `Product is successfully added to ${productRef}`;

    return (
      <ActionOverlay
        heading="Product Added"
        paragraph={overlayText}
        icon={faCheck}
      />
    );
  }

  const selectBrandEl = productBrands.brands && (
    <InputLabelWrapper>
      <label htmlFor="">Select Product Brand:</label>
      <SelectEl
        defaultValue="--Choose the brand--"
        {...register('select', {
          required: true,
          validate: (value) => productBrands.brands.includes(value),
          onChange: (event) => {
            setProductRef(`/products/${selectedType}/${event.target.value}`);
          },
        })}
      >
        <option disabled>--Choose the brand--</option>
        {productBrands.brands.map((brand) => (
          <option key={brand} value={brand}>
            {brand.toUpperCase()}
          </option>
        ))}
      </SelectEl>
    </InputLabelWrapper>
  );

  const productTypeCtx =
    selectedType &&
    (productBrands?.brands ? (
      <>
        {selectBrandEl}
        {productBrands.schema && (
          <NewProductInputs
            schema={productBrands.schema}
            register={register}
            errors={errors}
          />
        )}
      </>
    ) : (
      <InputLabelWrapper>
        <h4>You need to add products group for the selected type first:</h4>
        <GoToLink to="/admin-panel/add-group">
          Add Group Now
          <FontAwesomeIcon icon={faArrowRight} />
        </GoToLink>
      </InputLabelWrapper>
    ));

  const onAddProductSubmit: SubmitHandler<FormTypeSchema> = (data) => {
    const schemaData: any = {
      spec: {},
    };
    Object.entries(productBrands.schema).forEach(
      (value: [string, number | {}]) => {
        if (typeof value[1] === 'object') {
          Object.entries(value[1]).forEach((val: [string, number]) => {
            const prodSpecType = val[0] as keyof SpecType;
            schemaData.spec[prodSpecType] = data[prodSpecType];
          });
          return;
        }

        const prodBaseType = value[0] as keyof BaseInputs;
        schemaData[prodBaseType] = data[prodBaseType];
      }
    );
    addProductMutation.mutate(schemaData);
  };

  const isFormDisabled =
    !selectedType || !productBrands.brands || Object.keys(errors).length > 0
      ? true
      : false;

  return (
    <AdminForms onSubmit={handleSubmit(onAddProductSubmit)}>
      <InputLabelWrapper>
        <label>Select Product Type:</label>
        <SelectEl
          onChange={(e) => productTypeChangeHandler(e.target.value)}
          defaultValue="--Choose the type--"
        >
          <option disabled>--Choose the type--</option>
          {productsQuery.data?.docs.map((doc) => (
            <option value={doc.id} key={doc.id}>
              {doc.id.toUpperCase()}
            </option>
          ))}
        </SelectEl>
      </InputLabelWrapper>

      {productTypeCtx}

      <AdminBtn disabled={isFormDisabled}>Add Product</AdminBtn>
    </AdminForms>
  );
};

export default NewProducts;
