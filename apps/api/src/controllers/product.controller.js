import {
  createProductService,
  getProductService,
} from '../services/product.services';

export const getProductController = async (req, res) => {
  try {
    const { name, productGroup, productType, productCategory } = req.query;
    const result = await getProductService(
      name,
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
      tittle: 'Get Product Failed',
      message: err.message,
    });
  }
};

export const createProductController = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      productGroupId,
      productTypeId,
      productCategoryId,
      colourId,
    } = req.body;
    const result = await createProductService(
      name,
      price,
      description,
      productGroupId,
      productTypeId,
      productCategoryId,
      colourId,
    );
    return res.status(200).json({
      message: 'Create Product Success',
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      tittle: 'Create Product Failed',
      message: err.message,
    });
  }
};
