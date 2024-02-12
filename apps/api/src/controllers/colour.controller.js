import {
  createColourService,
  deleteColourService,
  getColourService,
} from '../services/colour.services'

export const getColourController = async (req, res) => {
  try {
    const result = await getColourService()
    return res.status(200).json({
      title: 'Get Colour Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const createColourController = async (req, res) => {
  try {
    const { name } = req.body
    const result = await createColourService(name)
    return res.status(200).json({
      title: 'Create Colour Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const deleteColourController = async (req, res) => {
  try {
    const { id } = req.params
    const result = await deleteColourService(id)
    return res.status(200).json({
      title: 'Delete Colour Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}
