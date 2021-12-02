const express = require('express')
const config = require('config')
const { check, validationResult } = require('express-validator')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

// ---import User model---
const User = require('../models/User')

// ---import authentication middleware---
const authenticated = require('../middleware/authenticated')

const Router = express.Router()

// ---Test Route---
Router.get('/test', (req, res) => {
  res.send('Auth Route...')
})

// ---get authenticated user---
// Auth required: YES --- Method: GET
Router.get('/', authenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-pin')
    res.json(user)
  } catch (er) {
    console.error(er.message)
    res.status(500).send('Server Error! Something went wrong!')
  }
})

// ---sign in user---
// Auth required: NO --- Method: POST
Router.post(
  '/',
  [
    check('username')
      .not()
      .isEmpty()
      .withMessage('Required username!'),
    check('pin')
      .exists()
      .withMessage('Required pin code!')
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() })
    }

    const { username, pin } = req.body

    try {
      let user = await User.findOne({ username })

      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'Cannot find user with those credentials!' }]
        })
      }

      // ---check pin match---
      const match = await compare(pin, user.pin)
      if (!match) {
        return res.status(400).json({
          errors: [{ msg: 'Cannot find user with those credentials!' }]
        })
      }

      const payload = {
        user: {
          id: user.id
        }
      }
      sign(
        payload,
        config.get('jwt-secret'),
        { expiresIn: '1h' },
        (error, token) => {
          if (error) throw error
          res.json({ token })
        }
      )
    } catch (er) {
      console.error(er.message)
      res.status(500).send('Server Error! Something went wrong!')
    }
  }
)

module.exports = Router
