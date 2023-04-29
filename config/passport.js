const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const FBStrategy = require('passport-facebook').Strategy

module.exports = app => {
  //初始化模組
  app.use(passport.initialize())
  app.use(passport.session())
  //設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    //驗證身分
    User.findOne({ email })
      .then(user => {
        if(!user) {//未找到該註冊用戶
          console.log(req.flash)
          return done(null, false, req.flash('error', 'That email is not registered!'))
        }
        return bcrypt.compare(password, user.password).then( isMatch => {
          if(!isMatch) { //密碼錯誤
            return done(null, false, req.flash('error', 'Password incorrect!'))
          }
          return done(null, user)//密碼正確
        })
      })
      .catch(err => done(err, false))
  }))
  //設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
  //第三方登陸
  passport.use(new FBStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  },(accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    User.findOne({ email })
      .then(user => {
        if(user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done(err, false))
      })
  }))
}