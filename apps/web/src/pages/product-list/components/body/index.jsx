import {
  Box,
  Flex,
  Grid,
  Select,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import { BreadCrumbs } from '../breadcrumbs';
import { ProductCard } from '../product_card';

export const Body = (props) => {
  // Product Card Mapping
  const renderedProducts = props?.products?.map((product, index) => {
    return <ProductCard {...product} key={index} />;
  });

  console.log('RenderedProducts', renderedProducts);
  return (
    <Box p={'1em'} bgColor={'grey.50'} minH={'100vh'}>
      <VStack align={'stretch'} spacing={'1.5em'}>
        <Box>
          <Text fontWeight={'bold'}>Women</Text>
        </Box>
        <BreadCrumbs segments={props?.segments} />
        <Box>
          <Flex alignItems={'center'}>
            <Text>
              <Text as={'span'} color={'redPure.500'}>
                142 {''}
              </Text>
              Results
            </Text>
            <Spacer />
            <Select
              w={'8em'}
              variant={'filled'}
              bgColor={'white'}
              _focus={{ border: 'none', bgColor: 'white', outline: 'none' }}
              _hover={{ border: 'none', bgColor: 'white' }}
              outline={'none'}
              border={'none'}
              placeholder={'Sort by'}
            ></Select>
          </Flex>
        </Box>
        <Box>
          <Grid
            gridTemplateColumns={'repeat(2, 1fr)'}
            gridAutoRows={'1fr'}
            rowGap={'.5em'}
            columnGap={'.5em'}
          >
            {renderedProducts}
          </Grid>
        </Box>
      </VStack>
    </Box>
  );
};
