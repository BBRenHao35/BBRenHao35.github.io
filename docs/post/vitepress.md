# VitePress 安裝

## :pushpin: 使用技術
- VitePress
- MarkDown
- GitHub

## :clap: 目標
- 可以快速製作一個 blog 

## :herb: 展示

![packageJson](/public/vitepress/ShowGif.gif)
<br>

![packageJson](/public/vitepress/ShowIndex.jpg)
<br>

![packageJson](/public/vitepress/ShowTest1.jpg)



## :pushpin: 建立、初始化資料夾
- 都用預設值即可 (Enter到底)
``` shell
mkdir vitepress
cd vitepress
npm init
npm install -D vitepress
```

## :pushpin: 開啟VSCode、更改package.json
- package.json中的scripts更改如下
``` js
  "scripts": {
    "docs:dev": "vitepress dev docs", // 本機
    "docs:build": "vitepress build docs",  // 打包、檔案只會在.vitepress/dist
    "docs:serve": "vitepress serve docs" // 預覽打包的結果(需要先build)
  },

```
![packageJson](/public/vitepress/packageJson.jpg)


## :pushpin: 本機執行
``` shell
npm run docs:dev
```
![LocalRun](/public/vitepress/LocalRun.jpg)
![DefaultLocalRun](/public/vitepress/DefaultLocalRun.jpg)

## :pushpin: 說明、設定 config.js
- 新增config.js => sidebar、navbar、router 設定都是在這邊
- post 資料夾 => 自定義資料夾，可以用來區分文章MarkDown的主題大分類
    - 例如 post 資料夾內有兩篇文章 (MD檔)，test1.md 與 test2.md
    - 同時進入該文章頁面時url會出現資料夾的path (http.../post/test1.html)
- index.md => 首頁放在docs資料夾底下
``` json
export default {
    themeConfig:{
        siteTitle: "Axel Blog", 
        nav: [ // navbar 設定
            { text: "首頁", link: "/index.md" }, // navbar text首頁 link到index.md文件
            {
              text: "Drop Menu", // navbar 下拉選單
              items: [ // 設定有兩個 Item 指向不同的md文件
                { text: 'Item A', link: '/item-1' },
                { text: 'Item B', link: '/item-2' },
              ]
            }
          ],
          socialLinks: [ // GitHub Icon
            { icon: "github", link: "https://github.com/axel1227" },
          ],
          sidebar: [ // sidebar 設定
            {
              text: "大分類", // 大分類名稱，不需要可以拿掉不顯示
              items: [
                { text: "小分類1", link: "/post/test1.md", }, // test1 文章
                { text: "小分類2", link: "/post/test2.md", }, // test2 文章
              ],
              collapsible: true, // 開啟側邊折疊功能
              collapsed: false // 預設展開側邊攔
            },
          ],
    }
}
```
![config](/public/vitepress/config.jpg)
![LayoutConfig](/public/vitepress/LayoutConfig.jpg)
![PageConfig](/public/vitepress/PageConfig.jpg)

## :pushpin: 首頁 index 設定

- public 存放靜態檔案

```
---
layout: home

hero:
  name: 主題
  text: 副標題
  tagline: 說明
  image:
    src: /vue-js-icon.png
    alt: 網頁log圖片
  actions:
    - theme: brand
      text: 進入文章
      link: /post/test1.md
    - theme: alt
      text: GitHub
      link: https://github.com/axel1227
features:
  - icon: 🔨
    title: 文章1
    details: 文章1介紹
  - icon: 🖖
    title: 文章2
    details: 文章2介紹
  - icon: 🧩
    title: 文章3
    details: 文章3介紹
  - icon: ✈️
    title: 文章4
    details: 文章4介紹
  - icon: ⚡️
    title: 文章4
    details: 文章4介紹
  - icon: 🛠️
    title: 文章4
    details: 文章4介紹        
---

```
![index](/public/vitepress/index.jpg)
![indexCode](/public/vitepress/indexCode.jpg)

## :pushpin: 將專案傳到 GitHub 上、建立腳本
- 將專案傳到 GitHub 上
- 建立一個 deploy.sh 腳本檔案 => 執行後自動 build 打包並上傳 GitHub 部署
- Source Code 存放在 `main` 分支， build 產出的靜態檔案 存放在 `gh-pages` 分支

``` shell
#!/usr/bin/env sh

# 忽略Error
set -e

# Build
npm run docs:build

# 進入發布目錄
cd docs/.vitepress/dist

# 如果是發佈到自定義的Domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果是部署到 https://<USERNAME>.github.io
#  git push -f https://github.com/Axel1227/Axel1227.github.io.git main:gh-pages
git push -f git@github.com:Axel1227/Axel1227.github.io.git main:gh-pages


# 如果是部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

cd -
```

![deploy](/public/vitepress/deploy.jpg)
![github](/public/vitepress/github.jpg)

## :pushpin: 其他、疑難雜症紀錄
- GitHub 存放的倉庫專案名稱建立`必須`為 {USERNAME}.github.io
- GitHub Pages 設定 部署的分支、目錄

![Branch](/public/vitepress/Branch.jpg)


- Git push 發生 Permission denied publickey...錯誤
    - 在本機產生SSH Key (都Enter預設值)，並上傳到 GitHub上面
    ```
    ssh-keygen -t rsa -C "mail@example.com"
    ```
    - 將 id_rsa.pub 的內容複製到 GitHub ssh 當中
    - ssh 產出的檔案通常都在 C:\Users\...\.ssh\id_rsa.pub

![sshkey](/public/vitepress/sshkey.jpg)
