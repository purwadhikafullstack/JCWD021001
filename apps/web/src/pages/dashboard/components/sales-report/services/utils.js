export const getMonthDates = (inputDate) => {
  if (!(inputDate instanceof Date) || isNaN(inputDate)) {
    throw new Error('Invalid Date')
  }
  inputDate.setDate(1)
  inputDate.setUTCHours(0, 0, 0, 0)
  const endDate = new Date(inputDate.getFullYear(), inputDate.getMonth() + 1, 0)
  const formattedStartDate = inputDate.toISOString().split('T')[0]
  const formattedEndDate = endDate.toISOString().split('T')[0]
  return { startDate: formattedStartDate, endDate: formattedEndDate }
}
