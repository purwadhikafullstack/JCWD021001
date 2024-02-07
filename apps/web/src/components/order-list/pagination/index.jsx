import React from 'react'
import { Box, Button, HStack } from '@chakra-ui/react' // You may need to adjust this import based on your UI library

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 3

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = startPage + maxVisiblePages - 1

    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => onPageChange(i)}
          // variant={currentPage === i ? 'solid' : 'outline'}
          bgColor={currentPage === i ? '#FFF1F5' : 'white'}
          color={currentPage === i ? '#CD0244' : '#707070'}
          border={currentPage === i ? '1px solid #CD0244' : 'none'}
        >
          {i}
        </Button>,
      )
    }

    return pages
  }

  return (
    <Box w={'full'} display={'flex'} alignItems={'center'} justifyContent={{base: 'center', md: 'flex-end'}}>
      <HStack spacing="2" mt={'20px'}>
        <Button
          bgColor={'#FFF1F5'}
          color={'#CD0244'}
          onClick={() => onPageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          Prev
        </Button>

        {renderPageNumbers()}

        <Button
          bgColor={'#FFF1F5'}
          color={'#CD0244'}
          onClick={() => onPageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </HStack>
    </Box>
  )
}

export default Pagination
