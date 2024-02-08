import React from 'react'
import { Select, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { getAbbreviatedMonth, getFullMonthName } from './utils/services'

export const MonthSelect = (props) => {
  const navigate = useNavigate()

  const currentYear = new Date().getFullYear()

  const months = Array.from({ length: 12 }, (_, index) => {
    const monthIndex = index + 1
    const monthName = new Date(currentYear, monthIndex - 1, 1).toLocaleString('default', {
      month: 'long',
    })
    const firstDateOfMonth = `${currentYear}-${monthIndex.toString().padStart(2, '0')}-01`
    return { name: monthName, date: firstDateOfMonth }
  })
  console.log(getFullMonthName(props?.monthValue))
  return (
    <VStack spacing={4}>
      <Select
        placeholder="Select a month"
        onChange={(e) => {
          props?.setMonth(e.target.value)
          navigate(
            `${props?.pathName}?pa=${props?.pageValue}&cat=${props?.categoryValue}&mo=${
              getAbbreviatedMonth(e.target.value).monthAbbreviation
            }`,
          )
        }}
      >
        {months.map((month, index) => (
          <option
            key={index}
            value={month.date}
            selected={getFullMonthName(props?.monthValue) === month.name}
          >
            {month.name}
          </option>
        ))}
      </Select>
    </VStack>
  )
}