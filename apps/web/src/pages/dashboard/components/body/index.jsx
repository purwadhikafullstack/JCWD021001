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
  console.log('props', props?.user)
  const renderComponent = () => {
    switch (props?.destination) {
      case 'product-list':
        return <ProductList user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
      case 'product-category':
        return <ProductCategory user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
      case 'stock-management':
        return <StockManagement user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
      case 'stock-mutation':
        return <StockMutation user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
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
        return <SalesReport user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
      case 'stock-report':
        return <StockReport user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
      case 'order-management':
        return <OrderManagement />
        
    }
  }
  const renderComponentAgain = () => {
    switch (props?.createProduct) {
      case 'create-product':
        return <CreateProduct user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
      case 'edit-product':
      case 'view-product':
        return <EditProduct user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
      case 'create-product-category':
        return <CreateProductCategoryGender user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
      case 'edit-product-category':
      case 'view-product-category':
        return <EditProductCategory user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
      case 'order-history':
        return <OrderHistory user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
      case 'create-stock':
        return <CreateStock user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
      case 'form-mutation':
        return <FormMutation user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
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
