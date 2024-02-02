import { Box, Flex, Text } from "@chakra-ui/react"
import { SearchAdmin } from "./components/search"
import FilterAdmin from "./components/filter"
import CreateUser from "./components/modal-create"
import { BreadCrumbs } from "./components/breadcrumbs"
import { Navbar } from "../../components/navbar"
import TableAdmin from "./components/table-admin"
import { getAdminList } from "./services/getAdminList"
import { useEffect, useState } from "react"


function AdminList () {

    const [admin, setAdmin] = useState([])

    
        const fetchAdmin = async () => {
            try {
                const fetchAdminData = await getAdminList()
                setAdmin(fetchAdminData)
            } catch (err){
                console.log(err);
            }
        }
    
    useEffect(() => {    
        fetchAdmin()
    }, [])

    return (
        <Box bg={'#F1F1F1'} height={'100%'}>
            <Navbar/>
            <Box padding={'0px 100px'}
             marginBottom={'150px'}>
                <Box className="top-dashboard"
                mt={'36px'}
                mb={'24px'}>
                    <Flex justifyContent={'space-between'}>
                        <Flex>
                            <Text fontSize={'24px'}
                            fontWeight={'700'}>
                                Admin List
                            </Text>
                        </Flex>
                        <Flex justifyContent={'flex-end'}
                        gap={'12px'}>
                            <SearchAdmin/>
                            <FilterAdmin/>
                            <CreateUser/>
                        </Flex>
                    </Flex>
                    <Flex>
                        <BreadCrumbs/>
                    </Flex>
                </Box>
                <Box className="table">
                    <TableAdmin admin={admin}
                    onAdminUpdated={fetchAdmin} />
                </Box>
            </Box>
        </Box>
    )
}

export default AdminList