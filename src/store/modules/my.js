import { defineStore } from 'pinia';

export const useMyStore = defineStore({
  id: 'my',
  state: () => ({
    state_user_info: {},
  }),
  getters: {
    getter_user_info: (state) => {
      return state.state_user_info;
    },
  },
  actions: {},
  // 持久化
  persist: {
    key: 'tax-app-store',
    paths: ['state_user_info'],
  },
});
