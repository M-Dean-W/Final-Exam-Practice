import { Router } from 'express'
import booksRouter from './books'
import categoryRouter from './categories'

const router = Router()

router.use('/books', booksRouter)
router.use('/categories', categoryRouter)

export default router;