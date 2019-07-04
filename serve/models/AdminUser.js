const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String, 
        select: false,
        //  select: false,  编辑页面不显示加密代码
        set(val){
            return require('bcrypt').hashSync(val,10)
        } 
    }
    
})
// 导出的事mongoose模型
module.exports = mongoose.model('AdminUser',schema)