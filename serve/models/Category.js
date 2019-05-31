const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String
    },
    parentOptions:{
        // ObjectId表示mondodb中id   ref: 'Category表示关联哪一个模型
        type: mongoose.SchemaTypes.ObjectId,ref: 'Category'
    }

})
// 导出的事mongoose模型
module.exports = mongoose.model('Category',schema)