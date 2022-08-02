---
local: zh-CN
title: Github Action
---

## VuePress 项目配置

- docs/.vuepress/config.ts
```ts
import { defaultTheme, defineUserConfig } from 'vuepress'

export default defineUserConfig ({
  base: "/docs/", // 这个是重点
  port: 9527,
  lang: "zh-CN",
  title: "🎉",
  description: "Hello H.z",
  theme: defaultTheme({
    sidebarDepth: 2,
    sidebar: [
      '/documents/uniapp.md',
      "/documents/github-pages.md"
    ]
  })
})
```

- yml 自动化配置 路径：`.github/workflows/docs.yml`
```yml
name: docs-deploy

on:
  # 每当 push 到 main 分支时触发部署
  push:
    branches: [main]
  # 手动触发部署
  # workflow_dispatch:

jobs:
  docs:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
        with:
          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          # 选择要使用的 node 版本
          node-version: '16'

      # 缓存 node_modules
      - name: Cache dependencies
        uses: actions/cache@v2
        id: yarn-cache
        with:
          path: |
            **/node_modules
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-

      # 如果缓存没有命中，安装依赖
      - name: Install dependencies
        if: steps.yarn-cache.outputs.cache-hit != 'true'
        run: yarn --frozen-lockfile

      # 运行构建脚本
      - name: Build VuePress site
        run: yarn docs:build

      # 查看 workflow 的文档来获取更多信息
      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v2
        with:
          # 部署到 gh-pages 分支
          target_branch: gh-pages
          # 部署目录为 VuePress 的默认输出目录
          build_dir: docs/.vuepress/dist
        env:
          # @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-github_token-secret
          GITHUB_TOKEN: ${{ secrets.ACCESS_TOKEN }}
```

## Github Settings
- 添加你自己PC的SSH_RAS key到你的Settings里
- 在Settings里找到`Developer settings`->`Personal access tokens`->`generator new token`
- 名字随便，把值复制出来！

## New project
- new respository -> docs
- push local project -> branch main

## Respository Settings
- 到你项目里的Settings里
- 找到Secrets->Actions->new respository
- 名字写`ACCESS_TOKEN` value就是刚才你复制的那个
- 然后他就会自动的开始打包和部署

