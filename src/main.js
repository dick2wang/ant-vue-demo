import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(VueAxios, axios);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
