import { showDialog } from 'vant';

document.addEventListener('plusready', () => {
  const webview = plus.webview.currentWebview();
  plus.key.addEventListener('backbutton', () => {
    webview.canBack((e) => {
      if (e.canBack) {
        webview.back();
      } else {
        showDialog({
          message: '确认退出？',
          confirmButtonText: '确定',
          showCancelButton: true,
        }).then(() => {
          plus.runtime.quit();
        });
      }
    });
  });
});
