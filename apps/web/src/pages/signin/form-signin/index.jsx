import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Link,
  } from '@chakra-ui/react'
  
  import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
  import { useFormik } from 'formik'
  import { useDispatch } from 'react-redux'
  import { login } from '../../../redux/reducer/authReducer'
  import { useState } from 'react'
  import { useLocation, useNavigate } from 'react-router-dom'
import { SignInScheme } from '../services/validation'

function FormSignin() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const from = location.state?.from || { pathname: '/' };
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: SignInScheme,
      onSubmit: (values, { resetForm }) => {
        dispatch(login(values.email, values.password))
          .then(() => {
            navigate(`${from.pathname}${from.search}`, { replace: true });
          })
          .catch((error) => {
            console.error('Login error:', error)
          })
  
        resetForm({ values: { email: '', password: '' } })
      },
    })
  
    const [showPassword, setShowPassword] = useState(false)
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl
      isInvalid={!!(formik.touched.email && formik.errors.email)}
      marginBottom={'32px'}>
        <InputGroup >
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
          <InputLeftElement top={{ base: '3px', md: '12px' }} width={{ base: '52px', md: '72px' }}>
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
      <FormControl
      isInvalid={!!(formik.touched.password && formik.errors.password)}>
        <InputGroup marginBottom={{ base: '8px', md: '15px' }}>
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            required
            placeholder="enter password"
            _placeholder={{ color: '#707070' }}
            height={{ base: '48px', md: '64px' }}
            bg={'#EEEDED'}
            color={'#707070'}
            paddingLeft={{ base: '52px', md: '72px' }}
            fontSize={{ base: '14px', md: '20px' }}
            borderRadius={{ base: '10px', md: '16px' }}
          />
          <InputLeftElement top={{ base: '3px', md: '12px' }} width={{ base: '52px', md: '72px' }}>
            <Flex justifyContent={'center'} alignItems={'center'} height={'64px'}>
              <Icon
                as={LockClosedIcon}
                boxSize={{ base: '18px', md: '24px' }}
                margin={'auto'}
                position={'relative'}
                textColor={'brand.grey350'}
              />
            </Flex>
          </InputLeftElement>
          <InputRightElement top={{ base: '3px', md: '12px' }} width={'54px'}>
            <Button
              variant={'ghost'}
              onClick={() => setShowPassword((showPassword) => !showPassword)}
              backgroundColor={'transparent'}
              height={'64px'}
              _hover={'none'}
              color={'#707070'}
            >
              {showPassword ? (
                <Icon as={EyeIcon} boxSize={{ base: '18px', md: '24px' }} />
              ) : (
                <Icon as={EyeSlashIcon} boxSize={{ base: '18px', md: '24px' }} />
              )}
            </Button>
          </InputRightElement>
        </InputGroup>
        {formik.touched.password && formik.errors.password && (
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          )}
      </FormControl>
      <Flex justifyContent={'flex-end'} marginBottom={'32px'}>
        <Link
          href={'/password-reset-request'}
          color={'#CD0244'}
          _hover={{ color: '#fd1c65' }}
          fontSize={{ base: '14px', md: '20px' }}
        >
          Forgot password?
        </Link>
      </Flex>
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
        SIGN IN
      </Button>
    </form>
  )
}

export default FormSignin
