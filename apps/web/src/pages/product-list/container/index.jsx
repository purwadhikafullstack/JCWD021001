import { Box, Text } from '@chakra-ui/react';
import PutuNavbar from '../../../components/putu_navbar';
import { Body } from '../components/body';
import { useLocation } from 'react-router-dom';
import { getProduct } from '../services/readProduct';
import { useEffect, useState } from 'react';

export const Product = () => {
  // useLocation to know url route
  const location = useLocation();
  const { pathname } = location;

  // Splitting pathname for breadcrumbs
  const segments = pathname.split('/');

  // Empty array state for products
  const [products, setProducts] = useState([]);

  // State for filtering products
  const [productName, setProductName] = useState(null);
  const [productGroup, setProductGroup] = useState(3);
  const [productCategory, setProductCategory] = useState(1);
  const [productType, setProductType] = useState(0);

  // Get product data
  useEffect(() => {
    getProduct(
      productName,
      productGroup,
      productCategory,
      productType,
      setProducts,
    );
  }, [productName, productGroup, productCategory, productType]);

  return (
    <Box>
      <PutuNavbar />
      <Body
        segments={segments}
        products={products}
        setProductName={setProductName}
        setProductCategory={setProductCategory}
        setProductGroup={setProductGroup}
        setProductType={setProductType}
      />
    </Box>
  );
};
