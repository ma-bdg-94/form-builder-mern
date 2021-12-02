const config = require('config')
const { verify } = require('jsonwebtoken')

module.exports = (req, res, next) => {
  // ---get token from request header---
  const token = req.header('x-auth-token')

  // ---check whether token exists---
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'Token not found or invalid! Access denied' })
  }

  try {
    const decryptedToken = verify(token, config.get('jwt-secret'))
    req.user = decryptedToken.user
    next()
  } catch (er) {
    res.status(401).json({ msg: 'Token not found or invalid! Access denied' })
  }
}
