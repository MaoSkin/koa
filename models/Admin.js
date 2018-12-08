const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

// 创建用户SChema
const userSchema = new Schema({
  UserId: {type: ObjectId},
  avator: String,
  username: {unique: true,type: String,required: true},
  password: {type: String,required: true},
  phone: Number,
  createDt: String,
  lastDt: String
},{
  collection: 'admin'
})

// 保存密码
userSchema.pre('save',function(next) {
  bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt) => {
     if(err) return next(err)
     bcrypt.hash(this.password,(err,hash) => {
       if(err) return next(err)
       this.password = hash
       next()
     })
  })
})

userSchema.methods = {
  comparePassword: (_password,password) => {
    return new Promise((resolve,reject) => {
      bcrypt.compare(_password,password,(err,isMatch) => {
        if(!err) {
          resolve(isMatch)
        } else {
          reject(err)
        }
      })
    })
  }
}

// 发布模型
mongoose.model('User',userSchema)