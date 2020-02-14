import User from '../database/schemas/clientSchema'
import { evioDeEmail } from '../helpers/sendEmail'

class ClientsController {
  // @route POST api/client/create
  // @desc Create Client
  // @access Public
  async create(req, res) {
    try {
      const { cpf } = req.body
      // const createUsers = req.body;

      if (await User.findOne({ cpf })) {
        return res
          .status(400)
          .json({ error: 'Este CPF já esta associado a uma conta' })
      }

      const newUser = new User({ ...req.body })

      const user_ = await newUser.save()
      // const user = await User.save({ ...createUsers });

      // return res.json(user);

      evioDeEmail(user_, req, res)
    } catch (error) {
      res.status(500).json({ success: false, message: error.message })
    }
  }

  // @route POST api/client/login
  // @desc Login user and return JWT token
  // @access Public
  async login(req, res) {
    try {
      const { cpf, password } = req.body

      const user = await User.findOne({ cpf })

      if (!user)
        return res.status(401).json({
          msg: 'O CPF ' + cfp + ' Não esta associado a nunhuma conta.',
        })

      //validate password
      if (!user.comparePassword(password))
        return res
          .status(401)
          .json({ message: 'Senha invalida, tenta novamente!' })

      // Make sure the user has been verified
      if (!user.isVerified)
        return res.status(401).json({
          type: 'not-verified',
          message: 'A sua conta ainda não foi verificada.',
        })

      // Login successful, write token, and send back user
      res.status(200).json({ token: user.generateToken(), user: user })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async index(req, res) {
    try {
      const users = await User.paginate(
        {},
        {
          page: req.query.page,
          limit: 10,
          populate: ['Transation'],
          sort: '-createdAt',
        }
      )

      if (!users) {
        return res.status(400).json({ message: 'Usuarios não encontrados' })
      }

      return res.json(users)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
export default new ClientsController()
