import { Box } from '@chakra-ui/react'
import { ProductList } from '../product-list'
import { CreateProduct } from '../create-product'
import { EditProduct } from '../edit-product'
import { ProductCategory } from '../product-category'
import { CreateProductCategoryGender } from '../create-product-category-gender'
import { EditProductCategory } from '../edit-product-category'

export const Body = (props) => {
  const renderComponent = () => {
    switch (props?.destination) {
      case 'product-list':
        return <ProductList />
      case 'product-category':
        return <ProductCategory />
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
    }
  }
  const create = renderComponentAgain()
  const rendered = renderComponent()
  return (
    <Box bgColor={'grey.50'} maxH={'80%'} w={'100%'} p={'1em'}>
      {props?.createProduct ? create : rendered}
    </Box>
  )
}
