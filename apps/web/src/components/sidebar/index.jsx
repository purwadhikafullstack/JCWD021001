import { Box, Flex, Icon, Text, VStack } from '@chakra-ui/react';
import {
  ChevronLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export const SideBar = (props) => {
  const [toggleType, setToggleType] = useState(false);
  const renderedCategories = props?.productCategories?.map(
    (productCategory, index) => {
      return (
        <VStack align={'stretch'} key={index}>
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            onClick={() => setToggleType(!toggleType)}
          >
            <Text>{productCategory?.name}</Text>
            <Icon as={toggleType ? ChevronUpIcon : ChevronDownIcon} />
          </Flex>
          <Box
            borderLeft={'2px solid lightgray'}
            p={'0 1em'}
            display={toggleType ? 'block' : 'none'}
          >
            {productCategory?.type
              ? productCategory?.type?.map((type, index) => {
                  return <Text key={index}>{type.name}</Text>;
                })
              : null}
          </Box>
        </VStack>
      );
    },
  );
  return (
    <Box
      position={'relative'}
      bgColor={'white'}
      p={'1em'}
      m={{ base: '0', md: '0 0 -1em -1em' }}
      w={{ base: '100%', md: '15em' }}
      borderEndRadius={{ base: 'none', md: '1em' }}
      h={'100vh'}
      zIndex={'2'}
      top={'0'}
    >
      <VStack align={'stretch'}>
        <Text color={'redPure.500'}>All Women</Text>
        {renderedCategories}
        <Flex
          alignItems={'center'}
          w={'6.5em'}
          justifyContent={'space-between'}
          onClick={() => props?.toggleSideBar()}
          cursor={'pointer'}
          display={{ base: 'flex', md: 'none' }}
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
