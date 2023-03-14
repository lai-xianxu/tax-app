/**
 * 设置storage
 * @param value
 */
export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * 获取storage
 * @param value
 */
export const getStorage = (key) => {
  const temp = localStorage.getItem(key);
  if (temp === null || typeof temp === 'undefined') return null;
  return JSON.parse(temp);
};

/**
 * 移除storage
 * @param value
 */
export const clearStorage = (key) => {
  localStorage.removeItem(key);
};

/**
 * 设置sessionstorage
 * @param value
 */
export const setSessionStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

/**
 * 获取sessionstorage
 * @param value
 */
export const getSessionStorage = (key) => {
  const temp = sessionStorage.getItem(key);
  if (temp === null || typeof temp === 'undefined') return null;
  return JSON.parse(temp);
};

/**
 * 移除sessionstorage
 * @param value
 */
export const clearSessionStorage = (key) => {
  sessionStorage.removeItem(key);
};

/**
 * 延迟函数
 * @param timeout 延迟执行毫秒数
 */
export const delay = (timeout) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

/**
 * 防抖函数
 * @param fn 目标函数
 * @param timeout 延迟执行毫秒数
 * @param immediate 立即执行， false - 延迟执行
 */
export const debounce = (fn, timeout, immediate = false) => {
  let timmer;
  return () => {
    if (immediate && !timmer) {
      fn();
      immediate = false;
      return;
    }
    if (timmer) clearTimeout(timmer);
    timmer = setTimeout(() => {
      fn();
      timmer = null;
    }, timeout);
  };
};

/**
 * 节流函数
 * @param fn 目标函数
 * @param timeout 延迟执行毫秒数
 */
export const throttle = (fn, timeout) => {
  let flag = false;
  return () => {
    if (flag) return;
    flag = true;
    fn();
    setTimeout(() => {
      flag = false;
    }, timeout);
  };
};
