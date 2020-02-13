"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _clientSchema = require('../database/schemas/clientSchema'); var _clientSchema2 = _interopRequireDefault(_clientSchema);
var _sendEmail = require('../helpers/sendEmail');

class ClientsController {
  // @route POST api/client/create
  // @desc Create Client
  // @access Public
  async create(req, res) {
    try {
      const { cpf } = req.body;
      // const createUsers = req.body;

      if (await _clientSchema2.default.findOne({ cpf })) {
        return res
          .status(400)
          .json({ error: "This CPF is already assign to one account" });
      }

      const newUser = new (0, _clientSchema2.default)({ ...req.body });

      const user_ = await newUser.save();
      // const user = await User.save({ ...createUsers });

      // return res.json(user);

      _sendEmail.evioDeEmail.call(void 0, user_, req, res);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // @route POST api/client/login
  // @desc Login user and return JWT token
  // @access Public
  async login(req, res) {
    try {
      const { cpf, password } = req.body;

      const user = await _clientSchema2.default.findOne({ cpf });

      if (!user)
        return res.status(401).json({
          msg:
            "The CPF " +
            cfp +
            " is not associated with any account. Double-check your email address and try again."
        });

      //validate password
      if (!user.comparePassword(password))
        return res.status(401).json({ message: "Invalid email or password" });

      // Make sure the user has been verified
      if (!user.isVerified)
        return res.status(401).json({
          type: "not-verified",
          message: "Your account has not been verified."
        });

      // Login successful, write token, and send back user
      res.status(200).json({ token: user.generateToken(), user: user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async index(req, res) {
    try {
      const users = await _clientSchema2.default.paginate(
        {},
        {
          page: req.query.page,
          limit: 10,
          populate: ["Transation"],
          sort: "-createdAt"
        }
      );

      if (!users) {
        return res.status(400).json({ message: "Usuarios não encontrados" });
      }

      return res.json(users);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
exports. default = new ClientsController();
