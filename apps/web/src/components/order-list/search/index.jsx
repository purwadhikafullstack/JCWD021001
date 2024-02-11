import React from 'react'
import { Box, Input, Button, Icon } from '@chakra-ui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const Search = ({
  orderNumber,
  handleOrderNumberChange,
  handleOrderNumberKeyPress,
  handleOrderNumberSubmit,
}) => {
  return (
    <Box
      bgColor={'white'}
      w={'375px'}
      display={'flex'}
      alignItems={'center'}
      padding={'4px 8px 4px 8px'}
      borderRadius={'8px'}
    >
      <Input
        border={'none'}
        placeholder="Enter Order Number"
        name="orderNumber"
        value={orderNumber}
        onChange={handleOrderNumberChange}
        onKeyPress={handleOrderNumberKeyPress}
      />

      <Button
        type="submit"
        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
        onClick={handleOrderNumberSubmit}
      >
        <Icon as={MagnifyingGlassIcon} />
      </Button>
    </Box>
  )
}

export default Search
