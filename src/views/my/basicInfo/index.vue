<template>
  <NavbarPage label="个人信息">
    <div class="basic-container">
      <div class="basic-content">
        <div v-for="item in fieldInfoList" :key="item" class="basic-info">
          <div class="info-header fsc">
            <div class="blue-line"></div>
            <div class="header-title">{{ item.header }}</div>
          </div>
          <div
            v-for="val in item.list"
            :key="val.field"
            class="info-field fss"
            :class="{ 'info-field--active': val.isEdit }"
            @click.stop="onEdit(val)"
          >
            <div v-if="val.bottomLine" class="field-bottom-line"></div>
            <div class="field-label">{{ val.label }}</div>
            <!-- 文本 -->
            <van-field
              v-if="val.type === 'text'"
              v-model="basicInfo[val.field]"
              type="textarea"
              rows="1"
              autosize
              :placeholder="val.default"
            />
            <div v-else class="field-info" :class="{ 'field-info--not': !basicInfo[val.field] || val.isGray }">
              {{ fieldInfo(val, basicInfo[val.field]) }}
            </div>
            <img v-if="val.isEdit" src="@/assets/home/right-jiantou.png" alt="" />
            <div v-if="val.isLook" class="field-look">查看</div>
          </div>
        </div>
      </div>

      <div class="save-button fcc" :class="{ 'save-button--disabled': !isSave }" @click.stop="onSave">保存</div>
    </div>
  </NavbarPage>

  <!-- 选择器 -->
  <van-popup v-model:show="showPicker" position="bottom">
    <van-picker v-model="editModel" :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
  </van-popup>

  <!-- 时间选择器 -->
  <van-popup v-model:show="showDatePicker" position="bottom">
    <van-date-picker
      v-model="currentDate"
      :min-date="new Date(1900, 0, 1)"
      @cancel="showPicker = false"
      @confirm="onConfirm"
    />
  </van-popup>

  <!-- 地域选择器 -->
  <CascaderPicker v-model="cascaderShow" :area-value="cascaderValue" streets-visible @on-confirm="onConfirm" />

  <van-notify v-model:show="notifyObj.show" :type="notifyObj.type" :background="notifyObj.background">
    <div class="fcc fs16">
      <van-icon :name="notifyObj.icon || 'warning-o'" style="margin: 1px 6px 0 0" />
      <span>{{ notifyObj.value }}</span>
    </div>
  </van-notify>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getUserInfo, getDictItem, postAppEdit } from '@/api/my.js';
import { infoColumns, sexColumns } from './fieldCloumns';
import CascaderPicker from '../components/CascaderPicker.vue';
import { usePublicStore } from '@/store/modules/public';

const publicStore = usePublicStore();

const router = useRouter();

// 获取字典数据
const fieldInfoList = ref([]);
const columnsObj = {
  nation: [],
  education: [],
  sex: sexColumns,
};
const getCodes = async () => {
  try {
    const dataN = await getDictItem('nation');
    columnsObj.nation = dataN.result;
    const dataE = await getDictItem('education');
    columnsObj.education = dataE.result;
    fieldInfoList.value = infoColumns;
  } catch (error) {
    fieldInfoList.value = infoColumns;
  }
};

/* 获取个人信息 */
const basicInfo = ref({});
const isLoadLock = ref(false);
const onGetUserInfo = async () => {
  const { result } = await getUserInfo();
  result?.addrVOList?.forEach((e) => {
    switch (e.addrType) {
      case '1':
        basicInfo.value.area1 = e.area;
        basicInfo.value.areaName1 = e.areaName;
        basicInfo.value.detailed1 = e.detailed;
        break;
      case '2':
        basicInfo.value.area2 = e.area;
        basicInfo.value.areaName2 = e.areaName;
        basicInfo.value.detailed2 = e.detailed;
        break;
      case '3':
        basicInfo.value.area3 = e.area;
        basicInfo.value.areaName3 = e.areaName;
        basicInfo.value.detailed3 = e.detailed;
        break;

      default:
        break;
    }
  });
  basicInfo.value = { ...result, ...basicInfo.value };
  setTimeout(() => {
    isLoadLock.value = true;
  }, 1000);
};

// 获取行政规划
const getAreaList = async () => {
  await publicStore.action_tax_area_list();
};

// 初始化
const init = () => {
  getCodes();
  onGetUserInfo();
  getAreaList();
};
init();

// 数据匹配
const fieldInfo = (info, val) => {
  switch (info.type) {
    case 'picker':
      return columnsObj[info.field]?.filter((e) => e.value === val)?.[0]?.text;
    case 'areaPicker':
      return basicInfo.value[`areaName${info.field.substr(-1)}`];
    default:
      return basicInfo.value[info.field] || info.default;
  }
};

// 编辑
const showPicker = ref(false);
const columns = ref([]);
const editId = ref('');
const editModel = ref([]);
const showDatePicker = ref(false);
const currentDate = ref([]);
const cascaderShow = ref(false);
const cascaderValue = ref('');
const onEdit = (val) => {
  editId.value = val.field;
  if (!val.isEdit) return;
  switch (val.type) {
    case 'realname':
      router.push({
        name: 'MyNameInfo',
        query: {
          name: basicInfo.value[val.field],
        },
      });
      break;
    case 'picker':
      columns.value = columnsObj[val.field];
      editModel.value = [basicInfo.value[val.field]];
      showPicker.value = true;
      break;
    case 'datePicker':
      currentDate.value = basicInfo.value[val.field]?.split('-');
      showDatePicker.value = true;
      break;
    case 'areaPicker':
      cascaderValue.value = basicInfo.value[val.field];
      cascaderShow.value = true;
      break;
    default:
      break;
  }
};

