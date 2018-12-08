const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const appConfig = require('../config/index.js').APP

// 引入connect函数
const { connect, initSchema } = require('../core/init.js')

// 初始化路由
let admin = require('../router/admin.js')
router.use('/admin',admin.routes())
app.use(router.routes())
app.use(router.allowedMethods())

;(async () => {
  await connect()
  initSchema()
})()

app.listen(appConfig.port,() => {
  console.log('[Server] starting at port '+appConfig.port)
})