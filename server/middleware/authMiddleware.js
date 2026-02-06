import jwt from 'jsonwebtoken'

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1] // ← REQUIRED

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) // ← REQUIRED
    req.userId = decoded.userId
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

export default protect
