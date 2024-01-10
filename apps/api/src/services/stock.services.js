import { getStockQuery } from '../queries/stock.queries';

export const getStockService = async (warehouseId) => {
  try {
    const res = await getStockQuery(warehouseId);
    return res;
  } catch (err) {
    throw err;
  }
};
