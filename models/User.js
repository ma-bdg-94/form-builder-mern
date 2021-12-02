const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  job: {
    type: String,
    required: true
  },
  pin: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const User = model('User', userSchema)
module.exports = User
