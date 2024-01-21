import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { findUserAddress } from "../../services/readUserAddress";
import { useSelector } from "react-redux";

function AddressList (){
    
    const [address, setAddress] = useState([])
    const user = useSelector((state) => state.AuthReducer.user);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchAddresses = await findUserAddress(user.id)
                setAddress(fetchAddresses)
            } catch (err){
                console.log(err);
            }
        }
        fetchData()
    }, [user.id])

    return (
        <>
        {address.map((address) => ( 
            <Flex key={address.id}
            borderRadius={'12px'}
            border={'1px solid #818181'}
            bg={'white'}
            padding={'24px'}
            mt={'24px'}
            mb={'24px'}>
                <Flex 
                width={'100%'}
                flexWrap={'wrap'}
                flexDir={'column'}>
                    <Flex gap={'24px'}
                    alignItems={'center'}
                    mb={'24px'}>
                        <Text fontSize={'16px'}
                              fontWeight={'700'}
                              color={'black'}>
                            {address.fullName} 
                        </Text>
                        {address.isMainAddress ? 
                        <Box padding={'10px'}
                             bg={'#FFE9F0'}
                             borderRadius={'8px'}
                             fontSize={'16px'}
                             fontWeight={'700'}
                             color={'brand.lightred'}>
                            Main
                        </Box>
                        : <></>}
                    </Flex>
                    <Text fontSize={'14px'}
                          fontWeight={'400'}
                          mb={'16px'}>
                        {address.phoneNumber} 
                    </Text>
                    <Text fontSize={'14px'}
                          fontWeight={'600'}
                          color={'brand.grey350'}>
                        {address.specificAddress ?? ''}, {address.City.name}, {address.City.Province.name} {address.postalCode ?? ''} 
                    </Text>
                </Flex>
                <Flex justifyContent={'flex-end'}>
                    <Button>
                        Change Address
                    </Button>
                </Flex>
            </Flex>
            ))}
        </>
    )
}

export default AddressList