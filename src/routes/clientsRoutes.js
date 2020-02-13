import { Router } from 'express'

import authController from '../controllers/authController'

const clientRoute = new Router();

clientRoute.get("/clients", (req, res) => {
  res.json({ page: "Clientes", message: "Página clientes" });
});

clientRoute.get("/api/clients", authController.index);
clientRoute.post("/api/clients/create", authController.create);
clientRoute.post("/api/clients/login", authController.login);

export default clientRoute;
