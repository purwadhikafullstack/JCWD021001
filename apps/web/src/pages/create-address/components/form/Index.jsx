import { Box, Button, Flex, Grid, Input, Select, Text, Textarea } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function FormCreateAddress() {
  const navigate = useNavigate()

  return (
    <>
      <Grid
        width={'100%'}
        gap={{ base: '24px', md: '68px' }}
        gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
      >
        <Box>
          <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
            Full Name
          </Text>
          <Input
            placeholder="Type your full name here"
            _placeholder={{ color: 'brand.grey350' }}
            bg={'brand.grey100'}
            variant={'filled'}
            mb={{ base: '0', md: '32px' }}
            isDisabled
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
            isDisabled
          />
        </Box>
      </Grid>
      <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'24px'}>
        ADDRESS
      </Text>
      <Grid
        width={'100%'}
        gap={{ base: '24px', md: '68px' }}
        gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
      >
        <Box>
          <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
            Province
          </Text>
          <Select
            placeholder="Select a Province"
            bg={'brand.grey100'}
            variant={'filled'}
            color={'brand.grey350'}
            mb={'24px'}
            isDisabled
          ></Select>
          <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
            City
          </Text>
          <Select
            placeholder="Select a City"
            bg={'brand.grey100'}
            color={'brand.grey350'}
            variant={'filled'}
            mb={'24px'}
            isDisabled
          ></Select>
          <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
            Postal Code
          </Text>
          <Input
            isDisabled
            placeholder="Type a postal code"
            _placeholder={{ color: 'brand.grey350' }}
            bg={'brand.grey100'}
            variant={'filled'}
            mb={{ base: '', md: '24px' }}
          />
        </Box>
        <Box>
          <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
            Address (Ex : Street, Residence, number of house)
          </Text>
          <Textarea
            placeholder="Type your address"
            _placeholder={{ color: 'brand.grey350' }}
            bg={'brand.grey100'}
            variant={'filled'}
            h={'210px'}
            isDisabled
          />
        </Box>
      </Grid>
      <Flex justifyContent={'flex-end'} mt={'40px'} gap={'16px'}>
        <Button
          width={'168px'}
          padding={'12px 16px'}
          bgColor={'white'}
          color={'brand.lightred'}
          variant={'outline'}
          borderColor={'brand.lightred'}
          _hover={{ borderColor: '#f50f5a', color: '#f50f5a' }}
          _active={{ opacity: '70%' }}
          onClick={() => navigate('/manage-address')}
        >
          Cancel
        </Button>
        <Button
          type="sumbit"
          width={'168px'}
          padding={'12px 16px'}
          bgColor={'brand.lightred'}
          color={'white'}
          isDisabled
          _hover={{ bg: '#f50f5a' }}
          _active={{ opacity: '70%' }}
        >
          Create
        </Button>
      </Flex>
    </>
  )
}

export default FormCreateAddress
