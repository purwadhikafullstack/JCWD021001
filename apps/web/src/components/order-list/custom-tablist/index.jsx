import React from 'react'
import { TabList, Tab } from '@chakra-ui/react'

const CustomTabList = ({ isTabListVisible, onTabClick, isMobile }) => {
  const handleTabClick = (orderStatusId, ...additionalParams) => {
    // Konversi orderStatusId ke integer sebelum mengirimkannya
    const parsedOrderStatusId = parseInt(orderStatusId, 10)
    localStorage.setItem('status', JSON.stringify([parsedOrderStatusId, ...additionalParams]))
    onTabClick(parsedOrderStatusId, ...additionalParams)
  }

  return (
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
            onClick={() => handleTabClick(1)}
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
            onClick={() => handleTabClick(2, 3)}
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
            onClick={() => handleTabClick(4)}
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
            onClick={() => handleTabClick(5)}
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
            onClick={() => handleTabClick(6)}
          >
            Order Cancelled
          </Tab>
        </TabList>
      )}
    </>
  )
}

export default CustomTabList
