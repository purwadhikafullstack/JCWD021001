import { createColourQuery, deleteColourQuery, getColourQuery } from '../queries/colours.queries'

export const getColourService = async () => {
  try {
    const res = await getColourQuery()
    return res
  } catch (err) {
    throw err
  }
}

export const createColourService = async (name) => {
  try {
    const res = await createColourQuery(name)
    return res
  } catch (err) {
    throw err
  }
}

export const deleteColourService = async (id) => {
  try {
    const res = await deleteColourQuery(id)
    return res
  } catch (err) {
    throw err
  }
}
