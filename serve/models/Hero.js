const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String
    },
    avatar: {
        type: String
    },        
    title:{
        type: String
    },

    /* 关联多个分类  模型改为复数形式 变为数组形式*/
    categories: [{
        type: mongoose.SchemaTypes.ObjectId, ref: 'category'
    }],
    scores: {
        difficult: {type:Number},
        skills: {type: Number},
        attack: {type: Number},
        survive: {type : Number},
    },
    skills: [{
        icon:{type: String},
        name:{type: String},
        description:{type: String},
        tips: {type: String}
    }],
    /* 出装推荐 */
    /* 顺风 */
    equipmentsObey: [{type: mongoose.SchemaTypes.ObjectId,ref: 'Equipment'}],
    /* 逆风 */
    equipmentsOpposite: [{type: mongoose.SchemaTypes.ObjectId,ref: 'Equipment'}],
    /* 使用技巧 */
    usageTips: {
        type:String
    },
    /* 对抗技巧 */
    battleTips: {
        type:String
    },
    
    /* 团队思路 */
    teamTips: {
        type:String
    },

    /* 英雄关系 */
    partners:[{
        hero:{type: mongoose.SchemaTypes.ObjectId, ref: 'Hero'},
        description: {type: String},
    }],
})
// 导出的事mongoose模型
module.exports = mongoose.model('Hero',schema)   