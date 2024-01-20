import { getColourService } from '../services/colour.services'

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
