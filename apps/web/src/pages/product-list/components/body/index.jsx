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
import { BreadCrumbs } from '../breadcrumbs'
import { ProductCard } from '../product_card'
import capitalize from 'capitalize'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { SideBar } from '../../../../components/sidebar'
export const Body = (props) => {
  // Sort by logic
  const [toggleSortBy, setToggleSortBy] = useState(false)

  const updateToggleSortBy = () => {
    setToggleSortBy(true)
  }
  // Product Card Mapping
  const renderedProducts = props?.products?.map((product, index) => {
    return <ProductCard {...product} key={index} />
  })
  const sortBy = ['name', 'price']
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
        <Box>
          <Text fontWeight={'bold'}>{capitalize.words(props?.gender)}</Text>
        </Box>
        <BreadCrumbs
          breadCrumbs={props?.breadCrumbs}
          segments={props?.segments}
          gender={props?.gender}
          group={props?.group}
          category={props?.category}
        />
        <Box display={{ base: 'block', md: 'flex' }} gap={'1em'} w={'100%'}>
          <Box display={{ base: 'none', md: 'flex' }}>
            <SideBar
              gender={props?.gender}
              group={props?.group}
              productCategories={props?.productCategories}
              categoryName={props?.categoryName}
              productGroup={props?.productGroup}
              segments={props?.segments}
              pathname={props?.pathname}
              setProductCategory={props?.setProductCategory}
            />
          </Box>
          <Box w={'100%'} p={{ base: 'none', md: '.5em' }}>
            <Flex alignItems={'center'} justifyContent={'space-between'} mb={'1em'}>
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
                    <Flex minW={'6em'} alignItems={'center'} justifyContent={'space-between'}>
                      <Text fontWeight={'bold'}>
                        {toggleSortBy ? capitalize(props?.sortBy) : 'Sort by'}
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
            <Box>
              <Box w={'100%'}>
                <Grid
                  gridTemplateColumns={{
                    base: 'repeat(2, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                    xl: 'repeat(5, 1fr)',
                  }}
                  gridAutoRows={'1fr'}
                  rowGap={{ base: '.5em', md: '1.5em' }}
                  columnGap={{ base: '.5em', md: '1.5em' }}
                >
                  {renderedProducts}
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
      </VStack>
    </Box>
  )
}
