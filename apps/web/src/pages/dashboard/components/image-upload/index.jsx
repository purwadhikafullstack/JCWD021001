import React, { useState } from 'react'
import { Box, Input, Image, Text, AspectRatio, Button, VStack } from '@chakra-ui/react'

export const ImageUpload = (props) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [sendedImage, setSendedImage] = useState(null)
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
  const handleReset = () => {
    setSelectedImage(null)
    // Reset the file input value to allow selecting the same file again
    document.getElementById('file-input').value = ''
  }
  console.log('SENDED IMAGE', sendedImage)
  return (
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
    </VStack>
  )
}
