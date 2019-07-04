const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {
        type: String
    },
    categories:[{ type:mongoose.SchemaTypes.ObjectId,ref: 'Category'}],
    body: {
        type: String
    }
})
// 导出的事mongoose模型
module.exports = mongoose.model('Article',schema)