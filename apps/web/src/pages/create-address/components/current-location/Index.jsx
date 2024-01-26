import { Box, Button, Flex, Grid, Input, Select, Text, Textarea } from "@chakra-ui/react";
import { getCity, getProvince } from "../../services/readUserAddress";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUserAddress } from "../../services/createUserAddress";

function FormCurrentLocation ({ address, lat, lng }) {
    const [selectedCity, setSelectedCity] = useState('')
    const [citylist, setCityList] = useState([])
    const [provinceList, setProvinceList] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("")
    const navigate = useNavigate()
    const user = useSelector((state) => state.AuthReducer.user);

    useEffect(() => {
        if (address && address.city) {
            setSelectedProvince(address.city.provinceId);
            setSelectedCity(address.city.id);
        }

        const fetchProvinceData = async () => {
            try {
                const data = await getProvince();
                setProvinceList(data);
            } catch (error) {
                console.error("Error fetching province data:", error);
            }
        };
        fetchProvinceData();

        const fetchCityData = async () => {
            if (address?.city?.provinceId) {
                try {
                    const cityData = await getCity(address.city.provinceId);
                    setCityList(cityData);
                } catch (error) {
                    console.error("Error fetching city data:", error);
                }
            }
        };
        fetchCityData();
    }, [address]);
    
    console.log("ini lat form", lat, "ini lng form", lng);
    const formik = useFormik({
        initialValues:{
            specificAddress:"", cityId: null, fullName:"", phoneNumber:"", postalCode: "",
        },
        onSubmit: async (values, {resetForm}) => {
            try{
                console.log("Formik Submission Values:", values);
                await createUserAddress(user.id, values.specificAddress, values.cityId, values.fullName, values.phoneNumber, values.postalCode, lat, lng);    
                navigate('/manage-address')
            } catch (err){
                console.log(err.message);
            }
            resetForm({values:
                {specificAddress:"", cityId: null, fullName:"", phoneNumber:"", postalCode: "",
                }})
        }
    })

    useEffect(() => {
        if (address) {
            formik.setFieldValue('specificAddress', `${address.address.road}, ${address.address.village}, ${address.address.municipality}`);
            formik.setFieldValue('postalCode', `${address.address.postcode}`);
            formik.setFieldValue('cityId', `${address.city.id}`)
        }
    }, [address, formik.setFieldValue]);


    return (
        <>
            <form onSubmit={formik.handleSubmit}>
            <Grid width={'100%'}
                gap={'68px'}
                gridTemplateColumns={'1fr 1fr'}>
                    <Box>
                        <Text fontSize={'16px'}
                        fontWeight={'700'}
                        color={'brand.grey350'}
                        mb={'8px'}>
                            Full Name
                        </Text>
                            <Input
                            name="fullName"
                            placeholder="Type your full name here"
                            _placeholder={{color: 'brand.grey350'}}
                            bg={'brand.grey100'}
                            variant={'filled'}
                            mb={'32px'}
                            value={formik.values.fullName}
                            onChange={formik.handleChange}/>
                    </Box>
                    <Box>  
                            <Text fontSize={'16px'}
                            fontWeight={'700'}
                            color={'brand.grey350'}
                            mb={'8px'}>
                                Mobile Phone
                            </Text>
                            <Input
                            placeholder="Type your mobile phone number here"
                            _placeholder={{color: 'brand.grey350'}}
                            bg={'brand.grey100'}
                            variant={'filled'} 
                            mb={'24px'}
                            name="phoneNumber"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}/>       
                    </Box>
                </Grid>
                <Text 
                fontSize={'16px'}
                fontWeight={'700'}
                color={'brand.grey350'}
                mb={'24px'}>
                    ADDRESS
                </Text>
                <Grid width={'100%'}
                gap={'68px'}
                gridTemplateColumns={'1fr 1fr'}>
                    <Box>
                        
                            <Text fontSize={'16px'}
                            fontWeight={'700'}
                            color={'brand.grey350'}
                            mb={'8px'}>
                                Province
                            </Text>
                            <Select
                            placeholder="Select a Province"
                            bg={'brand.grey100'}
                            variant={'filled'} 
                            color={'brand.grey350'}
                            mb={'24px'}
                            value={selectedProvince}
                            onChange={(e) => setSelectedProvince(e.target.value)}>
                                {provinceList?.map((province) => (
                                    <option key={province.id} value={province.id}>
                                        {province.name}
                                    </option>
                                ))}
                            </Select>
                            <Text fontSize={'16px'}
                            fontWeight={'700'}
                            color={'brand.grey350'}
                            mb={'8px'}>
                                City
                            </Text>
                            <Select 
                            value={selectedCity}
                            placeholder="Select a City"
                            bg={'brand.grey100'}
                            color={'brand.grey350'}
                            variant={'filled'} 
                            mb={'24px'}
                            name="cityId"
                            onChange={(e) => {
                                setSelectedCity(e.target.value);
                                formik.handleChange(e);
                            }}>
                                {citylist?.map((city) => (
                                    <option key={city.id} 
                                    value={city.id}
                                    >
                                        {city.name}
                                    </option>
                                ))}
                            </Select>
                            <Text fontSize={'16px'}
                            fontWeight={'700'}
                            color={'brand.grey350'}
                            mb={'8px'}>
                                Postal Code
                            </Text>
                            <Input
                            placeholder="Type a postal code"
                            _placeholder={{color: 'brand.grey350'}}
                            bg={'brand.grey100'}
                            variant={'filled'} 
                            mb={'24px'}
                            name="postalCode"
                            value={formik.values.postalCode}
                            onChange={formik.handleChange}/>
                    </Box>
                    <Box>   
                            <Text fontSize={'16px'}
                            fontWeight={'700'}
                            color={'brand.grey350'}
                            mb={'8px'}>
                                Address (Ex : Street, Residence, number of house)
                            </Text>
                            <Textarea placeholder="Type your address"
                            name="specificAddress"
                            _placeholder={{color: 'brand.grey350'}}
                            bg={'brand.grey100'}
                            variant={'filled'} 
                            h={'210px'}
                            value={formik.values.specificAddress}
                            onChange={formik.handleChange}/>
                    </Box>
                </Grid>
                <Flex justifyContent={'flex-end'}
                mt={'40px'}
                gap={'16px'}>
                    <Button 
                    width={'168px'}
                    padding={'12px 16px'}
                    bgColor={'white'}
                    color={'brand.lightred'}
                    variant={'outline'}
                    borderColor={'brand.lightred'}
                    _hover={{borderColor: '#f50f5a', color: '#f50f5a'}} 
                    _active={{opacity:'70%'}}
                    onClick={() => navigate("/manage-address")}
                    >
                        Cancel
                    </Button>
                    <Button type="sumbit"
                    width={'168px'}
                    padding={'12px 16px'}
                    bgColor={'brand.lightred'}
                    color={'white'}
                    _hover={{bg: '#f50f5a'}} 
                    _active={{opacity:'70%'}}
                    >
                        Create
                    </Button>
                </Flex>
            </form>
        </>
    )
}

export default FormCurrentLocation