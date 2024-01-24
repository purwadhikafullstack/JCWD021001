import { AspectRatio, Button, HStack, Image, Td, Text, Tr } from '@chakra-ui/react'
import toRupiah from '@develoka/angka-rupiah-js'
export const TableBody = (props) => {
  return (
    <>
      {props?.stocks?.rows?.map((stock, index) => {
        return (
          <Tr cursor={'pointer'} p={'.875em'} bgColor={'#FAFAFA'} key={index}>
            <Td>
              <HStack spacing={'1.5em'}>
                <AspectRatio h={'3em'} w={'3em'} ratio={1}>
                  <Image
                    src={`${import.meta.env.VITE_APP_API_IMAGE_URL}/productImages/${
                      stock?.product?.picture[0]?.imageUrl
                    }`}
                    objectFit={'cover'}
                  />
                </AspectRatio>
                <Text>{stock?.product?.name}</Text>
              </HStack>
            </Td>
            <Td>{stock?.size?.name}</Td>
            <Td>{stock?.colour?.name}</Td>
            <Td>{toRupiah(stock?.product?.price)}</Td>
            <Td>{stock?.qty}</Td>
            <Td>
              <HStack>
                <Button
                  _hover={{
                    bgColor: 'redPure.500',
                  }}
                  w={'5em'}
                  bgColor={'redPure.500'}
                  color={'white'}
                  onClick={() => {
                    navigate(`/dashboard/product-list/edit-product/${el.id}`)
                  }}
                >
                  Edit
                </Button>
                <Button
                  _hover={{
                    bgColor: 'transparent',
                  }}
                  w={'5em'}
                  border={'1px solid #e3024b'}
                  bgColor={'transparent'}
                  color={'redPure.500'}
                  onClick={() => {
                    deleteProduct(el?.id, el?.id)
                  }}
                >
                  Delete
                </Button>
                <Button
                  _hover={{
                    bgColor: 'transparent',
                  }}
                  w={'5em'}
                  border={'1px solid #e3024b'}
                  bgColor={'transparent'}
                  color={'redPure.500'}
                  onClick={() => {}}
                >
                  History
                </Button>
              </HStack>
            </Td>
          </Tr>
        )
      })}
    </>
  )
}
