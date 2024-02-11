import { Box, Button, Flex, Heading, Input, Select, Text } from "@chakra-ui/react";
import { BreadCrumbs } from "./components/breadcrumbs";
import Footer from "../../components/Footer/Footer";
import FormCreateAddress from "./components/form/Index";
import { useEffect, useState } from "react";
import FormCurrentLocation from "./components/current-location/Index";
import Map from "./components/map";
import { Navbar } from "../../components/navbar";
import { findOpenCageAndCity } from "./services/readUserAddress";
import ModalMapAddressEntry from "./components/modal";

function CreateAddress(){

    const [formCurrentLocation, setFormCurrentLocation] = useState(false)
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [address, setAddress] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('');
    const [marker, setMarker] = useState(false)
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    
    useEffect (() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude)
        })
    }, [])

    console.log("ini latitude", latitude, "ini longitude", longitude, "ini address", address, "ini lat", lat, "ini lng", lng)

    useEffect(() => {
        const fetchAddress = async () => {
          if (latitude && longitude) {
            try {
              const fetchedAddress = await findOpenCageAndCity(latitude, longitude);
              setAddress(fetchedAddress);
            } catch (error) {
              console.error("Error fetching address:", error);
            }
          }
        };
    
        fetchAddress();
      }, [latitude, longitude]);

    const handleClick = async () => {
        try {
            setFormCurrentLocation(true)
            setSelectedAddress('')
            setMarker(true)
        } catch (error) {
            console.error("Error fetching address:", error);
        }
    };

    return (
        <Box bg={'#F1F1F1'}
        height={'100%'}
        maxW={'100vw'}>
            <Navbar/>
            <Box padding={{base: '0px 10px', md:'0px 100px'}}
             marginBottom={'150px'}>
                <ModalMapAddressEntry/>
                <Flex className="create-address-top"
                flexDir={'column'}
                gap={'16px'}
                marginTop={'24px'}
                marginBottom={'40px'}>
                    <Heading fontSize={{base: '16px', md:'24px'}}
                    fontWeight={'700'}>Create Address</Heading>
                    <Flex>
                        <BreadCrumbs/>
                    </Flex>
                </Flex>
                <Box width={'100%'}
                bg={'white'} 
                padding={'24px'}
                mb={'40px'}>
                    <Text fontSize={{base: '16px', md:'24px'}}
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
                        <Text fontSize={{base: '13px', md: '16px'}}>
                        Use your current location
                        </Text>
                    </Button>
                    <Box 
                    className="map"
                    width={'100%'}
                    height={'474px'}
                    bg={'green.100'}
                    marginBottom={'33px'}>
                        <Map lat={latitude} lng={longitude} 
                        setSelectedAddress={setSelectedAddress} 
                        setFormCurrentLocation={setFormCurrentLocation} 
                        marker={marker}
                        setMarker={setMarker}
                        setLat={setLat}
                        setLng={setLng}
                        />
                    </Box>
                    <Text fontSize={'16px'}
                    fontWeight={'700'}
                    color={'brand.grey350'}
                    mb={'24px'}>
                        CONTACT
                    </Text>
                    {formCurrentLocation ? 
                        <FormCurrentLocation 
                        address={selectedAddress || address} 
                        lat={lat || latitude} 
                        lng={lng || longitude}/> 
                    : 
                        <FormCreateAddress/>}
                </Box>
            </Box>
            <Footer/>
        </Box>
    )
}

export default CreateAddress