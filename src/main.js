import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import Chakra, { CThemeProvider } from '@chakra-ui/vue'
axios.defaults.baseURL = "http://127.0.0.1:8000"
Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.use(Chakra)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(CThemeProvider, [h(App)])
}).$mount('#app')
