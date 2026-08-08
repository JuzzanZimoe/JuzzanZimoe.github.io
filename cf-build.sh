#!/bin/bash
# Cloudflare Pages 专用构建脚本（项目 juzzanzimoe）
#
# 1) 构建本仓库（简略版）到 public/
# 2) 拉取完整版仓库 Blog-Backup 并构建
# 3) 把完整版输出合并到 public/Blog-Backup/
#
# 效果：juzzanzimoe.pages.dev/ 是简略版，
#       juzzanzimoe.pages.dev/Blog-Backup/ 是完整版。
# GitHub Actions 不使用此脚本（它直接 npm run build）。
set -e

echo "[1/3] Installing dependencies and building simplified site..."
npm install --no-audit --no-fund
npx hexo generate

TMP_DIR=".blog-backup-tmp"
rm -rf "$TMP_DIR"

echo "[2/3] Cloning full version repo (Blog-Backup)..."
git clone --depth 1 https://github.com/JuzzanZimoe/Blog-Backup.git "$TMP_DIR"
cd "$TMP_DIR"
npm install --no-audit --no-fund
npx hexo generate
cd ..

echo "[3/3] Merging full version into public/Blog-Backup..."
mkdir -p public/Blog-Backup
cp -R "$TMP_DIR/public/." public/Blog-Backup/
rm -rf "$TMP_DIR"

echo "Cloudflare build complete."
