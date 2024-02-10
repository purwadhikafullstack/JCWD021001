import { Box } from '@chakra-ui/react'
import { ProductList } from '../product-list'
import { CreateProduct } from '../create-product'
import { EditProduct } from '../edit-product'
import { ProductCategory } from '../product-category'
import { CreateProductCategoryGender } from '../create-product-category-gender'
import { EditProductCategory } from '../edit-product-category'
import { StockManagement } from '../stock-management'
import { OrderHistory } from '../order-history'
import { CreateStock } from '../create-stock'
import { StockMutation } from '../stock-mutation'
import { FormMutation } from '../form-mutation'
import AdminListDashboard from '../../../admin-list-dashboard'
import UserList from '../../../user-list'
import WarehouseList from '../../../warehouse-list'
import { AdminRoute } from '../../../../components/Auth/ProtectedRoute'
import { SalesReport } from '../sales-report'
import { StockReport } from '../stock-report'
import OrderManagement from '../../../order-management'

export const Body = (props) => {
  const renderComponent = () => {
    switch (props?.destination) {
      case 'product-list':
        return <ProductList />
      case 'product-category':
        return <ProductCategory />
      case 'stock-management':
        return <StockManagement />
      case 'stock-mutation':
        return <StockMutation />
      case 'admin-list':
        return (
          <AdminRoute>
            <AdminListDashboard />
          </AdminRoute>
        )
      case 'user-list':
        return (
          <AdminRoute>
            <UserList />
          </AdminRoute>
        )
      case 'warehouse-list':
        return (
          <AdminRoute>
            <WarehouseList />
          </AdminRoute>
        )
      case 'sales-report':
        return <SalesReport />
      case 'stock-report':
        return <StockReport />
      case 'order-management':
        return <OrderManagement />
    }
  }
  const renderComponentAgain = () => {
    switch (props?.createProduct) {
      case 'create-product':
        return <CreateProduct />
      case 'edit-product':
        return <EditProduct />
      case 'create-product-category':
        return <CreateProductCategoryGender />
      case 'edit-product-category':
        return <EditProductCategory />
      case 'order-history':
        return <OrderHistory />
      case 'create-stock':
        return <CreateStock />
      case 'form-mutation':
        return <FormMutation />
    }
  }
  const create = renderComponentAgain()
  const rendered = renderComponent()
  return (
    <Box
      bgColor={'grey.50'}
      w={'100%'}
      p={'1em'}
      display={props?.collapseSidebar ? 'none' : 'block'}
    >
      {props?.createProduct ? create : rendered}
    </Box>
  )
}
