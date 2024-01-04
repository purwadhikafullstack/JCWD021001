import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { PutuNavbar } from '../../../components/putu_navbar';
import { Body } from '../components/body';
import { useLocation } from 'react-router-dom';
import { getProduct } from '../services/readProduct';
import { useEffect, useState } from 'react';
import { SideBar } from '../components/side-bar';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

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

  // Sidebar
  const [collapseSideBar, setCollapseSideBar] = useState(false);

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

  const toggleSideBar = () => {
    setCollapseSideBar(!collapseSideBar);
  };
  return (
    <Box minH={'100vh'}>
      <PutuNavbar
        collapseSideBar={collapseSideBar}
        setCollapseSideBar={setCollapseSideBar}
        toggleSideBar={toggleSideBar}
      />
      <SideBar
        collapseSideBar={collapseSideBar}
        setCollapseSideBar={setCollapseSideBar}
        toggleSideBar={toggleSideBar}
      />
      <Box display={collapseSideBar ? 'none' : 'block'}>
        <Body
          segments={segments}
          products={products}
          setProductName={setProductName}
          setProductCategory={setProductCategory}
          setProductGroup={setProductGroup}
          setProductType={setProductType}
        />
      </Box>
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
      >
        <Icon as={ChevronRightIcon} onClick={() => toggleSideBar()} />
      </Flex>
    </Box>
  );
};
