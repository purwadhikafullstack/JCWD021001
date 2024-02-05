import React from 'react'
import { Box, Icon } from '@chakra-ui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const MobileMenu = ({ isMobile, isTabListVisible, handleToggleTabList }) => {
  return (
    <>
      {isMobile && (
        <Box
          onClick={handleToggleTabList}
          w={'full'}
          h={'30px'}
          bgColor={'white'}
          display={'flex'}
          alignItems={'center'}
          paddingLeft={'6px'}
          borderRadius={'6px'}
        >
          {isTabListVisible ? (
            <Icon as={XMarkIcon} boxSize={'24px'} />
          ) : (
            <Icon as={Bars3Icon} boxSize={'24px'} />
          )}
        </Box>
      )}
    </>
  )
}

export default MobileMenu