import { getProductService } from '../services/product.services';

export const getProductController = async (req, res) => {
  try {
    const result = await getProductService();
    return res.status(200).json({
      message: 'Get Product Success',
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
