import User from '../models/user'

class ClientController {
  // @route GET admin/user
  // @desc Returns all users
  // @access Public
  async index(req, res) {
    const users = await User.find({})
    res.status(200).json({ users })
  }

  // @route GET api/clients/{id}
  // @desc Returns a specific user
  // @access Public
  async findById(req, res) {
    try {
      const id = req.params.id

      const user = await User.findById(id)

      if (!user)
        return res.status(401).json({ message: 'Usuário não encontrado' })

      res.status(200).json({ user })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  // @route GET api/clients/{id}
  // @desc Returns a specific user
  // @access Public
  async findByCpf(req, res) {
    try {
      const cpf = req.params.cpf
      const user = await User.findById(cpf)

      if (!user)
        return res.status(400).json({ message: 'Usuário não encontrado' })

      return res.json({ user })
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
