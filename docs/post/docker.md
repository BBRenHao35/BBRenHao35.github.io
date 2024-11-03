# Docker 指令

::: tip 建立時間：2023/12/12
Docker 指令
:::

## :pushpin: Docker 常用指令

- 查看 Docker Images

``` shell
docker images
```

- 查看 Docker Container
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
docker rm {Container id} # 刪除停止Container
docker restart {Container id} # 重啟Container 
```
