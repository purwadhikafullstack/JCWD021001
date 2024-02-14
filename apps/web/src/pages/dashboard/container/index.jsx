import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { Body } from '../components/body'
import { Sidebar } from '../components/sidebar'
import { useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navbar } from '../../../components/Navbar'

export const Dashboard = () => {
  const user = useSelector((state) => state.AuthReducer.user)
  const { destination, createProduct } = useParams()
  const [collapseSideBar, setCollapseSideBar] = useState(false)
  const toggleSideBar = () => {
    setCollapseSideBar(!collapseSideBar)
  }

  // Super Admin Checking
  const isSuperAdmin = useSelector((state) => state.AuthReducer.isSuperAdmin)

  return (
    <Box maxW={'100vw'} minH={'100vh'} overflow={'hidden'}>
      <Navbar />
      <Box display={{ lg: 'flex' }} w={'100%'}>
        <Box display={{ lg: 'flex' }}>
          <Sidebar
            collapseSideBar={collapseSideBar}
            setCollapseSideBar={setCollapseSideBar}
            toggleSideBar={toggleSideBar}
            isSuperAdmin={isSuperAdmin}
          />
        </Box>
        <Box w={'100%'} h={'auto'} display={collapseSideBar ? 'none' : 'block'}>
          <Body
            user={user}
            isSuperAdmin={isSuperAdmin}
            destination={destination}
            createProduct={createProduct}
            collapseSideBar={collapseSideBar} // responsive
          />
        </Box>
      </Box>
      <Flex
        zIndex={'3'}
        bgColor={'white'}
        position={'fixed'}
        top={'50%'}
        transform={'translateY(50%)'}
        w={'1.8em'}
        h={'1.8em'}
        alignItems={'center'}
        justifyContent={'center'}
        borderRadius={'50%'}
        left={'-.5em'}
        visibility={{
          base: collapseSideBar ? 'hidden' : 'visible',
          lg: 'hidden',
        }}
        cursor={'pointer'}
      >
        <Icon as={ChevronRightIcon} onClick={() => toggleSideBar()} />
      </Flex>
    </Box>
  )
}
