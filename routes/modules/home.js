// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 restaurant model
const Restaurant = require('../../models/Restaurant')

//定義首頁路由
router.get('/', (req, res) => {
  Restaurant.find()//取出Restaurant裡的資料
    .lean()//把Mongoose的Model物件轉換成乾淨的js資料陣列
    .then(lists => res.render('index', { lists }))//將資料傳給index樣板
    .catch(error => console.error(error))//錯誤處理
})

//設定搜尋路由
router.get('/search', (req, res) => {
  // if(!req.query.keywords) {
  //   res.redirect('/')
  // }

  const keywords = req.query.keywords
  const Keyword = req.query.keywords.trim().toLowerCase()
  Restaurant.find({})
    .lean()
    .then(lists => {
      const searchRestaurant = lists.filter(
        data => 
          data.name.toLowerCase().includes(Keyword) || 
          data.category.includes(Keyword))
      res.render('index', { lists: searchRestaurant, keywords })
    })
    .catch(err => console.log(err))
})

//匯出路由模組
module.exports = router