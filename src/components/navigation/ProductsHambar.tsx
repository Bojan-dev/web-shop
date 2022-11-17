import { useState } from 'react';
import {
  ProductBarBtn,
  ProductsMenu,
  CloseMenuBtn,
  CloseMenuIcon,
} from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { Overlay } from '../UI/styles';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { productsColRef } from '../../config/firebaseConfig';
import ProductsHambarTypeList from './ProductsHambarTypeList';

const ProductsHambar = () => {
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const productsQuery = useFirestoreQuery(['productsTypes'], productsColRef);
  let typesCtx = <></>;

  const closeMenu = () => {
    setIsProductMenuOpen(false);
  };

  const showMenu = () => {
    setIsProductMenuOpen(true);
  };

  if (productsQuery.isSuccess)
    typesCtx = (
      <ProductsHambarTypeList productTypes={productsQuery.data.docs} />
    );

  if (productsQuery.isError) typesCtx = <p>{productsQuery.error.message}</p>;

  return (
    <>
      <ProductBarBtn onClick={showMenu}>
        <FontAwesomeIcon icon={faBarsStaggered} /> Products
      </ProductBarBtn>

      {isProductMenuOpen && (
        <>
          <Overlay onClick={closeMenu} />
          <ProductsMenu>
            {typesCtx}
            <CloseMenuBtn onClick={closeMenu}>
              <CloseMenuIcon icon={faClose} />
            </CloseMenuBtn>
          </ProductsMenu>
        </>
      )}
    </>
  );
};

export default ProductsHambar;
