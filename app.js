// 載入express
const express = require('express')
const app = express()
//載入handlebars樣板引擎
const exphbs = require('express-handlebars')
//載入restaurant model
const Restaurant = require('./models/Restaurant')
// 載入 mongoose
const mongoose = require('mongoose') 
//載入body-parser
const bodyParser = require('body-parser')

const methodOvrride = require('method-override')
//引用路由器
const routes = require('./routes')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB



const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})




// const restaurantData = require('./restaurant.json').results

//載入handlebars樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
//設定Express路由以提供靜態檔案
app.use(express.static('public'))
app.use(methodOvrride('_method'))
//將request導入路由器
app.use(routes)





app.listen(3000, () => {
  console.log(`Express is listening on localhost:3000`)
})