// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//导入vant组件
import Vant from 'vant';      
import 'vant/lib/index.css';
//axios导入
import Axios from "axios"
Vue.prototype.$axios=Axios	
import qs from "qs"							//qs引用
Vue.prototype.$qs=qs;	

Vue.use(Vant);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
