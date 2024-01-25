import { AspectRatio, Button, HStack, Image, Input, Td, Text, Tr, useToast } from '@chakra-ui/react'
import toRupiah from '@develoka/angka-rupiah-js'
import { useState, useRef } from 'react'
import { createStockJournal } from '../../services/createStocks'
import { useNavigate } from 'react-router-dom'
export const TableBody = (props) => {
  // NAVIGATE
  const navigate = useNavigate()

  // TOAST
  const toast = useToast()

  // EDITABLE STOCK
  const [editableStock, setEditableStock] = useState(null)

  //   INPUT VALUE
  const [value, setValue] = useState(0)

  //   HANDLE EDIT CLICK
  const handleEditClick = (stockId) => {
    setEditableStock(stockId)
    setValue(props.stocks.rows.find((stock) => stock.id === stockId)?.qty || 0)
  }

  //   UPDATE STOCK
  const handleCreateStockJournal = async (
    productId,
    warehouseId,
    sizeId,
    colourId,
    qty,
    isUpdate,
  ) => {
    try {
      const res = await createStockJournal(productId, warehouseId, sizeId, colourId, qty, isUpdate)
      toast({
        title: `${res?.data?.message}`,
        status: 'success',
        placement: 'bottom',
      })
    } catch (err) {
      toast({
        title: `${err?.message}`,
        status: 'error',
      })
    }
  }

  //   HANDLE CANCEL CLICK
  const handleCancelClick = () => {
    setEditableStock(null)
  }

  //   HANDLE SAVE CLICK
  const handleSaveClick = (productId, warehouseId, sizeId, colourId, qty, isUpdate) => {
    handleCreateStockJournal(productId, warehouseId, sizeId, colourId, qty, isUpdate)
    setEditableStock(null)
  }

  return (
    <>
      {props?.stocks?.rows?.map((stock, index) => {
        const isEditable = editableStock === stock?.id
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
            <Td>
              {isEditable ? (
                <Input
                  id={stock?.id}
                  w={'3.5em'}
                  type="number"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value)
                  }}
                  isReadOnly={!isEditable}
                />
              ) : (
                <Input w={'3.5em'} type="number" value={stock?.qty} isReadOnly />
              )}
            </Td>
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
                    {
                      isEditable ? handleCancelClick() : handleEditClick(stock.id)
                    }
                  }}
                  type={'reset'}
                >
                  {isEditable ? 'Cancel' : 'Edit'}
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
                    isEditable
                      ? handleSaveClick(
                          stock?.productId,
                          props?.warehouseId,
                          stock?.sizeId,
                          stock?.colourId,
                          value,
                          true,
                        )
                      : console.log('DELETE')
                  }}
                >
                  {isEditable ? 'Save' : 'Delete'}
                </Button>
                {!isEditable && (
                  <Button
                    _hover={{
                      bgColor: 'transparent',
                    }}
                    w={'5em'}
                    border={'1px solid #e3024b'}
                    bgColor={'transparent'}
                    color={'redPure.500'}
                    onClick={() => {
                      navigate(`${props?.pathName}/order-history/${stock?.id}?pa=1`)
                    }}
                  >
                    History
                  </Button>
                )}
              </HStack>
            </Td>
          </Tr>
        )
      })}
    </>
  )
}
