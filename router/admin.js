const Router = require('koa-router')
const mongoose = require('mongoose')
const router = new Router()
const {REGISTERSUCCESS, REGISTERFAIL} = require('../config/message.js')

router.post('/register',async(ctx) => {
  const User = mongoose.Model('User')
  let newUser = User(ctx.request.body)
  await newUser.save().then(() => {
    ctx.body = {
      code: 200,
      msg: REGISTERSUCCESS
    }
  }).catch(error => {
    ctx.body = {
      code:500,
      msg: error
    }
  })
})

module.exports = router