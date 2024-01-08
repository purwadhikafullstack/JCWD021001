import { AbsoluteCenter, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, FormControl, FormLabel, Icon, Image, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react"
import model from '../../assets/images/signup-model.jpeg'

import { HomeIcon} from '@heroicons/react/24/outline'
import { PhotoIcon, CheckBadgeIcon} from '@heroicons/react/24/solid'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { useFormik } from "formik"
import {  useSelector} from 'react-redux'
import logo from "../../assets/images/logo.png"
import Navbar from "../../components/Navbar/Navbar"
import { useState } from "react"

function Profiles() {
    const user = useSelector((state) => state.AuthReducer.user);
    const [isEditable, setIsEditable] = useState(false);

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

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
                fontWeight={'700'}
                display={isEditable ? 'none' : 'block'}
                onClick={toggleEdit}>Edit</Button>
            </Flex>
        </Flex>

        <Flex className="profile-container"
        margin={'40px 24px'}
        gap={'24px'}
        flexWrap={'wrap'}
        >
            <Box className="upload-photo"
            padding={'24px'}
            bg={'white'}
            >
                <Text marginBottom={'24px'}
                fontSize={'24px'}
                fontWeight={'700'}>Photo Profile</Text>
                <Flex gap={'32px'}>
                    <Box>
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
                    </Box>
                    <Flex flexDir={'column'}
                    gap={'24px'}
                    maxWidth={'202px'}
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
                <Text marginTop={'35px'}>*file extension only .jpg, .jpeg, .png and .gif (max 1MB)</Text>
            </Box>
            <Box className="profile-setting"
            padding={'24px'}
            bg={'white'}
            flexGrow={1}
            >
                <Text marginBottom={'24px'}
                fontSize={'24px'}
                fontWeight={'700'}>Profile Setting</Text>
                <FormControl id="email" marginBottom={'20px'}>
                <FormLabel fontSize={'14px'} color={'gray'} marginBottom={'8px'}>Username</FormLabel>
                <InputGroup>
                <Input
                        // type={showPasswordConfirmation ? "text" : "password"}
                        name="confirmationPassword"
                        placeholder={user.username}
                        isReadOnly= {!isEditable}
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
                <Flex>
                    
                    <FormLabel fontSize={'14px'} color={'gray'} marginBottom={'8px'}>Email
                    </FormLabel>
                    {user?.isVerified ? (
                    <Flex alignItems={'center'}
                    marginBottom={'8px'}
                    gap={'4px'}>
                        <Icon as={CheckBadgeIcon} color={'blue'} boxSize={'16px'}/>
                        <Text fontSize={'14px'} color={'brand.lightred'}>Verified</Text>
                    </Flex>
                    ): (
                        <Text fontSize={'14px'} color={'brand.lightred'} marginBottom={'8px'}>Verify Email</Text>
                    )}
                </Flex>
                <InputGroup>
                <Input
                        // type={showPasswordConfirmation ? "text" : "password"}
                        name="confirmationPassword"
                        placeholder={user?.email}
                        isReadOnly= {!isEditable}
                        _placeholder={{color:"#707070"}}
                        height={'48px'}
                        width={'100%'}
                        bg={'#EEEDED'}
                        color={'#707070'}
                        fontSize={'20px'}
                    />
                </InputGroup>
                </FormControl>
                <FormControl id="email" marginBottom={'20px'} >
                <FormLabel fontSize={'14px'} color={'gray'} marginBottom={'8px'}>Password</FormLabel>
                <InputGroup>
                <Input
                        // type={showPasswordConfirmation ? "text" : "password"}
                        name="confirmationPassword"
                        // placeholder="******"
                        isReadOnly= {!isEditable}
                        _placeholder={{color:"#707070"}}
                        height={'48px'}
                        width={'100%'}
                        bg={'#EEEDED'}
                        color={'#707070'}
                        fontSize={'20px'}
                    />
                </InputGroup>
                </FormControl>
                <FormControl id="email" marginBottom={'20px'} display={isEditable ? 'block' : 'none'}>
                <FormLabel fontSize={'14px'} color={'gray'} marginBottom={'8px'}>Password Confirmation</FormLabel>
                <InputGroup>
                <Input
                        // type={showPasswordConfirmation ? "text" : "password"}
                        name="confirmationPassword"
                        // display={isEditable ? 'block' : 'none'}
                        _placeholder={{color:"#707070"}}
                        height={'48px'}
                        width={'100%'}
                        bg={'#EEEDED'}
                        color={'#707070'}
                        fontSize={'20px'}
                    />
                </InputGroup>
                </FormControl>
                <Flex justifyContent={'flex-end'} gap={'16px'}>
                <Button variant={'outline'}
                borderColor={'brand.lightred'}
                bg={'white'}
                color={'brand.lightred'}
                _hover={{borderColor:'#f62252', color:'#f62252'}}
                _active={{borderColor:'#f95278', color:'#f95278'}}
                borderRadius={'8px'}
                padding={'12px 16px'}
                width={'168px'}
                h={'43px'}
                fontSize={'14px'}
                fontWeight={'700'}
                display={isEditable ? 'block' : 'none'}
                onClick={toggleEdit}>Cancel</Button>
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
                fontWeight={'700'}
                display={isEditable ? 'block' : 'none'}
                onClick={toggleEdit}>Save</Button>
                </Flex>
            </Box>
        </Flex>
        
    </Box>
  )
}

export default Profiles