// 載入express
const express = require('express')
const app = express()
//載入handlebars樣板引擎
const exphbs = require('express-handlebars')
// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose') // 載入 mongoose
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




const restaurantData = require('./restaurant.json').results

//載入handlebars樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//設定Express路由以提供靜態檔案
app.use(express.static('public'))

//show介面路由設定
app.get('/restaurants/:list_id', (req, res) => {
  console.log(req.params.list_id)
  const list = restaurantData.find( list => list.id.toString() === req.params.list_id)
  res.render('show', { restaurant: list })
})
//設定搜尋路由
app.get('/search', (req, res) => {
  if(!req.query.keywords) {
    return res.redirect('/')
  }

  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()

  const filterRestaurantData = restaurantData.filter( data => data.name.toLowerCase().includes(keyword) || data.category.includes(keyword))
  res.render('index', { restaurantData: filterRestaurantData, keywords })
})

//渲染index介面
app.get('/', (req, res) => {
  res.render('index', { restaurantData })
})

app.listen(3000, () => {
  console.log(`Express is listening on localhost:3000`)
})