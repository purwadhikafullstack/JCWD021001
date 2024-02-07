import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'
import { useState } from 'react'

export const SortName = ({ onWarehouseUpdated, setSortField, setSortOrder }) => {
  const [sortDirection, setSortDirection] = useState('')

  const handleSortByName = () => {
    if (sortDirection === 'ASC') {
      setSortField('name')
      setSortOrder('DESC')
      setSortDirection('DESC')
    } else {
      setSortField('name')
      setSortOrder('ASC')
      setSortDirection('ASC')
    }

    onWarehouseUpdated()
  }
  return (
    <Flex flexDir={'column'} cursor="pointer" onClick={handleSortByName}>
      <TriangleUpIcon
        w={'12px'}
        color={sortDirection === 'ASC' ? 'white' : sortDirection ? '#B4B4B4' : 'white'}
      />
      <TriangleDownIcon
        w={'12px'}
        color={sortDirection === 'DESC' ? 'white' : sortDirection ? '#B4B4B4' : 'white'}
      />
    </Flex>
  )
}


export const SortWarehouseCity = ({ onWarehouseUpdated, setSortField, setSortOrder }) => {
  const [sortDirection, setSortDirection] = useState('')

  const handleSortBycityName = () => {
    if (sortDirection === 'ASC') {
      setSortField('cityName')
      setSortOrder('DESC')
      setSortDirection('DESC')
    } else {
      setSortField('cityName')
      setSortOrder('ASC')
      setSortDirection('ASC')
    }

    onWarehouseUpdated()
  }
  return (
    <Flex flexDir={'column'} cursor="pointer" onClick={handleSortBycityName}>
      <TriangleUpIcon
        w={'12px'}
        color={sortDirection === 'ASC' ? 'white' : sortDirection ? '#B4B4B4' : 'white'}
      />
      <TriangleDownIcon
        w={'12px'}
        color={sortDirection === 'DESC' ? 'white' : sortDirection ? '#B4B4B4' : 'white'}
      />
    </Flex>
  )
}

