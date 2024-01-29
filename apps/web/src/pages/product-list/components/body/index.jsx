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
  Text,
  VStack,
} from '@chakra-ui/react'
import { BreadCrumbs } from '../breadcrumbs'
import { ProductCard } from '../product_card'
import capitalize from 'capitalize'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { SideBar } from '../../../../components/sidebar'
import { useLocation, useNavigate } from 'react-router-dom'
export const Body = (props) => {
  // Sort by logic
  const [toggleSortBy, setToggleSortBy] = useState(false)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const sortValue = queryParams.get('so')
  const pathName = location.pathname
  const updateToggleSortBy = () => {
    setToggleSortBy(true)
  }
  // Sort by logic

  // NAVIGATE
  const navigate = useNavigate()
  // NAVIGATE

  const returnNumber = (str) => {
    switch (str) {
      case 'name A - Z':
        return 0
      case 'name Z - A':
        return 1
      case 'price Lo - Hi':
        return 2
      case 'price Hi - Lo':
        return 3
    }
  }

  const returnString = (number) => {
    switch (number) {
      case '1':
      case '3':
        return 'DESC'
      case '0':
      case '2':
        return 'ASC'
    }
  }

  const takeFirstWord = (str) => {
    return str.split(' ')[0]
  }

  // Product Card Mapping
  const renderedProducts = props?.products?.rows?.map((product, index) => {
    return <ProductCard {...product} key={index} />
  })
  const sortBy = ['name A - Z', 'name Z - A', 'price Lo - Hi', 'price Hi - Lo']
  const renderedSortBy = sortBy.map((el, index) => {
    return (
      <MenuItem
        _hover={{ bgColor: 'transparent' }}
        id={el}
        name={el}
        value={el}
        key={index}
        onClick={() => {
          props?.setSortBy(takeFirstWord(el))
          props?.setOrderBy(returnString(sortValue))
          navigate(`${pathName}?so=${returnNumber(el)}`)
          updateToggleSortBy()
        }}
        display={'block'}
        fontWeight={'bold'}
      >
        {capitalize.words(el)}
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
              <Box fontWeight={'bold'}>
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
                    <Flex minW={'8em'} alignItems={'center'} justifyContent={'space-between'}>
                      <Text fontWeight={'bold'}>
                        {toggleSortBy ? capitalize.words(props?.sortBy) : 'Sort by'}
                      </Text>
                      <Icon as={ChevronDownIcon} />
                    </Flex>
                  </MenuButton>
                  <MenuList mt={'.5em'} minW={'0'} w={'10em'} pr={'2em'}>
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
                    lg: 'repeat(5, 1fr)',
                    xl: 'repeat(7, 1fr)',
                  }}
                  // gridGap={{ base: '2em' }}
                  gridColumnGap={'1.5em'}
                  gridRowGap={'1.5em'}
                  justifyItems={'center'}
                >
                  {renderedProducts}
                </Grid>
              </Box>
              <VStack>
                <Button
                  _hover={{
                    bgColor: 'transparent',
                  }}
                  w={'10em'}
                  border={'1px solid #e3024b'}
                  bgColor={'transparent'}
                  color={'redPure.500'}
                  isLoadButtoning={false}
                  mt={'1em'}
                  onClick={() => props?.setPageSize(props?.pageSize + 10)}
                >
                  Load More
                </Button>
              </VStack>
            </Box>
          </Box>
        </Box>
      </VStack>
    </Box>
  )
}
