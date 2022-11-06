const express = require('express')
const router = express.Router()
// 引用 model
const List = require('../../models/list')

router.get('/', (req, res) => {
  const userId = req.user._id   // 變數設定
  List.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(lists => res.render('index', { lists }))
    .catch(error => console.error(error))
})

//搜尋功能
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const userId = req.user._id
  List.find({ userId })
    .lean()
    .then(lists => lists.filter(list => list.name.toLowerCase().includes(keyword) || list.category.toLowerCase().includes(keyword)))
    .then(lists => res.render('index', { lists, keyword }))
    .catch(error => console.error(error))
})

//分類功能
router.get('/sortby', (req, res) => {
  const sortitem = req.query.sort //分類項目
  const userId = req.user._id

  if (sortitem === "name") {
    return List.find({ userId })
      .lean()
      .sort({ name: 'asc' }) //照分類項目排正序
      .then(lists => res.render('index', { lists }))
      .catch(error => console.error(error))
  } else if (sortitem === "name-deasc") {
    return List.find({ userId })
      .lean()
      .sort({ name: 'desc' })
      .then(lists => res.render('index', { lists }))
      .catch(error => console.error(error))
  } else if (sortitem === "category") {
    return List.find({ userId })
      .lean()
      .sort({ category: 'asc' })
      .then(lists => res.render('index', { lists }))
      .catch(error => console.error(error))
  } else if (sortitem === "location") {
    return List.find({ userId })
      .lean()
      .sort({ location: 'asc' })
      .then(lists => res.render('index', { lists }))
      .catch(error => console.error(error))
  }
})

// 匯出路由模組
module.exports = router