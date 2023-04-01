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


//設定搜尋路由
app.get('/search', (req, res) => {
  const Keyword = req.query.keywords.trim().toLowerCase()
  Restaurant.find({})
  .lean()
  .then( lists => {
    const searchRestaurant = lists.filter( data => data.name.toLowerCase().includes(Keyword) || data.category.includes(Keyword) )
    res.render('index', { lists:searchRestaurant , wordValue:req.query.keywords})
  })
  .catch( err => console.log(err))
})

//渲染index介面
app.get('/', (req, res) => {
  Restaurant.find()//取出Restaurant裡的資料
  .lean()//把Mongoose的Model物件轉換成乾淨的js資料陣列
  .then(lists => res.render('index', { lists }))//將資料傳給index樣板
  .catch(error => console.error(error))//錯誤處理
})

//新增餐廳介面
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

//接受新增的資料
app.post('/restaurants', (req, res) => {
  Restaurant.create(req.body)//存入資料庫
  .then(() => res.redirect('/'))//新增完成後導回首頁
  .catch(error => console.log(error))
})

//瀏覽特定資料
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
  .lean()
  .then((restaurantData) => res.render('show', { restaurantData }))
  .catch( err => console.log(err))
})

//編輯資料
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  Restaurant.findById(id)
  .lean()
  .then((restaurantData) => res.render('edit', { restaurantData }))
  .catch(error => console.log(error))
})
//儲存資料
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const editData = req.body
  Restaurant.findByIdAndUpdate(id, editData)
  .then( () => res.redirect(`/restaurants/${id}`))
  .catch(error => console.log(error))
})
//刪除資料
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(list => list.remove())
    .then( () => res.redirect('/'))
    .catch(error => console.log(error))
})


app.listen(3000, () => {
  console.log(`Express is listening on localhost:3000`)
})