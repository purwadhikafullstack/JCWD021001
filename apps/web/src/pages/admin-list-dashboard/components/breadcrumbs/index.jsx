import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import { HomeIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@chakra-ui/icons'
export const BreadCrumbs = () => {
  
    return (
      <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
      <BreadcrumbItem >
          <BreadcrumbLink>
          <Icon as={HomeIcon} boxSize={'16px'} color={'#838383'} />
          </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
          <BreadcrumbLink color={'brand.lightred'}
          fontWeight={'700'}
          fontSize={'12px'}
          _hover={'brand.lightred'}
          href='/dashboard'>
              Dashboard
          </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color={'brand.lightred'}
          fontWeight={'700'}
          fontSize={'12px'}>
              Admin List
          </BreadcrumbLink>
      </BreadcrumbItem>
  </Breadcrumb>
    )
};
