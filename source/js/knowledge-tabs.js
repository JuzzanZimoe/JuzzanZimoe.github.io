(function () {
  function initKnowledgeTabs(root) {
    var page = root || document;
    page.querySelectorAll('.knowledge-page').forEach(function (knowledgePage) {
      var links = knowledgePage.querySelectorAll('.knowledge-tree a[href^="#"]');
      var sections = knowledgePage.querySelectorAll('.knowledge-content > section[id]');
      if (!links.length || !sections.length) return;

      function showSection(id) {
        sections.forEach(function (section) {
          var isActive = section.id === id;
          section.classList.toggle('active', isActive);
          section.style.display = isActive ? 'block' : 'none';
        });
        links.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }

      function scrollToKnowledgeTop() {
        var header = document.querySelector('#page-header.nav-fixed #nav') || document.querySelector('#nav');
        var headerHeight = header ? header.offsetHeight : 0;
        var top = knowledgePage.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
        window.scrollTo({
          top: Math.max(top, 0),
          behavior: 'smooth'
        });
      }

      function hasSection(id) {
        return Array.prototype.some.call(sections, function (section) {
          return section.id === id;
        });
      }

      function countSectionWords(section) {
        var clone = section.cloneNode(true);
        clone.querySelectorAll('h2, .knowledge-section-meta, iframe, script, style').forEach(function (node) {
          node.remove();
        });
        var text = clone.textContent.replace(/\s+/g, ' ').trim();
        var chinese = text.match(/[\u4E00-\u9FFF]/g) || [];
        var westernText = text.replace(/[\u4E00-\u9FFF]/g, ' ');
        var western = westernText.match(/[a-zA-Z0-9_]+/g) || [];
        return chinese.length + western.length;
      }

      function formatReadTime(words) {
        var minutes = Math.ceil(words / 300);
        return minutes < 1 ? '不到 1 分钟' : minutes + ' 分钟';
      }

      function renderSectionMeta() {
        sections.forEach(function (section) {
          if (section.querySelector(':scope > .knowledge-section-meta')) return;
          var heading = section.querySelector('h2');
          if (!heading) return;

          var words = countSectionWords(section);
          var meta = document.createElement('div');
          meta.className = 'knowledge-section-meta';
          meta.innerHTML = [
            '<span><i class="far fa-file-alt"></i>约 ' + words + ' 个字</span>',
            '<span class="knowledge-meta-separator">/</span>',
            '<span><i class="far fa-clock"></i>预计阅读时间 ' + formatReadTime(words) + '</span>'
          ].join('');
          heading.insertAdjacentElement('afterend', meta);
        });
      }

      links.forEach(function (link) {
        link.addEventListener('click', function (event) {
          var id = link.getAttribute('href').slice(1);
          if (!hasSection(id)) return;
          event.preventDefault();
          showSection(id);
          history.replaceState(null, '', '#' + id);
          // 直接同步滚动：getBoundingClientRect 会立即计算最新布局，
          // 不依赖 requestAnimationFrame，避免偶发不滚动的问题
          scrollToKnowledgeTop();
        });
      });

      var initialId = location.hash ? location.hash.slice(1) : '';
      var initialSection = initialId && hasSection(initialId);
      renderSectionMeta();
      showSection(initialSection ? initialId : sections[0].id);
      if (initialSection) {
        scrollToKnowledgeTop();
      }
    });
  }

  function renameRecentPostCard(root) {
    var page = root || document;
    page.querySelectorAll('.card-recent-post .item-headline span').forEach(function (title) {
      title.textContent = '近期更新';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initKnowledgeTabs(document);
    renameRecentPostCard(document);
  });

  document.addEventListener('pjax:complete', function () {
    initKnowledgeTabs(document);
    renameRecentPostCard(document);
  });
})();
