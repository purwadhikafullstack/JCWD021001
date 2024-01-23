import { Box, Button, Flex, Icon, Input, Select, Text } from "@chakra-ui/react";
import { BreadCrumbs } from "./components/breadcrumbs";
import Footer from "../../components/Footer/Footer";
import { PlusIcon } from '@heroicons/react/24/outline'
import AddressList from "./components/address-list";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/navbar";

function ManageAddress(){
 const navigate = useNavigate()
  
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
                    <Flex justifyContent={'space-between'}
                    alignItems={'center'}>
                        <BreadCrumbs/>
                        <Button bg={'brand.lightred'}
                        color={'white'}
                        _hover={{bg: '#f50f5a'}} 
                        _active={{opacity:'70%'}}
                        onClick={() => navigate("/create-address")}>
                            <Flex justifyContent={'center'}
                            alignItems={'center'}
                            padding={'12px 16px'}
                            gap={'10px'}>
                                <Icon as={PlusIcon} boxSize={'24px'}/>
                                <Text fontSize={'14px'} fontWeight={'700'}>
                                    Create Address
                                </Text>
                            </Flex>
                        </Button>
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
                   <AddressList/>
                </Box>
            </Box>
            <Footer/>
        </Box>
    )
}

export default ManageAddress