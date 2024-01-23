import { Flex, HStack, Icon, Text } from '@chakra-ui/react'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import capitalize from 'capitalize'
export const BreadCrumbs = (props) => {
  const navigate = useNavigate()
  const breadCrumbsLinks = props?.breadCrumbs?.map((segment, index, array) => {
    return (
      <HStack>
        {segment.label === 'Home' ? (
          <Icon
            as={HomeIcon}
            color={'grey.500'}
            onClick={() => {
              navigate('/')
            }}
            cursor={'pointer'}
          />
        ) : (
          <Text
            cursor={'pointer'}
            color={typeof array[index + 1]?.label === 'undefined' ? 'redPure.500' : 'black'}
            fontWeight={typeof array[index + 1]?.label === 'undefined' ? 'bold' : 'normal'}
            onClick={() => {
              navigate(`${segment.url}`)
            }}
          >
            {segment.label
              ? capitalize?.words(segment?.label)?.replace(/and/gi, '&')?.replace(/-/g, ' ')
              : null}
          </Text>
        )}
        {typeof array[index + 1]?.label === 'undefined' ? null : (
          <Icon as={ChevronRightIcon} color={'grey.500'} />
        )}
      </HStack>
    )
  })
  console.log('BREADCRUMBS LINKS', breadCrumbsLinks)
  return (
    <HStack justifyContent={'flex-start'} alignItems={'center'}>
      {breadCrumbsLinks}
    </HStack>
  )
}
