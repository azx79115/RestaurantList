//引用Express 與 Express路由器
const express = require('express')
const router = express.Router()
//引入home模組程式碼
const home = require('./modules/home')
//引入restaurant模組程式碼
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')

//將網址結構符合/restaurants字串的request導向 restaurant模組
router.use('/restaurants', restaurants)
router.use('/users', users)
//將網址結構符合/ 字串的request 導向home 模組
router.use('/', home)





//匯出路由器
module.exports = router