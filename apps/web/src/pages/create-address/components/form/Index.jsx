import { Box, Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import { getCity, getProvince } from "../../services/readUserAddress";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { createUserAddress } from "../../services/createUserAddress";


function FormCreateAddress () {
    const [provinceList, setProvinceList] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("")
    const [citylist, setCityList] = useState([])
    const [selectedCity, setSelectedCity] = useState("")

    const user = useSelector((state) => state.AuthReducer.user);


    useEffect(() => {
        getProvince().then((data) => {
            setProvinceList(data);
            console.log(data)
        });
    }, []);


    useEffect(() => {
        if (selectedProvince !== "") {
            getCity(selectedProvince).then((data) => {
                setCityList(data);
                console.log(data);
            });
        }
    }, [selectedProvince]);

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
                        <Button type="sumbit">Simpan</Button>
                </Flex>
            </form>
        </>
    )
}

export default FormCreateAddress