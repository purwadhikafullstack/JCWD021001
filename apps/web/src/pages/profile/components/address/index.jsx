import { Text, Icon, Flex } from '@chakra-ui/react'
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

  return (
    <>
      <Flex
        w={'100%'}
        display="flex"
        justifyContent="space-between"
        bg={'transparent'}
        fontWeight={'500'}
        cursor={'pointer'}
        paddingTop={'0'}
        paddingBottom={'0'}
        paddingLeft={'20px'}
        _hover={{ color: 'brand.lightred', bg: '' }}
        onClick={() => navigate('/manage-address')}
      >
        {mainAddress ? (
          <>
            <Flex flexDir={'column'} flexWrap={'wrap'} maxW={'750px'} paddingRight={'10px'}>
              <Text fontSize={{ base: '12px', md: '16px' }} mb={'2px'} textAlign={'left'}>
                {mainAddress?.phoneNumber}
              </Text>
              <Text
                display={'flex'}
                flexWrap={'wrap'}
                fontSize={{ base: '12px', md: '16px' }}
                textAlign={'left'}
              >
                {mainAddress?.specificAddress ?? ''}, {mainAddress?.City?.name},{' '}
                {mainAddress?.City?.Province?.name} {mainAddress?.postalCode ?? ''}
              </Text>
            </Flex>
            <Flex>
              <Icon as={ChevronRightIcon} />
            </Flex>
          </>
        ) : (
          <>
            <Text
              display={'flex'}
              flexWrap={'wrap'}
              fontSize={{ base: '12px', md: '16px' }}
              textAlign={'left'}
              mb={'20px'}
            >
              You haven't set your address. Set your address here
            </Text>
          </>
        )}
      </Flex>
    </>
  )
}

export default UserAddress
