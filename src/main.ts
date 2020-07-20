import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import firebase from "./plugins/firebase";
import router from "./router";
import "animate.css";

// @ts-ignore
import { createProvider } from "./vue-apollo";

import vuetify from "./plugins/vuetify";
import initFirebase from "./plugins/firebase/init";

Vue.config.productionTip = false;
Vue.prototype.$firebase = firebase;

new Vue({
  beforeCreate() {
    initFirebase();
  },
  router,

  // @ts-ignore
  apolloProvider: createProvider(),

  vuetify,
  render: (h) => h(App),
}).$mount("#app");
