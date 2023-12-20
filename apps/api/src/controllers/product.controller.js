import { getProductService } from '../services/product.services';

export const getProductController = async (req, res) => {
  try {
    const { productGroup, productType, productCategory } = req.query;
    const result = await getProductService(
      productGroup,
      productType,
      productCategory,
    );
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
