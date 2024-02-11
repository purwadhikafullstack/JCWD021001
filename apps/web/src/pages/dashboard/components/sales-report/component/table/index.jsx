import { Box } from '@chakra-ui/react'
import { SalesTable } from '../sales-table'
import { CategoryTable } from '../category-table'
import { ProductTable } from '../product-table'

export const ReportTable = (props) => {
  const renderComponent = () => {
    switch (props?.categoryValue) {
      case 'all':
        return (
          <SalesTable
            user={props?.user}
            isSuperAdmin={props?.isSuperAdmin}
            warehouseValue={props?.warehouseValue}
            warehouseId={props?.warehouseId}
            startDate={props?.startDate}
            endDate={props?.endDate}
            pageValue={props?.pageValue}
          />
        )
      case 'cat':
        return (
          <CategoryTable
            user={props?.user}
            isSuperAdmin={props?.isSuperAdmin}
            warehouseValue={props?.warehouseValue}
            warehouseId={props?.warehouseId}
            startDate={props?.startDate}
            endDate={props?.endDate}
          />
        )
      case 'pro':
        return (
          <ProductTable
            user={props?.user}
            isSuperAdmin={props?.isSuperAdmin}
            warehouseValue={props?.warehouseValue}
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
