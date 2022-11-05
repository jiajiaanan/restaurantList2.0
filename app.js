const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
require('./config/mongoose')


const routes = require('./routes')
const app = express()
const port = 3000

// require packages used in the project
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 載入session驗證功能
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
// setting static files
app.use(express.static('public'))
// 設定 body-parser
app.use(express.urlencoded({ extended: true }))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
// 載入路由模組
app.use(routes)


app.listen(port, () => {
  console.log('http://localhost:3000/ connected')
})