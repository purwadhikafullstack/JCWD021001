import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
  Textarea,
  Image,
  Box,
} from '@chakra-ui/react'
import { Colours } from '../colours'
import { DeleteButtonProdImage } from '../delete-button'
import { RenderedCategory, RenderedGender, RenderedGroup } from '../gender'
import { ImageUpload } from '../../../image-upload'
import { CreateColour } from '../create-colour'

export const EditInput = (props) => {
  return (
    <VStack direction="column" align="flex-start">
      <FormControl isRequired>
        <FormLabel htmlFor="name" fontWeight={'bold'}>
          Product Name
        </FormLabel>
        <Input
          id="name"
          name="name"
          value={props?.formik.values.name}
          onChange={props?.formik.handleChange}
          placeholder="Type Product Name Here"
          borderColor={'transparent'}
          focusBorderColor={'transparent'}
          bgColor={'grey.50'}
          isReadOnly={!props?.editable}
        />
        {props?.formik.errors.name && <Text color="red">{props?.formik.errors.name}</Text>}
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="productCategoryId" fontWeight={'bold'}>
          Category
        </FormLabel>
        <Input
          name="productCategoryId"
          id="productCategoryId"
          fontWeight={'bold'}
          onChange={props?.formik.handleChange}
          placeholder="Select Category"
          borderColor={'transparent'}
          focusBorderColor={'transparent'}
          bgColor={'grey.50'}
          value={`${props?.gender}   |   ${props?.group}   |   ${props?.categoryValue}`}
          readOnly
        />
        {props?.formik.errors.productCategoryId && (
          <Text color="red">{props?.formik.errors.productCategoryId}</Text>
        )}
        {props?.editable && props?.isSuperAdmin && (
          <Grid
            mt={'1em'}
            templateColumns="repeat(3, 1fr)"
            w={'100%'}
            gap={'1em'}
            border={'2px solid #f2f2f2'}
            borderRadius={'.5em'}
            p={'1em'}
            fontWeight={'bold'}
          >
            <Box p={'0 .5em'}>
              <VStack align={'stretch'}>
                <RenderedGender
                  genders={props?.genders}
                  setGender={props?.setGender}
                  setGroup={props?.setGroup}
                  setCategoryValue={props?.setCategoryValue}
                />
              </VStack>
            </Box>
            <Box p={'0 .5em'} borderLeft={'2px solid lightgray'}>
              <RenderedGroup
                productCategories={props?.productCategories}
                setGroup={props?.setGroup}
                setCategoryValue={props?.setCategoryValue}
                formik={props?.formik}
                handleEditClickCategory={props?.handleEditClickCategory}
              />
            </Box>
            <Box p={'0 .5em'} borderLeft={'2px solid lightgray'}>
              <RenderedCategory
                productCategories={props?.productCategories}
                editableCategory={props?.editableCategory}
                setCategoryValue={props?.setCategoryValue}
                setGroup={props?.setGroup}
                formik={props?.formik}
              />
            </Box>
          </Grid>
        )}
      </FormControl>
      <VStack align={'stretch'}>
        <Text fontWeight={'bold'}>Photo Product</Text>
        <Grid w={'100%'} templateColumns={'repeat(3, 1fr)'} gap={'.5em'}>
          {props?.product?.picture?.map((el, index) => {
            return (
              <Box key={index} w={'5em'} h={'5em'} border={'1px solid lightgray'} mb={'2em'}>
                <VStack align={'stretch'}>
                  <Image
                    src={`${import.meta.env.VITE_APP_API_IMAGE_URL}/productImages/${el?.imageUrl}`}
                  />
                  {props?.isSuperAdmin && <DeleteButtonProdImage id={el?.id} />}
                </VStack>
              </Box>
            )
          })}
        </Grid>
      </VStack>
      {props?.editable && props?.isSuperAdmin && <ImageUpload productId={props?.product?.id} />}
      <FormControl isRequired>
        <FormLabel htmlFor="description" fontWeight={'bold'}>
          Description
        </FormLabel>
        <Textarea
          id="description"
          name="description"
          value={props?.formik.values.description}
          onChange={props?.formik.handleChange}
          placeholder="Input Description"
          isReadOnly={!props?.editable}
        />
        {props?.formik.errors.description && (
          <Text color="red">{props?.formik.errors.description}</Text>
        )}
      </FormControl>
      <Text fontWeight={'bold'}>Product Colours</Text>
      <Colours product={props?.product} />
      {props?.editable && props?.isSuperAdmin && <CreateColour productId={props?.productId} />}
      <FormControl isRequired>
        <FormLabel htmlFor="price" fontWeight={'bold'}>
          Price
        </FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="grey.500"
            fontSize="1em"
            children="Rp"
            bgColor={'grey.50'}
            borderRadius={'.5em 0 0 .5em'}
          />
          <Input
            ml={'1em'}
            id={'price'}
            name={'price'}
            type={'number'}
            value={props?.formik.values.price}
            onChange={props?.formik.handleChange}
            placeholder="Input Price Here"
            borderColor={'grey.50'}
            _focus={{ borderColor: 'grey.50' }}
            focusBorderColor={'transparent'}
            isReadOnly={!props?.editable}
          />
        </InputGroup>
        {props?.formik.errors.price && <Text color="red">{props?.formik.errors.price}</Text>}
      </FormControl>
      <HStack alignSelf={'flex-end'}>
        <Button
          _hover={{
            bgColor: 'redPure.500',
          }}
          w={'5em'}
          bgColor={'redPure.500'}
          color={'white'}
          isLoading={false}
          onClick={() => {
            props?.handleEditClick()
          }}
        >
          {!props?.editable ? 'Edit' : 'Cancel'}
        </Button>
        <Button
          type="submit"
          _hover={{
            bgColor: 'redPure.500',
          }}
          w={'5em'}
          bgColor={'redPure.500'}
          color={'white'}
          isLoading={false}
        >
          Submit
        </Button>
      </HStack>
    </VStack>
  )
}
