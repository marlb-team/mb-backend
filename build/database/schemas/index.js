"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _accountSchema = require('./accountSchema'); var _accountSchema2 = _interopRequireDefault(_accountSchema);
var _clientSchema = require('./clientSchema'); var _clientSchema2 = _interopRequireDefault(_clientSchema);
var _transationSchema = require('./transationSchema'); var _transationSchema2 = _interopRequireDefault(_transationSchema);

exports. default = {
  clientSchema: _clientSchema2.default,
  accountSchema: _accountSchema2.default,
  transationSchema: _transationSchema2.default
};
