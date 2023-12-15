# Docker Compose Postgres + pgAdmin

::: tip 建立時間：2023/12/12
用 Docker Compose 建立 Postgres SQL + pgAdmin GUI 微服務
:::

## :pushpin: Docker Compose

- 建立 postgres.yaml 檔
``` yaml
version: '3'
services:
  postgres:
    image: postgres # Pull postgres Image
    container_name: postgres
    environment:
      - POSTGRES_DB=postgres # 預設Db
      - POSTGRES_USER=postgres # 登入帳號
      - POSTGRES_PASSWORD=000000 # 登入密碼
    ports:
      - "5432:5432" # Port 本機5432:服務5432
    volumes:
      - ./postgres-data:/var/lib/postgresql/data # 資料存放路徑
```

- 建立 pgadmin.yaml 檔
``` yaml
version: '3'
services:
  pgadmin:
    image: dpage/pgadmin4:latest # Pull pgadmin4 Image
    container_name: pgadmin
    environment:
      - PGADMIN_DEFAULT_EMAIL=example@gmail.com # Login Email
      - PGADMIN_DEFAULT_PASSWORD=000000 # Login Password
      - PGADMIN_LISTEN_PORT=80 # 80 Port
    ports:
      - "5050:80" # Port 本機5050:服務80
    volumes:
      - ./pgadmin-data:/var/lib/pgadmin # 資料存放路徑

```

## :pushpin: 進入 pgAdmin GUI 連線到 Postgres

- 拉取 Image、啟動服務
``` shell
docker-compose -f postgres.yaml pull  # 執行 postgres.yaml 內的設定
docker-compose -f postgres.yaml up -d  # 啟動服務
docker-compose -f pgadmin.yaml pull  # 執行 pgadmin.yaml 內的設定
docker-compose -f pgadmin.yaml up -d  # 啟動服務
docker ps  # 查看 Container
```

- `http://localhost:5050`  (Login: `example@gmail.com` / `000000`)
![docker-pgadmin](/public/docker/docker-postgres/docker-pgadmin.png)

- Add New Server
- General => Name: postgres
- Connection => 
    - Host name/address: postgres
    - Port: 5432
    - Username: postgres
    - Password: 000000
![docker-pgadmin-general](/public/docker/docker-postgres/docker-pgadmin-general.png)
![docker-pgadmin-connection](/public/docker/docker-postgres/docker-pgadmin-connection.png)
![docker-pgadmin-ui](/public/docker/docker-postgres/docker-pgadmin-ui.png)
