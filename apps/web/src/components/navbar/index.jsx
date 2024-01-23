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
} from '@chakra-ui/react';
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  BellIcon,
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import pure from '/logo/pure.png';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Navbar = (props) => {
  const user= useSelector((state) => state.AuthReducer.user);
  const isLogin= useSelector((state) => state.AuthReducer.isLogin);
  const navigate = useNavigate()
  return (
    <Box p={'1em 2em'}
    bg={'white'}
    h={'82px'}>
      <Box>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={'2em'}>
            <Box h={'auto'} w={'3em'}>
              <Image src={pure} alt="Logo" />
            </Box>
            <Box display={{ base: 'none', md: 'block' }}>
              <InputGroup>
                <Input
                  variant={'outline'}
                  focusBorderColor={'lightgray'}
                  placeholder={'Search a product here'}
                />
                <InputRightElement>
                  <Icon as={MagnifyingGlassIcon} />
                </InputRightElement>
              </InputGroup>
            </Box>
          </HStack>
          <Spacer />
          <HStack visibility={props?.collapseSideBar ? 'hidden' : 'visible'}>
            <HStack fontSize={'1.5em'} spacing={'.5em'}>
              <Icon
                as={MagnifyingGlassIcon}
                display={{ base: 'block', md: 'none' }}
              />
              <Icon as={ShoppingCartIcon} />
              <Icon as={BellIcon} />
            </HStack>
            <Center height="2em">
              <Divider orientation="vertical" borderWidth={'1px'} />
            </Center>
            <Box>
              <Box display={{ base: 'block', md: 'none' }}>
                <Menu autoSelect={false}>
                  <MenuButton
                    bgColor={'transparent'}
                    _active={{ bgColor: 'transparent' }}
                    _hover={{ bgColor: 'transparent' }}
                    w={'5em'}
                  >
                    <Flex
                      alignItems={'center'}
                      justifyContent={'space-between'}
                    >
                      <Text fontWeight={'bold'}>Sign In</Text>
                      <Icon as={ChevronDownIcon} />
                    </Flex>
                  </MenuButton>
                  <MenuList mt={'1.5em'} minW={'0'} pr={'2em'}>
                    <MenuItem as={'a'} href={'#'} fontWeight={'bold'}>
                      Sign In
                    </MenuItem>
                    <MenuItem as={'a'} href={'#'} fontWeight={'bold'}>
                      Sign Up
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>

              <Box display={{ base: 'none', md: 'block' }}>
              {isLogin ? (
              <Flex w={'48px'}
                h={'48px'}
                borderRadius={'full'}
                ml={'24px'}>
                  {user?.avatar ? (
                  <Avatar
                    name={user?.fullName}
                    src={`${import.meta.env.VITE_APP_IMAGE_URL}/api/avatar/${
                      user?.avatar
                    }`}
                    w={"48px"}
                    h={"48px"}
                  />
                ) : (
                  <Avatar
                    name={user?.fullName}
                    bg="rgba(40, 96, 67, 1)"
                    src={"https://bit.ly/broken-link"}
                    w={"48px"}
                    h={"48px"}
                    color={"white"}
                  />
                )}
                </Flex>
              ) : (
                <HStack>
                  <Button
                    color="brand.lightred"
                    borderColor={'brand.lightred'}
                    variant={'outline'}
                    width={'5.5em'}
                    _hover={{
                      fontWeight: 'bold',
                    }}
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </Button>
                  <Button
                    color="white"
                    bg={'brand.lightred'}
                    width={'5.5em'}
                    _hover={{
                      fontWeight: 'bold',
                    }}
                    onClick={() => navigate("/signin")}
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
              <Icon
                as={XMarkIcon}
                fontSize={'1.3em'}
                onClick={() => props?.toggleSideBar()}
              />
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
