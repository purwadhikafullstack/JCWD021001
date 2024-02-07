import {
  AbsoluteCenter,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react'
import { HomeIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Navbar from '../../components/Navbar/Navbar'
import UpdateUsername from './components/username'
import UpdateEmail from './components/email'
import UpdatePassword from './components/password'
import UploadAvatar from './components/avatar'
import Footer from '../../components/Footer/Footer'

function Profile() {
  return (
    <Box bg={'#F1F1F1'} height={'100vh'}>
      <Navbar />
      <Box padding={'0px 100px'} marginBottom={'150px'}>
        <Flex
          className="top-container"
          justifyContent={'space-between'}
          alignItems={'center'}
          margin={'24px'}
        >
          <Flex className="account-settings-left" flexDir={'column'} gap={'16px'}>
            <Text fontSize={'24px'} fontWeight={'700'}>
              Account Setting
            </Text>
            <Flex className="breadcrumb">
              <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
                <BreadcrumbItem>
                  <BreadcrumbLink>
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

        <Flex className="profile-container" margin={'40px 24px'} gap={'24px'} flexWrap={'wrap'}>
          <Box className="upload-photo" padding={'24px'} bg={'white'}>
            <Text marginBottom={'24px'} fontSize={'24px'} fontWeight={'700'}>
              Photo Profile
            </Text>
            <Flex gap={'32px'}>
              <UploadAvatar />
            </Flex>
            <Text marginTop={'35px'}>
              *file extension only .jpg, .jpeg, .png and .gif (max 1MB)
            </Text>
          </Box>
          <Box className="profile-setting" padding={'24px'} bg={'white'} flexGrow={1}>
            <Text marginBottom={'24px'} fontSize={'24px'} fontWeight={'700'}>
              Profile Setting
            </Text>
            <Flex alignItems={'center'}>
              <Flex w={'100px'} alignContent={'center'}>
                <Text>Username</Text>
              </Flex>
              <UpdateUsername />
            </Flex>
            <Flex alignItems={'center'}>
              <Flex w={'100px'}>
                <Text>Email</Text>
              </Flex>

              <UpdateEmail />
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
