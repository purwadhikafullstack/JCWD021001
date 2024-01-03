import { Box, Button, Flex, Icon, Spacer, Text } from '@chakra-ui/react';
import { StarIcon, PlusIcon } from '@heroicons/react/24/outline';
import toRupiah from '@develoka/angka-rupiah-js';
export const ProductCard = (props) => {
  return (
    <Box
      bgColor={'grey.200'}
      h={'20em'}
      borderRadius={'.5em'}
      overflow={'hidden'}
    >
      <Flex flexDir={'column'} w={'100%'} h={'100%'}>
        <Box h={'50%'}>
          <Text>top</Text>
        </Box>
        <Spacer />
        <Box h={'50%'} bgColor={'white'} p={'1em'}>
          <Flex
            flexDir={'column'}
            w={'100%'}
            h={'100%'}
            justifyContent={'space-between'}
            fontSize={'.85em'}
            fontWeight={'bold'}
          >
            <Text>{props?.name}</Text>
            <Text>{toRupiah(props?.price)}</Text>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
              <Icon as={StarIcon} />
              <Icon as={StarIcon} />
              <Icon as={StarIcon} />
              <Icon as={StarIcon} />
              <Icon as={StarIcon} />
              <Text fontWeight={'normal'}>(200)</Text>
            </Flex>
            <Button
              border={'1px solid #e3024b'}
              color={'redPure.500'}
              variant={'outline'}
              fontSize={'.85em'}
              fontWeight={'bold'}
              h={'2.5em'}
              _focus={{ bgColor: 'white' }}
            >
              <Flex
                alignItems={'center'}
                justifyContent={'space-between'}
                w={'80%'}
              >
                <Icon as={PlusIcon} fontSize={'1.3em'} />
                <Text>Add to cart</Text>
              </Flex>
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
