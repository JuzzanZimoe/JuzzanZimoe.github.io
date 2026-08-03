(function () {
  var startTime = new Date("2026-07-28T19:31:00+08:00").getTime();

  function pad(num) {
    return String(num).padStart(2, "0");
  }

  function formatRuntime(diff) {
    var totalSeconds = Math.max(0, Math.floor(diff / 1000));
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    return "本站已运行 " + days + " 天 " + pad(hours) + " 小时 " + pad(minutes) + " 分 " + pad(seconds) + " 秒";
  }

  function ensureRuntimeNode() {
    var frameworkInfo = document.querySelector("#footer .framework-info");
    if (!frameworkInfo) return null;

    var runtime = document.getElementById("footer-runtime");
    if (runtime) return runtime;

    var separator = document.createElement("span");
    separator.className = "footer-separator footer-runtime-separator";
    separator.textContent = "|";

    runtime = document.createElement("span");
    runtime.id = "footer-runtime";
    runtime.className = "footer-runtime";

    frameworkInfo.appendChild(separator);
    frameworkInfo.appendChild(runtime);
    return runtime;
  }

  function updateRuntime() {
    var runtime = ensureRuntimeNode();
    if (!runtime) return;
    runtime.textContent = formatRuntime(Date.now() - startTime);
  }

  updateRuntime();
  clearInterval(window.footerRuntimeTimer);
  window.footerRuntimeTimer = setInterval(updateRuntime, 1000);
})();
