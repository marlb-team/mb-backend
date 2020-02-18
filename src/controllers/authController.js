import User from '../database/schemas/clientSchema'
import { Account, Transaction } from '../database/schemas/transactionSchema'

class ClientsController {
  // @route POST api/client/create
  // @desc Create Client
  // @access Public

  async transferencia(req, res) {
    try {
      const { number, agency, balance, client, transactions } = req.body

      const { value, date, transferAccount, destinatinAccount } = Transaction

      const transf = await Account.create({
        number,
        agency,
        balance,
        client,
        transactions: req.userId,
      })

      await Promise.all(
        transactions.map(async transfer => {
          if (transf.balance < value) {
            return res
              .status(400)
              .json({ success: false, message: 'Saldo insuficiente.' })
          } else if (value < 0) {
            return res.status(400).json({
              success: false,
              message: 'O valor minímo de transferência é R$ 3.00',
            })
          }
          balance -= value
          const newTransaction = new Transaction({
            ...transfer,
            transferAccount: transf._id,
          })

          await newTransaction.save()
          transf.transactions.push(newTransaction)
        })
      )

      await transf.save()

      return res.send({ transf })
    } catch (error) {
      res.status(500).json({ success: false, message: error.message })
    }
  }

  async create(req, res) {
    try {
      const {
        name,
        celPhone,
        preferedName,
        email,
        cpf,
        password,
        accounts,
      } = req.body

      const { number, agency, balance, user } = Account

      const client = await User.create({
        name,
        celPhone,
        preferedName,
        email,
        cpf,
        password,
        accounts: req.userId,
      })

      await Promise.all(
        accounts.map(async account => {
          const clientAccount = new Account({ ...account, user: client._id })

          await clientAccount.save()
          client.accounts.push(clientAccount)
        })
      )

      await client.save()

      return res.send({ client })
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
          msg: 'O CPF ' + cpf + ' Não esta associado a nunhuma conta.',
        })

      //validate password
      if (!user.comparePassword(password)) {
        return res
          .status(401)
          .json({ message: 'Senha invalida, tenta novamente!' })
      }

      // Make sure the user has been verified
      if (!user.isVerified)
        return res.status(401).json({
          type: 'not-verified',
          message: 'A sua conta ainda não foi verificada.',
        })

      // Login successful, write token, and send back user
      res.status(200).json({ token: user.generateToken(user), user })
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
