import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import logo from '../../assets/images/logo.png'
import { MagnifyingGlassIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline'
// import { useNavigate } from "react-router-dom";

function Navbar() {
  // const navigate = useNavigate();
  return (
    <Box bg={'white'}>
      <Flex
        className="navbar-top"
        padding={'6px'}
        // backgroundColor={'brand.lightred'}
        alignItems={'center'}
        // width={'1440px'}
        height={'82px'}
        justifyContent={'space-between'}
        boxShadow={'base'}
      >
        <Grid
          className="Navbar-left"
          gridTemplateColumns={'1fr auto'}
          gridGap={'29px'}
          padding={'16px'}
          alignItems={'center'}
        >
          <Image boxSize={'53.195px'} src={logo} alt="Logo" />
          <InputGroup>
            <Input
              height={'40px'}
              maxWidth={'443px'}
              placeholder="Search a product here"
              borderRadius="8px"
              border="1px solid #C7C7C7"
              background={'white'}
            />
            <InputRightElement>
              <Icon as={MagnifyingGlassIcon} color={'brand.grey300'} />
            </InputRightElement>
          </InputGroup>
        </Grid>
        <Flex
          className="Navbar-left"
          padding={'16px'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Grid
            gridGap={'36px'}
            padding={'16px'}
            gridTemplateColumns={'1fr 1fr'}
            borderRight={'1px solid #D3D0D0'}
          >
            <Icon as={ShoppingCartIcon} color={'brand.grey300'} boxSize={'24px'} />
            <Icon as={HeartIcon} color={'brand.grey300'} boxSize={'24px'} />
          </Grid>
          <Grid gridGap={'16px'} padding={'16px'} gridTemplateColumns={'1fr 1fr'}>
            <Button
              color="brand.lightred"
              borderColor={'brand.lightred'}
              variant={'outline'}
              width={'88px'}
              padding={'9px 11px'}
              _hover={{
                opacity: '80%',
              }}
              _active={{
                opacity: '50%',
              }}
              // onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
            <Button
              color="white"
              bg={'brand.lightred'}
              width={'88px'}
              padding={'9px 11px'}
              _hover={{
                opacity: '80%',
              }}
              _active={{
                opacity: '50%',
              }}
              // onClick={() => navigate("/signin")}
            >
              Sign In
            </Button>
          </Grid>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar
