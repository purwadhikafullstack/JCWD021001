import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FormCreateWarehouse from "./form/Index";
import { findOpenCageAndCity } from "../../services/getWarehouseList";
import MapWarehouse from "./map";
import ModalNotif from "./modal";
import { useLocation} from "react-router-dom";
import { BreadCrumbsEditWarehouse } from "./breadcrumbs";
import Footer from "../../../../components/Footer/Footer";
import { Navbar } from "../../../../components/Navbar";

function EditWarehousePage(){

    const location = useLocation()
    const {warehouse} = location.state
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


    return (
        <Box bg={'#F1F1F1'}
        height={'100%'}
        overflowX={'hidden'}>
            <Navbar/>
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
                    <Box 
                    className="map"
                    width={'100%'}
                    height={'474px'}
                    bg={'green.100'}
                    marginBottom={'33px'}>
                        <MapWarehouse lat={latitude} lng={longitude} 
                        setSelectedAddress={setSelectedAddress} 
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
                        <FormCreateWarehouse 
                        warehouse={warehouse}
                        address={selectedAddress || address} 
                        lat={lat || latitude} 
                        lng={lng || longitude}/> 
                </Box>
            </Box>
            <Footer/>
        </Box>
    )
}

export default EditWarehousePage