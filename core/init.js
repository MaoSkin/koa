const mongoose = require('mongoose')
const glob = require('glob')
const { resolve } = require('path')
const appConfig = require('../config/index.js').APP
exports.initSchema = () => { 
  glob.sync(resolve(__dirname,'../models','*.js')).forEach(require)
}

exports.connect = function() {
  let MAXCONNECTTIMES = 0
  
  // 链接数据库
  mongoose.connect(`${appConfig.db}${appConfig.dbName}`)

  return new Promise((resolve,reject) => {
    mongoose.connection.on('disconnected',() => {
      console.log('*************数据库链接中断************')
      if(MAXCONNECTTIMES < 3) {
        MAXCONNECTTIMES++
      } else {
        reject('数据库链接中断')
      }
    })

    mongoose.connection.on('error',error => {
      console.log('*************数据库链接出错************')
      if(MAXCONNECTTIMES < 3) {
        MAXCONNECTTIMES++
      } else {
        reject(error)
        throw new Error('数据库链接出错')
      }
    })

    mongoose.connection.once('open',() => {
      console.log('*****************数据库链接成功***************')
      resolve()
    })
  })
}

