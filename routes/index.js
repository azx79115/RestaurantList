//引用Express 與 Express路由器
const express = require('express')
const router = express.Router()
//引入home模組程式碼
const home = require('./modules/home')
//引入restaurant模組程式碼
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const auth = require('./modules/auth')
//掛載middleware
const { authenticator } = require('../middleware/auth')

//將網址結構符合/restaurants字串的request導向 restaurant模組
router.use('/restaurants', restaurants)
router.use('/users', users)
router.use('/auth', auth) 
//將網址結構符合/ 字串的request,並經由middleware驗證，導向home 模組
router.use('/', authenticator, home)





//匯出路由器
module.exports = router