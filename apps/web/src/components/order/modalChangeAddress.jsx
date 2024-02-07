import { useSelector } from 'react-redux'
import { findUserAddress } from '../../pages/manage-address/services/readUserAddress'
import { useEffect, useState } from 'react'
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
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
} from '@chakra-ui/react'

function ChangeAddressModal({ setSelectedAddress, selectedAddress }) {
  const [address, setAddress] = useState([])
  const [tempSelectedAddress, setTempSelectedAddress] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const user = useSelector((state) => state.AuthReducer.user)

  const fetchData = async () => {
    try {
      const fetchAddresses = await findUserAddress(1)
      setAddress(fetchAddresses)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [user.id])

  const handleAddressChange = (addressId) => {
    setTempSelectedAddress(addressId)
  }

  const handleSubmit = () => {
    setSelectedAddress(tempSelectedAddress)
    onClose()
  }

  return (
    <>
      <Button
        onClick={onOpen}
        variant={'outline'}
        border={'1px solid #8D8B8B'}
        fontSize={'14px'}
        fontWeight={'700'}
        padding={'12px 16px'}
        _hover={'none'}
        _active={'none'}
      >
        Change Address
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={'5xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RadioGroup
              onChange={(e) => handleAddressChange(e.target.value)}
              value={tempSelectedAddress}
            >
              {address?.map((address) => (
                <Flex
                  key={address.id}
                  bg={tempSelectedAddress === address ? '#FFF2F7' : 'white'}
                  borderRadius={'12px'}
                  border={
                    tempSelectedAddress === address ? '1px solid #FFF2F7' : '1px solid #818181'
                  }
                  // bg={'white'}
                  padding={'24px'}
                  mt={'24px'}
                  mb={'24px'}
                  onClick={() => setTempSelectedAddress(address)}
                >
                  <Radio value={address} opacity={'0'}>
                    <Flex width={'100%'} flexWrap={'wrap'} flexDir={'column'}>
                      <Flex gap={'24px'} alignItems={'center'} mb={'24px'}>
                        <Text fontSize={'16px'} fontWeight={'700'} color={'black'}>
                          {address.fullName}
                        </Text>
                        {address.isMainAddress ? (
                          <Box
                            padding={'10px'}
                            bg={tempSelectedAddress === address ? 'white' : '#FFE9F0'}
                            borderRadius={'8px'}
                            fontSize={'16px'}
                            fontWeight={'700'}
                            color={'brand.lightred'}
                          >
                            Main
                          </Box>
                        ) : (
                          <></>
                        )}
                      </Flex>
                      <Text fontSize={'14px'} fontWeight={'400'} mb={'16px'}>
                        {address.phoneNumber}
                      </Text>
                      <Text fontSize={'14px'} fontWeight={'600'} color={'brand.grey350'}>
                        {address.specificAddress ?? ''}, {address.City.name},{' '}
                        {address.City.Province.name} {address.postalCode ?? ''}
                      </Text>
                    </Flex>
                  </Radio>
                </Flex>
              ))}
            </RadioGroup>
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
              onClick={(e) => handleSubmit(e.target.value)}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ChangeAddressModal
