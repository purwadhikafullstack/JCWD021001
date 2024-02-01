import { Box, Text } from '@chakra-ui/react'
import { SalesTable } from '../sales-table'
import { CategoryTable } from '../category-table'
import { useEffect, useState } from 'react'

export const ReportTable = (props) => {
  console.log('props', props)
  const renderComponent = () => {
    switch (props?.categoryValue) {
      case 'all':
        return (
          <SalesTable
            warehouseId={props?.warehouseId}
            startDate={props?.startDate}
            endDate={props?.endDate}
            pageValue={props?.pageValue}
          />
        )
      case 'cat':
        return (
          <CategoryTable
            warehouseId={props?.warehouseId}
            startDate={props?.startDate}
            endDate={props?.endDate}
          />
        )
    }
  }
  const rendered = renderComponent()
  return <Box>{rendered}</Box>
}
