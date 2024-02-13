import { Button, Flex, Box, Text } from '@chakra-ui/react';

const Pagination = ({ currentPage, totalPages, onPageChange, pageSize, totalRecords }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const calculateItemsOnCurrentPage = () => {
    const startIndex = (currentPage - 1) * pageSize;
    return Math.min(pageSize, totalRecords - startIndex);
  };

  const itemsOnCurrentPage = calculateItemsOnCurrentPage(currentPage, pageSize, totalRecords);

  return (
    <Flex justifyContent={'space-between'} align={'center'}>
        <Flex>
            <Text fontSize={'14px'} color={'brand.grey350'}>Showing {itemsOnCurrentPage} of {totalRecords} data</Text>
        </Flex>
        <Flex justify="center" align="center" mt="4">
        
        {pageNumbers.map(number => (
            <Box key={number} mx="1">
            <Button
                onClick={() => onPageChange(number)}
                bg={currentPage === number ? '#FFF1F5' : 'white'}
                color={currentPage === number ? 'brand.lightred' : 'brand.grey350'}
                border={currentPage === number ? '1px solid #CD0244' : 'none'}
                _hover={{bg: '#FFF1F5'}}
                variant="solid"
            >
                {number}
            </Button>
            </Box>
        ))}
        
        </Flex>
    </Flex>
  );
};

export default Pagination;
