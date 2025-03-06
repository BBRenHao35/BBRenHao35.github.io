# Postgres + pgAdmin

::: tip 建立時間：2023/12/15
Postgres SQL 簡介
:::

## :pushpin: Postgres SQL 簡介
- 關聯式資料庫
- 支援 JSON Data

## :pushpin: 常用 Data type
- uuid: 唯一值、同GUID
- integer: 整數、同int
- numeric: 高精度數字、有小數、金融應用
- character varying: 字串、可指定長度(ex: 255)
- text: 字串、任意長度
- date: 日期、YYYY-MM-DD 
- timestamp without time zone: 日期、YYYY-MM-DD HH:MI:SS、年月日時分秒
- JSONB: Json

## :pushpin: 常用語法
- 已經有TB Table，新增Column、須注意大小寫，如果大寫要明確給雙引號
``` sql
-- 新增 Column
ALTER TABLE public."TB"
ADD COLUMN ID uuid PRIMARY KEY NOT NULL,
ADD COLUMN NAME text,
ADD COLUMN NAME2 character varying,
ADD COLUMN AGE integer,
ADD COLUMN Datetime timestamp without time zone;
```

``` sql
-- Insert Data
INSERT INTO public."TB"("id", "name", "name2", "age", "datetime")
VALUES(gen_random_uuid(), 'test', 'test2', '30', CURRENT_DATE);
```

``` sql
-- Selete Data
SELECT * FROM public."TB";

SELECT id, name2, datetime FROM public."TB"
 WHERE id = '{id}';
```

``` sql
-- Delete Data
DELETE FROM public."TB"
      WHERE "id" = '{id}';
```

``` sql
-- Update Data
UPDATE public."TB"
   SET "name2" = 'testupdate'
 WHERE "id" = '{id}';
```

![pgadmin](/public/db/postgres/pgadmin.png)




## :pushpin: Docker Compose Postgres + pgAdmin
::: tip 建立時間：2023/12/12
用 Docker Compose 建立 Postgres SQL + pgAdmin GUI 微服務
:::

## :pushpin: Docker Compose

- 建立 ../postgres/docker-compose.yaml
``` yaml
services:
  postgres:
    image: postgres # Pull postgres Image
    container_name: postgres
    environment:
      - POSTGRES_DB=postgres # 預設Db
      - POSTGRES_USER=sa # 登入帳號
      - POSTGRES_PASSWORD=000000 # 登入密碼
    ports:
      - "5432:5432" # Port 本機5432:服務5432
    volumes:
      - ./data:/var/lib/postgresql/data # 資料存放路徑
    networks:
      - docker_networks # 表示postgres服務要加入docker_networks網路

networks:
  docker_networks:
    external: true # 如果少了這一行，他會嘗試建立 docker_networks，但如果網路已存在會出錯，所以先建立網路，在加上這一行。
```

- 建立 ../pgadmin/docker-compose.yaml
``` yaml
services:
  pgadmin:
    image: dpage/pgadmin4:latest # Pull pgadmin4 Image
    container_name: pgadmin
    environment:
      - PGADMIN_DEFAULT_EMAIL=sa@gmail.com # Login Email
      - PGADMIN_DEFAULT_PASSWORD=000000 # Login Password
      - PGADMIN_LISTEN_PORT=80 # 80 Port
    ports:
      - "5050:80" # Port 本機5050:服務80
    volumes:
      - ./data:/var/lib/pgadmin # 資料存放路徑
    networks:
      - docker_networks # 表示postgres服務要加入docker_networks網路

networks:
  docker_networks:
    external: true # 如果少了這一行，他會嘗試建立 docker_networks，但如果網路已存在會出錯，所以先建立網路，在加上這一行。

```

## :pushpin: 進入 pgAdmin GUI 連線到 Postgres

- 拉取 Image、啟動服務
``` shell
docker-compose pull  # 執行 postgres.yaml 內的設定
docker-compose up -d  # 啟動服務
docker ps  # 查看 Container
```

- `http://localhost:5050`  (Login: `example@gmail.com` / `000000`)
![docker-pgadmin](/public/db/postgres/pgadmin-login.png)

- Add New Server
- General => Name: postgres
- Connection => 
    - Host name/address: postgres  (參考docker page，因為在同個網路可以用服務名稱直接存取)
    - Port: 5432
    - Username: sa
    - Password: 000000

![docker-pgadmin-general](/public/db/postgres/pgadmin-general.png)
![docker-pgadmin-connection](/public/db/postgres/pgadmin-connection.png)
![docker-pgadmin-ui](/public/db/postgres/pgadmin-ui.png)
