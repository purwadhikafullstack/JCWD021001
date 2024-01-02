import { Box } from '@chakra-ui/react';
import PutuNavbar from '../../../components/putu_navbar';
import { Body } from '../components/body';
import { useLocation } from 'react-router-dom';

export const Product = () => {
  const location = useLocation();
  const { pathname } = location;
  const segments = pathname.split('/');
  return (
    <Box>
      <PutuNavbar />
      <Body segments={segments} />
    </Box>
  );
};
