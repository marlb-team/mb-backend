"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _authController = require('../controllers/authController'); var _authController2 = _interopRequireDefault(_authController);

const clientRoute = new (0, _express.Router)();

clientRoute.get("/clients", (req, res) => {
  res.json({ page: "Clientes", message: "Página clientes" });
});

clientRoute.get("/api/clients", _authController2.default.index);
clientRoute.post("/api/clients/create", _authController2.default.create);
clientRoute.post("/api/clients/login", _authController2.default.login);

exports. default = clientRoute;
