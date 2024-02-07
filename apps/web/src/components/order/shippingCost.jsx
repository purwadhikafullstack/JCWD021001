import { Box, Flex, Icon, Radio, RadioGroup, Select, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getShippingCost } from './services/getDeliveryFee'
import { CheckIcon } from '@heroicons/react/24/outline'

function ShippingCost({ nearestWarehouse, selectedAddress }) {
  const [shippingCost, setShippingCost] = useState(null)
  const [selectedCourier, setSelectedCourier] = useState('jne')
  const [courierService, setCourierService] = useState([])
  const [selectedService, setSelectedService] = useState('')
  const [costResult, setCostResult] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      if (nearestWarehouse && selectedAddress && selectedCourier) {
        try {
          const shippingCostData = await getShippingCost(
            nearestWarehouse?.WarehouseAddress?.cityId,
            selectedAddress?.cityId,
            1000,
            selectedCourier,
          )
          setShippingCost(shippingCostData.rajaongkir.results)
        } catch (err) {
          console.error(err.message)
        }
      }
    }
    fetchData()
  }, [nearestWarehouse, selectedAddress, selectedCourier])
  console.log(shippingCost)

  useEffect(() => {
    const courierCosts = shippingCost?.find((result) => result.code === selectedCourier)?.costs
    setCourierService(courierCosts || [])
  }, [selectedCourier, shippingCost])

  useEffect(() => {
    const cost = courierService.find((cost) => cost.service === selectedService)?.cost[0].value
    setCostResult(cost)
  }, [selectedService, courierService])

  return (
    <>
      <Flex
        borderRadius={'12px'}
        border={'1px solid #818181'}
        bg={'white'}
        padding={'24px'}
        mt={'24px'}
        mb={'24px'}
        flexDir={'column'}
      >
        <Select
          name="courier"
          variant={'flushed'}
          fontSize={'18px'}
          fontWeight={'700'}
          mb={'24px'}
          value={selectedCourier}
          onChange={(e) => setSelectedCourier(e.target.value)}
        >
          <option value="jne">JNE</option>
          <option value="tiki">TIKI</option>
          <option value="pos">POS INDONESIA</option>
        </Select>
        <RadioGroup onChange={setSelectedService} value={selectedService}>
          <Text color={'brand.grey350'}>Choose Service</Text>
          {courierService.map((result, index) => (
            <Box
              key={result.service + index}
              p={'0 10px 10px'}
              bg={selectedService === result.service ? '#FFF2F7' : '#F8F8F8'}
            >
              <Radio
                value={result.service}
                display={'flex'}
                flexDir={'column'}
                opacity={'0'}
                alignItems={'flex-start'}
              >
                <Flex gap={'24px'} align={'center'}>
                  <Box minW={'250px'}>
                    <Text fontSize={'18px'} fontWeight={'700'}>
                      {result.service}
                    </Text>
                    <Text color={'brand.grey350'}>{result.description}</Text>
                  </Box>
                  <Box>
                    <Text fontSize={'18px'} fontWeight={'700'} color={'brand.lightred'}>
                      Rp. {result.cost[0].value}
                    </Text>
                    <Text color={'brand.grey350'}>
                      Akan diterima dalam {result.cost[0].etd} hari
                    </Text>
                  </Box>
                  <Icon
                    as={CheckIcon}
                    boxSize={'24px'}
                    color={'brand.lightred'}
                    display={selectedService === result.service ? 'block' : 'none'}
                  />
                </Flex>
              </Radio>
            </Box>
          ))}
        </RadioGroup>

        <Box mt="20px">
          <strong>Cost: </strong>
          {costResult}
        </Box>
      </Flex>
    </>
  )
}

export default ShippingCost
