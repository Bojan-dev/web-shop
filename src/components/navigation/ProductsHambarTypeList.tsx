import { useState, useEffect } from 'react';
import { MenuProdTypeList, MenuProdType, MenuProdTypeArrow } from './styles';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import ProductTypeHoverMenu from './ProductTypeHoverMenu';

type Props = {
  productTypes: QueryDocumentSnapshot<DocumentData>[];
  isMenuVisible: boolean;
};

const ProductsHambarTypeList: React.FC<Props> = ({
  productTypes,
  isMenuVisible,
}) => {
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    setSelectedType('');
  }, [isMenuVisible]);

  const onTypeHover = (typeId: string) => {
    setSelectedType((prevType) => {
      if (prevType === typeId) return prevType;

      return typeId;
    });
  };

  return (
    <MenuProdTypeList isMenuVisible={isMenuVisible}>
      {productTypes.map((type) => {
        const isTypeActive = type.id === selectedType;

        return (
          <MenuProdType
            isActive={isTypeActive}
            key={type.id}
            onMouseOver={() => onTypeHover(type.id)}
          >
            <p>{type.id}</p>
            <MenuProdTypeArrow icon={faChevronRight} />
          </MenuProdType>
        );
      })}
      {selectedType && <ProductTypeHoverMenu selectedType={selectedType} />}
    </MenuProdTypeList>
  );
};

export default ProductsHambarTypeList;
