const { stripHTML } = require('hexo-util');

const countedPages = new Set([
  'about/index.md',
  'courses/index.md',
  'moments/index.md',
  'projects/index.md',
  'thoughts/index.md'
]);

function normalizeSource(source) {
  return String(source || '').replace(/\\/g, '/');
}

function countWords(content) {
  const text = stripHTML(String(content || ''));
  const cn = (text.match(/[\u4E00-\u9FFF]/g) || []).length;
  const en = (text.replace(/[\u4E00-\u9FFF]/g, '').match(/[a-zA-Z0-9_]+|\w+/g) || []).length;
  return cn + en;
}

function formatCount(count) {
  if (count < 1000) return count;
  return `${Math.round(count / 100) / 10}k`;
}

hexo.extend.helper.register('totalcount', function (site) {
  let count = 0;

  site.posts.forEach(post => {
    count += countWords(post.content);
  });

  site.pages.forEach(page => {
    if (countedPages.has(normalizeSource(page.source))) {
      count += countWords(page.content);
    }
  });

  return formatCount(count);
});
