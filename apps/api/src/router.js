import { Router } from 'express'
import { sampleRouter } from './routers/sample.router'
import { authRouter } from './routers/auth.router'
import { cartRouter } from './routers/carts.router'
import { orderRouter } from './routers/orders.router'
import { productRouter } from './routers/product.router'
import { userRouter } from './routers/user.router'
import { userAddressRouter } from './routers/userAddress.router'
import { warehouseAddressRouter } from './routers/warehouseAddress.router'

import { paymentRouter } from './routers/payments.router'
import { stockRouter } from './routers/stock.router'
import { productCategoryRouter } from './routers/productCategory.router'
import { productImageRouter } from './routers/productImage.router'
import { colourRouter } from './routers/colour.router'
import { stockJournalRouter } from './routers/stockJournal.router'
import { mutationRouter } from './routers/mutation.router'
import { warehouseRouter } from './routers/warehouse.router'
import { prodToColRouter } from './routers/prodToCol.router'
const router = Router()

router.get('/', (req, res) => {
  res.send(`Hello, Purwadhika Student !`)
})

router.use('/sample', sampleRouter)

// add another router here ...
router.use('/auth', authRouter)
router.use('/cart', cartRouter)
router.use('/order', orderRouter)
router.use('/product', productRouter)
router.use('/user', userRouter)
router.use('/user-address', userAddressRouter)
router.use('/warehouse-address', warehouseAddressRouter)
router.use('/payment', paymentRouter)
router.use('/stock', stockRouter)
router.use('/product-category', productCategoryRouter)
router.use('/product-image', productImageRouter)
router.use('/colour', colourRouter)
router.use('/stock-journal', stockJournalRouter)
router.use('/mutation', mutationRouter)
router.use('/warehouse', warehouseRouter)
router.use('/prod-to-col', prodToColRouter)
export default router
