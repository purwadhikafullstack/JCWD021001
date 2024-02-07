import { Box, Button, Flex, Grid, Input, Select, Text, Textarea } from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom'


function FormInitialWarehouse() {
  const navigate = useNavigate()

  return (
    <>
      {/* <form onSubmit={formik.handleSubmit}> */}
        <Grid width={'100%'} gap={'68px'} gridTemplateColumns={'1fr 1fr'}>
          <Box>
            <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
              Warehouse Name
            </Text>
            <Input
              name="name"
              placeholder="Type warehouse name here"
              _placeholder={{ color: 'brand.grey350' }}
              bg={'brand.grey100'}
              variant={'filled'}
              mb={'32px'}
              isDisabled
            />
          
          <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
              Warehouse Location
            </Text>
            <Textarea
              placeholder="Type warehouse location"
              name="location"
              _placeholder={{ color: 'brand.grey350' }}
              bg={'brand.grey100'}
              variant={'filled'}
              h={'210px'}
              isDisabled
            />
          </Box>
        
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
            >
              
            </Select>
            <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
              City
            </Text>
            <Select
              placeholder="Select a City"
              bg={'brand.grey100'}
              color={'brand.grey350'}
              variant={'filled'}
              mb={'24px'}
              name="cityId"
              isDisabled
            >
              
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
            isDisabled
            width={'168px'}
            padding={'12px 16px'}
            bgColor={'brand.lightred'}
            color={'white'}
            _hover={{ bg: '#f50f5a' }}
            _active={{ opacity: '70%' }}
          >
            Create
          </Button>
        </Flex>
      {/* </form> */}
    </>
  )
}

export default FormInitialWarehouse
