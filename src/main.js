import Vue from "vue";
import App from "./App.vue";
// importing bootstrap into my project, with its node module css file as well
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
//font awesome calls for importing the icons
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faPlus,
  faMinus,
  faTrash,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
library.add(faPlus, faMinus, faTrash, faCheck);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount("#app");
