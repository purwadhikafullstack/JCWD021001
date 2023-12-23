import Stock from '../models/stock.model';
import { Op } from 'sequelize';

export const getStockQuery = async (warehouseId) => {
  try {
    const filter = {};
    if (warehouseId)
      filter.where = {
        warehouseId: {
          [Op.eq]: warehouseId,
        },
      };
    const res = await Stock.findAll({
      include: [{ all: true }],
      ...filter,
    });
    return res;
  } catch (err) {
    throw err;
  }
};
