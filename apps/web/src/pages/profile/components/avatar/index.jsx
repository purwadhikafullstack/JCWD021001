import { AbsoluteCenter, Box, Button, Flex, Icon, Input, InputGroup, Image } from "@chakra-ui/react";
import axios from "axios";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { PhotoIcon} from '@heroicons/react/24/solid'

function UploadAvatar () {

    const user = useSelector((state) => state.AuthReducer.user);
    const [fieldImage, setFieldImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const inputRef = useRef(null);

    const handleImageClick = (event) => {
        event.stopPropagation();
        inputRef.current.click();
      }
    const handleImageChange = (event) => {
        const imageFile = event.currentTarget.files[0];
        if (imageFile) {
          const imageURL = URL.createObjectURL(imageFile);
          setImagePreview(imageURL);
          setFieldImage(imageFile);
        }
      };

    const uploadAvatar = async () => {
        try{
            let formData = new FormData();
            formData.append("avatar", fieldImage);
            
            const { data } = await axios.patch(
                `${
                import.meta.env.VITE_API_URL
                }user/upload-avatar/${user.id}`,
                formData)
                alert(data?.message);
        } catch (err){
            console.log(err);
        }
    }

    return (
        <>
        <Box>
            <Box 
            width={'258px'}
            height={'258px'}
            borderRadius={'full'}
            bg={'brand.grey200'}
            position={'relative'}
            overflow={'hidden'}
            onClick={handleImageClick}>
                {imagePreview ? (
                    <>
                    <Image src={imagePreview} 
                    w={'100%'} 
                    h={'100%'} 
                    objectFit={'cover'}
                    objectPosition={'center'}
                    />
                    <Box
                        position={'absolute'}
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        onClick={(event) => handleImageClick(event)}
                        cursor={'pointer'}
                        zIndex={'1'}
                    />
                    </>
                ) : (
                <AbsoluteCenter>
                        <Icon as={PhotoIcon} 
                        color={'#696666'} 
                        boxSize={'110px'}/>
                </AbsoluteCenter>
                )}
                <AbsoluteCenter>
                    <InputGroup>
                        <Input type="file"
                        position={'absolute'}
                        id="input-image"
                        ref={inputRef}
                        zIndex={'99'}
                        opacity={'0'}
                        onChange={handleImageChange}/>
                    </InputGroup>
                </AbsoluteCenter>
            </Box>
        </Box>
        <Flex flexDir={'column'}
        gap={'24px'}
        maxWidth={'202px'}
        justifyContent={'flex-end'}>
            <Button bg={'brand.lightred'}
            color={'white'}
            _hover={{bg:'#f62252'}}
            _active={{bg:'#f95278'}}
            onClick={() => {
            uploadAvatar(fieldImage),
            setFieldImage("");
            }}>
                Upload Image
            </Button>
            
            <Button
            variant={'outline'}
            borderColor={'brand.lightred'}
            bg={'white'}
            color={'brand.lightred'}
            _hover={{borderColor:'#f62252', color:'#f62252'}}
            _active={{borderColor:'#f95278', color:'#f95278'}}
            onClick={() => {
                setFieldImage(null)
                setImagePreview(null)
            }}>
                Remove
            </Button>
        </Flex>

        </>
    )
}

export default UploadAvatar

