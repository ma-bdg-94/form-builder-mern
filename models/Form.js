const { Schema, model } = require('mongoose')

const formSchema = new Schema({
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  pages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Page'
    }
  ],
  title: {
    type: String,
    required: true
  },
  questions: [
    {
      questionDesc: {
        type: String,
        required: true
      },
      questionType: {
        type: String,
        required: true
      },
      isRequired: {
        type: Boolean,
        default: false
      },
      answers: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
          },
          answerer: {
            type: String
          },
          answerValue: {
            type: Schema.Types.Mixed
          }
        }
      ]
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Form = model('Form', formSchema)
module.exports = Form
