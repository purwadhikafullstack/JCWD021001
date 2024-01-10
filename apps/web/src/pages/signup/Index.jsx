import { AbsoluteCenter, Box, Button, Divider, Flex, FormControl, FormErrorMessage, Icon, Image, Input, InputGroup, InputLeftElement, Text, useDisclosure } from "@chakra-ui/react"
import model from '../../assets/images/signup-model.jpeg'
import { UserCircleIcon, EnvelopeIcon} from '@heroicons/react/24/outline'
import { instagram, gmail } from "../../assets/Icons/Icons"
import { useFormik } from "formik"
import { register } from "./services/CreateUser"
import logo from "../../assets/images/logo.png"
import { SuccessModal, ErrorModal } from "./services/PopUpModal"
import { BeatLoader } from "react-spinners";
import { useState } from "react"
import { SignUpScheme } from "./services/Validation"
import { signInWithGoogle } from '../../firebase';
function Signup({setOpenTab}) {
    const { isOpen: isSuccessModalOpen, onOpen: openSuccessModal, onClose: closeSuccessModal } = useDisclosure();
    const { isOpen: isErrorModalOpen, onOpen: openErrorModal, onClose: closeErrorModal } = useDisclosure();

    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "white",
    };
    const [loading, setLoading] = useState(false);
    
    const formik = useFormik({
        initialValues:{
            email: "",
            username:"",
        },
        validationSchema: SignUpScheme,
        onSubmit: async (values, {resetForm}) => {
            try{
                await register(values.email, values.username, setLoading, openSuccessModal, openErrorModal);
            } catch (err){
                console.log("gagal error");
            }
            resetForm({values:{email: "", username:""}})
        }
    }) 

    const onLoginWithGoogle = async () => {
        try {
          const result = await signInWithGoogle();
          if (result === 'signin with google success') {
            setOpenTab(3);
          }
        } catch (error) {
          console.log(error);
        }
      };


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
                <Text fontWeight={'800'} color={'brand.lightred'} textAlign={'center'} fontSize={'42px'} marginBottom={'40px'}>SIGN UP</Text>
                <form onSubmit={formik.handleSubmit}>
                <FormControl 
                isInvalid={(formik.touched.username && formik.errors.username)}
                marginBottom={'32px'}>
                    <InputGroup marginBottom={'8px'}>
                    <Input
                        name="username"
                        placeholder="Username"
                        value={formik.values.username}
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
                        <Icon as={UserCircleIcon} boxSize={'24px'} margin={'auto'} position={'relative'} textColor={'brand.grey350'}/>
                        </Flex>
                    </InputLeftElement>
                    </InputGroup>
                    {formik.touched.username &&
					formik.errors.username && (
						<FormErrorMessage>
							{formik.errors.username}
						</FormErrorMessage>
					)}
                </FormControl>
                
                <FormControl 
                isInvalid={(formik.touched.email && formik.errors.email)}
                marginBottom={'32px'}>    
                    <InputGroup marginBottom={'8px'}>
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
                    {formik.touched.email && formik.errors.email && (
						<FormErrorMessage>
							{formik.errors.email}
						</FormErrorMessage>
					)}
                </FormControl>

                {loading ? (<Button width={'100%'} height={'68px'} borderRadius={'16px'} fontSize={'24px'} fontWeight={'700'} color={'white'} bg={'brand.lightred'} _hover={{bg: '#f50f5a'}} _active={{opacity:'70%'}}>
                    <div className="sweet-loading">
                        <BeatLoader color={"#ffffff"}
							loading={loading}
							cssOverride={override}
							size={10}
							aria-label="spiner"
							data-testid="loader"/>
                    </div></Button>) : (
                    <Button width={'100%'} height={'68px'} borderRadius={'16px'} fontSize={'24px'} fontWeight={'700'} color={'white'} bg={'brand.lightred'} _hover={{bg: '#f50f5a'}} _active={{opacity:'70%'}} type="submit">SIGN UP</Button>
                )}
                
                </form>
                <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
                <ErrorModal isOpen={isErrorModalOpen} onClose={closeErrorModal} />
            
                <Box position='relative' margin={'32px 0'}>
                    <Divider border={'1px solid #D9D9D9'} />
                    <AbsoluteCenter bg='white' px='4'>
                        or
                    </AbsoluteCenter>
                </Box>
                <Flex justifyContent={'center'}
                alignItems={'center'} 
                gap={'24px'}>
                    <Box width={'48px'} height={'48px'} bg={'brand.lightred'} padding={'8px'} borderRadius={'12px'}>
                        <Icon as={instagram} boxSize={'40px'} color={'white'}/>
                    </Box>
                    <Box width={'48px'} height={'48px'} bg={'brand.lightred'} padding={'8px'} borderRadius={'12px'}>
                        <Icon as={instagram} boxSize={'40px'} color={'white'}/>
                    </Box>
                    <Box width={'48px'} height={'48px'} bg={'brand.lightred'} padding={'8px'} borderRadius={'12px'}>
                        <Icon as={instagram} boxSize={'40px'} color={'white'}/>
                    </Box>
                    <Button width={'48px'} height={'48px'} bg={'brand.lightred'} padding={'8px'} borderRadius={'12px'} onClick={onLoginWithGoogle} _hover={'#brand.redhover'}>
                        <Icon as={gmail} boxSize={'38px'} color={'white'}/>
                    </Button>
                </Flex>
                </Box>
            </Flex>
        </Flex>
    </>
  )
}

export default Signup