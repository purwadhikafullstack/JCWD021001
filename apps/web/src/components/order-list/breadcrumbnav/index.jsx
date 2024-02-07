import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text, Icon } from '@chakra-ui/react';
import { HomeIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@chakra-ui/icons'

const BreadcrumbNav = () => {
  return (
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color={'#838383'} />}>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Icon as={HomeIcon} color={'#838383'} strokeWidth={2} boxSize={'18px'} />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">
            <Text fontFamily={'heading'} fontWeight={'700'} fontSize={'14px'} color={'#CD0244'}>
              Order List
            </Text>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
  );
};

export default BreadcrumbNav;
