import { Box, Flex, Icon, Text, VStack } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export const SideBar = (props) => {
  return (
    <Box
      position={'relative'}
      p={'1em'}
      bgColor={'white'}
      w={'100%'}
      h={'100vh'}
      zIndex={'2'}
      top={'0'}
      display={props?.collapseSideBar ? 'block' : 'none'}
    >
      <VStack align={'stretch'}>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Text>Tops</Text>
          <Icon as={ChevronDownIcon} />
        </Flex>
        <Flex
          alignItems={'center'}
          w={'6.5em'}
          justifyContent={'space-between'}
          onClick={() => props?.toggleSideBar()}
        >
          <Flex
            bgColor={'white'}
            w={'1.8em'}
            h={'1.8em'}
            alignItems={'center'}
            justifyContent={'center'}
            borderRadius={'50%'}
            shadow={'md'}
          >
            <Icon as={ChevronLeftIcon} />
          </Flex>
          <Text>Collapse</Text>
        </Flex>
      </VStack>
    </Box>
  );
};
