const UserSchema = require('../schemas/user.schema')

module.exports = async (req, _, next) => {
  // if (req.session.user == undefined) {
    // return next()
  // }
  
  // req.user = await UserSchema.findById(req.session.user._id)
  next()
}