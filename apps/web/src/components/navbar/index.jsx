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
} from '@chakra-ui/react';
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  BellIcon,
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import pure from '/logo/pure.png';

export const Navbar = (props) => {
  return (
    <Box p={'.5em 1em'}>
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
                <HStack>
                  <Button
                    color="redPure.500"
                    borderColor={'redPure.500'}
                    variant={'outline'}
                    width={'5.5em'}
                    _hover={{
                      fontWeight: 'bold',
                    }}
                  >
                    Sign Up
                  </Button>
                  <Button
                    color="white"
                    bg={'redPure.500'}
                    width={'5.5em'}
                    _hover={{
                      fontWeight: 'bold',
                    }}
                  >
                    Sign In
                  </Button>
                </HStack>
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
