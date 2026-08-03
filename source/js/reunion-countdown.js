(function () {
  var target = new Date("2027-02-17T00:00:00+08:00").getTime();

  function pad(num) {
    return String(num).padStart(2, "0");
  }

  function formatCountdown(diff) {
    var totalSeconds = Math.max(0, Math.floor(diff / 1000));
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;
    return "倒计时：" + days + " 天 " + pad(hours) + " 小时 " + pad(minutes) + " 分 " + pad(seconds) + " 秒 ";
  }

  function update() {
    var el = document.getElementById("reunion-countdown");
    if (!el) return;
    el.textContent = formatCountdown(target - Date.now());
  }

  function start() {
    update();
    clearInterval(window.reunionCountdownTimer);
    window.reunionCountdownTimer = setInterval(update, 1000);
  }

  document.addEventListener("DOMContentLoaded", start);
  document.addEventListener("pjax:complete", update);
})();
