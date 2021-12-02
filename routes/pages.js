const express = require('express')
const crypto = require('crypto')
const { check, validationResult } = require('express-validator')

// ---import authentication middleware---
const authenticated = require('../middleware/authenticated')

// ---import models---
const User = require('../models/User')
const Page = require('../models/Page')

const Router = express()

// ---Test Route---
Router.get('/test', (req, res) => {
  res.send("Pages' Route...")
})

// ---add new page---
// Auth required: YES --- Method: POST
Router.post(
  '/',
  [
    authenticated,
    [
      check('title', 'Must include a title for the page')
        .not()
        .isEmpty(),
      check('desc', 'Must include a description for the page')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array({ onlyFirstError: true }) })
    }

    const { title, desc } = req.body

    try {
      // ---generate page link---
      const link = crypto.randomBytes(3).toString('hex')

      const newPage = new Page({
        admin: req.user.id,
        title,
        desc,
        link
      })

      const page = await newPage.save()
      res.json(page)
    } catch (er) {
      console.error(er.message)
      res.status(500).send('Server Error! Something went wrong!')
    }
  }
)

// ---get all pages sorted by date creation: display the most recent first---
// Auth required: NO --- Method: GET
Router.get('/', async (req, res) => {
  try {
    const pages = await Page.find()
      .sort({ createdAt: -1 })
      .populate('admin', ['fullName', 'job'])

    // ---check if there are pages---
    if (pages.length === 0) {
      return res.status(404).json({
        msg: 'No pages found!'
      })
    }

    res.json(pages)
  } catch (er) {
    console.error(er.message)
    res.status(500).send('Server Error! Something went wrong!')
  }
})

// ---get all pages of current admin sorted by date creation: display the most recent first---
// Auth required: YES --- Method: GET
Router.get('/admin/me', authenticated, async (req, res) => {
  try {
    const pages = await Page.find({ admin: req.user.id })
      .sort({ createdAt: -1 })
      .populate('admin', ['fullName', 'job'])

    // ---check if there are pages---
    if (pages.length === 0) {
      return res.status(404).json({
        msg: 'You have no pages yet! Please create now'
      })
    }

    res.json(pages)
  } catch (er) {
    console.error(er.message)
    res.status(500).send('Server Error! Something went wrong!')
  }
})

// ---get pages of given admin---
// Auth required: NO --- Method: GET
Router.get('/admin/:admin', async (req, res) => {
  try {
    const pages = await Page.find({ admin: req.params.admin }).populate(
      'admin',
      ['fullName', 'job']
    )

    // ---check if there are pages---
    if (pages.length === 0) {
      return res.status(404).json({
        msg: 'This admin has no pages!'
      })
    }

    res.json(pages)
  } catch (er) {
    console.error(er.message)

    if (er.kind == 'ObjectId') {
      return res.status(404).json({
        msg: 'This admin has no pages!'
      })
    }

    res.status(500).send('Server Error! Something went wrong!')
  }
})

// ---get page by link---
// Auth required: NO --- Method: GET
Router.get('/:link', async (req, res) => {
  try {
    const page = await Page.findOne({ link: req.params.link }).populate(
      'admin',
      ['fullName', 'job']
    )

    // ---check if there is a page with given link---
    if (!page) {
      return res.status(404).json({
        msg: 'Page not found!'
      })
    }

    res.json(page)
  } catch (er) {
    console.error(er.message)

    if (er.kind == 'ObjectId') {
      return res.status(404).json({
        msg: 'Page not found!'
      })
    }

    res.status(500).send('Server Error! Something went wrong!')
  }
})

// ---remove given page---
// Auth required: YES --- Method: DELETE
Router.delete('/:id', authenticated, async (req, res) => {
  try {
    const page = await Page.findById(req.params.id)

    // ---check if there is a page with given id---
    if (!page) {
      return res.status(404).json({
        msg: 'Page not found!'
      })
    }

    // ---check if authenticated user is the admin---
    if (page.admin.toString() !== req.user.id) {
      return res.status(401).json({
        msg: 'Not Authorized! Access denied'
      })
    }

    await page.remove()

    res.json({ msg: 'Page removed succuessfully' })
  } catch (er) {
    console.error(er.message)

    if (er.kind == 'ObjectId') {
      return res.status(404).json({
        msg: 'Page not found!'
      })
    }

    res.status(500).send('Server Error! Something went wrong!')
  }
})

// ---update given page---
// Auth required: YES --- Method: PUT
Router.put('/:id', authenticated, async (req, res) => {
  const { title, desc } = req.body

  // ---check if entries are already submitted---
  const pageEntries = {}
  pageEntries.admin = req.user.id
  if (title) pageEntries.title = title
  if (desc) pageEntries.desc = desc

  try {
    let page = await Page.findById(req.params.id)

    // ---check if there is a page with given id---
    if (!page) {
      return res.status(404).json({
        msg: 'Page not found!'
      })
    }

    // ---check if authenticated user is the admin---
    if (page.admin.toString() !== req.user.id) {
      return res.status(401).json({
        msg: 'Not Authorized! Access denied'
      })
    }

    page = await Page.findOneAndUpdate(
      { _id: req.params.id, admin: req.user.id },
      { $set: pageEntries },
      { new: true }
    )

    res.json(page)
  } catch (er) {
    console.error(er.message)

    if (er.kind == 'ObjectId') {
      return res.status(404).json({
        msg: 'Page not found!'
      })
    }

    res.status(500).send('Server Error! Something went wrong!')
  }
})

module.exports = Router
