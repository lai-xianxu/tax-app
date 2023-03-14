import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'; // 持久化

const store = createPinia();
store.use(piniaPluginPersistedstate);

export default store;
