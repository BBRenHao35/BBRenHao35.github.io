# Git 指令

::: tip 建立時間：2023/08/31
Git 常用指令紀錄
:::

## :pushpin: clone 遠端在到本機推送 main

- git clone 遠端GitHub ( 新專案會建立一個 READE.md )

``` shell
git clone https...git連結
```

- 全部的檔案新增到git
``` shell
git add .
```

- 提交、輸入文字說明
``` shell
git commit -m "first commit"
```

- 推送 main
``` shell
git push -u origin main
```

## :pushpin: 本機推送 Github master

- git 初始化

``` shell
git init  
```

- 新增遠端github網址
``` shell
git remote add origin https...git連結
```

- 全部的檔案新增到git
``` shell
git add .
```

- 提交、輸入文字說明
``` shell
git commit -m "first commit"
```

- 推送 master
``` shell
git push -u origin master
```
