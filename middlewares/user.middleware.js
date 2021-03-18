const UserSchema = require('../schemas/user.schema')

module.exports = async (req, _, next) => {
  if (req.cookies.userId == undefined) {
    return next()
  }
  
  req.user = await UserSchema.findById(req.cookies.userId)
  next()
}