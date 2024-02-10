import {
  Text,
  Icon,
  Flex,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import { getMainAddres } from '../../services/getAddress'
import { useNavigate } from 'react-router-dom'

function UserAddress() {
  const user = useSelector((state) => state.AuthReducer.user)
  const [mainAddress, setMainAddress] = useState('')
  const navigate = useNavigate()

  const fetchUserData = async () => {
    try {
      const fetchMainAddress = await getMainAddres(user.id)
      setMainAddress(fetchMainAddress)
    } catch (err) {
      console.log(err)
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
        onClick={() => navigate('/manage-address')}
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
      </Flex>
    </>
  )
}

export default UserAddress
