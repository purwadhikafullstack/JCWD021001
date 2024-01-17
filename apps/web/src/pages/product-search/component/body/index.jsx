import {
  Box,
  Flex,
  Grid,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ProductCard } from '../../../product-list/components/product_card'
import { ChevronDownIcon } from '@chakra-ui/icons'
import capitalize from 'capitalize'
import { useState } from 'react'
export const Body = (props) => {
  const renderedProducts = props?.products?.map((product, index) => {
    return <ProductCard {...product} key={index} />
  })
  const sortBy = ['name', 'price']
  const [toggleSortBy, setToggleSortBy] = useState(false)

  const updateToggleSortBy = () => {
    setToggleSortBy(true)
  }
  const renderedSortBy = sortBy.map((el, index) => {
    return (
      <MenuItem
        _hover={{ bgColor: 'transparent' }}
        id={el}
        name={el}
        value={el}
        key={index}
        onClick={() => {
          props?.setSortBy(el)
          updateToggleSortBy()
        }}
        display={'block'}
        fontWeight={'bold'}
      >
        {capitalize(el)}
      </MenuItem>
    )
  })
  return (
    <Box p={'1em'} bgColor={'grey.50'} minH={'100vh'} w={'100%'}>
      <VStack align={'stretch'} spacing={'1.5em'}>
        <Text>
          Search for{' '}
          <Text as={'span'} fontWeight={'bold'}>
            "{props?.queryValue}"
          </Text>
        </Text>
        <Box>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Text>
              <Text as={'span'} color={'redPure.500'}>
                {props?.products.length} {''}
              </Text>
              Results
            </Text>
            <Menu autoSelect={false}>
              <MenuButton
                p={'.5em 1em'}
                borderRadius={'.5em'}
                bgColor={'white'}
                _active={{ bgColor: 'white' }}
                _hover={{ bgColor: 'white' }}
              >
                <Flex minW={'6em'} alignItems={'center'} justifyContent={'space-between'}>
                  <Text fontWeight={'bold'}>
                    {' '}
                    {toggleSortBy ? capitalize(props?.sortBy) : 'Sort by'}
                  </Text>
                  <Icon as={ChevronDownIcon} />
                </Flex>
              </MenuButton>
              <MenuList mt={'1em'} minW={'0'} w={'8em'} pr={'2em'}>
                {renderedSortBy}
              </MenuList>
            </Menu>
          </Flex>
        </Box>
        <Grid
          gridTemplateColumns={{
            base: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(5, 1fr)',
            xl: 'repeat(6, 1fr)',
          }}
          gridAutoRows={'1fr'}
          rowGap={{ base: '.5em', md: '1.5em' }}
          columnGap={{ base: '.5em', md: '1.5em' }}
        >
          {renderedProducts}
        </Grid>
      </VStack>
    </Box>
  )
}
