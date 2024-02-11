export const getAbbreviatedMonth = (dateString) => {
  const months = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ]

  const date = new Date(dateString)
  const monthIndex = date.getMonth()
  const year = date.getFullYear()

  // Get the first date of the month
  const firstDateOfMonth = new Date(year, monthIndex, 1)

  // Format the first date as "YYYY-MM-DD"
  const formattedFirstDate = `${firstDateOfMonth.getFullYear()}-${(firstDateOfMonth.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${firstDateOfMonth.getDate().toString().padStart(2, '0')}`

  return {
    monthAbbreviation: months[monthIndex],
    firstDateOfMonth: formattedFirstDate,
  }
}

export const getFirstDateOfMonthByAbbreviation = (abbreviation, year) => {
  const months = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11,
  }

  const monthIndex = months[abbreviation]

  if (monthIndex !== undefined) {
    // Get the first date of the specified month
    const firstDateOfMonth = new Date(year, monthIndex, 1)

    // Format the first date as "YYYY-MM-DD"
    const formattedFirstDate = `${firstDateOfMonth.getFullYear()}-${(
      firstDateOfMonth.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${firstDateOfMonth.getDate().toString().padStart(2, '0')}`

    return formattedFirstDate
  } else {
    return null // Invalid abbreviation
  }
}

export const getCurrentYear = () => {
  const currentDate = new Date()
  return currentDate.getFullYear()
}

export const getFullMonthName = (abbreviatedMonth) => {
  const monthMap = {
    jan: 'January',
    feb: 'February',
    mar: 'March',
    apr: 'April',
    may: 'May',
    jun: 'June',
    jul: 'July',
    aug: 'August',
    sep: 'September',
    oct: 'October',
    nov: 'November',
    dec: 'December',
  }

  // Convert to lowercase and get the full month name from the map
  const fullMonth = monthMap[abbreviatedMonth.toLowerCase()]

  return fullMonth || abbreviatedMonth // Return full month name or original value if not found
}
