import {
  Button,
  Input,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  FormLabel,
  Text,
  Select,
  Link,
  FormErrorMessage,
  Icon,
  InputRightElement,
  InputGroup,
  Flex,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

function UpdatePassword() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const user = useSelector((state) => state.AuthReducer.user)
  const editPassword = async (password) => {
    try {
      await axios.patch(`http://localhost:8000/api/user/update-password/${user.id}`, {
        password,
      })

      onClose()
    } catch (err) {
      console.log(err)
    }
  }

  const formik = useFormik({
    initialValues: {
      username: '',
    },

    onSubmit: (values) => {
      editPassword(values.password)
    },
  })

  return (
    <>
      <Flex
        w={'100%'}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg={'transparent'}
        fontWeight={'500'}
        _hover={{ color: 'brand.lightred', bg: 'none' }}
        paddingLeft={'0'}
        cursor={'pointer'}
        onClick={onOpen}
        fontSize={{ base: '12px', md: '16px' }}
      >
        <Text>Change Password</Text>
        <span>
          <Icon as={ChevronRightIcon} />
        </span>
        <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'xs', md: 'md' }}>
          <ModalOverlay />
          <form onSubmit={formik.handleSubmit}>
            <ModalContent>
              <ModalHeader fontSize={{ base: '14px', md: '24px' }}>Edit Username</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl
                  isInvalid={!!formik.touched.password && !!formik.errors.password}
                  marginBottom={'20px'}
                  marginTop={'30px'}
                >
                  <FormLabel
                    fontSize={{ base: '12px', md: '16px' }}
                    color={'gray'}
                    marginBottom={'10px'}
                  >
                    Password
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      required
                      placeholder="enter password"
                      width={'100%'}
                      padding={'12px 20px'}
                      border={'1px solid #6666'}
                      borderRadius={'100px'}
                      fontSize={'16px'}
                    />
                    <InputRightElement>
                      <Button
                        variant={'ghost'}
                        onClick={() => setShowPassword((showPassword) => !showPassword)}
                        backgroundColor={'transparent'}
                      >
                        {showPassword ? <Icon as={EyeIcon} /> : <Icon as={EyeSlashIcon} />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {formik.touched.password && formik.errors.password && (
                    <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  isInvalid={
                    !!formik.touched.confirmationPassword && !!formik.errors.confirmationPassword
                  }
                  marginBottom={'30px'}
                >
                  <FormLabel
                    fontSize={{ base: '12px', md: '16px' }}
                    color={'gray'}
                    marginBottom={'10px'}
                  >
                    Confirmation Password
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      onChange={formik.handleChange}
                      name="confirmationPassword"
                      placeholder="confirm your password"
                      width={'100%'}
                      padding={'12px 20px'}
                      border={'1px solid #6666'}
                      borderRadius={'100px'}
                      fontSize={'16px'}
                    />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? <Icon as={EyeIcon} /> : <Icon as={EyeSlashIcon} />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {formik.touched.confirmationPassword && formik.errors.confirmationPassword && (
                    <FormErrorMessage>{formik.errors.confirmationPassword}</FormErrorMessage>
                  )}
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  bg={'brand.lightred'}
                  fontSize={{ base: '12px', md: '16px' }}
                  size={{ base: 'sm', md: 'md' }}
                  color={'white'}
                  _hover={{ bg: '#f62252' }}
                  _active={{ bg: '#f95278' }}
                  mr={3}
                  type="submit"
                >
                  Save
                </Button>
                <Button
                  onClick={onClose}
                  variant={'outline'}
                  borderColor={'brand.lightred'}
                  bg={'white'}
                  color={'brand.lightred'}
                  fontSize={{ base: '12px', md: '16px' }}
                  size={{ base: 'sm', md: 'md' }}
                  _hover={{ borderColor: '#f62252', color: '#f62252' }}
                  _active={{ borderColor: '#f95278', color: '#f95278' }}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
      </Flex>
    </>
  )
}

export default UpdatePassword
