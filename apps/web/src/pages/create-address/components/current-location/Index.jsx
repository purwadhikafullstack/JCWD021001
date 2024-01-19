import { Box, Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import { getCity, getProvince } from "../../services/readUserAddress";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { createUserAddress } from "../../services/createUserAddress";
import { findOpenCageAndCity } from "../../services/readUserAddress";


function FormCurrentLocation () {
 
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [address, setAddress] = useState('')
    const [selectedCity, setSelectedCity] = useState('')
    const [citylist, setCityList] = useState([])
    const [provinceList, setProvinceList] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("")

    const user = useSelector((state) => state.AuthReducer.user);

    useEffect (() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude)
        })
    }, [])


    useEffect(() => {
        if (latitude && longitude ) {
            const fetchData = async () => {
                try {
                    const address = await findOpenCageAndCity(latitude, longitude);
                    setAddress(address);
                    setSelectedProvince(address.city.provinceId)
                } catch (error) {
                    console.error("Error fetching address:", error);
                }
            };
            fetchData(latitude, longitude);
        }
    }, [latitude, longitude]);

    useEffect(() => {
        const fetchCityData = async () => {
            if (selectedProvince) {
                try {
                    const cityData = await getCity(selectedProvince);
                    setCityList(cityData);
                    if (selectedProvince) {
                        setSelectedCity(address.city.id);
                    }
                } catch (error) {
                    console.error("Error fetching city data:", error);
                }
            }
        };
    
        fetchCityData();
    }, [selectedProvince, address]);

    useEffect(() => {
        const fetchProvinceData = async () => {
            try {
                const data = await getProvince();
                setProvinceList(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching province data:", error);
            }
        };
    
        fetchProvinceData();
    }, []);

    
    const formik = useFormik({
        
        initialValues:{
            specificAddress:"", 
            cityId: "", 
            fullName:"", 
            phoneNumber:""
        },
        onSubmit: async (values, {resetForm}) => {
            try{
                console.log("Formik Submission Values:", values);
                await createUserAddress(user.id, values.specificAddress, values.cityId, values.fullName, values.phoneNumber);    
            } catch (err){
                console.log(err.message);
            }
            resetForm({values:
                {specificAddress:"", 
                cityId: "", 
                fullName:"", 
                phoneNumber:"",
                }})
        }
    })

    useEffect(() => {
        if (address) {
            formik.setFieldValue('specificAddress', `${address.address.road}, ${address.address.village}, ${address.address.municipality}, ${address.address.postcode}`);
        }
    }, [address, formik.setFieldValue]);

    
     

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Flex>
                    <Box>  
                        <Text>Full Name</Text>
                            <Input
                            name="fullName"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}/>
                            <Text>ADDRESS</Text>
                            <Text>Province</Text>
                            <Select value={selectedProvince}
                                    onChange={(e) => setSelectedProvince(e.target.value)}>
                                <option value="">Select a Province</option>
                                {provinceList?.map((province) => (
                                    <option key={province.id} value={province.id}>
                                        {province.name}
                                    </option>
                                ))}
                            </Select>
                            <Text>City</Text>
                            <Select 
                            value={selectedCity}
                            name="cityId"
                            onChange={(e) => {
                                setSelectedCity(e.target.value);
                                formik.handleChange(e);
                            }}>
                                <option value="">Select a city</option>
                                {citylist?.map((city) => (
                                    <option key={city.id} 
                                    value={city.id}
                                    >
                                        {city.name}
                                    </option>
                                ))}
                            </Select>
                    </Box>
                    <Box>
                        <Text>Phone Number</Text>
                        <Input
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}/>
                        <Text>Address (Ex : Street, Residence, number of house)</Text>
                        <Input name="specificAddress"
                        value={formik.values.specificAddress}
                        onChange={formik.handleChange}/>
                    </Box>
                    <Button type="submit">Simpan</Button>
                </Flex>
            </form>
        </>
    )
}

export default FormCurrentLocation