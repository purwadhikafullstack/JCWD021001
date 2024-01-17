import { Box } from '@chakra-ui/react'
import { ProductList } from '../product-list'
import { CreateProduct } from '../create-product'

export const Body = (props) => {
  const renderComponent = () => {
    switch (props?.destination) {
      case 'product-list':
        return <ProductList />
    }
  }
  const create = props?.createProduct ? <CreateProduct /> : null
  const rendered = renderComponent()
  return (
    <Box bgColor={'grey.50'} minH={'100vh'} w={'100%'} p={'1em'}>
      {props?.createProduct ? create : rendered}
    </Box>
  )
}
