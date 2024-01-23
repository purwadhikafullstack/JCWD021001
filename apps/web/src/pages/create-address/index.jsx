import { Box, Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import { BreadCrumbs } from "./components/breadcrumbs";
import Footer from "../../components/Footer/Footer";
import FormCreateAddress from "./components/form/Index";
import { useEffect, useState } from "react";
import FormCurrentLocation from "./components/current-location/Index";
import Map from "./components/map";
import { Navbar } from "../../components/navbar";

function CreateAddress(){

    const [formCurrentLocation, setFormCurrentLocation] = useState(false)
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    
    useEffect (() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude)
        })
    }, [])

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
                    <Box 
                    className="map"
                    width={'100%'}
                    height={'474px'}
                    bg={'green.100'}
                    marginBottom={'33px'}>
                        <Map lat={latitude} lng={longitude}/>
                    </Box>
                    <Text fontSize={'16px'}
                    fontWeight={'700'}
                    color={'brand.grey350'}
                    mb={'24px'}>
                        CONTACT
                    </Text>
                    {formCurrentLocation ? <FormCurrentLocation lat={latitude} lng={longitude}/> : <FormCreateAddress/>}
                </Box>
            </Box>
            <Footer/>
        </Box>
    )
}

export default CreateAddress