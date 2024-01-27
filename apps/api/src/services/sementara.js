const receiver = await getSpesificStockQuery(
  recipientStock?.dataValues?.productId,
  recipientWarehouseId,
  recipientStock?.dataValues?.sizeId,
  recipientStock?.dataValues?.colourId,
)
if (!receiver) {
  const createStocks = await createStockQuery(
    recipientStock?.dataValues?.productId,
    requesterWarehouseId,
    0,
    recipientStock?.dataValues?.sizeId,
    recipientStock?.dataValues?.colourId,
  )
  await createStocks.increment('qty', { by: qty })
  const requesterStockJournal = await createStockJournalQuery(
    recipientStock?.dataValues?.productId,
    requesterWarehouseId,
    recipientStock?.dataValues?.sizeId,
    recipientStock?.dataValues?.colourId,
    qty > 0 ? 1 : 0,
    qty,
    createStocks.qty,
    createStocks.dataValues.qty + qty,
    createStocks.dataValues.id,
  )
  await recipientStock.increment('qty', { by: -1 * qty })
  const recipientStockJournal = await createStockJournalQuery(
    recipientStock?.dataValues?.productId,
    recipientWarehouseId,
    recipientStock?.dataValues?.sizeId,
    recipientStock?.dataValues?.colourId,
    0,
    -1 * qty,
    recipientStock?.dataValues.qty,
    recipientStock?.dataValues.qty + -1 * qty,
    recipientStock?.dataValues.id,
  )
  const res = await createMutationQuery(
    requesterWarehouseId,
    recipientWarehouseId,
    qty,
    requesterStockJournal?.dataValues?.id,
    0,
    recipientStockJournal?.dataValues?.id,
  )
  return res
} else if (receiver) {
  await receiver.increment('qty', { by: qty })
  await recipientStock.increment('qty', { by: -1 * qty })
  const requesterStockJournal = await createStockJournalQuery(
    recipientStock?.dataValues?.productId,
    requesterWarehouseId,
    recipientStock?.dataValues?.sizeId,
    recipientStock?.dataValues?.colourId,
    qty > 0 ? 1 : 0,
    qty,
    receiver.qty,
    receiver.dataValues.qty + qty,
    receiver.dataValues.id,
  )
  await recipientStock.increment('qty', { by: -1 * qty })
  const recipientStockJournal = await createStockJournalQuery(
    recipientStock?.dataValues?.productId,
    recipientWarehouseId,
    recipientStock?.dataValues?.sizeId,
    recipientStock?.dataValues?.colourId,
    0,
    -1 * qty,
    recipientStock.dataValues.qty,
    recipientStock.dataValues.qty + -1 * qty,
    recipientStock.dataValues.id,
  )
  const res = await createMutationQuery(
    requesterWarehouseId,
    recipientWarehouseId,
    qty,
    requesterStockJournal?.dataValues?.id,
    0,
    recipientStockJournal?.dataValues?.id,
  )
  return res
}
