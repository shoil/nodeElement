const express = require("express")

const app = express()

// 跨域模块
app.use(require('cors')())
// json
app.use(express.json())


require('./routes/admin')(app)
require('./plugins/mongo')(app)

app.listen(3030,() =>{
    console.log('http://localhost:3030');
})