import {
  createProductService,
  deleteProductService,
  getProductService,
  updateProductService,
} from '../services/product.services';

export const getProductController = async (req, res) => {
  try {
    const { name, productGroup, productType, productCategory, id } = req.query;
    const result = await getProductService(
      name,
      productGroup,
      productType,
      productCategory,
      id,
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

export const updateProductController = async (req, res) => {
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
    const { id } = req.params;
    const result = await updateProductService(
      name,
      price,
      description,
      productGroupId,
      productTypeId,
      productCategoryId,
      colourId,
      id,
    );
    return res.status(201).json({
      message: 'Update Product Success',
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      title: 'Update Product Failed',
      message: err.message,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteProductService(id);
    return res.status(200).json({
      message: 'Delete Product Success',
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      title: 'Delete Product Failed',
      message: err.message,
    });
  }
};
