import { Box } from '@chakra-ui/react'
import { ProductList } from '../product-list'
import { CreateProduct } from '../create-product'
import { EditProduct } from '../edit-product'

export const Body = (props) => {
  console.log('destination', props?.destination)
  console.log('destination', props?.createProduct)
  const renderComponent = () => {
    switch (props?.destination) {
      case 'product-list':
        return <ProductList />
    }
  }
  const renderComponentAgain = () => {
    switch (props?.createProduct) {
      case 'create-product':
        return <CreateProduct />
      case 'edit-product':
        return <EditProduct />
    }
  }
  const create = renderComponentAgain()
  const rendered = renderComponent()
  return (
    <Box bgColor={'grey.50'} minH={'100vh'} w={'100%'} p={'1em'}>
      {props?.createProduct ? create : rendered}
    </Box>
  )
}
