import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import https from 'axios'
import VueSocketio from 'vue-socket.io';

Vue.use(new VueSocketio({
  connection: 'http://127.0.0.1:8888',
}))

Vue.config.productionTip = false;

Vue.prototype.$https = https;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
