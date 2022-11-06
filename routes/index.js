const express = require('express')
const router = express.Router()

// 引入路由模組程式碼
const home = require('./modules/home')
const lists = require('./modules/lists')
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')  // 掛載 middleware

router.use('/lists', authenticator, lists)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

// 匯出路由器
module.exports = router