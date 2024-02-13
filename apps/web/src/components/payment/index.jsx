import React, { useState } from 'react'
import { Box, Text, Icon, Image } from '@chakra-ui/react'
import {
  ArrowLeftIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import Qris from '../../../public/logo/qris.png'
import QRCode from 'qrcode.react'
import copy from 'clipboard-copy'
import { useNavigate } from 'react-router-dom'
import toRupiah from '@develoka/angka-rupiah-js'

const PaymentBody = ({ orderData }) => {
  const navigate = useNavigate()
  const [isMBankingVisible, setMBankingVisible] = useState(false)
  const [isIBankingVisible, setIBankingVisible] = useState(false)
  const [isATMVisible, setATMVisible] = useState(false)

  const toggleMBankingInstructions = () => {
    setMBankingVisible(!isMBankingVisible)
  }

  const toggleIBankingInstructions = () => {
    setIBankingVisible(!isIBankingVisible)
  }

  const toggleATMInstructions = () => {
    setATMVisible(!isATMVisible)
  }

  const handleCopyToClipboard = (value) => {
    copy(value)
    // You can provide some feedback to the user, for example:
    alert('Copied to clipboard!')
  }
  return (
    <Box padding={'24px'}>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={'12px'}
        mb={'16px'}
        cursor={'pointer'}
        onClick={() =>
          navigate('/order-list', { state: { refresh: true, activeTab: 0, status: [1] } })
        }
      >
        <Icon as={ArrowLeftIcon} fontSize={'22px'} />
        <Text fontFamily={'heading'} fontWeight={'700'} fontSize={'22px'}>
          Payment
        </Text>
      </Box>
      {orderData?.map((order) => (
        <Box
          key={order.id}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          gap={'24px'}
        >
          <Box
            display={'flex'}
            flexDirection={{ base: 'column', xl: 'row' }}
            gap={'16px'}
            justifyContent={'center'}
          >
            <Box w={{ base: 'full', xl: '557px' }} h={'214px'} bgColor={'white'} padding={'16px'}>
              <Box display={'flex'} flexDirection={'column'} gap={'24px'}>
                <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'} color={'#838383'}>
                  No. Order {order?.orderNumber}
                </Text>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                  <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'} color={'#838383'}>
                    Total Payment
                  </Text>
                  <Text fontFamily={'body'} fontWeight={'700'} fontSize={'20px'} color={'#CD0244'}>
                    {toRupiah(+order?.totalPrice + +order?.shippingCost, { floatingPoint: 0 })}
                  </Text>
                </Box>
                <Box w={'full'} h={'1px'} bgColor={'#F1F1F1'} />
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'} color={'#838383'}>
                    Pay within
                  </Text>
                  <Box textAlign={'right'} display={'flex'} flexDirection={'column'} gap={'8px'}>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'600'}
                      fontSize={'14px'}
                      color={'#CD0244'}
                    >
                      {/* 23 Hours 14 Minutes 12 Seconds */}
                    </Text>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'600'}
                      fontSize={'14px'}
                      color={'#838383'}
                    >
                      {/* Due Date 28 December 2023, 10:25 */}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box w={'617px'} h={'350px'} bgColor={'white'} padding={'16px'}>
              <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
                <Box display={'flex'} alignItems={'flex-end'} gap={'12px'}>
                  <Image w={'80px'} src={Qris} alt={'mandiri-icon'} />
                </Box>
                <Box w={'full'} h={'1px'} bgColor={'#F1F1F1'} />
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                  <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'} color={'#838383'}>
                    {/* Mandiri Virtual Account */}
                    QRCode
                  </Text>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    gap={'8px'}
                    cursor={'pointer'}
                    onClick={() =>
                      handleCopyToClipboard(
                        `https://api.sandbox.midtrans.com/v2/qris/${order?.Payment?.paymentCode}/qr-code`,
                      )
                    }
                  >
                    {/* <Text
                      fontFamily={'body'}
                      fontWeight={'700'}
                      fontSize={'20px'}
                      color={'#CD0244'}
                    >
                      123 4567 8910 1000
                    </Text> */}
                    <QRCode
                      value={`https://api.sandbox.midtrans.com/v2/qris/${order?.Payment?.paymentCode}/qr-code`}
                    />
                    {/* <Icon as={DocumentDuplicateIcon} fontSize={'16px'} color={'#CD0244'} /> */}
                  </Box>
                </Box>
                <Box>
                  <Box display={'flex'} alignItems={'center'} gap={'12px'}>
                    <Box minW={'8px'} h={'8px'} bgColor={'#EDEDED'} borderRadius={'50%'} />
                    <Text
                      fontFamily={'body'}
                      fontWeight={'400'}
                      fontSize={'14px'}
                      color={'#838383'}
                    >
                      The verification process takes less than 10 minutes after successful payment
                    </Text>
                  </Box>
                  <Box display={'flex'} alignItems={'center'} gap={'12px'}>
                    <Box minW={'8px'} h={'8px'} bgColor={'#EDEDED'} borderRadius={'50%'} />
                    <Text
                      fontFamily={'body'}
                      fontWeight={'400'}
                      fontSize={'14px'}
                      color={'#838383'}
                    >
                      Pay the order to VA above before making another order with VA so that the
                      number remains the same
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            w={{ base: 'full', xl: '1190px' }}
            h={'fit-content'}
            bgColor={'white'}
            padding={'16px'}
          >
            <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
              <Box display={'flex'} flexDirection={'column'} gap={'12px'}>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  onClick={toggleMBankingInstructions}
                  cursor={'pointer'}
                >
                  <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'} color={'#838383'}>
                    mBanking Transfer Instructions
                  </Text>
                  <Icon as={isMBankingVisible ? ChevronUpIcon : ChevronDownIcon} />
                </Box>
                <Box w={'full'} h={'1px'} bgColor={'#F1F1F1'} />
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  gap={'12px'}
                  overflow={'hidden'}
                  maxHeight={isMBankingVisible ? '500px' : '0'}
                  transition={'max-height 0.2s ease-in-out'}
                >
                  <Box display={'flex'} gap={'12px'}>
                    <Box
                      w={'20px'}
                      h={'20px'}
                      bgColor={'#FFECF2'}
                      borderRadius={'50%'}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                    >
                      <Text
                        fontFamily={'body'}
                        fontWeight={'700'}
                        fontSize={'12px'}
                        color={'#CD0244'}
                      >
                        1
                      </Text>
                    </Box>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'400'}
                      fontSize={'14px'}
                      color={'#838383'}
                    >
                      Login to your mBanking. Select Payment, then select e-Commerce.
                    </Text>
                  </Box>
                  <Box display={'flex'} gap={'12px'}>
                    <Box
                      w={'20px'}
                      h={'20px'}
                      bgColor={'#FFECF2'}
                      borderRadius={'50%'}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                    >
                      <Text
                        fontFamily={'body'}
                        fontWeight={'700'}
                        fontSize={'12px'}
                        color={'#CD0244'}
                      >
                        2
                      </Text>
                    </Box>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'400'}
                      fontSize={'14px'}
                      color={'#838383'}
                    >
                      Enter the Virtual Account number 123 4567 8910 1000, then select Continue.
                    </Text>
                  </Box>
                  <Box display={'flex'} gap={'12px'}>
                    <Box
                      w={'20px'}
                      h={'20px'}
                      bgColor={'#FFECF2'}
                      borderRadius={'50%'}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                    >
                      <Text
                        fontFamily={'body'}
                        fontWeight={'700'}
                        fontSize={'12px'}
                        color={'#CD0244'}
                      >
                        3
                      </Text>
                    </Box>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'400'}
                      fontSize={'14px'}
                      color={'#838383'}
                    >
                      Check the information displayed on the screen. Make sure the merchant is Pure,
                      Total bill, and Username are correct. If correct, enter your PIN and select
                      OK.
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Box display={'flex'} flexDirection={'column'} gap={'12px'}>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  onClick={toggleIBankingInstructions}
                  cursor={'pointer'}
                >
                  <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'} color={'#838383'}>
                    iBanking Transfer Instructions
                  </Text>
                  <Icon as={isIBankingVisible ? ChevronUpIcon : ChevronDownIcon} />
                </Box>
                <Box w={'full'} h={'1px'} bgColor={'#F1F1F1'} />
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  gap={'12px'}
                  overflow={'hidden'}
                  maxHeight={isIBankingVisible ? '500px' : '0'}
                  transition={'max-height 0.2s ease-in-out'}
                >
                  <Box display={'flex'} gap={'12px'}>
                    <Box
                      w={'20px'}
                      h={'20px'}
                      bgColor={'#FFECF2'}
                      borderRadius={'50%'}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                    >
                      <Text
                        fontFamily={'body'}
                        fontWeight={'700'}
                        fontSize={'12px'}
                        color={'#CD0244'}
                      >
                        1
                      </Text>
                    </Box>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'400'}
                      fontSize={'14px'}
                      color={'#838383'}
                    >
                      Select Pay &gt; Multi Payment
                    </Text>
                  </Box>
                  <Box display={'flex'} gap={'12px'}>
                    <Box
                      w={'20px'}
                      h={'20px'}
                      bgColor={'#FFECF2'}
                      borderRadius={'50%'}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                    >
                      <Text
                        fontFamily={'body'}
                        fontWeight={'700'}
                        fontSize={'12px'}
                        color={'#CD0244'}
                      >
                        2
                      </Text>
                    </Box>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'400'}
                      fontSize={'14px'}
                      color={'#838383'}
                    >
                      Select From Account: Your Account and Service Provider: Pure, then click
                      Continue.
                    </Text>
                  </Box>
                  <Box display={'flex'} gap={'12px'}>
                    <Box
                      w={'20px'}
                      h={'20px'}
                      bgColor={'#FFECF2'}
                      borderRadius={'50%'}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                    >
                      <Text
                        fontFamily={'body'}
                        fontWeight={'700'}
                        fontSize={'12px'}
                        color={'#CD0244'}
                      >
                        3
                      </Text>
                    </Box>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'400'}
                      fontSize={'14px'}
                      color={'#838383'}
                    >
                      Enter the Virtual Account number 123 4567 8910 1000 and select Continue.
                    </Text>
                  </Box>
                  <Box display={'flex'} gap={'12px'}>
                    <Box
                      w={'20px'}
                      h={'20px'}
                      bgColor={'#FFECF2'}
                      borderRadius={'50%'}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                    >
                      <Text
                        fontFamily={'body'}
                        fontWeight={'700'}
                        fontSize={'12px'}
                        color={'#CD0244'}
                      >
                        4
                      </Text>
                    </Box>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'400'}
                      fontSize={'14px'}
                      color={'#838383'}
                    >
                      Check the information displayed on the screen. Make sure the merchant is Pure,
                      Total bill and Username are correct. If correct, enter your PIN and select OK.
                    </Text>
                  </Box>
                  <Box display={'flex'} gap={'12px'}>
                    <Box
                      w={'20px'}
                      h={'20px'}
                      bgColor={'#FFECF2'}
                      borderRadius={'50%'}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                    >
                      <Text
                        fontFamily={'body'}
                        fontWeight={'700'}
                        fontSize={'12px'}
                        color={'#CD0244'}
                      >
                        5
                      </Text>
                    </Box>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'400'}
                      fontSize={'14px'}
                      color={'#838383'}
                    >
                      Enter your Token PIN and click Submit.
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Box display={'flex'} flexDirection={'column'} gap={'12px'}>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  onClick={toggleATMInstructions}
                  cursor={'pointer'}
                >
                  <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'} color={'#838383'}>
                    ATM Transfer Instructions
                  </Text>
                  <Icon as={isATMVisible ? ChevronUpIcon : ChevronDownIcon} />
                </Box>
                <Box w={'full'} h={'1px'} bgColor={'#F1F1F1'} />
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  gap={'12px'}
                  overflow={'hidden'}
                  maxHeight={isATMVisible ? '500px' : '0'}
                  transition={'max-height 0.2s ease-in-out'}
                >
                  <Box display={'flex'} gap={'12px'}>
                    <Box
                      w={'20px'}
                      h={'20px'}
                      bgColor={'#FFECF2'}
                      borderRadius={'50%'}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                    >
                      <Text
                        fontFamily={'body'}
                        fontWeight={'700'}
                        fontSize={'12px'}
                        color={'#CD0244'}
                      >
                        1
                      </Text>
                    </Box>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'400'}
                      fontSize={'14px'}
                      color={'#838383'}
                    >
                      Enter your Token PIN and click Submit.
                    </Text>
                  </Box>
                  <Box display={'flex'} gap={'12px'}>
                    <Box
                      w={'20px'}
                      h={'20px'}
                      bgColor={'#FFECF2'}
                      borderRadius={'50%'}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                    >
                      <Text
                        fontFamily={'body'}
                        fontWeight={'700'}
                        fontSize={'12px'}
                        color={'#CD0244'}
                      >
                        2
                      </Text>
                    </Box>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'400'}
                      fontSize={'14px'}
                      color={'#838383'}
                    >
                      Select Others &gt; Others &gt; Multi Payment.
                    </Text>
                  </Box>
                  <Box display={'flex'} gap={'12px'}>
                    <Box
                      w={'20px'}
                      h={'20px'}
                      bgColor={'#FFECF2'}
                      borderRadius={'50%'}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                    >
                      <Text
                        fontFamily={'body'}
                        fontWeight={'700'}
                        fontSize={'12px'}
                        color={'#CD0244'}
                      >
                        3
                      </Text>
                    </Box>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'400'}
                      fontSize={'14px'}
                      color={'#838383'}
                    >
                      Enter company code 89608 and select Correct.
                    </Text>
                  </Box>
                  <Box display={'flex'} gap={'12px'}>
                    <Box
                      w={'20px'}
                      h={'20px'}
                      bgColor={'#FFECF2'}
                      borderRadius={'50%'}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                    >
                      <Text
                        fontFamily={'body'}
                        fontWeight={'700'}
                        fontSize={'12px'}
                        color={'#CD0244'}
                      >
                        4
                      </Text>
                    </Box>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'400'}
                      fontSize={'14px'}
                      color={'#838383'}
                    >
                      Enter the Virtual Account number 123 4567 8910 1000, then select Correct.
                    </Text>
                  </Box>
                  <Box display={'flex'} gap={'12px'}>
                    <Box
                      w={'20px'}
                      h={'20px'}
                      bgColor={'#FFECF2'}
                      borderRadius={'50%'}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                    >
                      <Text
                        fontFamily={'body'}
                        fontWeight={'700'}
                        fontSize={'12px'}
                        color={'#CD0244'}
                      >
                        5
                      </Text>
                    </Box>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'400'}
                      fontSize={'14px'}
                      color={'#838383'}
                    >
                      Check the information displayed on the screen. Make sure the merchant is Pure,
                      Total bill and Username are correct. If correct, press number 1 and select
                      Yes.
                    </Text>
                  </Box>
                  <Box display={'flex'} gap={'12px'}>
                    <Box
                      w={'20px'}
                      h={'20px'}
                      bgColor={'#FFECF2'}
                      borderRadius={'50%'}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                    >
                      <Text
                        fontFamily={'body'}
                        fontWeight={'700'}
                        fontSize={'12px'}
                        color={'#CD0244'}
                      >
                        6
                      </Text>
                    </Box>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'400'}
                      fontSize={'14px'}
                      color={'#838383'}
                    >
                      Check the confirmation screen and select Yes.
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default PaymentBody
