import { AbsoluteCenter, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, FormControl, FormLabel, Icon, Image, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react"
import model from '../../assets/images/signup-model.jpeg'

import { HomeIcon} from '@heroicons/react/24/outline'
import { PhotoIcon} from '@heroicons/react/24/solid'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { useFormik } from "formik"
import { useDispatch, useSelector} from 'react-redux'
import logo from "../../assets/images/logo.png"
import Navbar from "../../components/Navbar/Navbar"
function Profile() {
    // const user = useSelector(state => state.authReducer.user);
    // const dispatch = useDispatch();
  return (
    <Box bg={'#F1F1F1'}
    height={'100vh'}>
        <Navbar/>
        <Flex className="top-container"
        justifyContent={'space-between'}
        alignItems={'center'}
        margin={'24px'}>
            <Flex className="account-settings-left"
            flexDir={'column'}
            gap={'16px'}>
                <Text fontSize={'24px'}
                fontWeight={'700'}>Account Setting</Text>
                <Flex className="breadcrumb"
                >
                <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
                    <BreadcrumbItem >
                        <BreadcrumbLink>
                        <Icon as={HomeIcon} boxSize={'16px'} color={'#838383'} />
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink color={'brand.lightred'}
                        fontWeight={'700'}
                        fontSize={'12px'}>
                            Account Setting
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                </Flex>
            </Flex>
            <Flex>
                <Button bg={'brand.lightred'}
                color={'white'}
                alignItems={'center'}
                borderRadius={'8px'}
                padding={'12px 16px'}
                width={'168px'}
                h={'43px'}
                _hover={{bg:'#f62252'}}
                _active={{bg:'#f95278'}}
                fontSize={'14px'}
                fontWeight={'700'}>Edit</Button>
            </Flex>
        </Flex>

        <Flex className="profile-container"
        margin={'40px 24px'}
        gap={'24px'}>
            <Box className="upload-photo"
            padding={'24px'}
            bg={'white'}>
                <Text marginBottom={'24px'}>Photo Profile</Text>
                <Flex gap={'32px'}>
                    <Box width={'258px'}
                    height={'258px'}
                    borderRadius={'full'}
                    bg={'brand.grey200'}
                    position={'relative'}>
                        <AbsoluteCenter>
                            <Icon as={PhotoIcon} 
                            color={'#696666'} 
                            boxSize={'110px'}/>
                        </AbsoluteCenter>
                    </Box>
                    <Flex flexDir={'column'}
                    gap={'24px'}
                    width={'202px'}
                    justifyContent={'flex-end'}>
                        <Button bg={'brand.lightred'}
                        color={'white'}
                        _hover={{bg:'#f62252'}}
                        _active={{bg:'#f95278'}}>Upload Image</Button>
                        <Button
                        variant={'outline'}
                        borderColor={'brand.lightred'}
                        bg={'white'}
                        color={'brand.lightred'}
                        _hover={{borderColor:'#f62252', color:'#f62252'}}
                        _active={{borderColor:'#f95278', color:'#f95278'}}>Remove</Button>
                    </Flex>
                </Flex>
            </Box>
            <Box className="upload-photo"
            padding={'24px'}
            bg={'white'}
            width={'100%'}>
                <Text marginBottom={'24px'}>Profile Setting</Text>
                <FormControl id="email" marginBottom={'20px'}>
                <FormLabel fontSize={'14px'} color={'gray'} marginBottom={'8px'}>Username</FormLabel>
                <InputGroup>
                <Input
                        // type={showPasswordConfirmation ? "text" : "password"}
                        name="confirmationPassword"
                        // placeholder="Password confirmation"
                        // onChange={formik.handleChange}
                        _placeholder={{color:"#707070"}}
                        height={'48px'}
                        width={'100%'}
                        bg={'#EEEDED'}
                        color={'#707070'}
                        fontSize={'20px'}
                    />
                </InputGroup>
                </FormControl>
                <FormControl id="email" marginBottom={'20px'}>
                <FormLabel fontSize={'14px'} color={'gray'} marginBottom={'8px'}>Email</FormLabel>
                <InputGroup>
                <Input
                        // type={showPasswordConfirmation ? "text" : "password"}
                        name="confirmationPassword"
                        // placeholder="Password confirmation"
                        // onChange={formik.handleChange}
                        _placeholder={{color:"#707070"}}
                        height={'48px'}
                        width={'100%'}
                        bg={'#EEEDED'}
                        color={'#707070'}
                        fontSize={'20px'}
                    />
                </InputGroup>
                </FormControl>
                <FormControl id="email" marginBottom={'20px'}>
                <FormLabel fontSize={'14px'} color={'gray'} marginBottom={'8px'}>Password</FormLabel>
                <InputGroup>
                <Input
                        // type={showPasswordConfirmation ? "text" : "password"}
                        name="confirmationPassword"
                        // placeholder="Password confirmation"
                        // onChange={formik.handleChange}
                        _placeholder={{color:"#707070"}}
                        height={'48px'}
                        width={'100%'}
                        bg={'#EEEDED'}
                        color={'#707070'}
                        fontSize={'20px'}
                    />
                </InputGroup>
                </FormControl>
            </Box>
            
        </Flex>
    </Box>
  )
}

export default Profile