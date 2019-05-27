<template>
  <div class="categoriesCreate">
    <h2>新建分类</h2>
    <el-form label-width="120px">
      <el-form-item label="名称">
          <!-- form表单的submit事件 native表示原生表单  prevent表示阻止默认提交  save为自定义事件 -->
        <el-input v-model="model.name" @submit.native.prevent="save"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
    data(){
        return{
            model:{}
        }
    },
    methods:{

      // asyns将异步回调写成类似同步
         async save(){
          //  console.log('save')
          //  consol0000000 e.log("save");
           //异步回调写成类似回调的写法
            const res = await this.$http.post('categories',this.model)
            this.$router.push('/categories/list')
            this.$message({
              type: 'success',
              message: '保存成功'
            })
        }
    }
}
</script>