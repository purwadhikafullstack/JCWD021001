import { Button, HStack } from '@chakra-ui/react'

export const ApprovalButton = (props) => {
  return (
    <HStack>
      <Button
        _hover={{
          bgColor: 'transparent',
        }}
        fontSize={'.8em'}
        h={'2.5em'}
        w={'5em'}
        border={'1px solid #CD0244'}
        bgColor={'transparent'}
        color={'redPure.600'}
        onClick={() => {
          props?.isJuragan ? props?.handleApprove(props?.mutation?.id, 1) : null
        }}
      >
        {props?.isJuragan
          ? +props?.mutation?.isAccepted === 1
            ? 'Accepted'
            : +props?.mutation?.isAccepted === 0
              ? 'Reject'
              : 'Approve'
          : +props?.mutation?.isAccepted === 1
            ? 'History'
            : +props?.mutation?.isAccepted === 0
              ? 'Rejected'
              : 'Waiting'}
      </Button>
    </HStack>
  )
}
