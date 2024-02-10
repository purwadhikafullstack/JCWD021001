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
} from '@chakra-ui/react'
import model from '../../assets/images/signup-model.jpeg'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { useFormik } from 'formik'
import logo from '../../assets/images/logo.png'
import { useState } from 'react'
import { SuccessModal } from './services/PopUpModal'
import { ErrorModal } from './services/PopUpModal'
import { BeatLoader } from 'react-spinners'
import { emailSchema } from './services/validation'
import { createRequestReset } from './services/createRequestResetPassword'

function RequestPasswordReset() {
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
    },
    validationSchema: emailSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await createRequestReset(values.email, setLoading, openSuccessModal, openErrorModal)
      } catch {
        console.log('gagal error')
      }

      resetForm({ values: { email: '' } })
    },
  })
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
          height={{ base: '65%', md: '100vh' }}
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
          <Box width={'450px'}>
            <Text
              fontWeight={'800'}
              color={'brand.lightred'}
              textAlign={'center'}
              fontSize={{ base: '18px', md: '42px' }}
              marginBottom={'40px'}
            >
              RESET PASSWORD
            </Text>
            <form onSubmit={formik.handleSubmit}>
              <FormControl
                isInvalid={!!(formik.touched.username && formik.errors.username)}
                marginBottom={'32px'}
              >
                <InputGroup marginBottom={'8px'}>
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
                      size={{ base: 7, md: 10 }}
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
                  SUBMIT
                </Button>
              )}
            </form>
            <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
            <ErrorModal isOpen={isErrorModalOpen} onClose={closeErrorModal} />
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default RequestPasswordReset
