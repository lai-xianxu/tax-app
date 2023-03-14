export const infoColumns = [
  {
    header: '用户基础信息',
    list: [
      {
        label: '姓名',
        field: 'realname',
        type: 'realname',
        default: '姓名',
        bottomLine: true,
        isEdit: true,
      },
      {
        label: '证件类型',
        field: '',
        type: '',
        default: '居民身份证',
        bottomLine: true,
        isGray: true,
      },
      {
        label: '证件号码',
        field: 'idCard',
        type: '',
        default: '证件号码',
        bottomLine: true,
        isGray: true,
      },
      {
        label: '纳税人识别号',
        field: 'idCard',
        type: '',
        default: '纳税人识别号',
        bottomLine: true,
        isLook: true,
      },
      {
        label: '出生日期',
        field: 'birthday',
        type: 'datePicker',
        default: '出生日期',
        bottomLine: true,
        isEdit: true,
      },
      {
        label: '性别',
        field: 'sex',
        type: 'picker',
        default: '性别',
        bottomLine: true,
        isEdit: true,
      },
      {
        label: '国籍(地区)',
        field: 'nationality',
        type: '',
        default: '中华人民共和国',
        bottomLine: false,
        isGray: true,
      },
    ],
  },
  {
    header: '户籍所在地',
    list: [
      {
        label: '所在地区',
        field: 'area1',
        type: 'areaPicker',
        default: '所在地区',
        bottomLine: true,
        isEdit: true,
      },
      {
        label: '详细地址',
        field: 'detailed1',
        type: 'text',
        default: '请填写小区、楼栋、单元室等',
        bottomLine: false,
        isEdit: false,
      },
    ],
  },
  {
    header: '经常居住地',
    list: [
      {
        label: '所在地区',
        field: 'area2',
        type: 'areaPicker',
        default: '所在地区',
        bottomLine: true,
        isEdit: true,
      },
      {
        label: '详细地址',
        field: 'detailed2',
        type: 'text',
        default: '请填写小区、楼栋、单元室等',
        bottomLine: false,
        isEdit: false,
      },
    ],
  },
  {
    header: '联系地址',
    list: [
      {
        label: '所在地区',
        field: 'area3',
        type: 'areaPicker',
        default: '所在地区',
        bottomLine: true,
        isEdit: true,
      },
      {
        label: '详细地址',
        field: 'detailed3',
        type: 'text',
        default: '请填写小区、楼栋、单元室等',
        bottomLine: false,
        isEdit: false,
      },
    ],
  },
  {
    header: '其他',
    list: [
      {
        label: '学历',
        field: 'education',
        type: 'picker',
        default: '请选择',
        bottomLine: true,
        isEdit: true,
      },
      {
        label: '民族',
        field: 'nation',
        type: 'picker',
        default: '请选择',
        bottomLine: true,
        isEdit: true,
      },
      {
        label: '电子邮箱',
        field: 'email',
        type: 'text',
        default: '请选择',
        bottomLine: false,
      },
    ],
  },
];

export const sexColumns = [
  {
    text: '男',
    value: 1,
  },
  {
    text: '女',
    value: 2,
  },
];
