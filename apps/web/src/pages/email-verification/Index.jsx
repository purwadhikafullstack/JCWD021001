import { Box, Button, Flex, FormControl, Icon, Image, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react"
import model from '../../assets/images/signup-model.jpeg'
import {LockClosedIcon} from '@heroicons/react/24/outline'
import { useFormik } from "formik"
import { verification } from "./services/EditUser"
function Verification() {

    const formik = useFormik({
        initialValues:{
            password: "",
            confirmationPassword:"",
        },
        onSubmit: (values, {resetForm}) => {
            verification(values.password);
            resetForm({values:{password: "", confirmationPassword:""}})
        }
    }) 
  return (
    <>
        <Flex height={'100vh'} width={'100%'} boxShadow={'base'}>
            <Box width={'50%'} height={'100vh'} position={'relative'}>
                <Image borderTopRightRadius={'20'} borderBottomRightRadius={'20'} src={model} width={'730px'} height={'100vh'} objectFit={'cover'}/>
            </Box>
            <Flex justifyContent={'center'} alignItems={'center'} alignContent={'center'} width={'50%'}>
                <Box width={'460px'}>
                <Text fontWeight={'800'} color={'brand.lightred'} textAlign={'center'} fontSize={'42px'} marginBottom={'40px'} lineHeight={'1.0'}>SET NEW PASSWORD</Text>
                <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <InputGroup marginBottom={'32px'}>
                    <Input
                        name="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        _placeholder={{color:"#707070"}}
                        height={'64px'}
                        bg={'#EEEDED'}
                        color={'#707070'}
                        paddingLeft={'72px'}
                        fontSize={'20px'}
                        borderRadius={'16px'}
                    />
                    <InputLeftElement top={'12px'} width={'72px'}>
                        <Flex justifyContent={'center'} alignItems={'center'} height={'64px'}>
                        <Icon as={LockClosedIcon} boxSize={'24px'} margin={'auto'} position={'relative'} textColor={'brand.grey350'}/>
                        </Flex>
                    </InputLeftElement>
                    </InputGroup>
                </FormControl>
                
                <FormControl>    
                    <InputGroup marginBottom={'32px'}>
                    <Input
                        name="confirmationPassword"
                        placeholder="Password confirmation"
                        onChange={formik.handleChange}
                        _placeholder={{color:"#707070"}}
                        height={'64px'}
                        bg={'#EEEDED'}
                        color={'#707070'}
                        paddingLeft={'72px'}
                        fontSize={'20px'}
                        borderRadius={'16px'}
                    />
                    <InputLeftElement top={'12px'} width={'72px'}>
                        <Flex justifyContent={'center'} alignItems={'center'} height={'64px'}>
                        <Icon as={LockClosedIcon} boxSize={'24px'} margin={'auto'} position={'relative'} textColor={'brand.grey350'}/>
                        </Flex>
                    </InputLeftElement>
                    </InputGroup>
                </FormControl>


                <Button width={'100%'} height={'68px'} borderRadius={'16px'} fontSize={'24px'} fontWeight={'700'} color={'white'} bg={'brand.lightred'} _hover={{bg: '#f50f5a'}} _active={{opacity:'70%'}} type="submit" marginTop={'72px'}>CONFIRM</Button>
                </form>
                </Box>
            </Flex>
        </Flex>
    </>
  )
}

export default Verification