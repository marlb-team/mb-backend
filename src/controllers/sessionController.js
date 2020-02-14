import User from '../database/schemas/clientSchema'

class SessionController {
  async store(req, res) {
    try {
      const { cpf, password } = req.body

      const user = await User.findOne({ cpf })
      // const token = user.generateToken()

      if (!user) {
        res.status(400).json({ message: 'Usuário não encontrado' })
      }

      if (!(await user.comparePassword(password))) {
        return res.status(400).json({ message: 'senha inválida' })
      }

      return res.json({ user, token: user.generateToken(user) })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export default new SessionController()
