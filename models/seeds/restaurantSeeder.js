const db = require('../../config/mongoose')
const Restaurant = require('../Restaurant')
const restaurantList = require('../../restaurant.json').results // 載入list model
const bcrypt = require('bcryptjs')
const User = require('../user')
const UserList = require('./users.json')

db.once('open', () => {
  console.log('running restaurantSeeder script...')

  const promise = UserList.map(USER => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(USER.password, salt))
      .then(hash => User.create({
        name: USER.name,
        email: USER.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        const name = user.name
        let restaurant = []
        if (name === UserList[0].name) {
          restaurant = restaurantList.slice(0, 3)
        } else {
          restaurant = restaurantList.slice(3, 6)
        }
        return Restaurant.create(
          restaurant.map(r => Object.assign(r, { userId }))
        )
      })
      .catch(err => console.log(err))
  })

  Promise.all(promise)
    .then(() => {
      console.log('restaurantSeeder done!')
      process.exit()
    })
    .catch(err => console.log(err))
})
