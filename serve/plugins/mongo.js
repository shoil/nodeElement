//连接mongdodb数据库
// module.exports 导出是一个函数
module.exports = app => {
    const mongoose = require("mongoose")
    mongoose.connect('mongodb://localhost:27017/node-vue-moba',{
        useNewUrlParser: true
    })
}