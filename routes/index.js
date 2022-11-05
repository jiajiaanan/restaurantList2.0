const express = require('express')
const router = express.Router()
const users = require('./modules/users')

// 引入路由模組程式碼
const home = require('./modules/home')
const lists = require('./modules/lists')


router.use('/users', users)

// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/', home)

// 將網址結構符合 /lists 字串開頭的 request 導向 lists 模組 
router.use('/lists', lists)

// 匯出路由器
module.exports = router