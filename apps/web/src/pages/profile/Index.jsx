import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Icon,
  Text,
} from '@chakra-ui/react'
import { HomeIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@chakra-ui/icons'
import UpdateUsername from './components/username'
import UpdateEmail from './components/email'
import UpdatePassword from './components/password'
import UploadAvatar from './components/avatar'
import Footer from '../../components/Footer/Footer'
import UserAddress from './components/address'
import { Navbar } from '../../components/navbar'

function Profile() {
  return (
    <Box bg={'#F1F1F1'} height={'100vh'} maxW={'100vw'} overflowX={'hidden'}>
      <Navbar />
      <Box padding={{base: '0px 20px', md:'0px 100px'}} marginBottom={'150px'}>
        <Flex
          className="top-container"
          justifyContent={'space-between'}
          alignItems={'center'}
          margin={'24px 0'}
        >
          <Flex className="account-settings-left" flexDir={'column'} gap={'16px'}>
            <Heading fontSize={{base: '16px', md: '24px'}} fontWeight={'700'}>
              Account Setting
            </Heading>
            <Flex className="breadcrumb">
              <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
                <BreadcrumbItem>
                  <BreadcrumbLink href='/'>
                    <Icon as={HomeIcon} boxSize={'16px'} color={'#838383'} />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink color={'brand.lightred'} fontWeight={'700'} fontSize={'12px'}>
                    Account Setting
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Flex>
          </Flex>
        </Flex>

        <Flex className="profile-container"  gap={'24px'} flexWrap={'wrap'}>
          <Box className="upload-photo" padding={'24px'} bg={'white'}>
            <Text marginBottom={'24px'} fontSize={{base: '14px', md:'24px'}} fontWeight={'700'}>
              Photo Profile
            </Text>
            <Flex gap={'32px'}>
              <UploadAvatar />
            </Flex>
            <Text marginTop={'35px'} fontSize={{base: '12px', md: '16px'}}>
              *file extension only .jpg, .jpeg, .png and .gif (max 1MB)
            </Text>
          </Box>
          <Box className="profile-setting" padding={'24px'} bg={'white'} overflow={'hidden'} flexGrow={1}>
            <Text marginBottom={'24px'} fontSize={{base: '14px', md:'24px'}} fontWeight={'700'}>
              Profile Setting
            </Text>
            <Flex alignItems={'center'} mb={'10px'}>
              <Flex w={'100px'} alignContent={'center'}>
                <Text fontSize={{base: '12px', md: '16px'}}>Username</Text>
              </Flex>
              <UpdateUsername />
            </Flex>
            <Flex alignItems={'center'}>
              <Flex w={'100px'}>
                <Text fontSize={{base: '12px', md: '16px'}}>Email</Text>
              </Flex>
              <UpdateEmail />
            </Flex>
            <Flex alignItems={'center'}>
              <Flex w={'100px'}>
                <Text fontSize={{base: '12px', md: '16px'}}>Address</Text>
              </Flex>
              <Flex w={'100%'}>
                <UserAddress />
              </Flex>
            </Flex>
            <Flex alignItems={'center'}>
              <Flex w={'100%'}>
                <UpdatePassword />
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Footer />
    </Box>
  )
}

export default Profile
