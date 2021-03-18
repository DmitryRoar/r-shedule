const {model, Schema} = require('mongoose')

const projectSchema = new Schema({
  name: String,
  desc: String,
  date: String,
  users: [
    {
      email: String,
      rule: String,
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ]
})

module.exports = model('Project', projectSchema)