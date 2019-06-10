module.exports = app => {
    const express = require('express')
    /* mergeParams:true 表示合并url参数*/
    const router = express.Router({
        mergeParams:true
    })

// 创建分类
    router.post('/', async(req, res) => {
        
        // const Model = require(`../../models/${req.params.resource}`)
        const model = await req.Model.create(req.body);
        res.send(model)
    })
//  分类列表
    router.get('/', async(req, res) => {     
        // populate('parentOptions') 关联parentOptions
        // const items = await req.Model.find().populate('parentOptions').limit(10);
        /* 不是所有时候都关联parentOptions 下面做条件一个判断 */
        const queryOptions = {}
        if (req.Model.modelName === 'Category'){
            queryOptions.populate = 'parentOptions'
        }
         // limit(10)限制数量为十条
        const items = await req.Model.find().setOptions(queryOptions).limit(10);
        res.send(items);
    })
    // 修改分类
    router.put('/:id',async(req,res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
        res.send(model)
    })

//  获取分类列某一id的详情
    router.get('/:id', async(req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

//  删除当前列
    router.delete('/:id', async(req, res) => {
        await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success:true
        })
    })

    app.use('/admin/api/rest/:resource',async (req,res,next)=>{
        /* 转类明  require('inflection').classify(req.params.resource) */
        const modelName = require('inflection').classify(req.params.resource)    
        req.Model = require(`../../models/${modelName}`)
        next()
    }, router)

    const multer = require('multer')
    /* dest:   存储地址目标  __dirname 表示绝对地址 */
    const upload = multer({ dest: __dirname + '/../../uploads' })
    /* upload.single('file') 表示单个文件的上传 */
    app.post('/admin/api/upload',upload.single('file') ,async(req,res)=>{
        
        const file = req.file
        file.url  = `http://localhost:3030/uploads/${file.filename}`
        res.send(file)
    })
}