import { Router } from 'express'

const clientRoute = new Router()

clientRoute.get('/clients', (req, res) => {
  res.json({ page: 'Clientes', message: 'Página clientes' })
})

clientRoute.get('/api/clients', authController.index)
clientRoute.post('/api/clients/create', authController.create)
clientRoute.post('/api/clients/login', authController.login)
clientRoute.get('/api/clients/login', authController.login)

export default clientRoute
