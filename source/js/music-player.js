(function () {
  function initMusicPlayers(root) {
    var page = root || document;
    page.querySelectorAll('.music-play').forEach(function (btn) {
      if (btn.dataset.bound) return;
      btn.dataset.bound = "1";

      var audio = null;

      function setPlaying(playing) {
        btn.classList.toggle('playing', playing);
      }

      function ensureAudio() {
        if (audio) return audio;
        audio = new Audio();
        audio.preload = 'none';
        audio.src = btn.dataset.src;
        audio.addEventListener('play', function () { setPlaying(true); });
        audio.addEventListener('pause', function () { setPlaying(false); });
        audio.addEventListener('ended', function () { setPlaying(false); });
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
