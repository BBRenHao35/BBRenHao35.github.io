# Docker Compose Postgres + pgAdmin

::: tip 建立時間：2024/11/03
用 Docker Compose 建立 Redis SQL + Redisinsight GUI 微服務
:::

## :pushpin: Docker Compose

- 建立 redis.yaml 檔
``` yaml
services:
  redis:
    container_name: redis 
    image: redis:latest # Image
    restart: always
    volumes:
      - "./redis_data:/data" # 掛載Volumes
    ports:
      - 6379:6379
    environment:
      - REDIS_PASSWORD=1qaz2wsx # 預設密碼
```

- 建立 redisinsight.yaml 檔
``` yaml
services:
  redisinsight:
    image: redis/redisinsight:latest # Image
    restart: always
    container_name: redisinsight
    ports:
      - 5540:5540
    volumes:
      - "./redisinsight_data:/data" # 掛載Volumes
```

## :pushpin: 進入 redisinsight GUI 連線到 redis

- 拉取 Image、啟動服務
``` shell
docker-compose -f redis.yaml pull  # 執行 redis.yaml 內的設定
docker-compose -f redis.yaml up -d  # 啟動服務
docker-compose -f redisinsight.yaml pull  # 執行 redisinsight.yaml 內的設定
docker-compose -f redisinsight.yaml up -d  # 啟動服務
docker ps  # 查看 Container
```

- `http://172.23.32.1:5540`
- Add Redis database
- Home => 172.23.32.1
- Port => 6379
- Database Alias => 172.23.32.1:6379

![docker-pgadmin](/public/db/redis/redisinsight-gui.png)
![docker-pgadmin](/public/db/redis/redisinsight-connection.png)

- Add Key - Hash(Field、Value)

![docker-pgadmin](/public/db/redis/redisinsight-connectiondb.png)
![docker-pgadmin](/public/db/redis/redisinsight-key.png)


