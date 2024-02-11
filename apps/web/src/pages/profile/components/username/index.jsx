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
  Flex,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { updateUsername } from '../../services/updateProfile'
import { setUser } from '../../../../redux/reducer/authReducer'
import { UsernameScheme } from '../../services/validation'
import toast from 'react-hot-toast'

function UpdateUsername() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const user = useSelector((state) => state.AuthReducer.user)
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      username: user.username,
    },
    validationSchema: UsernameScheme,
    onSubmit: async (values) => {
      try {
        const data = await updateUsername(user.id, values.username)
        if (data) {
          dispatch(setUser(data))
        }
        onClose()
      } catch (err) {
        toast.error(err?.response?.data?.message)
      }
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
        paddingLeft={'20px'}
        cursor={'pointer'}
        _hover={{ color: 'brand.lightred', bg: 'none' }}
        fontWeight={'500'}
        onClick={onOpen}
        fontSize={{ base: '12px', md: '16px' }}
      >
        <span>{user?.username}</span>
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
                <FormControl isInvalid={!!(formik.touched.username && formik.errors.username)}>
                  <FormLabel fontSize={{ base: '12px', md: '16px' }}>Username</FormLabel>
                  <Input
                    name="username"
                    // placeholder='Enter username'
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />

                  {formik.touched.username && formik.errors.username && (
                    <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
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

export default UpdateUsername
