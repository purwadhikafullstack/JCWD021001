import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const CreateButton = (props) => {
  const navigate = useNavigate()
  return (
    <Button
      h={'2.5em'}
      w={{ md: '10em' }}
      _hover={{
        bgColor: 'redPure.600',
      }}
      bgColor={'redPure.600'}
      color={'white'}
      onClick={() => {
        navigate(props?.navigate)
      }}
    >
      Create Product
    </Button>
  )
}
