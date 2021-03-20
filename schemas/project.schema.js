const {model, Schema} = require('mongoose')

const projectSchema = new Schema({
  name: String,
  desc: String,
  date: String,
  users: [
    {
      email: String,
      rule: String
    }
  ],
  ownerId: {
    ref: 'User',
    type: Schema.Types.ObjectId
  }
})

module.exports = model('Project', projectSchema)