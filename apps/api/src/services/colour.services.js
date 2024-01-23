import { getColourQuery } from '../queries/colours.queries'

export const getColourService = async () => {
  try {
    const res = await getColourQuery()
    return res
  } catch (err) {
    throw err
  }
}
