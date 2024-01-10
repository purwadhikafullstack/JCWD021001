import { Box, Button, Flex, Grid, GridItem, Icon, Image, Input, InputGroup, InputRightElement, Text} from '@chakra-ui/react'
import logo from '../../assets/images/logo.png'
import { MagnifyingGlassIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { color } from 'framer-motion'
function Footer (){

    return (
        <Box className='footer-container' padding={'45.5'} bg={'white'}>
            <Grid gridTemplateColumns={'1fr 1fr 1fr'} gap={'5'}>
                <GridItem w={'100%'}>
                    <Image src={logo} boxSize={'43px'} alt='logo-pure'/>
                    <Text fontWeight={'600'} fontSize={'20px'} mt={'20px'}>Simplicity in every stitch</Text>
                    <Flex mt={'170px'} gap={'4'} alignItems={'center'}>
                        <Text fontSize={'24px'}>©</Text>
                        <Text fontWeight={'400'} fontSize={'16px'}>2023 Pure, All rights reserved.</Text>
                    </Flex>
                </GridItem>
                <GridItem w={'100%'}>
                    <Flex flexDir={'column'} gap={'24px'} fontSize='20px' fontWeight='700' color={'brand.grey300'} >
                        <Link>Home</Link>
                        <Link>Category</Link>
                        <Link>Cart</Link>
                        <Link>Favourite</Link>
                        <Link>My Profile</Link>
                    </Flex>
                </GridItem>
                <GridItem w={'100%'}>
                    <Text fontSize='20px' fontWeight='700' mb={'24px'}>Join our newsletter</Text>
                    <Text fontSize='20px' fontWeight='400' mb={'28px'} color={'brand.grey300'}>We will send you our update collection and special price informations.</Text>
                    <Flex gap={'14px'}>
                        <Input maxW={'322px'} height={'56px'} bg={'#ECECEC'} placeholder='Type your email here' _placeholder={{color: '#707070', fontSize:'20px'}} borderRadius={'12px'}/>
                        <Button color='white' bg={'brand.lightred'} padding={'14px'} maxW={'120px'} height={'55px'} borderRadius={'16px'}
                        _hover={{
                        opacity: '80%'
                        }}
                        _active={{
                        opacity: '50%'
                        }} 
                        fontSize={'20px'}
                        fontWeight={'700'}
                        >Subscribe</Button>
                    </Flex>
                    
                </GridItem>
            </Grid>
        </Box>
    )
}

export default Footer