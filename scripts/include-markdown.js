const fs = require('fs');
const path = require('path');

hexo.extend.tag.register('include_markdown', function (args) {
  const rawPath = args.join(' ').replace(/^['"]|['"]$/g, '');
  const sourcePath = path.join(hexo.source_dir, rawPath);

  if (!fs.existsSync(sourcePath)) {
    return `<p>Markdown file not found: ${rawPath}</p>`;
  }

  const markdown = fs
    .readFileSync(sourcePath, 'utf8')
    .replace(/^\uFEFF?---[\s\S]*?---\s*/, '')
    .replace(/^#{5}\s/gm, '###### ')
    .replace(/^#{4}\s/gm, '##### ')
    .replace(/^#{3}\s/gm, '#### ')
    .replace(/^#{2}\s/gm, '### ')
    .replace(/^#{1}\s/gm, '## ');
  return hexo.render.renderSync({ text: markdown, engine: 'markdown' });
});
