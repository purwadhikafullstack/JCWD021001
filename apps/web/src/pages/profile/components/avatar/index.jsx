import { AbsoluteCenter, Box, Button, Flex, Icon, Input, InputGroup, Image, Avatar } from '@chakra-ui/react'
import axios from 'axios'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PhotoIcon } from '@heroicons/react/24/solid'
import { setUser } from '../../../../redux/reducer/authReducer'
import toast from 'react-hot-toast'


function UploadAvatar() {
  const user = useSelector((state) => state.AuthReducer.user)
  const [fieldImage, setFieldImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const handleImageClick = (event) => {
    event.stopPropagation()
    inputRef.current.click()
  }
  const handleImageChange = (event) => {
    const imageFile = event.currentTarget.files[0]
    if (imageFile) {
      const imageURL = URL.createObjectURL(imageFile)
      setImagePreview(imageURL)
      setFieldImage(imageFile)
    }
  }

  const uploadAvatar = async () => {
    try {
      let formData = new FormData()
      formData.append('avatar', fieldImage)
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}user/upload-avatar/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      dispatch(setUser(data?.data));
      toast.success(data?.message)
    } catch (err) {
      toast.error(err?.response?.data?.message)
    }
  }

  return (
    <>
      <Box>
        <Box
          width={{ base: '142px', md: '258px' }}
          height={{ base: '142px', md: '258px' }}
          borderRadius={'full'}
          bg={'brand.grey200'}
          position={'relative'}
          overflow={'hidden'}
          onClick={handleImageClick}
        >
          {imagePreview ? (
            <>
              <Image
                src={imagePreview}
                w={'100%'}
                h={'100%'}
                objectFit={'cover'}
                objectPosition={'center'}
              />
            </>
          ) : (
            <>
              {user.avatar ? (
                <>
                  <Avatar
                    name={user?.username}
                    src={`${import.meta.env.VITE_APP_API_IMAGE_URL}/avatar/${user?.avatar}`}
                    w={'100%'}
                    h={'100%'}
                    objectFit={'cover'}
                    objectPosition={'center'}
                  />
                </>
              ) : (
                <Avatar
              name={user?.username}
              bg="rgba(40, 96, 67, 1)"
              src={'https://bit.ly/broken-link'}
              w={'100%'}
              h={'100%'}
              color={'white'}
              fontSize={'30px'}
            />
              )}
              </>
            
          )}
          <AbsoluteCenter>
            <InputGroup>
              <Input
                type="file"
                position={'absolute'}
                id="input-image"
                ref={inputRef}
                zIndex={'99'}
                opacity={'0'}
                onChange={handleImageChange}
              />
            </InputGroup>
          </AbsoluteCenter>
        </Box>
      </Box>
      <Flex flexDir={'column'} gap={{base: '14px', md: '24px'}} maxWidth={'202px'} justifyContent={'flex-end'}>
        <Button
          bg={'brand.lightred'}
          fontSize={{base: '12px', md: '16px'}}
          size={{base: 'sm', md: 'md'}}
          color={'white'}
          _hover={{ bg: '#f62252' }}
          _active={{ bg: '#f95278' }}
          onClick={() => {
            uploadAvatar(fieldImage), setFieldImage('')
          }}
        >
          Upload Image
        </Button>

        <Button
          variant={'outline'}
          borderColor={'brand.lightred'}
          bg={'white'}
          color={'brand.lightred'}
          fontSize={{base: '12px', md: '16px'}}
          size={{base: 'sm', md: 'md'}}
          _hover={{ borderColor: '#f62252', color: '#f62252' }}
          _active={{ borderColor: '#f95278', color: '#f95278' }}
          onClick={() => {
            setFieldImage(null)
            setImagePreview(null)
            if (inputRef.current) {
              inputRef.current.value = '';
            }
          }}
        >
          Remove
        </Button>
      </Flex>
    </>
  )
}

export default UploadAvatar
