import {
  Box,
  Button,
  Flex,
  Grid,
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
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'
import { getCity, getProvince } from '../../../create-address/services/readUserAddress'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { updateUserAddress } from '../../services/updateUserAddress'
import { updateMainAddress } from '../../services/updateUserAddress'

function FormEditAddress({
  id,
  specificAddress,
  cityId,
  fullName,
  phoneNumber,
  postalCode,
  provinceId,
  onAddressUpdated,
}) {
  const [provinceList, setProvinceList] = useState([])
  const [selectedProvince, setSelectedProvince] = useState(provinceId || '')
  const [citylist, setCityList] = useState([])
  const [selectedCity, setSelectedCity] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    getProvince().then((data) => {
      setProvinceList(data)
    })
  }, [])

  useEffect(() => {
    if (selectedProvince !== '') {
      getCity(selectedProvince).then((data) => {
        setCityList(data)
        setSelectedCity(cityId)
        console.log(data)
      })
    }
  }, [selectedProvince])

  const formik = useFormik({
    initialValues: {
      specificAddress: specificAddress || '',
      cityId: cityId || '',
      fullName: fullName || '',
      phoneNumber: phoneNumber || '',
      postalCode: postalCode || '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log('Formik Submission Values:', values)
        await updateUserAddress(
          id,
          values.specificAddress,
          values.cityId,
          values.fullName,
          values.phoneNumber,
          values.postalCode,
        )
        onAddressUpdated()
      } catch (err) {
        console.log(err.message)
      }
      resetForm({
        values: { specificAddress: '', cityId: '', fullName: '', phoneNumber: '', postalCode: '' },
      })
    },
  })

  return (
    <>
      <Button
        onClick={onOpen}
        variant={'outline'}
        border={'1px solid #8D8B8B'}
        color={'#8D8B8B'}
        fontSize={'14px'}
        fontWeight={'700'}
        padding={'12px 16px'}
        _hover={'none'}
        _active={'none'}
      >
        Edit Address
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={formik.handleSubmit}>
          <ModalContent>
            <ModalHeader>Edit Address</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box width={'100%'}>
                <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'24px'}>
                  CONTACT
                </Text>
                <Box>
                  <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
                    Full Name
                  </Text>
                  <Input
                    name="fullName"
                    placeholder="Type your full name here"
                    _placeholder={{ color: 'brand.grey350' }}
                    bg={'brand.grey100'}
                    variant={'filled'}
                    mb={'32px'}
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                  />
                </Box>
                <Box>
                  <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
                    Mobile Phone
                  </Text>
                  <Input
                    placeholder="Type your mobile phone number here"
                    _placeholder={{ color: 'brand.grey350' }}
                    bg={'brand.grey100'}
                    variant={'filled'}
                    mb={'24px'}
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                  />
                </Box>
              </Box>
              <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'24px'}>
                ADDRESS
              </Text>
              <Box width={'100%'}>
                <Box>
                  <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
                    Province
                  </Text>
                  <Select
                    placeholder="Select a Province"
                    bg={'brand.grey100'}
                    variant={'filled'}
                    mb={'24px'}
                    value={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                  >
                    {provinceList?.map((province) => (
                      <option key={province.id} value={province.id}>
                        {province.name}
                      </option>
                    ))}
                  </Select>
                  <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
                    City
                  </Text>
                  <Select
                    value={selectedCity}
                    placeholder="Select a City"
                    bg={'brand.grey100'}
                    variant={'filled'}
                    mb={'24px'}
                    name="cityId"
                    onChange={(e) => {
                      setSelectedCity(e.target.value)
                      formik.handleChange(e)
                    }}
                  >
                    {citylist?.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </Select>
                  <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
                    Postal Code
                  </Text>
                  <Input
                    placeholder="Type a postal code"
                    _placeholder={{ color: 'brand.grey350' }}
                    bg={'brand.grey100'}
                    variant={'filled'}
                    mb={'24px'}
                    name="postalCode"
                    value={formik.values.postalCode}
                    onChange={formik.handleChange}
                  />
                </Box>
                <Box>
                  <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
                    Address (Ex : Street, Residence, number of house)
                  </Text>
                  <Textarea
                    placeholder="Type your address"
                    name="specificAddress"
                    _placeholder={{ color: 'brand.grey350' }}
                    bg={'brand.grey100'}
                    variant={'filled'}
                    h={'210px'}
                    value={formik.values.specificAddress}
                    onChange={formik.handleChange}
                  />
                </Box>
              </Box>
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

export default FormEditAddress
