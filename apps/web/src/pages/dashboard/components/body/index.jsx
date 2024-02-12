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
import { ProductColour } from '../product-colour'
import { CreateColour } from '../create-colour'

export const Body = (props) => {
  const renderComponent = () => {
    switch (props?.destination) {
      case 'product-list':
        return (
          <AdminRoute>
            <ProductList
              collapseSidebar={props?.collapseSidebar}
              user={props?.user}
              isSuperAdmin={props?.isSuperAdmin}
            />
          </AdminRoute>
        )
      case 'product-category':
        return (
          <AdminRoute>
            <ProductCategory user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminRoute>
        )
      case 'product-colour':
        return (
          <AdminRoute>
            <ProductColour user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminRoute>
        )
      case 'stock-management':
        return (
          <AdminRoute>
            <StockManagement user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminRoute>
        )
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
        return (
          <AdminRoute>
            <SalesReport user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminRoute>
        )
      case 'stock-report':
        return (
          <AdminRoute>
            <StockReport user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminRoute>
        )
    }
  }
  const renderComponentAgain = () => {
    switch (props?.createProduct) {
      case 'create-product':
        return (
          <AdminRoute>
            <CreateProduct user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminRoute>
        )
      case 'edit-product':
      case 'view-product':
        return (
          <AdminRoute>
            <EditProduct user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminRoute>
        )
      case 'create-product-category':
        return (
          <AdminRoute>
            <CreateProductCategoryGender user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminRoute>
        )
      case 'edit-product-category':
      case 'view-product-category':
        return (
          <AdminRoute>
            <EditProductCategory user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminRoute>
        )
      case 'create-colour':
        return (
          <AdminRoute>
            <CreateColour user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminRoute>
        )
      case 'order-history':
        return (
          <AdminRoute>
            <OrderHistory user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminRoute>
        )
      case 'create-stock':
        return (
          <AdminRoute>
            <CreateStock user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminRoute>
        )
      case 'form-mutation':
        return (
          <AdminRoute>
            <FormMutation user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminRoute>
        )
    }
  }
  const create = renderComponentAgain()
  const rendered = renderComponent()
  return (
    <Box
      bgColor={'grey.50'}
      w={'100%'}
      p={'1em'}
      display={!props?.collapseSidebar ? 'block' : 'none'}
    >
      {props?.createProduct ? create : rendered}
    </Box>
  )
}
