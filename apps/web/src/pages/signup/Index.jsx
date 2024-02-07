import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
  Link
} from '@chakra-ui/react'
import model from '../../assets/images/signup-model.jpeg'
import { UserCircleIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { instagram, gmail } from '../../assets/Icons/Icons'
import { useFormik } from 'formik'
import { register } from './services/CreateUser'
import logo from '../../assets/images/logo.png'
import { SuccessModal, ErrorModal } from './services/PopUpModal'
import { BeatLoader } from 'react-spinners'
import { useState } from 'react'
import { SignUpScheme } from './services/Validation'
import { signInWithGoogle } from '../../firebase'
function Signup({ setOpenTab }) {
  const {
    isOpen: isSuccessModalOpen,
    onOpen: openSuccessModal,
    onClose: closeSuccessModal,
  } = useDisclosure()
  const {
    isOpen: isErrorModalOpen,
    onOpen: openErrorModal,
    onClose: closeErrorModal,
  } = useDisclosure()

  const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'white',
  }
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
    },
    validationSchema: SignUpScheme,
    onSubmit: async (values, { resetForm }) => {
      try {
        await register(values.email, values.username, setLoading, openSuccessModal, openErrorModal)
      } catch (err) {
        console.log('gagal error')
      }
      resetForm({ values: { email: '', username: '' } })
    },
  })

  const onLoginWithGoogle = async () => {
    try {
      const result = await signInWithGoogle()
      if (result === 'signin with google success') {
        setOpenTab(3)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Flex
        height={'100vh'}
        width={'100%'}
        boxShadow={'base'}
        flexDir={{ md: 'row', base: 'column' }}
      >
        <Box
          width={{ base: '100%', md: '50%' }}
          height={{ base: '40%', md: '100vh' }}
          position={'relative'}
        >
          <Image
            borderTopRightRadius={{ md: '20' }}
            borderBottomRightRadius={{ md: '20' }}
            src={model}
            width={'730px'}
            height={'100vh'}
            objectFit={'cover'}
            opacity={'75%'}
          />
          <AbsoluteCenter>
            <Image src={logo} boxSize={{ base: '150px', md: '200px' }} />
          </AbsoluteCenter>
        </Box>
        <Flex
          borderTopRightRadius={{ base: '20', md: '0' }}
          borderTopLeftRadius={{ base: '20', md: '0' }}
          justifyContent={'center'}
          alignItems={{ base: 'flex-start', md: 'center' }}
          alignContent={'center'}
          width={{ md: '50%' }}
          margin={{ md: '50' }}
          padding={{ base: '2em', md: '0' }}
          bg={'white'}
          h={'100%'}
          zIndex={'99'}
        >
          <Box width={{ base: '100%', md: '450px' }}>
            <Text
              fontWeight={'800'}
              color={'brand.lightred'}
              textAlign={'center'}
              fontSize={{ base: '18px', md: '42px' }}
              marginBottom={'40px'}
            >
              SIGN UP
            </Text>
            <form onSubmit={formik.handleSubmit}>
              <FormControl
                isInvalid={formik.touched.username && formik.errors.username}
                marginBottom={'32px'}
              >
                <InputGroup marginBottom={'32px'}>
                  <Input
                    name="username"
                    placeholder="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    _placeholder={{ color: '#707070' }}
                    height={{ base: '48px', md: '64px' }}
                    bg={'#EEEDED'}
                    color={'#707070'}
                    paddingLeft={{ base: '52px', md: '72px' }}
                    fontSize={{ base: '14px', md: '20px' }}
                    borderRadius={{ base: '10px', md: '16px' }}
                  />
                  <InputLeftElement
                    top={{ base: '3px', md: '12px' }}
                    width={{ base: '52px', md: '72px' }}
                  >
                    <Flex justifyContent={'center'} alignItems={'center'} height={'64px'}>
                      <Icon
                        as={UserCircleIcon}
                        boxSize={'24px'}
                        margin={'auto'}
                        position={'relative'}
                        textColor={'brand.grey350'}
                      />
                    </Flex>
                  </InputLeftElement>
                </InputGroup>
                {formik.touched.username && formik.errors.username && (
                  <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                isInvalid={formik.touched.email && formik.errors.email}
                marginBottom={'32px'}
              >
                <InputGroup marginBottom={'32px'}>
                  <Input
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    _placeholder={{ color: '#707070' }}
                    height={{ base: '48px', md: '64px' }}
                    bg={'#EEEDED'}
                    color={'#707070'}
                    paddingLeft={{ base: '52px', md: '72px' }}
                    fontSize={{ base: '14px', md: '20px' }}
                    borderRadius={{ base: '10px', md: '16px' }}
                  />
                  <InputLeftElement
                    top={{ base: '3px', md: '12px' }}
                    width={{ base: '52px', md: '72px' }}
                  >
                    <Flex justifyContent={'center'} alignItems={'center'} height={'64px'}>
                      <Icon
                        as={EnvelopeIcon}
                        boxSize={{ base: '18px', md: '24px' }}
                        margin={'auto'}
                        position={'relative'}
                        textColor={'brand.grey350'}
                      />
                    </Flex>
                  </InputLeftElement>
                </InputGroup>
                {formik.touched.email && formik.errors.email && (
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                )}
              </FormControl>

              {loading ? (
                <Button
                  width={'100%'}
                  height={{ base: '48px', md: '68px' }}
                  borderRadius={{ base: '10px', md: '16px' }}
                  fontSize={{ base: '18px', md: '24px' }}
                  fontWeight={'700'}
                  color={'white'}
                  bg={'brand.lightred'}
                  _hover={{ bg: '#f50f5a' }}
                  _active={{ opacity: '70%' }}
                >
                  <div className="sweet-loading">
                    <BeatLoader
                      color={'#ffffff'}
                      loading={loading}
                      cssOverride={override}
                      size={{base: 7, md: 10}}
                      aria-label="spiner"
                      data-testid="loader"
                    />
                  </div>
                </Button>
              ) : (
                <Button
                  width={'100%'}
                  height={{ base: '48px', md: '68px' }}
                  borderRadius={{ base: '10px', md: '16px' }}
                  fontSize={{ base: '18px', md: '24px' }}
                  fontWeight={'700'}
                  color={'white'}
                  bg={'brand.lightred'}
                  _hover={{ bg: '#f50f5a' }}
                  _active={{ opacity: '70%' }}
                  type="submit"
                >
                  SIGN UP
                </Button>
              )}
            </form>
            <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
            <ErrorModal isOpen={isErrorModalOpen} onClose={closeErrorModal} />

            <Box position="relative" margin={'32px 0'}>
              <Divider border={'1px solid #D9D9D9'} />
              <AbsoluteCenter bg="white" px="4">
                or
              </AbsoluteCenter>
            </Box>
            <Flex justifyContent={'center'} alignItems={'center'} gap={'24px'}>
              
              <Button
                width={{base: '38px', md: '48px'}}
                height={{base: '38px', md: '48px'}}
                bg={'brand.lightred'}
                padding={{base: '2px', md:'8px'}}
                borderRadius={{base: '6px', md: '12px'}}
                onClick={onLoginWithGoogle}
                _hover={'#brand.redhover'}
              >
                <Icon as={gmail} boxSize={'38px'} color={'white'} />
              </Button>
            </Flex>
            <Box mt={'20px'}>
              <Text fontSize={{md: '20px'}} textAlign={'center'}>
                Have an account?{' '}
                <Link
                  href={'/signin'}
                  color="#CD0244"
                  _hover={{ color: '#fd1c65' }}
                  fontWeight="700"
                >
                  Signin here
                </Link>
              </Text>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default Signup
