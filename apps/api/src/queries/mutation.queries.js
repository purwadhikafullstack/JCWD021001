import { Op } from 'sequelize'
import Mutation from '../models/mutation.model'
import Warehouse from '../models/warehouse.model'
import Stock from '../models/stock.model'
import Product from '../models/product.model'

export const getMutationQueryById = async (id) => {
  try {
    const res = await Mutation.findByPk(id)
    return res
  } catch (err) {
    throw err
  }
}

// GET ALL MUTATION BY WAREHOUSE ID
export const getMutationQuery = async (
  requesterWarehouseId,
  recipientWarehouseId,
  page = null,
  pageSize = null,
) => {
  try {
    const offset = (page - 1) * pageSize
    const filter = {}
    if (requesterWarehouseId)
      filter.where = {
        requesterWarehouseId: {
          [Op.eq]: requesterWarehouseId,
        },
      }
    if (recipientWarehouseId) {
      filter.where = {
        recipientWarehouseId: {
          [Op.eq]: recipientWarehouseId,
        },
      }
    }
    const res = await Mutation.findAndCountAll({
      include: [
        {
          model: Warehouse,
          as: 'requester',
          foreignKey: 'requesterWarehouseId',
        },
        {
          model: Warehouse,
          as: 'recipient',
          foreignKey: 'recipientWarehouseId',
        },
        {
          model: Stock,
          as: 'stock',
          foreignKey: 'stockId',
          include: [
            {
              model: Product,
              as: 'product',
              foreignKey: 'productId',
            },
          ],
        },
      ],
      ...filter,
      subQuery: false,
      limit: +pageSize,
      offset: offset,
    })
    return res
  } catch (err) {
    throw err
  }
}

export const createMutationQuery = async (
  requesterWarehouseId,
  recipientWarehouseId,
  qty,
  stockJournalIdRecipient,
  isAccepted,
  stockJournalIdRequester,
  stockId,
) => {
  try {
    const res = Mutation.create({
      requesterWarehouseId,
      recipientWarehouseId,
      qty,
      stockJournalIdRecipient,
      isAccepted,
      stockJournalIdRequester,
      stockId,
    })
    return res
  } catch (err) {
    throw err
  }
}

export const acceptMutationQuery = async (
  isAccepted,
  stockJournalIdRecipient,
  stockJournalIdRequester,
  id,
) => {
  try {
    const res = await Mutation.update(
      {
        isAccepted,
        stockJournalIdRecipient,
        stockJournalIdRequester,
      },
      {
        where: {
          id: {
            [Op.eq]: id,
          },
        },
      },
    )
    return res
  } catch (err) {
    throw err
  }
}
