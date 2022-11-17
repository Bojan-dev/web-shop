import { db } from '../../config/firebaseConfig';
import { useFirestoreDocumentData } from '@react-query-firebase/firestore';
import { doc } from 'firebase/firestore';
import { BrandsType } from '../../hooks/useAdminFirestore';
import { BrandsMenu } from './styles';
import Loading from '../UI/Loading';

const ProductTypeHoverMenu: React.FC<{ selectedType: string }> = ({
  selectedType,
}) => {
  const brandsRef = doc(db, `products/${selectedType}`);
  const productBrandsQuery = useFirestoreDocumentData(
    ['productsBrands', selectedType],
    brandsRef
  );
  const productBrands = productBrandsQuery.data as BrandsType;
  let brandsCtx: JSX.Element | JSX.Element[] = <></>;

  if (productBrandsQuery.isError)
    brandsCtx = <p>{productBrandsQuery.error.message}</p>;

  if (productBrandsQuery.isLoading) brandsCtx = <Loading />;

  if (productBrandsQuery.isSuccess) {
    brandsCtx = productBrands?.brands ? (
      productBrands?.brands.map((brand) => (
        <li key={brand}>{brand.length <= 2 ? brand.toUpperCase() : brand}</li>
      ))
    ) : (
      <li>All {selectedType}</li>
    );
  }

  return <BrandsMenu>{brandsCtx}</BrandsMenu>;
};

export default ProductTypeHoverMenu;
