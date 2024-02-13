import Payments from '../models/payments.model'
import Orders from '../models/orders.model'
import moment from 'moment'

export const createPaymentQuery = async (
  orderId,
  paymentCode,
  grossAmount,
  paymentDate,
  paymentMethod,
  paymentStatus,
  paymentMessage,
) => {
  try {
    const paymentDate = moment().tz('Asia/Jakarta') // Ambil waktu saat pembayaran dibuat dengan zona waktu yang sesuai dan atur ke awal hari
    const expectedWaitingPaymentTime = paymentDate.clone().add(2, 'hours') // Tambahkan 2 jam ke waktu pembuatan pembayaran
    const expectedWaitingPaymentTimeString = expectedWaitingPaymentTime.format('HH:mm:ss'); // Ambil hanya bagian waktu dari objek Moment
    console.log('ini time', expectedWaitingPaymentTimeString);
    const res = await Payments.create({
      orderId,
      paymentCode,
      grossAmount,
      paymentDate,
      paymentMethod,
      paymentStatus,
      paymentMessage,
      expectedWaitingPaymentTime: expectedWaitingPaymentTimeString,
    })
    if (res.paymentStatus === 'settlement') {
      await Orders.update({ orderStatusId: 2 }, { where: { id: orderId } })
    }
    return res
  } catch (err) {
    throw err
  }
}
