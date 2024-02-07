import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react'
import logo from '../../assets/images/logo.png'
import { MagnifyingGlassIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { color } from 'framer-motion'
function Footer() {
  return (
    <Box className="footer-container" padding={'45.5'} bg={'white'}>
      <Flex gap={'5'} flexWrap={'wrap'} justifyContent={'space-between'}>
        <Flex
          w={'400px'}
          flexDir={'column'}
          alignItems={{ base: 'center', md: 'flex-start' }}
          mb={{ base: '40px', md: '0' }}
        >
          <Image src={logo} boxSize={'43px'} alt="logo-pure" />
          <Text fontWeight={'600'} fontSize={{ base: '12px', md: '20px' }} mt={'20px'}>
            Simplicity in every stitch
          </Text>
          <Flex
            mt={'170px'}
            gap={'4'}
            alignItems={'center'}
            display={{ base: 'none', md: 'block' }}
          >
            <Text fontSize={'24px'}>©</Text>
            <Text fontWeight={'400'} fontSize={'16px'}>
              2023 Pure, All rights reserved.
            </Text>
          </Flex>
        </Flex>
        <Flex w={'400px'} justify={{ base: 'center', md: 'flex-start' }}>
          <Flex
            flexDir={'column'}
            gap={{ base: '14px', md: '24px' }}
            mb={{ base: '40px', md: '0' }}
            alignItems={{ base: 'center', md: 'flex-start' }}
            fontSize={{ base: '12px', md: '20px' }}
            fontWeight="700"
            color={'brand.grey300'}
          >
            <Link>Home</Link>
            <Link>Category</Link>
            <Link>Cart</Link>
            <Link>Favourite</Link>
            <Link>My Profile</Link>
          </Flex>
        </Flex>
        <Flex w={'500px'} flexDir={'column'}
        alignItems={{ base: 'center', md: 'flex-start' }}>
          <Text fontSize={{ base: '12px', md: '20px' }} fontWeight="700" mb={'24px'} >
            Join our newsletter
          </Text>
          <Text fontSize={{ base: '12px', md: '20px' }} fontWeight="400" mb={'28px'} textAlign={{ base: 'center', md: 'left' }} color={'brand.grey300'}>
            We will send you our update collection and special price informations.
          </Text>
          <Flex gap={'14px'}>
            <Input
              maxW={'322px'}
              height={{base:'40px', md: '56px'}}
              bg={'#ECECEC'}
              placeholder="Type your email here"
            />
            <Button
              color="white"
              bg={'brand.lightred'}
              padding={'14px 14px'}
              w={{base: '120px', md:'200px'}}
            //   size={{base: 'xs', md: 'md'}}
            height={{base:'40px', md: '56px'}}
            //   borderRadius={'16px'}
              _hover={{
                opacity: '80%',
              }}
              _active={{
                opacity: '50%',
              }}
              fontSize={{ base: '12px', md: '20px' }}
              fontWeight={'700'}
            >
              Subscribe
            </Button>
          </Flex>
          <Flex
            mt={'40px'}
            gap={'4'}
            alignItems={'center'}
            display={{ base: 'block', md: 'none' }}
          >
            <Text fontWeight={'400'} fontSize={'12px'}>
            © 2023 Pure, All rights reserved.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Footer
