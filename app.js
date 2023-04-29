// 載入express
const express = require('express')
const app = express()
//載入handlebars樣板引擎
const exphbs = require('express-handlebars')
//session
const session = require('express-session')
//passport
const userPassport = require('./config/passport')
//flash
const flash = require('connect-flash')
//載入body-parser
const bodyParser = require('body-parser')

const methodOvrride = require('method-override')
//引用路由器
const routes = require('./routes')

require('./config/mongoose')


//載入handlebars樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
//session
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
// 呼叫Passport函式
userPassport(app)
//掛載flash
app.use(flash())
//設定Express路由以提供靜態檔案
app.use(express.static('public'))
app.use(methodOvrride('_method'))
//設定本地變數res.locals
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error = req.flash('error')
  next()
})
//將request導入路由器
app.use(routes)





app.listen(3000, () => {
  console.log(`Express is listening on localhost:3000`)
})