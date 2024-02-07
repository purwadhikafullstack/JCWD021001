import { useSelector } from 'react-redux'
import { findUserAddress } from '../../pages/manage-address/services/readUserAddress'
import { useEffect, useState } from 'react'
import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { MapPinIcon } from '@heroicons/react/24/outline'
import ChangeAddressModal from './ModalChangeAddress'
import { getNearestWarehouse, getShippingCost } from './services/getDeliveryFee'
import ShippingCost from './shippingCost'
import { useFormik } from 'formik'

function DeliveryAddress({
  selectedAddress,
  setSelectedAddress,
  nearestWarehouse,
  setNearestWarehouse,
  costResult,
  setCostResult,
}) {
  // const [address, setAddress] = useState([])
  //   const [selectedAddress, setSelectedAddress] = useState(null)
  //   const [nearestWarehouse, setNearestWarehouse] = useState(null)
  const user = useSelector((state) => state.AuthReducer.user)

  const fetchData = async () => {
    try {
      const fetchAddresses = await findUserAddress(1)
      const mainAddress = fetchAddresses.find((address) => address.isMainAddress)
      setSelectedAddress(mainAddress)
    } catch (err) {
      console.log(err)
    }
  }

  console.log(selectedAddress, selectedAddress?.City?.Province?.id)
  useEffect(() => {
    fetchData()
  }, [user.id])

  const fetchWarehouse = async () => {
    try {
      const fetchNearestWarehouse = await getNearestWarehouse(
        selectedAddress?.City?.Province?.id,
        selectedAddress?.latitude,
        selectedAddress?.longitude,
      )
      setNearestWarehouse(fetchNearestWarehouse)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (selectedAddress) {
      fetchWarehouse()
    }
  }, [selectedAddress])
  console.log('ini warehouse terdekat', nearestWarehouse)

  return (
    <>
      <Box
        bgColor={'white'}
        w={'full'}
        h={'fit-content'}
        padding={'24px'}
        borderRadius={'16px'}
        display={'flex'}
        flexDirection={'column'}
        gap={'24px'}
      >
        <Box display={'flex'} alignItems={'center'} gap={'8px'}>
          <Icon as={MapPinIcon} fontSize={'22px'} color={'#CD0244'} />
          <Text fontFamily={'body'} fontWeight={'700'} fontSize={'16px'}>
            Delivery Address
          </Text>
        </Box>
        {selectedAddress && (
          <Flex
            key={selectedAddress?.id}
            borderRadius={'12px'}
            border={'1px solid #818181'}
            bg={'white'}
            padding={'24px'}
            mt={'24px'}
            mb={'24px'}
          >
            <Flex width={'100%'} flexWrap={'wrap'} flexDir={'column'}>
              <Flex gap={'24px'} alignItems={'center'} mb={'24px'}>
                <Text fontSize={'16px'} fontWeight={'700'} color={'black'}>
                  {selectedAddress?.fullName}
                </Text>
                {selectedAddress?.isMainAddress ? (
                  <Box
                    padding={'10px'}
                    bg={'#FFE9F0'}
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
                {selectedAddress?.phoneNumber}
              </Text>
              <Text fontSize={'14px'} fontWeight={'600'} color={'brand.grey350'}>
                {selectedAddress.specificAddress ?? ''}, {selectedAddress.City.name},{' '}
                {selectedAddress.City.Province.name} {selectedAddress.postalCode ?? ''}
              </Text>
            </Flex>
            <Flex justifyContent={'flex-end'} gap={'12px'}>
              <Flex justifyContent={'flex-end'} flexDir={'column'}></Flex>
            </Flex>
          </Flex>
        )}

        <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
          <ChangeAddressModal
            setSelectedAddress={setSelectedAddress}
            selectedAddress={selectedAddress}
          />
        </Box>

        {nearestWarehouse && selectedAddress && (
          <ShippingCost
            nearestWarehouse={nearestWarehouse}
            selectedAddress={selectedAddress}
            costResult={costResult}
            setCostResult={setCostResult}
          />
        )}
      </Box>
    </>
  )
}

export default DeliveryAddress
