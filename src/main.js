// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueCookie from 'vue-cookie'
import Highcharts from 'highcharts/highcharts'
import Gantt from 'highcharts/modules/gantt'
import VueHighcharts from 'vue-highcharts'
import ElementUI from 'element-ui'
import '../theme/index.css'
import './assets/iconfont/iconfont.css'
import QuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import Qs from 'qs'
import _ from 'lodash'
import api from '@/api'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Gantt(Highcharts);
Vue.use(VueHighcharts, Highcharts);
Vue.use(VueCookie);
Vue.use(QuillEditor);
Vue.prototype.$api = api;

//配置Axios
let axiosInstance = Axios.create({
    baseURL: 'http://localhost:8080',
    transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
    }],
    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
});
Vue.use(VueAxios, axiosInstance);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});

