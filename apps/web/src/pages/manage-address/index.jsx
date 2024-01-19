import { Box, Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import Navbar from "../../components/Navbar/Navbar";
import { BreadCrumbs } from "./components/breadcrumbs";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import MainAddress from "./components/main-address";

function ManageAddress(){

  
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
                    fontWeight={'700'}>Manage Address</Text>
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
                   <MainAddress/>
                </Box>
            </Box>
            <Footer/>
        </Box>
    )
}

export default ManageAddress