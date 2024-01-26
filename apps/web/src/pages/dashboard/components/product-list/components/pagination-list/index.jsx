import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const PaginationList = (props) => {
  //   NAVIGATE
  const navigate = useNavigate()

  // PAGE NUMBERS
  const pageNumbers = [1, 2, 3, 4, 5]
  const lastNumbers =
    props?.pageValue > pageNumbers[pageNumbers.length - 1]
      ? pageNumbers[pageNumbers.length - 1] + 1
      : pageNumbers[pageNumbers.length - 1]

  // RENDERED PAGE NUMBER
  const renderedPageNumbers = pageNumbers?.map((pageNumber, index, pageNumbers) => {
    return (
      <>
        <Box
          key={index}
          p={'.5em 1em'}
          bgColor={'white'}
          borderRadius={'.5em'}
          onClick={() => {
            navigate(`${props?.pathName}?pa=${pageNumber}`)
          }}
        >
          {props?.pageValue > lastNumbers ? pageNumber + 1 : pageNumber}
        </Box>
      </>
    )
  })
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} mt={'1em'}>
      <Text>Showing 4 of 15 datas</Text>
      <Box>
        <HStack>
          <Box
            p={'.5em 1em'}
            bgColor={'white'}
            borderRadius={'.5em'}
            onClick={() => {
              navigate(`${props?.pathName}?pa=${+props?.pageValue > 1 ? props?.pageValue - 1 : 1}`)
            }}
          >
            Prev
          </Box>
          {renderedPageNumbers}
          <Box
            p={'.5em 1em'}
            bgColor={'white'}
            borderRadius={'.5em'}
            onClick={() => {
              navigate(`${props?.pathName}?pa=${+props?.pageValue + 1}`)
            }}
          >
            Next
          </Box>
        </HStack>
      </Box>
    </Flex>
  )
}
