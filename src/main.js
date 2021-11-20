 
import { createApp } from 'vue'
//引入App
import App from './App.vue'

import router from './route'
import mitt from "mitt";

const app = createApp(App);
app.use(router).mount("#app");

app.config.globalProperties.$bus = mitt();
