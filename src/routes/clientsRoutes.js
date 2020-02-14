import { Router } from 'express'

import authController from '../controllers/authController'
import clientController from '../controllers/clientController'
import authMiddleware from '../middlewares/authMiddleware'

const clientRoute = new Router()

clientRoute.post('/api/clients/login', authController.login)

/**
 * Accept only Auth Routes
 */
clientRoute.use(authMiddleware)
clientRoute.get('/clients', (req, res) => {
  res.json({ page: 'Clientes', message: 'Página clientes' })
})
clientRoute.get('/api/clients', clientController.index)
clientRoute.get('/api/clients/:id', clientController.show)
clientRoute.get('/api/clients/cpf/:cpf', clientController.findByCpf)
// clientRoute.get('/api/clients/login', authController.login)

clientRoute.post('/api/clients/create', authController.create)

// clientRoute.get('/api/clients/:id', clientController.show)

// clientRoute.get('/test', authMiddleware, (req, res) => res.json({ ok: true }))

export default clientRoute
