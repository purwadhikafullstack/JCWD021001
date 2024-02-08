import { Button, useToast } from '@chakra-ui/react'
import { deleteProduct } from '../../services/deleteProduct'

export const DeleteButton = (props) => {
  console.log(props)
  const toast = useToast()
  return (
    <Button
      _hover={{
        bgColor: 'transparent',
      }}
      fontSize={'.8em'}
      h={'2.5em'}
      w={'5em'}
      border={'1px solid #CD0244'}
      bgColor={'transparent'}
      color={'redPure.600'}
      onClick={async () => {
        await deleteProduct(props?.id, props?.productId, toast)
        props?.setTrigger(!props?.trigger)
      }}
    >
      Delete
    </Button>
  )
}
