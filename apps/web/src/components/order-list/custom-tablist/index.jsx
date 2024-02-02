import React from 'react'
import { TabList, Tab } from '@chakra-ui/react'

const CustomTabList = ({ isTabListVisible, onTabClick, isMobile }) => (
  <>
    {(isTabListVisible || !isMobile) && (
      <TabList
        display={'flex'}
        flexDirection={{ base: 'column', md: 'row' }}
        borderBottom={{ base: 'none', md: '2px solid #d1d1d1' }}
      >
        <Tab
          fontFamily={'heading'}
          fontWeight={'600'}
          fontSize={'16px'}
          color={'#838383'}
          _selected={{
            color: '#CD0244',
            borderColor: '#CD0244',
            // bg: '#FED7E2',
          }}
          onClick={() => onTabClick(1)}
        >
          Waiting Payment
        </Tab>
        <Tab
          fontFamily={'heading'}
          fontWeight={'600'}
          fontSize={'16px'}
          color={'#838383'}
          _selected={{
            color: '#CD0244',
            borderColor: '#CD0244',
            // bg: '#FED7E2',
          }}
        >
          On Process
        </Tab>
        <Tab
          fontFamily={'heading'}
          fontWeight={'600'}
          fontSize={'16px'}
          color={'#838383'}
          _selected={{
            color: '#CD0244',
            borderColor: '#CD0244',
            // bg: '#FED7E2',
          }}
        >
          On Delivery
        </Tab>
        <Tab
          fontFamily={'heading'}
          fontWeight={'600'}
          fontSize={'16px'}
          color={'#838383'}
          _selected={{
            color: '#CD0244',
            borderColor: '#CD0244',
            // bg: '#FED7E2',
          }}
        >
          Order Confirmed
        </Tab>
        <Tab
          fontFamily={'heading'}
          fontWeight={'600'}
          fontSize={'16px'}
          color={'#838383'}
          _selected={{
            color: '#CD0244',
            borderColor: '#CD0244',
            // bg: '#FED7E2',
          }}
        >
          Order Cancelled
        </Tab>
      </TabList>
    )}
  </>
)

export default CustomTabList
