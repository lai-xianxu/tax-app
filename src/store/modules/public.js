import { defineStore } from 'pinia';
import { getTaxIcons, getTaxAreaList } from '@/api/public';

export const usePublicStore = defineStore({
  id: 'public',
  state: () => ({
    state_tax_icons: 1,
    state_tax_area_list: [],
  }),
  getters: {
    getter_tax_icons: (state) => {
      return state.state_tax_icons;
    },
    getter_tax_area_list: (state) => {
      return state.state_tax_area_list;
    },
  },
  actions: {
    // 获取不同页的图标信息
    async action_tax_icons(params) {
      const { result } = await getTaxIcons(params);
      this.state_tax_icons = result;
      return result;
    },
    // 获取行政规划
    async action_tax_area_list(params) {
      const { result } = await getTaxAreaList(params);
      this.state_tax_area_list = result;
      return result;
    },
  },
});
