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
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurantData) => res.render('show', { restaurantData }))
    .catch(err => console.log(err))
})

//編輯資料
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  Restaurant.findById(id)
    .lean()
    .then((restaurantData) => res.render('edit', { restaurantData }))
    .catch(error => console.log(error))
})
//儲存資料
router.put('/:id', (req, res) => {
  const id = req.params.id
  const editData = req.body
  Restaurant.findByIdAndUpdate(id, editData)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})
//刪除資料
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(list => list.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router