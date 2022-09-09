const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
require('./config/mongoose')

const routes = require('./routes')
const app = express()
const port = 3000

// require packages used in the project
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))
//設定 body-parser
app.use(express.urlencoded({ extended: true }))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
// 載入路由模組
app.use(routes)

//搜尋功能
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  List.find()
    .lean()
    .then(lists => lists.filter(list => list.name.toLowerCase().includes(keyword) || list.category.toLowerCase().includes(keyword)))
    .then(lists => res.render('index', { lists, keyword }))
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log('http://localhost:3000/ connected')
})