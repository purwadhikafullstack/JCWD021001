import {
  AspectRatio,
  Button,
  HStack,
  Icon,
  Image,
  Input,
  Td,
  Text,
  Tr,
  useToast,
} from '@chakra-ui/react'
import toRupiah from '@develoka/angka-rupiah-js'
import { useState, useRef } from 'react'
import { createStockJournal } from '../../services/createStocks'
import { useNavigate } from 'react-router-dom'
import { DeleteButton } from '../delete-button'
import { ChevronDoubleRightIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
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
  const handleSaveClick = async (productId, warehouseId, sizeId, colourId, qty, isUpdate) => {
    await handleCreateStockJournal(productId, warehouseId, sizeId, colourId, qty, isUpdate)
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
                <Text>
                  {stock?.product?.name}
                  <HStack fontSize={'.6em'}>
                    <Text>{stock?.product?.category?.parent?.parent?.name}</Text>
                    <Icon as={ChevronRightIcon} />
                    <Text>{stock?.product?.category?.parent?.name}</Text>
                    <Icon as={ChevronRightIcon} />
                    <Text>{stock?.product?.category?.name}</Text>
                  </HStack>
                </Text>
              </HStack>
            </Td>
            <Td>{stock?.size?.name}</Td>
            <Td>{stock?.colour?.name}</Td>
            <Td>{toRupiah(stock?.product?.price)}</Td>
            <Td>
              {isEditable ? (
                <Input
                  borderColor={'#D9D9D9'}
                  focusBorderColor={'#D9D9D9'}
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
                <Input
                  borderColor={'#D9D9D9'}
                  focusBorderColor={'#D9D9D9'}
                  w={'3.5em'}
                  type="number"
                  value={stock?.qty}
                  isReadOnly
                />
              )}
            </Td>
            <Td>
              <HStack>
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
                    {
                      isEditable ? handleCancelClick() : handleEditClick(stock.id)
                    }
                  }}
                  type={'reset'}
                >
                  {isEditable ? 'Cancel' : 'Edit'}
                </Button>
                {!isEditable && (
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
                        `${props?.pathName}/order-history/${stock?.id}?pa=1&mo=jan${
                          props?.warehouseValue ? `&war=${props?.warehouseValue}` : ''
                        }`,
                      )
                    }}
                  >
                    History
                  </Button>
                )}
                <DeleteButton
                  productId={stock?.productId}
                  warehouse={props?.warehouseValue ? props?.warehouseValue : props?.warehouseId}
                  sizeId={stock?.sizeId}
                  colourId={stock?.colourId}
                  value={value}
                  setTrigger={props?.setTrigger}
                  isEditable={isEditable}
                  handleSaveClick={handleSaveClick}
                  trigger={props?.trigger}
                  stockId={stock?.id}
                />
              </HStack>
            </Td>
          </Tr>
        )
      })}
    </>
  )
}
