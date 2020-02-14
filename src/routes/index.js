import { Router } from 'express'

import clientRoute from './clientsRoutes'
import transactionRoute from './transactionRoutes'

const routes = new Router()

routes.get('/', (req, res) => {
  res.json({ page: 'Home', message: 'Ola a pagina inicial' })
})

routes.use(clientRoute)
routes.use(transactionRoute)

export default routes
