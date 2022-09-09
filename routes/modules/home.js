const express = require('express')
const router = express.Router()
// 引用 model
const List = require('../../models/list')

router.get('/', (req, res) => {
  List.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(lists => res.render('index', { lists }))
    .catch(error => console.error(error))
})
// 匯出路由模組
module.exports = router