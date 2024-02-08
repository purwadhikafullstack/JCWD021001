import { Button } from '@chakra-ui/react'
import { deleteProductImage } from '../../../product-list/services/deleteProduct'

export const DeleteButtonProdImage = (props) => {
  return (
    <Button
      _hover={{
        bgColor: 'transparent',
      }}
      fontSize={'.75em'}
      alignSelf={'flex-start'}
      w={'3em'}
      h={'2em'}
      border={'1px solid #e3024b'}
      bgColor={'transparent'}
      color={'redPure.500'}
      onClick={() => {
        deleteProductImage(props?.id, '')
      }}
    >
      Delete
    </Button>
  )
}
