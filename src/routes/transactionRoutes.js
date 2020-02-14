import { Router } from 'express'

import authController from '../controllers/authController'

const transactionRoute = new Router()

transactionRoute.post('/api/clients/operations', authController.transferencia)

export default transactionRoute
