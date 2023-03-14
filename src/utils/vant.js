import {
  Button,
  Tabbar,
  TabbarItem,
  Field,
  Popover,
  Swipe,
  SwipeItem,
  Search,
  Cell,
  CellGroup,
  Picker,
  RadioGroup,
  Radio,
  Toast,
  Loading,
  Notify,
  Icon,
  Tab,
  Tabs,
  Empty,
} from 'vant';
import NavbarPage from '@/components/NavbarPage/index.vue';
import 'vant/lib/index.css';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';

export default {
  install(Vue) {
    Vue.component('NavbarPage', NavbarPage);
    Vue.component(Button.name, Button);
    Vue.component(Tabbar.name, Tabbar);
    Vue.component(TabbarItem.name, TabbarItem);
    Vue.component(Field.name, Field);
    Vue.component(Popover.name, Popover);
    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    Vue.component(Search.name, Search);
    Vue.component(Cell.name, Cell);
    Vue.component(CellGroup.name, CellGroup);
    Vue.component(Picker.name, Picker);
    Vue.component(RadioGroup.name, RadioGroup);
    Vue.component(Radio.name, Radio);
    Vue.component(Toast.name, Toast);
    Vue.component(Loading.name, Loading);
    Vue.component(Notify.name, Notify);
    Vue.component(Icon.name, Icon);
    Vue.component(Tab.name, Tab);
    Vue.component(Tabs.name, Tabs);
    Vue.component(Empty.name, Empty);
  },
};
