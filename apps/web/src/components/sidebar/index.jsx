import { Box, Flex, Icon, Text, VStack } from '@chakra-ui/react';
import {
  ChevronLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export const SideBar = (props) => {
  const [toggleType, setToggleType] = useState({});
  const changeToggleType = (id) => {
    setToggleType((set) => ({
      ...set,
      [id]: !set[id],
    }));
  };
  console.log('TOOGLE TYPE', toggleType);
  const renderedCategories = props?.productCategories?.map(
    (productCategory, index) => {
      return (
        <VStack align={'stretch'} key={index} spacing={'1.5em'}>
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            onClick={() => changeToggleType(productCategory?.id)}
          >
            <Text>{productCategory?.name}</Text>
            <Icon
              as={
                toggleType[productCategory?.id]
                  ? ChevronUpIcon
                  : ChevronDownIcon
              }
            />
          </Flex>
          <VStack
            borderLeft={'2px solid lightgray'}
            p={'0 1em'}
            display={toggleType[productCategory?.id] ? 'block' : 'none'}
          >
            {productCategory?.type
              ? productCategory?.type?.map((type, index, arr) => {
                  return (
                    <Text
                      key={index}
                      mb={index == arr.length - 1 ? '0' : '1.5em'}
                    >
                      {type.name}
                    </Text>
                  );
                })
              : null}
          </VStack>
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
      zIndex={'2'}
      top={'0'}
      minH={'100vh'}
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
