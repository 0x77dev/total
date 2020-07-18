import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import firebase from "./plugins/firebase";
import "animate.css";

// @ts-ignore
import { createProvider } from "./vue-apollo";

import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.prototype.$firebase = firebase;

new Vue({
  router,

  // @ts-ignore
  apolloProvider: createProvider(),

  vuetify,
  render: (h) => h(App),
}).$mount("#app");
