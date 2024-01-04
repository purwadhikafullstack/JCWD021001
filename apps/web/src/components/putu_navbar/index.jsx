import {
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  Spacer,
  Center,
  Select,
} from '@chakra-ui/react';
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  BellIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import pure from '/logo/pure.png';

export const PutuNavbar = (props) => {
  return (
    <Box p={'.5em 1em'}>
      <Box>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Box h={'auto'} w={'3em'}>
            <Image src={pure} alt="Logo" />
          </Box>
          <Spacer />
          <HStack visibility={props?.collapseSideBar ? 'hidden' : 'visible'}>
            <HStack fontSize={'1.5em'} spacing={'.5em'}>
              <Icon as={MagnifyingGlassIcon} />
              <Icon as={ShoppingCartIcon} />
              <Icon as={BellIcon} />
            </HStack>
            <Center height="2em">
              <Divider orientation="vertical" borderWidth={'1px'} />
            </Center>
            <Select w={'5em'} variant={'unstyled'}>
              <option>Sign In</option>
            </Select>
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
