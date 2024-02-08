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
import { useSelector } from 'react-redux'
import { ChevronRightIcon } from '@chakra-ui/icons'

function UpdateUsername() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const user = useSelector((state) => state.AuthReducer.user)
  const editCashier = async (username) => {
    try {
      await axios.patch(`http://localhost:8000/api/user/update-username/${user.id}`, {
        username,
      })

      onClose()
    } catch (err) {
      console.log(err)
    }
  }

  const formik = useFormik({
    initialValues: {
      username: user.username,
    },

    onSubmit: (values) => {
      editCashier(values.username)
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
