"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _schemas = require('../database/schemas'); var _schemas2 = _interopRequireDefault(_schemas);

class AccountController {
  async create(req, res) {
    const user = req.params;
    const id = user.id;
    const { account } = req.body;
    const newAccount = await _schemas2.default.accountSchema.create({ account });

    await newAccount.save();

    const userById = await _schemas2.default.userSchema.findById(id);

    _optionalChain([userById, 'optionalAccess', _ => _.BankAccount, 'optionalAccess', _2 => _2.push, 'call', _3 => _3(newAccount)]);

    return res.json(userById);
  }

  async userByAccount(req, res) {
    const { id } = req.params;
    const userByAccount = await _schemas2.default.accountSchema
      .findById(id)
      .populate("client");

    res.json(userByAccount);
  }
}

exports. default = new AccountController();
