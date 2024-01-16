import { Box, Flex, Icon, Text, VStack } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import capitalize from 'capitalize'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import slug from 'slug'
export const SideBar = (props) => {
  const navigate = useNavigate()
  const [toggleType, setToggleType] = useState({})
  const changeToggleType = (id) => {
    setToggleType((set) => ({
      ...set,
      [id]: !set[id],
    }))
  }
  const groupCategories = Object.groupBy(props?.productCategories, (product) => {
    return product.parent.name
  })

  console.log('groupCategories', groupCategories)
  console.log('productCategories', props?.productCategories)
  const renderedCategories = [groupCategories].map((el, index) => {
    slug.extend({
      '&': 'and',
    })
    return (
      <VStack align={'stretch'} key={index} spacing={'1.5em'} cursor={'pointer'}>
        <Flex
          alignItems={'center'}
          justifyContent={'space-between'}
          onClick={() => changeToggleType(el?.id)}
        >
          <Text>{el?.name}</Text>
          <Icon as={toggleType[el?.id] ? ChevronUpIcon : ChevronDownIcon} />
        </Flex>
        <VStack
          borderLeft={'2px solid lightgray'}
          p={'0 1em'}
          display={toggleType[el?.id] ? 'block' : 'none'}
          onClick={() => props?.setProductCategory(el?.name)}
        >
          {el?.type
            ? el?.type?.map((elPT, index, arr) => {
                return (
                  <Text
                    key={index}
                    mb={index == arr.length - 1 ? '0' : '1.5em'}
                    onClick={() => {
                      props?.setProductType(`${elPT?.name}`)
                      navigate(
                        `/${props?.groupName}/${el?.name?.toLowerCase()}/${slug(
                          elPT?.name?.toLowerCase(),
                        )}`,
                      )
                    }}
                  >
                    {elPT?.name}
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
