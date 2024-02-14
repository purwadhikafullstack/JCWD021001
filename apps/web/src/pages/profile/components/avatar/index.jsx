import {
  Button,
  Flex,
  Input,
  Avatar,
} from '@chakra-ui/react'
import axios from 'axios'
import {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../../../redux/reducer/authReducer'
import toast from 'react-hot-toast'

function UploadAvatar() {
  const user = useSelector((state) => state.AuthReducer.user)
  const [fieldImage, setFieldImage] = useState(null)
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')


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
      dispatch(setUser(data?.data))
      toast.success(data?.message)
    } catch (err) {
      toast.error(err?.response?.data?.message)
    }
  }

  return (
      <Flex
        justify={'center'}
        gap={'20px'}
      >
        {/* Avatar */}
        <Flex
          width={{ base: '142px', md: '258px' }}
          height={{ base: '142px', md: '258px' }}
          borderRadius={'full'}
          bg={'brand.grey200'}
          position={'relative'}
          overflow={'hidden'}
        >
          {fieldImage ? (
            <Avatar
              name="Dan Abrahmov"
              src={URL.createObjectURL(fieldImage)}
              w={'full'}
              h={'full'}
            />
          ) : user?.avatar ? (
            <Avatar
              name="Dan Abrahmov"
              src={`${import.meta.env.VITE_APP_API_IMAGE_URL}/avatar/${user?.avatar}`}
              w={'full'}
              h={'full'}
            />
          ) : (
            <Avatar
              name="Dan Abrahmov"
              bg="rgba(40, 96, 67, 1)"
              src={'https://bit.ly/broken-link'}
              w={'full'}
              h={'full'}
              color={'white'}
            />
          )}

          {/* Input for Image */}
          <Input
            type="file"
            bottom={0}
            width={'100%'}
            height={'100%'}
            position="absolute"
            opacity="0"
            zIndex={10}
            borderRadius={'100%'}
            aria-hidden="true"
            accept="image/*"
            cursor={'pointer'}
            onChange={(event) => {
              event.currentTarget.files ? setFieldImage(event?.currentTarget?.files[0]) : null
            }}
          />
        </Flex>

        {/* Button Save or Cancel for upload image */}
          <Flex
            flexDir={'column'}
            gap={{ base: '14px', md: '24px' }}
            maxWidth={'202px'}
            justifyContent={'flex-end'}
          >
            <Button
              bg={'brand.lightred'}
              fontSize={{ base: '12px', md: '16px' }}
              size={{ base: 'sm', md: 'md' }}
              color={'white'}
              _hover={{ bg: '#f62252' }}
              _active={{ bg: '#f95278' }}
              onClick={() => {
                uploadAvatar(fieldImage), setFieldImage('')
              }}
              isDisabled={!fieldImage}
            >
              Update Image
            </Button>

            <Button
              variant={'outline'}
              borderColor={'brand.lightred'}
              bg={'white'}
              color={'brand.lightred'}
              fontSize={{ base: '12px', md: '16px' }}
              size={{ base: 'sm', md: 'md' }}
              _hover={{ borderColor: '#f62252', color: '#f62252' }}
              _active={{ borderColor: '#f95278', color: '#f95278' }}
              onClick={() => setFieldImage('')}
              isDisabled={!fieldImage}
            >
              Remove
            </Button>
          </Flex>
      </Flex>
  )
}

export default UploadAvatar
