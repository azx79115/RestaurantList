// 載入express
const express = require('express')
const app = express()
//載入handlebars樣板引擎
const exphbs = require('express-handlebars')

const restaurantData = require('./restaurant.json').results

const port = 3000
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

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})