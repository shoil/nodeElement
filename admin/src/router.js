import Vue from 'vue'
import Router from 'vue-router'
import MainBody from './views/MainBody.vue'
import CategoryEdit from './views/Categories/CategoryEdit.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainBody',
      component: MainBody,
      children: [
        {path:'/categories/create',component: CategoryEdit}
      ]
    },
   
  ]
})
