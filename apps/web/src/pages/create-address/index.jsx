import { Box, Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import Navbar from "../../components/Navbar/Navbar";
import { BreadCrumbs } from "./components/breadcrumbs";
import Footer from "../../components/Footer/Footer";
import FormCreateAddress from "./components/form/Index";
import { useEffect, useState } from "react";
// import { getAddressOpenCage } from "./services/readUserAddress";
import FormCurrentLocation from "./components/current-location/Index";



function CreateAddress(){

    const [formCurrentLocation, setFormCurrentLocation] = useState(false)
    

    const handleClick = async () => {
        try {
            setFormCurrentLocation(true)
        } catch (error) {
            console.error("Error fetching address:", error);
        }
    };

    return (
        <Box bg={'#F1F1F1'}
        height={'100%'}>
            <Navbar/>
            <Box padding={'0px 100px'}
             marginBottom={'150px'}>
                <Flex className="create-address-top"
                flexDir={'column'}
                gap={'16px'}
                marginTop={'24px'}
                marginBottom={'40px'}>
                    <Text fontSize={'24px'}
                    fontWeight={'700'}>Create Address</Text>
                    <Flex>
                        <BreadCrumbs/>
                    </Flex>
                </Flex>
                <Box width={'100%'}
                bg={'white'} 
                padding={'24px'}
                mb={'40px'}>
                    <Text fontSize={'24px'}
                    fontWeight={'700'}>
                        Address
                    </Text>
                    <Button color='brand.lightred' 
                    borderColor={'brand.lightred'} 
                    variant={'outline'} 
                    padding={'9px 11px'}
                    mt={'32px'}
                    mb={'40px'}
                    _hover={{
                        opacity: '80%'
                    }}
                    _active={{
                        opacity: '50%'
                    }}
                    onClick={handleClick}
                    >
                        <Text>
                        Use your current location
                        </Text>
                    </Button>
                    <Box width={'100%'}
                    height={'474px'}
                    bg={'green.100'}>
                        MAP
                    </Box>
                    <Text>
                        Contact
                    </Text>
                    {formCurrentLocation ? <FormCurrentLocation/> : <FormCreateAddress/>}
                    {/* <FormCreateAddress/> */}
                </Box>
            </Box>
            <Footer/>
        </Box>
    )
}

export default CreateAddress