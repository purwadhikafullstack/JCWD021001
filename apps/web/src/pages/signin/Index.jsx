import { AbsoluteCenter, Box, Button, Flex, FormControl, Icon, Image, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react"
import model from '../../assets/images/signup-model.jpeg'
import { EnvelopeIcon, LockClosedIcon} from '@heroicons/react/24/outline'
import { useFormik } from "formik"
import {useDispatch} from 'react-redux'
import { login } from "../../redux/reducer/authReducer"
import logo from "../../assets/images/logo.png"
function Signin() {

    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues:{
            email: "",
            password:"",
        },
        onSubmit: (values, {resetForm}) => {
            dispatch(login(values.email, values.password))
            resetForm({values:{email: "", password:""}})
        }
    }) 
  return (
    <>
        <Flex height={'100vh'} width={'100%'} boxShadow={'base'}>
            <Box width={'50%'} height={'100vh'} position={'relative'}>
                <Image borderTopRightRadius={'20'} borderBottomRightRadius={'20'} src={model} width={'730px'} height={'100vh'} objectFit={'cover'} opacity={'75%'}/>
                <AbsoluteCenter>
                    <Image src={logo}/>
                </AbsoluteCenter>
            </Box>
            <Flex justifyContent={'center'} alignItems={'center'} alignContent={'center'} width={'50%'} margin={'50'}>
                <Box width={'450px'}>
                <Text fontWeight={'800'} color={'brand.lightred'} textAlign={'center'} fontSize={'42px'} marginBottom={'40px'}>SIGN IN</Text>
                <form onSubmit={formik.handleSubmit}>
                <FormControl>    
                    <InputGroup marginBottom={'32px'}>
                    <Input
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={formik.values.email}
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
                        <Icon as={EnvelopeIcon} boxSize={'24px'} margin={'auto'} position={'relative'} textColor={'brand.grey350'}/>
                        </Flex>
                    </InputLeftElement>
                    </InputGroup>
                </FormControl>
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

                <Button width={'100%'} height={'68px'} borderRadius={'16px'} fontSize={'24px'} fontWeight={'700'} color={'white'} bg={'brand.lightred'} _hover={{bg: '#f50f5a'}} _active={{opacity:'70%'}} type="submit">SIGN IN</Button>
                </form>
                
                </Box>
            </Flex>
        </Flex>
    </>
  )
}

export default Signin