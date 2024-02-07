import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getUnasignedAdmin } from '../../services/getWarehouseList'
import { assignAdminWarehouse } from '../../services/editWarehouse'
import { CheckIcon } from '@chakra-ui/icons'

function AssignAdmin({ warehouseId }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [unassignedAdmin, setUnassignedAdmin] = useState([])
  const [selectedAdmins, setSelectedAdmins] = useState([])

  const fetchAdmin = async () => {
    const fetchAdminList = await getUnasignedAdmin()
    setUnassignedAdmin(fetchAdminList)
  }

  useEffect(() => {
    fetchAdmin()
  }, [])

  const handleSelectAdmin = (adminId) => {
    if (selectedAdmins.includes(adminId)) {
      setSelectedAdmins(selectedAdmins.filter((id) => id !== adminId))
    } else {
      setSelectedAdmins((prev) => [...prev, adminId])
    }
  }

  const handleAssignAdmins = async () => {
    if (selectedAdmins.length > 0) {
      await assignAdminWarehouse(selectedAdmins, warehouseId)
      setSelectedAdmins([])
      onClose()
      fetchAdmin()
    }
  }

  const handleClose = () => {
    onClose()
    setSelectedAdmins([])
  }

  return (
    <>
      <Text
        onClick={onOpen}
        color={'#CD0244'}
        fontWeight={'700'}
        padding={'4px 16px'}
        w={'72px'}
        _hover={'none'}
        _active={'none'}
      >
        Assign Admin
      </Text>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Assign Admin</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {unassignedAdmin.length > 0 ? (
              <Box>
                {unassignedAdmin.map((admin, index) => (
                  <Flex
                    key={admin.id}
                    bg={index % 2 === 0 ? '#FFF1F5' : 'white'}
                    p={'10px 10px'}
                    justifyContent={'space-between'}
                  >
                    <Text>{admin.username}</Text>
                    {selectedAdmins.includes(admin.id) ? (
                      <Button
                        onClick={() => handleSelectAdmin(admin.id)}
                        width={'100px'}
                        size={'sm'}
                        bgColor={'#FFE9EF'}
                        color={'brand.lightred'}
                        variant={'outline'}
                        borderColor={'brand.lightred'}
                        _hover={{ borderColor: '#f50f5a', color: '#f50f5a' }}
                        _active={{ opacity: '70%' }}
                        mr={3}
                      >
                        <CheckIcon mr={'3'} />
                        <Text fontSize={'12px'}>Assigned</Text>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleSelectAdmin(admin.id)}
                        width={'100px'}
                        size={'sm'}
                        bgColor={'white'}
                        color={'brand.lightred'}
                        variant={'outline'}
                        borderColor={'brand.lightred'}
                        _hover={{ borderColor: '#f50f5a', color: '#f50f5a' }}
                        _active={{ opacity: '70%' }}
                        mr={3}
                      >
                        <Text fontSize={'12px'}>Assign</Text>
                      </Button>
                    )}
                  </Flex>
                ))}
              </Box>
            ) : (
              <Text>There is no unassigned admin</Text>
            )}
          </ModalBody>
          <ModalFooter mt={'12px'}>
            <Button
              mr={3}
              onClick={handleAssignAdmins}
              width={'100px'}
              bgColor={'brand.lightred'}
              color={'white'}
              _hover={'none'}
              _active={{ opacity: '70%' }}
            >
              Save
            </Button>
            <Button
              onClick={handleClose}
              width={'100px'}
              bgColor={'white'}
              color={'brand.lightred'}
              variant={'outline'}
              borderColor={'brand.lightred'}
              _hover={{ borderColor: '#f50f5a', color: '#f50f5a' }}
              _active={{ opacity: '70%' }}
              mr={3}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AssignAdmin
