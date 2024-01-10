import { Box, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import { Body } from '../components/body';
import { useLocation } from 'react-router-dom';
import { getProduct } from '../services/readProduct';
import { getProductCategory } from '../services/readProductCategory';
import { useEffect, useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Navbar } from '../../../components/navbar';
import { SideBar } from '../../../components/sidebar';

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

  // This is for sidebar product categories, and type
  const [productCategories, setProductCategories] = useState([]);
  // Sidebar
  const [collapseSideBar, setCollapseSideBar] = useState(false);

  const [orderBy, setOrderBy] = useState('name');
  const [sortBy, setSortBy] = useState('ASC');

<<<<<<< Updated upstream
=======
  console.log('ORDER BY', orderBy);
>>>>>>> Stashed changes
  // Get product data
  useEffect(() => {
    getProduct(
      productName,
      productGroup,
      productCategory,
      productType,
      setProducts,
      orderBy,
      sortBy,
    );
  }, [
    productName,
    productGroup,
    productCategory,
    productType,
    orderBy,
    sortBy,
    setOrderBy,
  ]);

  // Get Product Category Data
  useEffect(() => {
    getProductCategory(setProductCategories);
  }, []);

  const toggleSideBar = () => {
    setCollapseSideBar(!collapseSideBar);
  };
  return (
    <Box minH={'100vh'}>
      <Navbar
        collapseSideBar={collapseSideBar}
        setCollapseSideBar={setCollapseSideBar}
        toggleSideBar={toggleSideBar}
      />
      <SideBar
        collapseSideBar={collapseSideBar}
        setCollapseSideBar={setCollapseSideBar}
        toggleSideBar={toggleSideBar}
        productCategories={productCategories}
<<<<<<< Updated upstream
      />
      <Body
        segments={segments}
        products={products}
        orderBy={orderBy}
        setProductName={setProductName}
        setProductCategory={setProductCategory}
        setProductGroup={setProductGroup}
        setProductType={setProductType}
        setOrderBy={setOrderBy}
        setSortBy={setSortBy}
      />
=======
      />
      <Box display={collapseSideBar ? 'none' : 'block'}>
        <Body
          segments={segments}
          products={products}
          setProductName={setProductName}
          setProductCategory={setProductCategory}
          setProductGroup={setProductGroup}
          setProductType={setProductType}
          setOrderBy={setOrderBy}
          setSortBy={setSortBy}
        />
      </Box>
>>>>>>> Stashed changes
      <Flex
        zIndex={'3'}
        bgColor={'white'}
        position={'fixed'}
        top={'50%'}
        transform={'translateY(50%)'}
        w={'1.8em'}
        h={'1.8em'}
        alignItems={'center'}
        justifyContent={'center'}
        borderRadius={'50%'}
        left={'-.5em'}
        visibility={collapseSideBar ? 'hidden' : 'visible'}
        cursor={'pointer'}
      >
        <Icon as={ChevronRightIcon} onClick={() => toggleSideBar()} />
      </Flex>
    </Box>
  );
};
