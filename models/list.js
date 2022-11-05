const mongoose = require('mongoose')
const Schema = mongoose.Schema //模組
const listSchema = new Schema({ //新建schema
    name: {
        type: String, // 資料型別是字串
        required: true
    },
    name_en: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true
    },
    location: {
        type: String,
        // required: true
    },
    phone: {
        type: String,
        // required: true
    },
    google_map: {
        type: String,
        // required: true
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        // required: true
    },
    userId: {  // 加入關聯設定
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true
    }
})
module.exports = mongoose.model('List', listSchema) //輸出