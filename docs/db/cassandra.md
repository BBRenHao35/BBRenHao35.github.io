# Docker Compose Cassandra CQL + Cassandra Web

::: tip 建立時間：2023/12/15
用 Docker Compose 建立 Cassandra CQL + Cassandra Web GUI 微服務
:::

## :pushpin: Docker Compose

- 建立 cassandra.yaml 檔
``` yaml
version: '3'
services:
  cassandra:
    image: cassandra # Pull cassandra Image
    container_name: cassandra
    environment:
      - HEAP_NEWSIZE=128M # 初始RAM大小
      - MAX_HEAP_SIZE=2048M # 最大使用RAM大小
    ports:
      - "9042:9042" # Port 本機9042:服務9042
    volumes:
      - ./cassandra-data:/var/lib/cassandra # 資料存放路徑
```

- 建立 cassandra-web.yaml 檔
``` yaml
version: '3'
services: 
  cassandra-web:
    image: ipushc/cassandra-web # Pull cassandra-web Image
    container_name: cassandra-web
    environment:
      #- HOST_PORT=80
      - CASSANDRA_HOST=10.1.1.2 # connect IP
      - CASSANDRA_PORT=9042 # connect DB Port
      - CASSANDRA_USERNAME=cassandra
      - CASSANDRA_PASSWORD=cassandra
    ports:
      - "8083:8083" # Port 本機8083:服務8083
    volumes:
      - ./cassandra-web:/data # 資料存放路徑
```

## :pushpin: 進入 cassandra Web 連線到 cassandra

- 拉取 Image、啟動服務
``` shell
docker-compose -f cassandra.yaml pull  # 啟動 cassandra.yaml 內的設定
docker-compose -f cassandra up -d  # 啟動服務
docker-compose -f cassandra-web.yaml pull  # 啟動 cassandra.yaml 內的設定
docker-compose -f cassandra-web up -d  # 啟動服務
docker ps  # 查看 Container
```

- `http://localhost:8083`

![docker-cassandra](/public/db/cassandra/cassandra.jpg)
![docker-cassandra-web](/public/db/cassandra/cassandra-web.jpg)
