import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/style/index.less";
import TouTiaoIcon from "@/components/TouTiaoIcon";
// 引入vant组件
import vant from "vant";
import "vant/lib/index.less";

// 引入  rem适配
import "amfe-flexible";
import request from "@/utils/request";
request.get("/v1_0/channels").then((res) => {
  console.log(res.data.data.channels);
});
Vue.use(vant);

Vue.component("TouTiaoIcon", TouTiaoIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
