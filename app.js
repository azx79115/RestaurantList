// 載入express
const express = require('express')
const app = express()
//載入handlebars樣板引擎
const exphbs = require('express-handlebars')
//session
const seesion = require('express-session')
//passport

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
app.use(session({
  secret: 'ThisIsMySecret',
  reasve: false,
  saveUninitialized: true
}))
//設定Express路由以提供靜態檔案
app.use(express.static('public'))
app.use(methodOvrride('_method'))
//將request導入路由器
app.use(routes)





app.listen(3000, () => {
  console.log(`Express is listening on localhost:3000`)
})