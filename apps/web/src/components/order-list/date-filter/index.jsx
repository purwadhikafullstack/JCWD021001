import React from 'react'
import { Box, Input } from '@chakra-ui/react'

const DateFilter = ({ orderDate, handleOrderDateChange }) => {
  return (
    <Box bgColor={'white'} w={'230px'} padding={'4px 12px 4px 8px'} borderRadius={'8px'}>
      <Input
        border={'none'}
        placeholder="Select Date and Time"
        size="md"
        type="date"
        name="orderDate"
        value={orderDate}
        onChange={handleOrderDateChange}
      />
    </Box>
  )
}

export default DateFilter
