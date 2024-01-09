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
import UpdateUsername from "./services/UpdateUsername"
import UpdateEmail from "./services/UpdateEmail"
import UpdatePassword from "./services/UpdatePassword"
import axios from "axios"

function Profile() {
    const user = useSelector((state) => state.AuthReducer.user);
    const [isEditable, setIsEditable] = useState(false);
    const [fieldImage, setFieldImage] = useState(null);
    const uploadAvatar = async (avatar) => {
        try{
            let formData = new FormData();
            formData.append("avatar", fieldImage);
            
            const { data } = await axios.patch(
                `${
                import.meta.env.VITE_API_URL
                }user/upload-avatar/${user.id}`,
                formData)
                alert(data?.message);
        } catch (err){
            console.log(err);
        }
    }


  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  return (
    <Box bg={'#F1F1F1'}
    height={'100vh'}>
        <Navbar/>
        <Box padding={'0px 100px'}>

        
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
                                <InputGroup>
                                <Icon as={PhotoIcon} 
                                color={'#696666'} 
                                boxSize={'110px'}/>
                                <Input type="file"
                                onChange={(event) => {event.currentTarget.files
                                    ? setFieldImage(
                                            event?.currentTarget?.files[0]
                                      )
                                    : null}}/>
                                </InputGroup>
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
                        _active={{bg:'#f95278'}}
                        onClick={() => {
                            uploadAvatar(fieldImage),
                                setFieldImage("");
                        }}
                        >
                            Upload Image
                        </Button>

                        <Button
                        variant={'outline'}
                        borderColor={'brand.lightred'}
                        bg={'white'}
                        color={'brand.lightred'}
                        _hover={{borderColor:'#f62252', color:'#f62252'}}
                        _active={{borderColor:'#f95278', color:'#f95278'}}>
                            Remove
                        </Button>
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
                <Flex alignItems={'center'}>
                    <Flex w={'100px'} alignContent={'center'}>
                        <Text>Username</Text>
                    </Flex>
                    <UpdateUsername/>
                </Flex>
                <Flex alignItems={'center'}>
                    <Flex w={'100px'}>
                        <Text>Email</Text>
                    </Flex>
                    
                    <UpdateEmail/>
                    
                </Flex>
                <Flex alignItems={'center'}>
                    <Flex w={'100%'}>
                    <UpdatePassword/>

                    </Flex>
                </Flex>
                
                
            </Box>
        </Flex>
        </Box>
    </Box>
  )
}

export default Profile