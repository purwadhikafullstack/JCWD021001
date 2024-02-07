import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'
import { useState } from 'react'

export const SortUserName = ({ onAdminUpdated, setSortFiled, setSortOrder }) => {
  const [sortDirection, setSortDirection] = useState('')

  const handleSortByUsername = () => {
    if (sortDirection === 'ASC') {
      setSortFiled('username')
      setSortOrder('DESC')
      setSortDirection('DESC')
    } else {
      setSortFiled('username')
      setSortOrder('ASC')
      setSortDirection('ASC')
    }

    onAdminUpdated()
  }
  return (
    <Flex flexDir={'column'} cursor="pointer" onClick={handleSortByUsername}>
      <TriangleUpIcon w={'12px'} color={sortDirection === 'ASC' ? 'white' : (sortDirection ? '#B4B4B4' : 'white')} />
      <TriangleDownIcon w={'12px'} color={sortDirection === 'DESC' ? 'white' : (sortDirection ? '#B4B4B4' : 'white')} />
    </Flex>
  )
}

export const SortEmail = ({ onAdminUpdated, setSortFiled, setSortOrder }) => {
    const [sortDirection, setSortDirection] = useState('')

    const handleSortByEmail = () => {
      if (sortDirection === 'ASC') {
        setSortFiled('email')
        setSortOrder('DESC')
        setSortDirection('DESC')
      } else {
        setSortFiled('email')
        setSortOrder('ASC')
        setSortDirection('ASC')
      }
  
      onAdminUpdated()
    }
    return (
      <Flex flexDir={'column'} cursor="pointer" onClick={handleSortByEmail}>
        <TriangleUpIcon w={'12px'} color={sortDirection === 'ASC' ? 'white' : (sortDirection ? '#B4B4B4' : 'white')} />
      <TriangleDownIcon w={'12px'} color={sortDirection === 'DESC' ? 'white' : (sortDirection ? '#B4B4B4' : 'white')} />
      </Flex>
    )
}

export const SortWarehouse = ({ onAdminUpdated, setSortFiled, setSortOrder }) => {
    const [sortDirection, setSortDirection] = useState('')

    const handleSortBywarehouseName = () => {
      if (sortDirection === 'ASC') {
        setSortFiled('warehouseName')
        setSortOrder('DESC')
        setSortDirection('DESC')
      } else {
        setSortFiled('warehouseName')
        setSortOrder('ASC')
        setSortDirection('ASC')
      }
  
      onAdminUpdated()
    }
    return (
      <Flex flexDir={'column'} cursor="pointer" onClick={handleSortBywarehouseName}>
        <TriangleUpIcon w={'12px'} color={sortDirection === 'ASC' ? 'white' : (sortDirection ? '#B4B4B4' : 'white')} />
      <TriangleDownIcon w={'12px'} color={sortDirection === 'DESC' ? 'white' : (sortDirection ? '#B4B4B4' : 'white')} />
      </Flex>
    )
}

export const SortCity = ({ onAdminUpdated, setSortFiled, setSortOrder }) => {
    const [sortDirection, setSortDirection] = useState('')

    const handleSortBycityName = () => {
      if (sortDirection === 'ASC') {
        setSortFiled('cityName')
        setSortOrder('DESC')
        setSortDirection('DESC')
      } else {
        setSortFiled('cityName')
        setSortOrder('ASC')
        setSortDirection('ASC')
      }
  
      onAdminUpdated()
    }
    return (
      <Flex flexDir={'column'} cursor="pointer" onClick={handleSortBycityName}>
        <TriangleUpIcon w={'12px'} color={sortDirection === 'ASC' ? 'white' : (sortDirection ? '#B4B4B4' : 'white')} />
      <TriangleDownIcon w={'12px'} color={sortDirection === 'DESC' ? 'white' : (sortDirection ? '#B4B4B4' : 'white')} />
      </Flex>
    )
}

export const SortRole = ({ onAdminUpdated, setSortFiled, setSortOrder }) => {
    const [sortDirection, setSortDirection] = useState('')

    const handleSortByroleName = () => {
      if (sortDirection === 'ASC') {
        setSortFiled('roleName')
        setSortOrder('DESC')
        setSortDirection('DESC')
      } else {
        setSortFiled('roleName')
        setSortOrder('ASC')
        setSortDirection('ASC')
      }
  
      onAdminUpdated()
    }
    return (
      <Flex flexDir={'column'} cursor="pointer" onClick={handleSortByroleName}>
        <TriangleUpIcon w={'12px'} color={sortDirection === 'ASC' ? 'white' : (sortDirection ? '#B4B4B4' : 'white')} />
      <TriangleDownIcon w={'12px'} color={sortDirection === 'DESC' ? 'white' : (sortDirection ? '#B4B4B4' : 'white')} />
      </Flex>
    )
}
