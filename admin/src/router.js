import Vue from 'vue'
import Router from 'vue-router'
import MainBody from './views/MainBody.vue'
import CategoryEdit from './views/Categories/CategoryEdit.vue'
import CategoryList from './views/Categories/CategoryList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainBody',
      component: MainBody,
      children: [
        {path:'/categories/create',component: CategoryEdit},
        /* 
        两个页面使用同一个组件
        props:true  将path中url参数传给component所指向的页面中在页面中可以引用
        */
        {path:'/categories/edit/:id',component: CategoryEdit, props:true},
        {path:'/categories/list',component: CategoryList}
      ]
    },
   
  ]
})
