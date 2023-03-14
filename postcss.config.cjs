module.exports = {
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    // 适用版本 5.1.1
    // npm install postcss-pxtorem@5.1.1 -D
    'postcss-pxtorem': {
      // 设置37.5为根节点字体大小
      rootValue: 37.5,
      // 配置哪些文件中的尺寸需要转化为rem *表示所有的都要转化
      propList: ['*'],
    },
  },
};
