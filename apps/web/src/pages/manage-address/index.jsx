import { Box, Button, Flex, Heading, Icon, Input, Select, Text } from '@chakra-ui/react'
import { BreadCrumbs } from './components/breadcrumbs'
import Footer from '../../components/Footer/Footer'
import { PlusIcon } from '@heroicons/react/24/outline'
import AddressList from './components/address-list'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../../components/navbar'

function ManageAddress() {
  const navigate = useNavigate()

  return (
    <Box bg={'#F1F1F1'} height={'100%'} maxW={'100vw'}>
      <Navbar/>
      <Box padding={{ base: '0px 20px', md: '0px 100px' }} marginBottom={'150px'}>
        <Flex
          className="create-address-top"
          flexDir={'column'}
          gap={'16px'}
          marginTop={'24px'}
          marginBottom={'40px'}
        >
          <Flex justifyContent={'space-between'} align={'center'}>
            <Heading as={'h1'} fontSize={{ base: '16px', md: '24px' }} fontWeight={'700'}>
              Manage Address
            </Heading>
            <Button
              bg={'brand.lightred'}
              display={{ base: 'inline', md: 'none' }}
              color={'white'}
              _hover={{ bg: '#f50f5a' }}
              _active={{ opacity: '70%' }}
              onClick={() => navigate('/create-address')}
            >
              <Flex
                justifyContent={'center'}
                align={'center'}
                gap={'10px'}
              >
                <Icon as={PlusIcon} boxSize={'20px'} />
                <Text fontSize={'12px'} fontWeight={'700'}>
                  Create Address
                </Text>
              </Flex>
            </Button>
          </Flex>
          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <BreadCrumbs />
            <Button
              bg={'brand.lightred'}
              display={{base: 'none', md: 'inline'}}
              color={'white'}
              _hover={{ bg: '#f50f5a' }}
              _active={{ opacity: '70%' }}
              onClick={() => navigate('/create-address')}
            >
              <Flex
                justifyContent={'center'}
                alignItems={'center'}
                gap={'10px'}
              >
                <Icon as={PlusIcon} boxSize={'24px'} />
                <Text fontSize={'14px'} fontWeight={'700'}>
                  Create Address
                </Text>
              </Flex>
            </Button>
          </Flex>
        </Flex>
        <Box width={'100%'} bg={'white'} padding={'24px'} mb={'40px'}>
          <Text fontSize={{base: '14px', md: '24px'}} fontWeight={'700'}>
            Address
          </Text>
          <AddressList />
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default ManageAddress
