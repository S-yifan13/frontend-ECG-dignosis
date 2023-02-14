import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Chakra,  { CThemeProvider }  from '@chakra-ui/vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
// axios.defaults.baseURL = "http://43.138.82.70/api"
Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.use(Chakra)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(CThemeProvider, [h(App)])
}).$mount('#app')
