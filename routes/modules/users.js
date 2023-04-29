const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')


//登入首頁
router.get('/login', (req, res) => {
  res.render('login')
})

//確認使用者登入
router.post('login', (req, res) => {
  
})

//註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

//接受註冊表單
router.post('/register', (req, res) => {
  //取得表單參數
  const { name, email, password, confirmPassword } = req.body
  //錯誤訊息
  const errors = []
  if(!email || !password) {
    errors.push({ message: '信箱和密碼必須填寫' })
  }
  if(password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符' })
  }
  if(errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  //檢查使用者有沒有註冊過
  User.findOne({ email }).then( user => {
    //如果已經註冊，返回註冊畫面
    if(user) {
      errors.push({ message: '這個 Email 已經註冊過囉~ '})
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    //如果未註冊，寫入資料庫
    return bcrypt
      .genSalt(10)//產生鹽，複雜度為10
      .then(salt => bcrypt.hash(password, salt))//為使用者密碼加鹽，產生雜湊值
      .then(hash => User.create({
        name,
        email,
        password: hash//用雜湊值取代原本的密碼
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})

module.exports = router