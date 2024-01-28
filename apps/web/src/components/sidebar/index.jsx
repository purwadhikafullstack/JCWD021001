import { Box, Flex, Icon, Text, VStack } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import capitalize from 'capitalize'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import slug from 'slug'
export const SideBar = (props) => {
  // Navigate
  const navigate = useNavigate()

  // Toggle Sidebar
  const [toggleType, setToggleType] = useState({})

  // Handle Toggle
  const changeToggleType = (id) => {
    setToggleType((set) => ({
      ...set,
      [id]: !set[id],
    }))
  }

  // Rendered Categories
  const renderedCategories = props?.productCategories.map((productGroup, index) => {
    slug.extend({
      '&': 'and',
    })
    return (
      <VStack align={'stretch'} key={index} spacing={'1.5em'} cursor={'pointer'}>
        <Flex
          alignItems={'center'}
          justifyContent={'space-between'}
          onClick={() => {
            changeToggleType(productGroup?.id)
          }}
        >
          <Text>{productGroup?.name}</Text>
          <Icon as={toggleType[productGroup?.id] ? ChevronUpIcon : ChevronDownIcon} />
        </Flex>
        <VStack
          borderLeft={'2px solid lightgray'}
          p={'0 1em'}
          display={toggleType[productGroup?.id] ? 'block' : 'none'}
        >
          <Text
            onClick={() => {
              navigate(`/p/${props?.gender}/${productGroup?.name?.toLowerCase()}`)
            }}
            mb={'1.5em'}
          >
            All {productGroup?.name}
          </Text>
          {productGroup?.category
            ? productGroup?.category?.map((productCategory, index, arr) => {
                return (
                  <Text
                    key={index}
                    mb={index == arr.length - 1 ? '0' : '1.5em'}
                    onClick={() => {
                      props?.setProductCategory(`${productCategory?.name}`)
                      navigate(
                        `/p/${props?.gender}/${productGroup?.name?.toLowerCase()}/${slug(
                          productCategory?.name?.toLowerCase(),
                        )}`,
                      )
                    }}
                  >
                    {productCategory?.name}
                  </Text>
                )
              })
            : null}
        </VStack>
      </VStack>
    )
  })

  return (
    <Box
      position={'relative'}
      bgColor={'white'}
      p={'1em'}
      m={{ base: '0', md: '0 0 -1em -1em' }}
      w={{ base: '100%', md: '15em' }}
      borderEndRadius={{ base: 'none', md: '1em' }}
      zIndex={'2'}
      top={'0'}
      minH={'100vh'}
    >
      <VStack align={'stretch'}>
        <Text color={'redPure.500'}>All {capitalize.words(props?.gender)}</Text>
        {renderedCategories}
        <Flex
          alignItems={'center'}
          w={'6.5em'}
          justifyContent={'space-between'}
          onClick={() => props?.toggleSideBar()}
          cursor={'pointer'}
          display={{ base: 'flex', md: 'none' }}
        >
          <Flex
            bgColor={'white'}
            w={'1.8em'}
            h={'1.8em'}
            alignItems={'center'}
            justifyContent={'center'}
            borderRadius={'50%'}
            shadow={'md'}
          >
            <Icon as={ChevronLeftIcon} />
          </Flex>
          <Text>Collapse</Text>
        </Flex>
      </VStack>
    </Box>
  )
}
