import React, { useState } from 'react'
import {
  Box,
  Input,
  Image,
  Text,
  AspectRatio,
  Button,
  VStack,
  useToast,
  Flex,
} from '@chakra-ui/react'
import axios from 'axios'

export const ImageUpload = (props) => {
  // TOAST
  const toast = useToast()
  // TOAST

  // IMAGE BOX SOURCE
  const [selectedImage, setSelectedImage] = useState(null)
  // IMAGE BOX SOURCE

  // IMAGE WILL BE SENT
  const [sendedImage, setSendedImage] = useState(null)
  // IMAGE WILL BE SENT

  // HANDLE FILE CHANGE
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setSendedImage(e.target.files[0])
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setSelectedImage(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }
  // HANDLE FILE CHANGE

  // HANDLE RESET
  const handleReset = () => {
    setSelectedImage(null)
    document.getElementById('file-input').value = ''
  }
  // HANDLE RESET

  // UPLOAD IMAGE
  const uploadImage = async (imageUrl, productId) => {
    try {
      const formData = new FormData()
      formData.append('imageUrl', imageUrl)
      formData.append('productId', productId)
      const res = await axios.post(`http://localhost:8000/api/product-image`, formData)
      toast({
        title: `${res?.data?.title}`,
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
  // UPLOAD IMAGE
  return (
    <Box mt={'2em'}>
      <VStack align={'stretch'}>
        <Text fontWeight={'bold'}>Photo Product</Text>
        <Box
          onClick={() => document.getElementById('file-input').click()}
          width="200px"
          height="200px"
          border="2px dashed #ccc"
          position="relative"
          overflow="hidden"
          cursor="pointer"
        >
          <Input
            type="file"
            id="file-input"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          {selectedImage ? (
            <>
              <AspectRatio ratio={1}>
                <Image
                  objectFit={'cover'}
                  src={selectedImage}
                  alt="Selected Image"
                  maxW="100%"
                  maxH="100%"
                  position="absolute"
                  top="0"
                  left="0"
                />
              </AspectRatio>
            </>
          ) : (
            <Text textAlign="center" lineHeight="200px">
              Click to upload image with Chakra UI
            </Text>
          )}
        </Box>
        <Flex justifyContent={'space-between'}>
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
            isLoading={false}
            onClick={handleReset}
          >
            Reset
          </Button>
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
              uploadImage(sendedImage, props?.productId)
            }}
          >
            Submit
          </Button>
        </Flex>
      </VStack>
    </Box>
  )
}
