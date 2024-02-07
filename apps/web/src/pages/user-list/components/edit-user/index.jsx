import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Select,
} from '@chakra-ui/react'
import { editAdmin } from '../../services/editAdmin'
import { useFormik } from 'formik'
import { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'

function EditUser({ id, username, email, roleId, onUserUpdated }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showPassword, setShowPassword] = useState(false)
  const formik = useFormik({
    initialValues: {
      username: username || '',
      email: email || '',
      password: '',
      roleId: roleId || '',
    },
    onSubmit: async (values) => {
      try {
        console.log('Formik Submission Values:', values)
        await editAdmin(id, values.username, values.email, values.password, values.roleId)
        onUserUpdated()
      } catch (err) {
        console.log(err.message)
      }
    },
  })
  return (
    <>
      <Button
        onClick={onOpen}
        bg={'#CD0244'}
        color={'white'}
        fontSize={'12px'}
        fontWeight={'700'}
        padding={'4px 16px'}
        w={'72px'}
        _hover={'none'}
        _active={'none'}
      >
        Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={formik.handleSubmit}>
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
              Username
            </Text>
            <Input
              name="username"
              bg={'brand.grey100'}
              variant={'filled'}
              mb={'32px'}
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
              Email
            </Text>
            <Input
              name="email"
              bg={'brand.grey100'}
              variant={'filled'}
              mb={'32px'}
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
              Password
            </Text>
            <InputGroup>
              <Input
                name="password"
                bg={'brand.grey100'}
                variant={'filled'}
                mb={'32px'}
                type={showPassword ? 'text' : 'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
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
            <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
              Role
            </Text>
            <Select name="roleId"
              bg={'brand.grey100'}
              variant={'filled'}
              mb={'32px'}
              value={formik.values.roleId}
              onChange={formik.handleChange}>
                <option value='2'>Admin</option>
                <option value='3'>User</option>
            </Select>
            
          </ModalBody>
          <ModalFooter>
            <Button
              width={'168px'}
              padding={'12px 16px'}
              bgColor={'white'}
              color={'brand.lightred'}
              variant={'outline'}
              borderColor={'brand.lightred'}
              _hover={{ borderColor: '#f50f5a', color: '#f50f5a' }}
              _active={{ opacity: '70%' }}
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              type="sumbit"
              width={'168px'}
              padding={'12px 16px'}
              bgColor={'brand.lightred'}
              color={'white'}
              _hover={{ bg: '#f50f5a' }}
              _active={{ opacity: '70%' }}
              onClick={onClose}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
        </form>
      </Modal>
    </>
  )
}

export default EditUser
