import { Box, Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FormCreateWarehouse from "./form/Index";
// import FormWarehouse from "./form-disabled/Index";
import { findOpenCageAndCity } from "../../services/getWarehouseList";
import MapWarehouse from "./map";
import ModalNotif from "./modal";
import FormInitialWarehouse from "./form-disabled/Index";
import { useLocation, useParams } from "react-router-dom";
import { BreadCrumbsEditWarehouse } from "./breadcrumbs";

function EditWarehousePage(){

    const location = useLocation()
    const {warehouse} = location.state
    console.log("ini harusnya data warehouse", warehouse);

    const [formCurrentLocation, setFormCurrentLocation] = useState(false)
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [address, setAddress] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('');
    const [marker, setMarker] = useState(false)
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    
    useEffect (() => {
        if (warehouse && warehouse.WarehouseAddress?.latitude){
            setLatitude(warehouse.WarehouseAddress.latitude)
            setLongitude(warehouse.WarehouseAddress.longitude)
        } else {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude)
        })}
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

    // const handleClick = async () => {
    //     try {
    //         setFormCurrentLocation(true)
    //         setSelectedAddress('')
    //         setMarker(true)
    //     } catch (error) {
    //         console.error("Error fetching address:", error);
    //     }
    // };

    return (
        <Box bg={'#F1F1F1'}
        height={'100%'}>
            {/* <Navbar/> */}
            <Box padding={'0px 100px'}
             marginBottom={'150px'}>
                <ModalNotif/>
                <Flex className="create-address-top"
                flexDir={'column'}
                gap={'16px'}
                marginTop={'24px'}
                marginBottom={'40px'}>
                    <Text fontSize={'24px'}
                    fontWeight={'700'}>Edit Warehouse</Text>
                    <Flex>
                        <BreadCrumbsEditWarehouse/>
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
                    {/* <Button color='brand.lightred' 
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
                    </Button> */}
                    <Box 
                    className="map"
                    width={'100%'}
                    height={'474px'}
                    bg={'green.100'}
                    marginBottom={'33px'}>
                        <MapWarehouse lat={latitude} lng={longitude} 
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
                    {/* {formCurrentLocation ?  */}
                        <FormCreateWarehouse 
                        warehouse={warehouse}
                        address={selectedAddress || address} 
                        lat={lat || latitude} 
                        lng={lng || longitude}/> 
                    {/* : 
                        <FormInitialWarehouse/>} */}
                </Box>
            </Box>
            {/* <Footer/> */}
        </Box>
    )
}

export default EditWarehousePage