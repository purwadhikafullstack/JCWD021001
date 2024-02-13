import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from '@chakra-ui/react'
import { UserCircleIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { useFormik } from 'formik'
import { SuccessModal, ErrorModal } from '../../services/PopUpModal'
import { useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { registerFunction } from '../../services/createUser'
import { signupScheme } from '../../services/validation'

function SignupForm() {
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
    validationSchema: signupScheme,
    onSubmit: async (values, { resetForm }) => {
      try {
        await registerFunction(values.email, values.username, setLoading, openSuccessModal, openErrorModal)
      } catch (err) {
        console.log('gagal error')
      }
      resetForm({ values: { email: '', username: '' } })
    },
  })
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          isInvalid={!!(formik.touched.username && formik.errors.username)}
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

        <FormControl isInvalid={!!(formik.touched.email && formik.errors.email)} marginBottom={'32px'}>
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
                size={10}
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
    </>
  )
}

export default SignupForm
