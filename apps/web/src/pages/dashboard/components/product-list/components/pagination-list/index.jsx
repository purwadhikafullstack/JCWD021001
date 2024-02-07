import { Box, Center, Flex, HStack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const PaginationList = (props) => {
  // Current Page
  const currentPage = props?.pageValue

  // Render Pagination Button
  const renderPaginationButtons = () => {
    const totalPages = 10 // Replace with the total number of pages in your data
    const buttonsToShow = 4
    const halfButtonsToShow = Math.floor(buttonsToShow / 2)

    const startPage = Math.max(1, currentPage - halfButtonsToShow)
    const endPage = Math.min(totalPages, startPage + buttonsToShow - 1)

    const box = []

    for (let i = startPage; i <= endPage; i++) {
      box.push(
        <Box
          boxShadow={'sm'}
          cursor={'pointer'}
          key={i}
          bgColor={props?.boxToggle[i] ? '#ffb1cc' : 'white'}
          p={'.5em 1em'}
          border={props?.boxToggle[i] ? '2px solid #e3024b' : '2px solid #f2f2f2'}
          borderRadius={'.5em'}
          onClick={() => {
            props?.changeBoxToggle(i)
            navigate(`${props?.pathName}?pa=${i}`)
          }}
        >
          <Text fontWeight={'bold'} fontSize={'.75em'}>
            {i}
          </Text>
        </Box>,
      )
    }
    return box
  }
  //   NAVIGATE
  const navigate = useNavigate()

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} mt={'1em'}>
      <Box></Box>
      <Box>
        <HStack>{renderPaginationButtons()}</HStack>
      </Box>
    </Flex>
  )
}
