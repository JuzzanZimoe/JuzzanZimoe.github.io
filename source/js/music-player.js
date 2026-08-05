(function () {
  function formatTime(seconds) {
    if (!isFinite(seconds) || seconds < 0) return '00:00';
    var s = Math.floor(seconds);
    var m = Math.floor(s / 60);
    var sec = s % 60;
    return (m < 10 ? '0' + m : '' + m) + ':' + (sec < 10 ? '0' + sec : '' + sec);
  }

  function initMusicPlayers(root) {
    var page = root || document;
    page.querySelectorAll('.music-play').forEach(function (btn) {
      if (btn.dataset.bound) return;
      btn.dataset.bound = "1";

      var timeEl = btn.parentNode.querySelector('.music-time');
      // 总时长写死在页面里（斜杠后面），这里只刷新斜杠前的当前时间
      var total = timeEl ? (timeEl.textContent.split('/')[1] || '--:--') : null;
      var audio = null;

      function setPlaying(playing) {
        btn.classList.toggle('playing', playing);
      }

      function updateTime() {
        if (!timeEl || !audio) return;
        timeEl.textContent = formatTime(audio.currentTime) + '/' + total;
      }

      function ensureAudio() {
        if (audio) return audio;
        audio = new Audio();
        audio.preload = 'none';
        audio.src = btn.dataset.src;
        audio.addEventListener('play', function () {
          setPlaying(true);
        });
        audio.addEventListener('pause', function () {
          setPlaying(false);
        });
        audio.addEventListener('ended', function () {
          setPlaying(false);
          audio.currentTime = 0;
          updateTime();
        });
        audio.addEventListener('timeupdate', updateTime);
        btn._audio = audio;
        return audio;
      }

      btn.addEventListener('click', function () {
        var a = ensureAudio();
        if (a.paused) {
          page.querySelectorAll('.music-play').forEach(function (other) {
            if (other !== btn && other._audio) {
              other._audio.pause();
            }
          });
          a.play();
        } else {
          a.pause();
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMusicPlayers(document);
  });
  document.addEventListener('pjax:complete', function () {
    initMusicPlayers(document);
  });
})();
