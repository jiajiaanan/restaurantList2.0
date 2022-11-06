const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const List = require('../list') // 載入 model
const User = require('../user')
const restaurantList = require('../restaurant.json')
const db = require('../../config/mongoose')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

db.once('open', () => {
  console.log('seeder mongodb connected!')
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: 8 },
        (_, i) => List.create(
          {
            name: restaurantList.results[i].name,
            name_en: restaurantList.results[i].name_en,
            category: restaurantList.results[i].category,
            image: restaurantList.results[i].image,
            location: restaurantList.results[i].location,
            phone: restaurantList.results[i].phone,
            google_map: restaurantList.results[i].google_map,
            rating: restaurantList.results[i].rating,
            description: restaurantList.results[i].description,
            userId
          })
      ))

    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})