// 生成后处理：把密码保护路径下的页面从 search.xml 中移除，
// 避免内容通过站内搜索泄露。直接修改内存中的路由数据，
// 这样每次构建（包括 clean 之后）都会稳定生效。
hexo.extend.filter.register('after_generate', function () {
  const route = this.route;
  const path = 'search.xml';
  const stream = route.get(path);
  if (!stream) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', chunk => chunks.push(chunk));
    stream.on('end', () => {
      try {
        const content = Buffer.concat(chunks).toString('utf8');
        const prefixes = ['/courses/', '/projects/', '/moments/'];
        let changed = false;
        const next = content.replace(/<entry>[\s\S]*?<\/entry>/g, entry => {
          const href = /<link href="([^"]*)"/.exec(entry);
          if (href && prefixes.some(prefix => href[1].indexOf(prefix) === 0)) {
            changed = true;
            return '';
          }
          return entry;
        });
        if (changed) {
          route.set(path, next);
        }
        resolve();
      } catch (e) {
        reject(e);
      }
    });
    stream.on('error', reject);
  });
});
