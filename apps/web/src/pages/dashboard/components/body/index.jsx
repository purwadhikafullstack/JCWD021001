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
import { AdminBiasaRoute, AdminRoute } from '../../../../components/Auth/ProtectedRoute'
import { SalesReport } from '../sales-report'
import { StockReport } from '../stock-report'
import { ProductColour } from '../product-colour'
import { CreateColour } from '../create-colour'
import OrderManagement from '../../../order-management'

export const Body = (props) => {
  const renderComponent = () => {
    switch (props?.destination) {
      case 'product-list':
        return (
          <AdminBiasaRoute>
            <ProductList user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminBiasaRoute>
        )
      case 'product-category':
        return (
          <AdminBiasaRoute>
            <ProductCategory user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminBiasaRoute>
        )
      case 'product-colour':
        return (
          <AdminBiasaRoute>
            <ProductColour user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminBiasaRoute>
        )
      case 'stock-management':
        return (
          <AdminBiasaRoute>
            <StockManagement user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminBiasaRoute>
        )
      case 'stock-mutation':
        return (
          <AdminBiasaRoute>
            <StockMutation user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminBiasaRoute>
        )
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
          <AdminBiasaRoute>
            <SalesReport user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminBiasaRoute>
        )
      case 'stock-report':
        return (
          <AdminBiasaRoute>
            <StockReport user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminBiasaRoute>
        )
      case 'order-management':
        return (
          <AdminBiasaRoute>
            <OrderManagement />
          </AdminBiasaRoute>
        )
    }
  }
  const renderComponentAgain = () => {
    switch (props?.createProduct) {
      case 'create-product':
        return (
          <AdminBiasaRoute>
            <CreateProduct user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminBiasaRoute>
        )
      case 'edit-product':
      case 'view-product':
        return (
          <AdminBiasaRoute>
            <EditProduct user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminBiasaRoute>
        )
      case 'create-product-category':
        return (
          <AdminBiasaRoute>
            <CreateProductCategoryGender user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminBiasaRoute>
        )
      case 'edit-product-category':
      case 'view-product-category':
        return (
          <AdminBiasaRoute>
            <EditProductCategory user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminBiasaRoute>
        )
      case 'create-colour':
        return (
          <AdminBiasaRoute>
            <CreateColour user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminBiasaRoute>
        )
      case 'order-history':
        return (
          <AdminBiasaRoute>
            <OrderHistory user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminBiasaRoute>
        )
      case 'create-stock':
        return (
          <AdminBiasaRoute>
            <CreateStock user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminBiasaRoute>
        )
      case 'form-mutation':
        return (
          <AdminBiasaRoute>
            <FormMutation user={props?.user} isSuperAdmin={props?.isSuperAdmin} />
          </AdminBiasaRoute>
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
