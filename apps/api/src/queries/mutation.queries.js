import Mutation from '../models/mutation.model'

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
