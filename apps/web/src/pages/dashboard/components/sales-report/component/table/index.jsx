import { Box, Text } from '@chakra-ui/react'
import { SalesTable } from '../sales-table'
import { CategoryTable } from '../category-table'
import { useEffect, useState } from 'react'
import { ProductTable } from '../product-table'

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
      case 'pro':
        return (
          <ProductTable
            warehouseId={props?.warehouseId}
            startDate={props?.startDate}
            endDate={props?.endDate}
            pageValue={props?.pageValue}
          />
        )
    }
  }
  const rendered = renderComponent()
  return <Box>{rendered}</Box>
}
