import { getStockService } from '../services/stock.services';

export const getStockController = async (req, res) => {
  try {
    const { warehouseId } = req.query;
    const result = await getStockService(warehouseId);
    return res.status(200).json({
      title: 'Get Stock Success',
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      title: 'Get Stock Failed',
      message: err.message,
    });
  }
};
