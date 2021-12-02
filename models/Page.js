const { Schema, model } = require('mongoose')

const pageSchema = new Schema({
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  link: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Page = model('Page', pageSchema)
module.exports = Page
