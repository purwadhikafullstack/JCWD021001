import {
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  Spacer,
  Center,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Select,
  Avatar,
  AspectRatio,
} from '@chakra-ui/react'
// edit by andri
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from '@chakra-ui/react'
//
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  BellIcon,
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import pure from '/logo/pure.png'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchModal } from './components/search-modal'
import { SearchMenu } from './components/search-menu'
import AvatarNavbar from './components/avatar-menu'
import { useCart } from '../cart-table/service/cartContext'
import NotificationBox from './components/notification-box'
import ShoppingCartBox from './components/shopping-cart-box'

export const Navbar = (props) => {
  const user = useSelector((state) => state.AuthReducer.user)
  console.log('ini', user)
  const isLogin = useSelector((state) => state.AuthReducer.isLogin)
  const location = useLocation()
  const isDashboardPage = location.pathname.includes('dashboard')
  const navigate = useNavigate()
  // edit by andri
  const { cartData, cartCount } = useCart()

  return (
    <Box p={'1em 2em'} bg={'white'} maxW={'100vw'} boxShadow={'md'}>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={'2em'}>
          <AspectRatio ratio={1} cursor={'pointer'} w={'3em'} onClick={() => navigate('/')}>
            <Image src={pure} alt="Pure Logo" />
          </AspectRatio>
          <Box display={{ base: 'none', md: 'block' }}>{!isDashboardPage && <SearchMenu />}</Box>
        </HStack>
        <Spacer />
        <HStack visibility={props?.collapseSideBar ? 'hidden' : 'visible'}>
          <HStack fontSize={'1.5em'} spacing={'.5em'}>
            {!isDashboardPage && <SearchModal />}
            <HStack fontSize={'1.5em'} spacing={'.5em'} position="relative">
              <Box>
                {!isDashboardPage && <ShoppingCartBox cartData={cartData} cartCount={cartCount} />}
              </Box>
            </HStack>
            <HStack fontSize={'1.5em'} spacing={'.5em'} position="relative">
              <Box>
                <NotificationBox />
              </Box>
            </HStack>
            {/* <Icon as={ShoppingCartIcon} /> */}
            {/* <Icon as={BellIcon} /> */}
          </HStack>
          <Center height="2em">
            <Divider orientation="vertical" borderWidth={'1px'} />
          </Center>
          <Box>
            <Box display={{ base: 'block', md: 'none' }}>
              {isLogin ? (
                <Flex w={'48px'} h={'48px'} borderRadius={'full'} ml={'24px'}>
                  <AvatarNavbar />
                </Flex>
              ) : (
                <Menu autoSelect={false}>
                  <MenuButton
                    bgColor={'transparent'}
                    _active={{ bgColor: 'transparent' }}
                    _hover={{ bgColor: 'transparent' }}
                    w={'5em'}
                  >
                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                      <Text fontWeight={'bold'}>Sign In</Text>
                      <Icon as={ChevronDownIcon} />
                    </Flex>
                  </MenuButton>
                  <MenuList mt={'1.5em'} minW={'0'} zIndex={'99'}>
                    <MenuItem
                      fontWeight={'bold'}
                      _hover={{ bg: 'none', color: '#CD0244' }}
                      _active={{ bg: 'none', color: '#CD0244' }}
                      gap={'12px'}
                      onClick={() => navigate('/signin', { state: { from: location } })}
                    >
                      Sign In
                    </MenuItem>
                    <MenuItem
                      fontWeight={'bold'}
                      _hover={{ bg: 'none', color: '#CD0244' }}
                      _active={{ bg: 'none', color: '#CD0244' }}
                      gap={'12px'}
                      onClick={() => navigate('/signup')}
                    >
                      Sign Up
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Box>

            <Box display={{ base: 'none', md: 'block' }}>
              {isLogin ? (
                <Flex w={'48px'} h={'48px'} borderRadius={'full'} ml={'24px'}>
                  <AvatarNavbar />
                </Flex>
              ) : (
                <HStack>
                  <Button
                    color="#CD0244"
                    borderColor={'#CD0244'}
                    variant={'outline'}
                    width={'5.5em'}
                    _hover={{
                      fontWeight: 'bold',
                    }}
                    onClick={() => navigate('/signup')}
                  >
                    Sign Up
                  </Button>
                  <Button
                    color="white"
                    bg={'redPure.600'}
                    width={'5.5em'}
                    _hover={{
                      fontWeight: 'bold',
                    }}
                    onClick={() => navigate('/signin', { state: { from: location } })}
                  >
                    Sign In
                  </Button>
                </HStack>
              )}
            </Box>
          </Box>
        </HStack>
        <Box display={props?.collapseSideBar ? 'block' : 'none'}>
          <Flex justifyContent={'center'} alignItems={'center'}>
            <Icon as={XMarkIcon} fontSize={'1.3em'} onClick={() => props?.toggleSideBar()} />
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
