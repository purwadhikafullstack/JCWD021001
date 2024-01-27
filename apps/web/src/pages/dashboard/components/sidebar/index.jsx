import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Box, Flex, HStack, Icon, Text, VStack } from '@chakra-ui/react'
import { Squares2X2Icon } from '@heroicons/react/24/outline'
import { SidebarButton } from '../sidebar-button'
import { useNavigate } from 'react-router-dom'
export const Sidebar = (props) => {
  // NAVIGATE
  const navigate = useNavigate()
  // NAVIGATE

  return (
    <Box
      position={'relative'}
      p={'1em'}
      m={{ base: '0' }}
      w={{ base: '100%', md: '15em' }}
      borderEndRadius={{ base: 'none', md: '1em' }}
      zIndex={'2'}
      top={'0'}
      minH={'100vh'}
      display={{ base: props?.collapseSideBar ? 'block' : 'none', md: 'block' }}
    >
      <VStack align={'stretch'}>
        <HStack alignItems={'center'}>
          <Icon as={Squares2X2Icon} />
          <Text>Dashboard</Text>
        </HStack>
        <VStack align={'stretch'} spacing={'1.5em'}>
          <SidebarButton label={'Product'} icon={Squares2X2Icon} />
          <Box p={'0 1.3em'} borderLeft={'2px solid lightgray'}>
            <VStack align={'stretch'} spacing={'1.5em'}>
              <Text
                onClick={() => {
                  navigate('/dashboard/product-list?pa=1')
                }}
                cursor={'pointer'}
              >
                Product List
              </Text>
              <Text
                onClick={() => {
                  navigate('/dashboard/product-category')
                }}
                cursor={'pointer'}
              >
                Product Category
              </Text>
            </VStack>
          </Box>
          <SidebarButton label={'Inventory'} icon={Squares2X2Icon} />
          <Box p={'0 1.3em'} borderLeft={'2px solid lightgray'}>
            <VStack align={'stretch'} spacing={'1.5em'}>
              <Text
                onClick={() => {
                  navigate('/dashboard/stock-management?pa=1')
                }}
                cursor={'pointer'}
              >
                Stock Management
              </Text>
              <Text
                onClick={() => {
                  navigate('/dashboard/stock-mutation?pa=1&fi=0')
                }}
                cursor={'pointer'}
              >
                Stock Mutation
              </Text>
            </VStack>
          </Box>
        </VStack>
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
