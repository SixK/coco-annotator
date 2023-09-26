import "intersection-observer";

// import { createApp, h, configureCompat } from "vue";
import { createApp, h } from "vue";

// import * as Vue from 'vue';
import { Vue } from "vue";
import { createPinia } from 'pinia';
import App from "./App.vue";
import router from "./router";
// import store from "./store";
// import VueToastr2 from "vue-toastr-2";
// import {useToast} from 'vue-toast-notification';
import {VueToast} from 'vue-toast-notification';
import paper from "paper";
import VTooltip from "v-tooltip";
// import Loading from "vue-loading-overlay";
import {LoadingPlugin} from "vue-loading-overlay";
// import VueTouch from 'vue-touch'
import Vue3TouchEvents from "vue3-touch-events";
import VueSocketIO from "vue-3-socket.io";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import "vue-toastr-2/dist/vue-toastr-2.min.css";
import 'vue-toast-notification/dist/theme-bootstrap.css';
// import "vue-loading-overlay/dist/vue-loading.css";
import 'vue-loading-overlay/dist/css/index.css';

// Vue.config.productionTip = false;

// window.toastr = require("toastr");

const socketio = new VueSocketIO({
  debug: true,
  connection: window.location.origin,
});

const app = createApp({
  render: () => h(App),
});

app.use(createPinia());
// app.use(VueToastr2);
app.use(VueToast, {
    // One of the options
    position: 'top'
});
app.use(VTooltip);
app.use(router);
// app.use(store);
app.use(socketio);

// app.config.globalProperties.$ssocketio = socketio;
app.provide('socket', socketio)
// app.use(Loading);
app.use(LoadingPlugin);
app.use(Vue3TouchEvents, { name: "v-touch" });

/*
configureCompat(
  {
    // default everything to Vue 2 behavior
    MODE: 2,
  },
  { RENDER_FUNCTION: false }
);
*/

app.mount("#app");

