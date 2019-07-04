module.exports = app => {
    const express = require('express')
    /* mergeParams:true 表示合并url参数*/
    const jwt = require('jsonwebtoken')
    const AdminUser =require('../../models/AdminUser')
    const assert = require('http-assert')
    const router = express.Router({
        mergeParams:true
    })

//  创建
    router.post('/', async(req, res) => {
        
        // const Model = require(`../../models/${req.params.resource}`)
        const model = await req.Model.create(req.body);
        res.send(model)
    })
//  资源列表
    router.get('/', async (req,res,next)=>{
        // const token = req.headers.authorization
        /* 获取前端传上来token
        通过verify解密出id
        通过id获取当前用户
        将用户挂载到req，在后面的操作上也有
        */

        const token = String(req.headers.authorization || '').split(' ').pop()
       assert(token, 401, '请提供 jwt token')
        // const takenData = jwt.verify(token, app.get('secret'))
        /* {   console.log(takenData)  id: '5d01f81a13b67c0980921109', iat: 1560495758 } */
        const {id} = jwt.verify(token, app.get('secret'))
        /* 验证请求用户 并挂载req上 后续请求也可以用*/
        req.user = await AdminUser.findById(id)
        assert(id, 401, '去')
        // console.log(req.user)
        assert(req.user,401,'请先登录')
        await next()
    },async(req, res) => {  
        console.log(req.user)    
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

    app.post('/admin/api/login',async(req, res)=>{
        const {username,password} = req.body  //解构赋值  直接取对象中的username,password
        //1.根据用户名找用户
        // const AdminUser =require('../../models/AdminUser') /* 放到上面 */
        /* .select('+password')  表示查的时候取出查的内容*/
        const user = await AdminUser.findOne({username:username}).select('+password')
      /* user,422,'用户不存在    用户是否存在，不存在状态码422，不存在提示信息 */
        assert(user,422,'用户不存在')
        // if (!user){
        //     return res.status(422).send({
        //         message: '用户不存在'
        //     })
        // }

        //2.校验码密码
        const isValid = require('bcrypt').compareSync(password,user.password)
       
        assert(isValid,422,'密码错误')
        // if(!isValid){
        //     return res.status(422).send({
        //         message: '密码错误'
        //     })
        // }
        //3.返回token
        // const jwt = require('jsonwebtoken')  /* 放到上面引用 */
        const token = jwt.sign({
            id: user.id
        }, app.get('secret'))
        res.send({token})
    }) 
    // 错误处理函数
    app.use(async (err,req, res, next) =>{
        console.log(err)
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}