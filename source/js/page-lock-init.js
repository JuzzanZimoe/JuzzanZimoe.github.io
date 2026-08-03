(function () {
  // 页面首次绘制前同步执行：在 <html> 上打标记，避免加锁页面内容闪现
  var p = location.pathname;
  if (p.slice(-10) === "index.html") p = p.slice(0, -10);
  if (p.slice(-1) !== "/") p += "/";
  if (p.indexOf("/courses/") === 0 || p.indexOf("/projects/") === 0 || p.indexOf("/moments/") === 0) {
    document.documentElement.className += " page-lock-pending";
  }
})();
