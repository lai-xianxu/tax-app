import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import './style/index.scss';
import 'amfe-flexible';
import vant from './utils/vant';
import './utils/rem';
import './utils/plusready';

createApp(App).use(router).use(store).use(vant).mount('#app');
