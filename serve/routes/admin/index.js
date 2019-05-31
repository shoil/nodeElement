// 导出一个函数  函数接受一个app对象
module.exports = app => {
    //
    const express = require('express')
    const router = express.Router()

    const Category = require("../../models/Category");
// 创建分类
    router.post('/categories', async(req, res) => {
        const model = await Category.create(req.body);
        res.send(model)
    })
//  分类列表
    router.get('/categories', async(req, res) => {
        // limit(10)限制数量为十条
        // populate('parentOptions') 关联parentOptions
        const items = await Category.find().populate('parentOptions').limit(10);
        // const queryOptions = {}
        // if (req.Model.modelName === 'Category'){
        //     queryOptions.populate = 'parentOptions'
        // }
        // const items = await Category.find().setOptions(queryOptions).limit(10);
        res.send(items);
    })
    // 修改分类
    router.put('/categories/:id',async(req,res) => {
        const model = await Category.findByIdAndUpdate(req.params.id, req.body);
        res.send(model)
    })
//  获取分类列某一id的详情
    router.get('/categories/:id', async(req, res) => {
        const model = await Category.findById(req.params.id)
        res.send(model)
    })
//  删除当前列
    router.delete('/categories/:id', async(req, res) => {
        await Category.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success:true
        })
    })

    //这里就可以使用app
    // 子路由
    app.use('/admin/api', router)
}