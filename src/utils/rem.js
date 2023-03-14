const baseSize = 37.5;
const setRem = () => {
  // 375为设计稿页面宽度，如为750，把375改为750
  const { clientWidth } = document.documentElement;
  const scale = (clientWidth > 750 ? 750 : clientWidth) / 375;
  document.documentElement.style.fontSize = `${baseSize * Math.min(scale, 2)}px`;
};

/* 初始化 并监听屏幕宽度变化 */
setRem();
window.onresize = () => {
  setRem();
};
