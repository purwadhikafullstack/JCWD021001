import { Box, FormControl, FormLabel, Select, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getColours } from '../../../create-stock/services/readColour'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export const CreateColour = (props) => {
  const [colours, setColours] = useState([])

  useEffect(() => {
    getColours().then((data) => setColours(data))
  }, [])

  const formik = useFormik({
    initialValues: {
      colourId: '',
    },
  })
  console.log('colours', colours)
  console.log('formik', formik.values)
  return (
    <Box>
      <VStack align={'stretch'}>
        <form>
          <FormControl isRequired>
            <FormLabel htmlFor="colourId" fontWeight={'bold'}>
              Product Colours
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
        </form>
      </VStack>
    </Box>
  )
}
