import { defineStore } from 'pinia';

export const useDemoStore = defineStore({
  id: 'demo',
  state: () => ({
    state_count: 1,
  }),
  getters: {
    getter_count: (state) => {
      return state.state_count * 2;
    },
  },
  actions: {
    action_count() {
      this.state_count++;
    },
  },
});
