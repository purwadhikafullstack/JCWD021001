import {
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  Spacer,
  Text,
  Center,
  Select,
} from '@chakra-ui/react';
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import pure from '/logo/pure.png';

function PutuNavbar() {
  return (
    <Box p={'.5em 1em'}>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Box h={'auto'} w={'3em'}>
          <Image src={pure} alt="Logo" />
        </Box>
        <Spacer />
        <HStack>
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
      </Flex>
    </Box>
  );
}

export default PutuNavbar;
