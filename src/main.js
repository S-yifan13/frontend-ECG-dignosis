import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import Chakra, { CThemeProvider, CReset  } from '@chakra-ui/vue'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
axios.defaults.baseURL = "http://127.0.0.1:8000"
Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.use(Chakra)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(CThemeProvider, [h(CReset), h(App)])
}).$mount('#app')
