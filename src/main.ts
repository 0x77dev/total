import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

// @ts-ignore
import { createProvider } from "./vue-apollo";

import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,

  // @ts-ignore
  apolloProvider: createProvider(),

  vuetify,
  render: (h) => h(App)
}).$mount("#app");
