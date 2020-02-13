"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _clientsRoutes = require('./clientsRoutes'); var _clientsRoutes2 = _interopRequireDefault(_clientsRoutes);

const routes = new (0, _express.Router)();

routes.get("/", (req, res) => {
  res.json({ page: "Home", message: "Ola a pagina inicial" });
});

routes.use(_clientsRoutes2.default);

exports. default = routes;
