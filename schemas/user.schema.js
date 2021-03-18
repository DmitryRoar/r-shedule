const {model, Schema} = require('mongoose')

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  date: String,
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }
}) 

module.exports = model('User', userSchema)