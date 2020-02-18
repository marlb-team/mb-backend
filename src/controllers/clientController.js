import User from '../database/schemas/clientSchema'

class ClientController {
  // @route GET admin/user
  // @desc Returns all users
  // @access Public
  async index(req, res) {
    const filter = {}

    if (req.query.accountNumber) {
      filter.accountNumber = new RegExp(req.query.accountNumber, 'i')
    }

    const users = await User.paginate(
      // filter,
      // {},
      {
        page: req.query.page || 1,
        limeit: 10,
        populate: ['accounts', 'Transaction'],
        sort: '-createdAt',
      }
    )
    res.status(200).json({ users })
  }

  // @route GET api/clients/{id}
  // @desc Returns a specific user
  // @access Public
  async show(req, res) {
    try {
      // const client = req.params.id
      const client = await User.findById(req.params.id)

      if (!client)
        return res.status(400).json({ message: 'Usuário não encontrado' })

      return res.json(client)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  // @route GET api/clients/{id}
  // @desc Returns a specific user
  // @access Public
  async findByCpf(req, res) {
    try {
      // const cpf = req.params.cpf
      const { cpf } = await User.findById(req.params.id)

      // const { cpf } = userCpf
      if (!cpf)
        return res.status(400).json({ message: 'Usuário não encontrado' })

      return res.json({ cpf })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  // @route PUT api/user/{id}
  // @desc Update user details
  // @access Public
  async update(req, res) {
    try {
      const update = req.body
      const id = req.params.id
      const user_id = req.user._id

      //Make sure the passed id is that of the logged in user
      if (user_id.toString() !== id.toString())
        return res.status(401).json({
          message: 'Desculpa, você não tem permição para alterar dados.',
        })

      const user = await User.findByIdAndUpdate(
        id,
        { $set: update },
        { new: true }
      )

      res.status(200).json({ user, message: 'User has been updated' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  // @route DESTROY api/user/{id}
  // @desc Delete User
  // @access Public
  async destroy(req, res) {
    try {
      const id = req.params.id
      const user_id = req.user._id

      //Make sure the passed id is that of the logged in user
      if (user_id.toString() !== id.toString())
        return res.status(401).json({
          message: "Sorry, you don't have the permission to delete this data.",
        })

      await User.findByIdAndDelete(id)
      res.status(200).json({ message: 'User has been deleted' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export default new ClientController()
