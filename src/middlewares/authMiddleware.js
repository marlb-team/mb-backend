import jwt from 'jsonwebtoken'
import { promisify } from 'util'

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      auth: false,
      error: 'Você precisa estar logado para acessar este endereço',
    })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.APP_JWT_SECRET
    )

    req.userId = decoded.id

    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Token invalido' })
  }
}
