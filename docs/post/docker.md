# Docker

::: tip 建立時間：2023/12/12
Docker
:::

## :pushpin: Docker 常用指令
- Docker Image 操作
``` shell
docker images # 查看 Images
docker images prune # 刪除沒有在使用的 Images
```

- Docker Container 操作
``` shell
docker ps
docker ps -a
docker ps -f id={Container id}
docker ps -f name={Container Name}
```

- Docker Container 操作
``` shell
docker stop {Container id} # 停止
docker kill {Container id} # 強制停止
docker rm {Container id} # 刪除停止 Container
docker restart {Container id} # 重啟 Container 
```

## :pushpin: WSL integration 共用 Linux 核心
- Enable integration with additional distros 設定
- 設定可以共用同一個Linux核心。架設我 wsl2 有兩個環境 windows docker-desktop 以及 Linux Ubuntu。那就算我在 Linux Ubuntu 建立一個 docker 服務，我在 docker-desktop 也可以存取查看該服務。

![wsl_integration](/public/docker/wsl_integration.png)


## :pushpin: 查看 docker 內所有網路
- bridge、host、none 無法刪除，所以如果要 docker 內部服務互通，可以建立一個網路，讓所有 docker 服務連同一個網路 (例如: docker_networks)
``` shell
docker networks ls # 查看 docker 內所有網路
docker networks create {name} # 建立新網路
docker network inspect docker_networks # 查看網路詳細資訊，同時也可以看到該網路底下所有 docker 服務的 IP
```
![networks](/public/docker/networks.png)