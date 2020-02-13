import { Router } from 'express'

import clientRoute from './clientsRoutes'

const routes = new Router();

routes.get("/", (req, res) => {
  res.json({ page: "Home", message: "Ola a pagina inicial" });
});

routes.use(clientRoute);

export default routes;
