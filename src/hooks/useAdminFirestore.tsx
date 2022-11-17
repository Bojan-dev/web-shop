import { FormTypeSchema } from '../components/admin/schemaTypes';
import { productsColRef } from '../config/firebaseConfig';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useFirestoreDocumentData } from '@react-query-firebase/firestore';

export type BrandsType = {
  brands: string[];
  schema: FormTypeSchema;
};

const useAdminFirestore = () => {
  const [selectedType, setSelectedType] = useState<boolean | string>(false);
  const productsQuery = useFirestoreQuery(['productsTypes'], productsColRef);
  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormTypeSchema>();
  const ref = doc(db, `/products/${selectedType}`);
  const productBrandsQuery = useFirestoreDocumentData(
    ['productsBrands', selectedType],
    ref
  );
  const productBrands = (productBrandsQuery.data as BrandsType) || false;

  const productTypeChangeHandler = (type: string) => {
    setSelectedType(type);
  };

  return {
    register,
    productsQuery,
    productBrands,
    handleSubmit,
    errors,
    selectedType,
    ref,
    setError,
    clearErrors,
    productTypeChangeHandler,
  };
};

export default useAdminFirestore;
