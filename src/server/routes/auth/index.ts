import { Router } from 'express'
import loginRouter from '../auth/login'
import registerRouter from '../auth/register'

const router = Router()

router.use('/login', loginRouter)
router.use('/register', registerRouter)

export default router;