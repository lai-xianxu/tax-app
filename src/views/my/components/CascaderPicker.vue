<template>
  <van-popup v-model:show="visible" position="bottom">
    <div class="van-picker__toolbar">
      <button class="van-picker__cancel" @click.stop="visible = false">取消</button>
      <button class="van-picker__confirm" @click.stop="onConfirm">确定</button>
    </div>
    <van-cascader
      v-model="cascaderValue"
      :field-names="{ text: 'name', value: 'code' }"
      :show-header="false"
      :options="streetsVisible ? areaList : areaList"
      @change="onChange"
      @click-tab="onClickTab"
    >
      <template #option="{ option }">
        <div class="cascader-left fss">
          <div class="left-index">{{ option?.indexCode }}</div>
          <div class="left-name">
            {{ option?.name }}
          </div>
        </div>
      </template>
      <template #options-bottom>
        <div class="tab-index">
          <span v-for="item in codeIndexList" :key="item">{{ item }}</span>
        </div>
      </template>
    </van-cascader>
  </van-popup>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { usePublicStore } from '@/store/modules/public';

const publicStore = usePublicStore();
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  streetsVisible: {
    type: Boolean,
    default: false,
  },
  areaValue: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:modelValue', 'onConfirm']);

// 获取行政规划
const areaList = computed(() => {
  return publicStore?.getter_tax_area_list;
});

const cascaderValue = ref('');
const cascaderName = ref('');

// 右侧索引列处理
const templateIndex = ref(0);
const onChange = (e) => {
  cascaderName.value = e.selectedOptions?.map((o) => o.name)?.join('');
  templateIndex.value = e.tabIndex + 1;
};
const onClickTab = (index) => {
  templateIndex.value = index;
};
const splitNumber = (str) => {
  const arr = [];
  if (str.length >= 2) arr.push(str.substring(0, 2));
  if (str.length >= 4) arr.push(str.substring(0, 4));
  if (str.length >= 6) arr.push(str.substring(0, 6));
  if (str.length >= 9) arr.push(str.substring(0, 9));
  return arr;
};
let findObj = {};
const findArrayByValue = (arr, valueArr, depth, tabIndex) => {
  if (!depth) findObj = {};
  if (depth >= valueArr.length || depth >= tabIndex) {
    return findObj;
  }
  const findIndex = arr.findIndex((e) => e.code === valueArr[depth]);
  if (findIndex !== -1) {
    findObj = arr[findIndex];
  } else {
    return findObj;
  }
  return findArrayByValue(findObj.children, valueArr, depth + 1, tabIndex);
};
const codeIndexList = ref([]);
const onCodeIndexList = (tabIndex) => {
  const obj = findArrayByValue(areaList.value, splitNumber(cascaderValue.value), 0, tabIndex);
  codeIndexList.value = obj?.indexList?.length
    ? obj?.indexList
    : ['A', 'B', 'C', 'F', 'G', 'H', 'J', 'L', 'N', 'Q', 'S', 'T', 'X', 'Y', 'Z'];
};
watch(
  () => templateIndex.value,
  (val) => {
    onCodeIndexList(val);
  },
  {
    immediate: true,
  },
);

// 确认
const onConfirm = () => {
  if (splitNumber(cascaderValue.value).length < 4) return;
  emit('onConfirm', {
    code: cascaderValue.value,
    name: cascaderName.value,
  });
};

// v-model
const visible = ref(false);
watch(
  () => props.modelValue,
  async (val) => {
    if (val) {
      if (props.areaValue) {
        cascaderValue.value = props.areaValue;
        templateIndex.value = splitNumber(props.areaValue).length - 1;
      }
      if (!areaList.value?.length) {
        await publicStore.action_tax_area_list();
      }
    }
    visible.value = val;
  },
);
watch(
  () => visible.value,
  (val) => {
    if (!val) {
      emit('update:modelValue', false);
      templateIndex.value = 0;
    }
  },
);
</script>

<style scoped lang="scss">
.cascader-left {
  .left-index {
    width: 18px;
    font-size: 12px;
    color: #929191;
    transform: scale(0.9);
    font-weight: normal;
  }
  .left-name {
    font-size: 14px;
  }
}
.tab-index {
  position: absolute;
  top: 10px;
  right: 10px;
  writing-mode: vertical-lr;
  font-size: 12px;
  transform: scale(0.9);
  span {
    text-combine-upright: all;
    color: #5084ea;
    margin: 3px 0;
  }
}
</style>
