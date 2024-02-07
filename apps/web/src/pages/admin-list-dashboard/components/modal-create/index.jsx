import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useFormik } from 'formik'
import { createUser } from '../../services/createuser'
import { BeatLoader } from 'react-spinners'
import { useState } from 'react'

function CreateUser({onAdminUpdated}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState(false)
  const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: '#CD0244',
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      roleId: null,
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log('Formik Submission Values:', values)
        await createUser(values.email, values.username, values.roleId, setLoading)
      } catch (err) {
        console.log(err.message)
      }
      resetForm({
        values: {
          email: '',
          username: '',
          roleId: null,
        },
      })
      onAdminUpdated()
      onClose()
    },
  })
  return (
    <>
      <Button
        bg={'brand.lightred'}
        color={'white'}
        _hover={{ bg: '#f50f5a' }}
        _active={{ opacity: '70%' }}
        w={{base: '124px', md:'220px'}}
        h={{base: '34px', md:'48px'}}
        display={'flex'}
        onClick={onOpen}
      >
        <Flex justifyContent={'center'} alignItems={'center'} padding={'12px 16px'} gap={'10px'}>
          <Icon as={PlusIcon} boxSize={{base: '18px', md: '24px'}} />
          <Text fontSize={{base: '12px', md:'14px'}} fontWeight={'700'}>
            Create User
          </Text>
        </Flex>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create User</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody>
              <Box mb={'10px'}>
                <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'}>
                  Email
                </Text>
                <Input
                  placeholder="Type email here ..."
                  _placeholder={{ color: 'brand.grey350' }}
                  bg={'brand.grey100'}
                  type="email"
                  variant={'filled'}
                  mb={'24px'}
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </Box>
              <Box mb={'10px'}>
                <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'}>
                  Username
                </Text>
                <Input
                  placeholder="Type username here ..."
                  _placeholder={{ color: 'brand.grey350' }}
                  bg={'brand.grey100'}
                  variant={'filled'}
                  mb={'24px'}
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
              </Box>
              <Box mb={'24px'}>
                <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'}>
                  Role
                </Text>
                <Select
                  placeholder="Select user role"
                  name="roleId"
                  value={formik.values.roleId}
                  onChange={formik.handleChange}
                >
                  <option value="2">Admin</option>
                  <option value="3">User</option>
                </Select>
              </Box>
            </ModalBody>

            <ModalFooter display={'flex'} justifyContent={'center'}>
              {loading ? (
                <div className="sweet-loading">
                  <BeatLoader
                    color={'#CD0244'}
                    loading={loading}
                    cssOverride={override}
                    size={20}
                    aria-label="spiner"
                    data-testid="loader"
                  />
                </div>
              ) : (
                <>
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
                    type="submit"
                    width={'168px'}
                    padding={'12px 16px'}
                    bgColor={'brand.lightred'}
                    color={'white'}
                    _hover={{ bg: '#f50f5a' }}
                    _active={{ opacity: '70%' }}
                  >
                    Save
                  </Button>
                </>
              )}
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateUser
