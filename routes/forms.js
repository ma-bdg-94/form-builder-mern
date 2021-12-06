const express = require('express')
const { check, validationResult } = require('express-validator')

// ---import authentication middleware---
const authenticated = require('../middleware/authenticated')

// ---import models---
const User = require('../models/User')
const Page = require('../models/Page')
const Form = require('../models/Form')

const Router = express()

// ---Test Route---
Router.get('/test', (req, res) => {
  res.send("Forms' Route...")
})

// ---add new form independently from any page---
// Auth required: YES --- Method: POST
Router.post(
  '/',
  [
    authenticated,
    [
      check('title', 'Must include a title or short description for the form')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const newForm = new Form({
        admin: req.user.id,
        title: req.body.title
      })

      const form = await newForm.save()
      res.json(form)
    } catch (er) {
      console.error(er.message)
      res.status(500).send('Server Error! Something went wrong!')
    }
  }
)

// ---assign form to a page---
// Auth required: YES --- Method: POST
Router.post('/page/:form_id/:page_id', authenticated, async (req, res) => {
  try {
    let page = await Page.findById(req.params.page_id)
    let form = await Form.findById(req.params.form_id)

    // ---check if given page exists---
    if (!page) {
      return res.status(404).json({
        msg: 'Page not found!'
      })
    }

    // ---check if given form exists---
    if (!page) {
      return res.status(404).json({
        msg: 'Form not found!'
      })
    }

    if (
      page.admin.toString() !== req.user.id ||
      form.admin.toString() !== req.user.id
    ) {
      return res.status(401).json({
        msg: 'Not Authorized! Access denied'
      })
    }

    form.pages.push(page)
    await form.save()

    res.json(form)
  } catch (er) {
    console.error(er.message)
    res.status(500).send('Server Error! Something went wrong!')
  }
})

// ---get all forms---
// Auth required: YES --- Method: GET
Router.get('/', authenticated, async (req, res) => {
  try {
    const forms = await Form.find().populate('admin', 'fullName')
    res.json(forms)
  } catch (er) {
    console.error(er.message)
    res.status(500).send('Server Error! Something went wrong!')
  }
})

// ---get form by id---
// Auth required: YES --- Method: GET
Router.get('/:id', authenticated, async (req, res) => {
  try {
    const form = await Form.findOne({_id: req.params.id}).populate('admin', 'fullName')
    res.json(form)
  } catch (er) {
    console.error(er.message)
    res.status(500).send('Server Error! Something went wrong!')
  }
})

// ---get all forms of current admin sorted by date creation: display the most recent first---
// Auth required: YES --- Method: GET
Router.get('/admin/me', authenticated, async (req, res) => {
  try {
    const forms = await Form.find({ admin: req.user.id })
      .sort({ createdAt: -1 })
      .populate('admin', ['fullName', 'job'])

    // ---check if there are pages---
    if (forms.length === 0) {
      return res.status(404).json({
        msg: 'You have no forms yet! Please create now'
      })
    }

    res.json(forms)
  } catch (er) {
    console.error(er.message)
    res.status(500).send('Server Error! Something went wrong!')
  }
})

// ---remove form---
// Auth required: YES --- Method: DELETE
Router.delete('/:id', authenticated, async (req, res) => {
  try {
    const form = await Form.findById(req.params.id)

    if (!form) {
      return res.status(404).json({
        msg: 'Form not found!'
      })
    }

    if (form.admin.toString() !== req.user.id) {
      return res.status(401).json({
        msg: 'Not Authorized! Access denied'
      })
    }

    await form.remove()

    res.json({ msg: 'Form removed succuessfully' })
  } catch (er) {
    console.error(er.message)

    if (er.kind == 'ObjectId') {
      return res.status(404).json({
        msg: 'Form not found!'
      })
    }

    res.status(500).send('Server Error! Something went wrong!')
  }
})

// ---update given form---
// Auth required: YES --- Method: PUT
Router.put('/:id', authenticated, async (req, res) => {
  // ---check if form title is already submitted---
  const formEntries = {}
  formEntries.admin = req.user.id
  if (req.body.title) formEntries.title = req.body.title

  try {
    let form = await Form.findById(req.params.id)

    if (!form) {
      return res.status(404).json({
        msg: 'Form not found!'
      })
    }

    // ---check if authenticated user is the admin---
    if (form.admin.toString() !== req.user.id) {
      return res.status(401).json({
        msg: 'Not Authorized! Access denied'
      })
    }

    form = await Form.findOneAndUpdate(
      { _id: req.params.id, admin: req.user.id },
      { $set: formEntries },
      { new: true }
    )

    res.json(form)
  } catch (er) {
    console.error(er.message)

    if (er.kind == 'ObjectId') {
      return res.status(404).json({
        msg: 'Form not found!'
      })
    }

    res.status(500).send('Server Error! Something went wrong!')
  }
})

// ---add new question---
// Auth required: YES --- Method: POST
Router.post(
  '/question/:form_id',
  [
    authenticated,
    [
      check('questionDesc', 'Must include a question content')
        .not()
        .isEmpty(),
      check('questionType', 'Must precise the question type').isIn([
        'text',
        'paragraph',
        'checkbox',
        'date-time',
        'number',
        'radio',
        'phone',
        'url',
      ])
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array({ onlyFirstError: true }) })
    }

    const { questionDesc, questionType, isRequired } = req.body

    try {
      let form = await Form.findOne({ _id: req.params.form_id })

      if (!form) {
        return res.status(404).json({
          msg: 'Form not found!'
        })
      }

      if (form.admin.toString() !== req.user.id) {
        return res.status(401).json({
          msg: 'Not Authorized! Access denied'
        })
      }

      const newQuest = { questionDesc, questionType, isRequired }
      form.questions.push(newQuest)

      await form.save()
      res.json(form.questions)
    } catch (er) {
      console.error(er.message)

      if (er.kind == 'ObjectId') {
        return res.status(404).json({
          msg: 'Form not found!'
        })
      }

      res.status(500).send('Server Error! Something went wrong!')
    }
  }
)

// ---remove question---
// Auth required: YES --- Method: DELETE
Router.delete(
  '/question/:form_id/:quest_id',
  authenticated,
  async (req, res) => {
    try {
      const form = await Form.findOne({ _id: req.params.form_id })

      if (!form) {
        return res.status(404).json({
          msg: 'Form not found!'
        })
      }

      if (form.admin.toString() !== req.user.id) {
        return res.status(401).json({
          msg: 'Not Authorized! Access denied'
        })
      }

      // ---extract question to remove---
      const question = form.questions.find(qs => qs.id === req.params.quest_id)
      if (!question) {
        return res.status(404).json({
          msg: 'Question not found!'
        })
      }

      const remIndex = form.questions
        .map(qs => qs._id.toString())
        .indexOf(req.params.quest_id)
      form.questions.splice(remIndex, 1)

      await form.save()
      res.json(form)
    } catch (er) {
      console.error(er.message)
      res.status(500).send('Server Error! Something went wrong!')
    }
  }
)

// ---update question---
// Auth required: YES --- Method: DELETE
Router.put('/question/:form_id/:quest_id', authenticated, async (req, res) => {
  const { questionDesc, questionType, isRequired } = req.body

  const questEntries = {}
  if (questionDesc) questEntries.questionDesc = questionDesc
  if (questionType) questEntries.questionType = questionType
  if (isRequired) questEntries.isRequired = isRequired

  try {
    const form = await Form.findOne({ _id: req.params.form_id })

    if (!form) {
      return res.status(404).json({
        msg: 'Form not found!'
      })
    }

    if (form.admin.toString() !== req.user.id) {
      return res.status(401).json({
        msg: 'Not Authorized! Access denied'
      })
    }

    // ---extract question to update---
    const question = form.questions.find(qs => qs.id === req.params.quest_id)
    if (!question) {
      return res.status(404).json({
        msg: 'Question not found!'
      })
    }

    const updIndex = form.questions
      .map(qs => qs._id.toString())
      .indexOf(req.params.quest_id)

    form.questions[updIndex] = questEntries

    await form.save()
    res.json(form)
  } catch (er) {
    console.error(er.message)
    res.status(500).send('Server Error! Something went wrong!')
  }
})

// ---answer question---
// Auth required: YES --- Method: POST
Router.post('/question/:form_id/:quest_id', authenticated, async (req, res) => {
  try {
    const form = await Form.findOne({ _id: req.params.form_id })
    const user = await User.findById(req.user.id).select('-pin')

    if (!form) {
      return res.status(404).json({
        msg: 'Form not found!'
      })
    }

    // ---extract question to answer---
    const question = form.questions.find(qs => qs.id === req.params.quest_id)
    if (!question) {
      return res.status(404).json({
        msg: 'Question not found!'
      })
    }

    const updIndex = form.questions
      .map(qs => qs._id.toString())
      .indexOf(req.params.quest_id)

    const newAnswer = {
      user: req.user.id,
      answerer: user.fullName,
      answerValue: req.body.answerValue
    }

    form.questions[updIndex].answers.push(newAnswer)

    await form.save()
    res.json(form.questions[updIndex])
  } catch (er) {
    console.error(er.message)
    res.status(500).send('Server Error! Something went wrong!')
  }
})

module.exports = Router
