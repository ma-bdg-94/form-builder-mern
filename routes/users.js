const express = require('express')
const config = require('config')
const { check, validationResult } = require('express-validator')
const { genSalt, hash } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

// ---import User model---
const User = require('../models/User')

const Router = express.Router()

// ---Test Route---
Router.get('/', (req, res) => {
  res.send("Users' Route...")
})

// ---sign up new user---
// Auth required: NO --- Method: POST
Router.post(
  '/',
  [
    check('fullName')
      .not()
      .isEmpty()
      .withMessage('Must include your full name!'),
    check('username')
      .not()
      .isEmpty()
      .withMessage('Must include a username!')
      .isAlphanumeric()
      .withMessage('Must include only letters and numbers!'),
    check('job')
      .not()
      .isEmpty()
      .withMessage('Must include your job title!'),
    check('pin')
      .not()
      .isEmpty()
      .withMessage('Must include a pin code!')
      .isNumeric()
      .withMessage('Pin code contains only numbers!')
      .isLength({ min: 4, max: 4 })
      .withMessage('Pin code contains only 4 digits!')
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array({ onlyFirstError: true }) })
    }

    const { fullName, username, job, pin } = req.body

    try {
      let user = await User.findOne({ username })

      // --check whether user already exists--
      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'Already existing user with those credentials!' }]
        })
      }

      user = new User({
        fullName,
        username,
        job,
        pin
      })

      // ---encrypt pin code---
      const salt = await genSalt(12)
      user.pin = await hash(pin, salt)

      await user.save()

      // ---return JWT---
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
