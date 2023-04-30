const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/Restaurant')

//新增餐廳介面
router.get('/new', (req, res) => {
  res.render('new')
})

//接受新增的資料
router.post('/', (req, res) => {
  const restaurantData = req.body
  const userId = req.user._id
  Restaurant.create({ ...restaurantData, userId })//存入資料庫
    .then(restaurant => {
      const id = restaurant._id
      res.redirect(`/restaurants/${id}`)
    })
    .catch(error => console.log(error))
})

//瀏覽特定資料
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ _id, userId })//使用findOne必須以mongoDB相同的_id去查詢
    .lean()
    .then((restaurantData) => res.render('show', { restaurantData }))
    .catch(err => console.log(err))
})

//編輯資料
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurantData) => res.render('edit', { restaurantData }))
    .catch(error => console.log(error))
})
//儲存編輯資料
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const editData = req.body
  Restaurant.findByIdAndUpdate({ _id, userId}, editData)
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})
//刪除資料
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user.id
  Restaurant.findByIdAndDelete({ _id, userId})
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router