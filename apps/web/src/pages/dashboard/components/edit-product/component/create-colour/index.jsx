import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getColours } from '../../../create-stock/services/readColour'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createProductColour } from './services/createColour'

export const CreateColour = (props) => {
  // TOAST
  const toast = useToast()

  // Get colours
  const [colours, setColours] = useState([])

  useEffect(() => {
    getColours().then((data) => setColours(data))
  }, [])

  // Crete colour
  const handleSubmit = async (productId, colourId) => {
    try {
      const res = await createProductColour(productId, colourId)
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

  // Formik
  const formik = useFormik({
    initialValues: {
      colourId: '',
    },
    onSubmit: handleSubmit,
  })

  return (
    <Box>
      <form>
        <VStack align={'stretch'}>
          <FormControl isRequired>
            <FormLabel htmlFor="colourId" fontWeight={'bold'}>
              Add Product Colours
            </FormLabel>
            <Select
              name={'colourId'}
              id={'colourId'}
              size={'sm'}
              w={'6em'}
              placeholder={'Select Colour'}
              onChange={formik.handleChange}
            >
              {colours?.map((colour, index) => {
                return (
                  <option key={index} id={colour?.id} value={colour?.id}>
                    {colour?.name}
                  </option>
                )
              })}
            </Select>
          </FormControl>
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
            onClick={async () => {
              await handleSubmit(props?.productId, formik.values.colourId)
            }}
          >
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  )
}