// 选择确认
const onConfirm = (e) => {
  switch (editId.value) {
    case 'birthday':
      basicInfo.value[editId.value] = e?.selectedValues?.join('-');
      showDatePicker.value = false;
      break;
    case 'area1':
    case 'area2':
    case 'area3':
      basicInfo.value[editId.value] = e.code;
      basicInfo.value[`areaName${editId.value.substr(-1)}`] = e.name;
      cascaderShow.value = false;
      break;
    default:
      basicInfo.value[editId.value] = e?.selectedValues?.[0];
      showPicker.value = false;
      break;
  }
};

// 保存
const notifyObj = ref({
  show: false,
  value: '',
  background: '#fb5643',
  type: 'danger',
});
const onSave = async () => {
  if (!isSave.value) return;
  if (!verificationValue()) return;
  const addrVOList = [];
  if (basicInfo.value?.area1 || basicInfo.value?.detailed1) {
    addrVOList.push({
      addrType: '1',
      area: basicInfo.value?.area1,
      detailed: basicInfo.value?.detailed1,
    });
  }
  if (basicInfo.value?.area2 || basicInfo.value?.detailed2) {
    addrVOList.push({
      addrType: '2',
      area: basicInfo.value?.area2,
      detailed: basicInfo.value?.detailed2,
    });
  }
  if (basicInfo.value?.area3 || basicInfo.value?.detailed3) {
    addrVOList.push({
      addrType: '3',
      area: basicInfo.value?.area3,
      detailed: basicInfo.value?.detailed3,
    });
  }
  await postAppEdit({
    addrVOList,
    birthday: basicInfo.value?.birthday,
    education: basicInfo.value?.education,
    email: basicInfo.value?.email,
    id: basicInfo.value?.id,
    nation: basicInfo.value?.nation,
    realname: basicInfo.value?.realname,
    sex: basicInfo.value?.sex,
  });
  isLoadLock.value = false;
  isSave.value = false;
  init();
  notifyObj.value = {
    show: true,
    value: '提交成功',
    background: '',
    type: 'success',
    icon: 'passed',
  };
  setTimeout(() => {
    notifyObj.value = {
      show: false,
      value: '提交成功',
      background: '',
      type: 'success',
      icon: 'passed',
    };
  }, 2000);
};

const verificationValue = () => {
  let code = true;
  if (!basicInfo.value?.area1) {
    notifyObj.value = {
      show: true,
      value: '户籍所在中的所在地区不能为空',
      background: '#fb5643',
      type: 'danger',
    };
    code = false;
  } else if (!basicInfo.value?.detailed1) {
    notifyObj.value = {
      show: true,
      value: '户籍所在中的详细地址不能为空',
      background: '#fb5643',
      type: 'danger',
    };
    code = false;
  } else if (!basicInfo.value?.area3) {
    notifyObj.value = {
      show: true,
      value: '联系地址中的所在地区不能为空',
      background: '#fb5643',
      type: 'danger',
    };
    code = false;
  } else if (!basicInfo.value?.detailed3) {
    notifyObj.value = {
      show: true,
      value: '联系地址中的详细地址不能为空',
      background: '#fb5643',
      type: 'danger',
    };
    code = false;
  }
  if (!code) {
    setTimeout(() => {
      notifyObj.value = {
        show: false,
      };
    }, 2000);
  }
  return code;
};

const isSave = ref(false);
watch(
  () => basicInfo.value,
  () => {
    if (isLoadLock.value && basicInfo.value?.id) {
      isSave.value = true;
    }
  },
  {
    deep: true,
  },
);
</script>

<style scoped lang="scss">
.basic-container {
  .basic-content {
    min-height: 700px;
  }
  .basic-info {
    .info-header {
      position: relative;
      width: 100%;
      height: 46px;
      padding: 0 17px;
      margin-top: 10px;
      border-bottom: 1px solid rgba(238, 237, 237, 0.6);
      background: #fff;
      .blue-line {
        width: 4px;
        height: 17px;
        background: #4981ff;
        border-radius: 4px;
      }
      .header-title {
        font-size: 15px;
        font-weight: bold;
        color: #3d3d3d;
        margin-left: 7px;
      }
    }
    .info-field {
      position: relative;
      width: 100%;
      min-height: 46px;
      padding: 12px 17px;
      background: #fff;
      line-height: 22px;
      &--active {
        &:active {
          background-color: rgba(0, 0, 0, 0.05);
        }
      }
      .field-bottom-line {
        position: absolute;
        left: 16px;
        bottom: 0;
        width: calc(100% - 16px);
        height: 1px;
        background-color: rgba(238, 237, 237, 0.6);
      }
      .field-label {
        width: 120px;
        font-size: 15px;
        font-weight: normal;
        color: #686868;
        flex-shrink: 0;
      }
      .field-info {
        font-size: 15px;
        color: #3d3d3d;
        margin-right: 15px;
        &--not {
          color: #929191;
        }
      }
      img {
        width: 12px;
        height: 12px;
        margin-left: auto;
        margin-top: 6px;
      }
      .field-look {
        font-size: 15px;
        color: #5084ea;
        margin-left: auto;
      }
    }
  }
  .save-button {
    height: 48px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    color: #fff;
    background: #4981ff;
    margin: 32px 17px 54px;
    &:active {
      opacity: 0.8;
    }
    &--disabled {
      background: rgba(82, 132, 231, 0.3);
    }
  }
}
.fs16 {
  font-size: 16px;
}
:deep(.van-field) {
  font-size: 15px;
  color: #3d3d3d;
  padding: 0;
}
</style>
