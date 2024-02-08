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
  Box,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import { getMainAddres } from '../../services/getAddress'
import { findUserAddress } from '../../../manage-address/services/readUserAddress'
import { updateMainAddress } from '../../../manage-address/services/updateUserAddress'

function UserAddress() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const user = useSelector((state) => state.AuthReducer.user)
  const [mainAddress, setMainAddress] = useState('')
  const [address, setAddress] = useState([])

  const fetchUserData = async () => {
    try {
      const fetchAddresses = await findUserAddress(user.id)
      setAddress(fetchAddresses)

      const fetchMainAddress = await getMainAddres(user.id)
      setMainAddress(fetchMainAddress)
    } catch (err) {
      console.log(err)
    }
  }
  const handleUpdateMainAddress = async (id, userId) => {
    try {
      await updateMainAddress(id, userId)
      fetchUserData()
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [user.id])

  console.log('ini main address', mainAddress)

  return (
    <>
      <Flex
        w={'100%'}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg={'transparent'}
        fontWeight={'500'}
        cursor={'pointer'}
        paddingLeft={'20px'}
        mt={'16px'}
        _hover={{ color: 'brand.lightred', bg: 'none' }}
        onClick={onOpen}
      >
        <Flex flexDir={'column'} flexWrap={'wrap'} maxW={'750px'} paddingRight={'10px'}>
          <Text
            fontSize={{ base: '12px', md: '14px' }}
            mb={'2px'}
            textAlign={'left'}
          >
            {mainAddress?.phoneNumber}
          </Text>
          <Text
          display={'flex'}
          flexWrap={'wrap'}
            fontSize={{ base: '12px', md: '14px' }}
            textAlign={'left'}
            mb={'20px'}
          >
            {mainAddress?.specificAddress ?? ''}, {mainAddress?.City?.name},{' '}
            {mainAddress?.City?.Province?.name} {mainAddress?.postalCode ?? ''}
          </Text>
        </Flex>
        <Flex>
          <Icon as={ChevronRightIcon} />
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose} size={{base: 'xs', md: 'md'}}>
          <ModalOverlay />

          <ModalContent>
            <ModalHeader fontSize={{base: '16px', md: '24px'}}>Select Main Address</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {address?.map((address) => (
                <Flex
                  key={address.id}
                  borderRadius={'12px'}
                  border={'1px solid #818181'}
                  bg={'white'}
                  padding={'24px'}
                  mt={'24px'}
                  mb={'24px'}
                  flexDir={{ base: 'column', md: 'row' }}
                  gap={{ base: '20px', md: '' }}
                  onClick={() => handleUpdateMainAddress(address.id, user.id)}
                >
                  <Flex width={'100%'} flexWrap={'wrap'} flexDir={'column'}>
                    <Flex gap={'24px'} alignItems={'center'} mb={'24px'}>
                      <Text
                        fontSize={{ base: '14px', md: '16px' }}
                        fontWeight={'700'}
                        color={'black'}
                      >
                        {address.fullName}
                      </Text>
                      {address.isMainAddress ? (
                        <Box
                          padding={{ base: '8px', md: '10px' }}
                          bg={'#FFE9F0'}
                          borderRadius={'8px'}
                          fontSize={{ base: '14px', md: '16px' }}
                          fontWeight={'700'}
                          color={'brand.lightred'}
                        >
                          Main
                        </Box>
                      ) : (
                        <></>
                      )}
                    </Flex>
                    <Text fontSize={{ base: '12px', md: '14px' }} fontWeight={'400'} mb={'16px'}>
                      {address.phoneNumber}
                    </Text>
                    <Text
                      fontSize={{ base: '12px', md: '14px' }}
                      fontWeight={'600'}
                      color={'brand.grey350'}
                    >
                      {address.specificAddress ?? ''}, {address.City.name},{' '}
                      {address.City.Province.name} {address.postalCode ?? ''}
                    </Text>
                  </Flex>
                </Flex>
              ))}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  )
}

export default UserAddress
