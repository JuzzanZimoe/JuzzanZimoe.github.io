(function () {
  // ============================================================
  // 页面密码锁配置
  // ------------------------------------------------------------
  // 开关：不需要加锁的页面，把对应的整行删除，或在行首加 // 注释。
  // 改密码：把对应行的值换成“新密码的 SHA-256 十六进制”。
  // 计算新密码哈希（在 PowerShell 里运行，把引号里的改成新密码）：
  //   [System.BitConverter]::ToString([System.Security.Cryptography.SHA256]::Create().ComputeHash([System.Text.Encoding]::UTF8.GetBytes("新密码"))).Replace("-","").ToLower()
  // 注意：新增一个需要加锁的页面时，还要在 page-lock-init.js 里同步加路径。
  // 键采用“路径前缀”匹配：写 "/courses/" 会同时锁住 /courses/ 及其所有子页面
  // （例如 /courses/resources/ 下的内容）。
  // ============================================================
  var LOCKS = {
    // "/courses/": "d371655b09e427c90a0ab5b247f22d671a501fa9039864b0a8263ac519b7cd0c", // 密码 423315
    // "/projects/": "d371655b09e427c90a0ab5b247f22d671a501fa9039864b0a8263ac519b7cd0c", // 密码 423315
    // "/moments/": "ed73aa5fbb8f0e9f11bd3d931b066c008c9e92d21531b9de73f5f75b1ac91608"  // 密码 0423
  };
  var STORAGE_KEY = "blog_unlocked_pages";

  function currentPath() {
    var p = location.pathname;
    if (p.slice(-10) === "index.html") p = p.slice(0, -10);
    if (p.slice(-1) !== "/") p += "/";
    return p;
  }

  function getHash() {
    var p = currentPath();
    for (var key in LOCKS) {
      if (p.indexOf(key) === 0) return LOCKS[key];
    }
    return null;
  }

  function getUnlockedList() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch (e) {
      return [];
    }
  }

  function isUnlocked(hash) {
    return getUnlockedList().indexOf(hash) !== -1;
  }

  function remember(hash) {
    var list = getUnlockedList();
    if (list.indexOf(hash) === -1) {
      list.push(hash);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
  }

  function sha256(text) {
    if (!window.crypto || !window.crypto.subtle) {
      return Promise.reject(new Error("crypto unavailable"));
    }
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(text)).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) {
        return b.toString(16).padStart(2, "0");
      }).join("");
    });
  }

  var overlay = null;

  function buildOverlay() {
    if (overlay) return overlay;
    overlay = document.createElement("div");
    overlay.className = "page-lock-mask";
    overlay.innerHTML =
      '<div class="page-lock-box">' +
      '<div class="page-lock-icon">&#128274;</div>' +
      '<div class="page-lock-title">此页面需要密码</div>' +
      '<input class="page-lock-input" type="password" placeholder="请输入密码" autocomplete="off">' +
      '<button class="page-lock-btn" type="button">解锁</button>' +
      '<div class="page-lock-err"></div>' +
      "</div>";
    document.body.appendChild(overlay);

    var input = overlay.querySelector(".page-lock-input");
    var btn = overlay.querySelector(".page-lock-btn");
    var err = overlay.querySelector(".page-lock-err");

    function attempt() {
      var hash = getHash();
      var value = input.value;
      if (!value) return;
      sha256(value).then(function (h) {
        if (h === hash) {
          remember(hash);
          err.textContent = "";
          document.documentElement.classList.remove("page-lock-pending");
          hide();
        } else {
          err.textContent = "密码错误，请重试";
          overlay.classList.add("error");
          setTimeout(function () {
            overlay.classList.remove("error");
          }, 600);
          input.value = "";
          input.focus();
        }
      }).catch(function () {
        err.textContent = "当前环境不支持加密校验，请使用 https 访问";
      });
    }

    btn.addEventListener("click", attempt);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") attempt();
    });
    return overlay;
  }

  function show() {
    buildOverlay();
    document.body.classList.add("page-locked");
    overlay.classList.add("show");
    setTimeout(function () {
      var input = overlay.querySelector(".page-lock-input");
      if (input) input.focus();
    }, 50);
  }

  function hide() {
    if (!overlay) return;
    overlay.classList.remove("show");
    document.body.classList.remove("page-locked");
  }

  function check() {
    var hash = getHash();
    if (!hash || isUnlocked(hash)) {
      document.documentElement.classList.remove("page-lock-pending");
      hide();
      return;
    }
    show();
  }

  document.addEventListener("DOMContentLoaded", check);
  document.addEventListener("pjax:complete", check);
})();
