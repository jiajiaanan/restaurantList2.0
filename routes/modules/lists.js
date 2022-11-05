const express = require('express')
const router = express.Router()
const List = require('../../models/list')
// 彙整lists相關路由

//new頁面路由
router.get('/new', (req, res) => {
  return res.render('new')
})

//show頁面路由
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return List.findOne({ _id, userId }) //從資料庫查出該使用者資料
    .lean()
    .then((list) => res.render('show', { list }))
    .catch(error => console.log(error))
})

//edit頁面路由
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return List.findOne({ _id, userId })
    .lean() //把資料變成單純陣列
    .then((list) => res.render('edit', { list }))
    .catch(error => console.log(error))
})

//Create功能
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return List.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//Update功能
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return List.findOne({ _id, userId }) //查詢單筆資料
    .then(list => {
      list.name = req.body.name
      list.name_en = req.body.name_en
      list.category = req.body.category
      list.image = req.body.image
      list.location = req.body.location
      list.phone = req.body.phone
      list.google_map = req.body.google_map
      list.rating = req.body.rating
      list.description = req.body.description
      console.log('data updated')
      return list.save() //重新儲存單筆資料
    })
    .then(() => res.redirect(`/lists/${_id}`)) //導向detail頁
    .catch(error => console.log(error))
})

//Delete功能
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return List.findOne({ _id, userId }) //查詢該筆資料
    .then(list => list.remove()) //刪除該筆資料
    .then(() => res.redirect('/')) //導向根目錄頁
    .catch(error => console.log(error))
})

module.exports = router