import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import { BreadCrumbs } from '../breadcrumbs';
import { ProductCard } from '../product_card';
import capitalize from 'capitalize';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
export const Body = (props) => {
  // Sort by logic
  const [toggleSortBy, setToggleSortBy] = useState(false);

  const updateToggleSortBy = () => {
    setToggleSortBy(true);
  };
  // Product Card Mapping
  const renderedProducts = props?.products?.map((product, index) => {
    return <ProductCard {...product} key={index} />;
  });
  const sortBy = ['name', 'price'];
  const renderedSortBy = sortBy.map((el, index) => {
    return (
      <MenuItem
        id={el}
        name={el}
        value={el}
        key={index}
        onClick={() => {
          props?.setOrderBy(el);
          updateToggleSortBy();
        }}
        display={'block'}
        fontWeight={'bold'}
      >
        {capitalize(el)}
      </MenuItem>
    );
  });
  return (
    <Box p={'1em'} bgColor={'grey.50'} minH={'100vh'} w={'100%'}>
      <VStack align={'stretch'} spacing={'1.5em'}>
        <Box>
          <Text fontWeight={'bold'}>Women</Text>
        </Box>
        <BreadCrumbs segments={props?.segments} />
        <Box>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Box>
              <Text>
                <Text as={'span'} color={'redPure.500'}>
                  {props?.products.length} {''}
                </Text>
                Results
              </Text>
            </Box>
            <Box>
              <Menu autoSelect={false}>
                <MenuButton
                  p={'.5em 1em'}
                  borderRadius={'.5em'}
                  bgColor={'white'}
                  _active={{ bgColor: 'white' }}
                  _hover={{ bgColor: 'white' }}
                >
                  <Flex
                    minW={'6em'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                  >
                    <Text fontWeight={'bold'}>
                      {toggleSortBy ? capitalize(props?.orderBy) : 'Sort by'}
                    </Text>
                    <Icon as={ChevronDownIcon} />
                  </Flex>
                </MenuButton>
                <MenuList mt={'1em'} minW={'0'} w={'8em'} pr={'2em'}>
                  {renderedSortBy}
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        </Box>
        <Box>
          <Grid
            gridTemplateColumns={{
              base: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(5, 1fr)',
              lg: 'repeat(6, 1fr)',
            }}
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
