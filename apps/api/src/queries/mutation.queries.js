import { Op, where } from 'sequelize'
import Mutation from '../models/mutation.model'

export const getMutationQueryById = async (id) => {
  try {
    const res = await Mutation.findByPk(id)
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
) => {
  try {
    const res = Mutation.create({
      requesterWarehouseId,
      recipientWarehouseId,
      qty,
      stockJournalIdRecipient,
      isAccepted,
      stockJournalIdRequester,
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
