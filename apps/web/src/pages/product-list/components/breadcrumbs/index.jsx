import { Flex, HStack, Icon, Text } from '@chakra-ui/react'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import capitalize from 'capitalize'
export const BreadCrumbs = (props) => {
  const navigate = useNavigate()
  const breadCrumbsLinks = props?.segments?.map((segment, index, array) => {
    return (
      <HStack>
        {segment === '' ? (
          <Icon
            as={HomeIcon}
            color={'grey.500'}
            onClick={() => {
              navigate('/')
            }}
          />
        ) : (
          <Text
            color={index !== array.length - 1 ? 'black' : 'redPure.500'}
            fontWeight={index !== array.length - 1 ? 'normal' : 'bold'}
            onClick={() => {
              navigate(`/${segment}/`)
            }}
          >
            {capitalize.words(segment).replace(/and/gi, '&').replace(/-/g, ' ')}
          </Text>
        )}
        {index !== array.length - 1 ? <Icon as={ChevronRightIcon} color={'grey.500'} /> : null}
      </HStack>
    )
  })
  return (
    <HStack justifyContent={'flex-start'} alignItems={'center'}>
      {breadCrumbsLinks}
    </HStack>
  )
}
