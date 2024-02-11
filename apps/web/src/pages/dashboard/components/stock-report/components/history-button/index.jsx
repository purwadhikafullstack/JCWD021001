import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const HistoryButton = (props) => {
  const navigate = useNavigate()
  return (
    <Button
      _hover={{
        bgColor: 'redPure.600',
      }}
      fontSize={'.8em'}
      h={'2.5em'}
      w={'5em'}
      bgColor={'redPure.600'}
      color={'white'}
      onClick={() => {
        navigate(
          `${props?.pathName}/order-history/${props?.stockId}?pa=1&mo=${props?.monthValue}${
            props?.warValue ? `&war=${props?.warValue}` : ''
          }`,
        )
      }}
    >
      History
    </Button>
  )
}
