import { Flex, HStack, Icon, Text } from '@chakra-ui/react';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export const BreadCrumbs = (props) => {
  const breadCrumbsLinks = props?.segments?.map((segment, index, array) => {
    return (
      <Link key={index} to={`/${segment}`}>
        <HStack>
          {segment === '' ? (
            <Icon as={HomeIcon} color={'grey.500'} />
          ) : (
            <Text
              color={index !== array.length - 1 ? 'black' : 'redPure.500'}
              fontWeight={index !== array.length - 1 ? 'normal' : 'bold'}
            >
              {segment}
            </Text>
          )}
          {index !== array.length - 1 ? (
            <Icon as={ChevronRightIcon} color={'grey.500'} />
          ) : null}
        </HStack>
      </Link>
    );
  });
  return (
    <HStack justifyContent={'flex-start'} alignItems={'center'}>
      {breadCrumbsLinks}
    </HStack>
  );
};
