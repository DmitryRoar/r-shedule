module.exports = (req, res, next) => {
  if (!req.cookies.user) {
    return res.status(401).json({error: 'Время сессии истекло'})
  }

  next()
}