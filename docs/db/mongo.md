# Mongo + Mongo Express

::: tip 建立時間：2023/12/17
Mongo DB 簡介
:::

## :pushpin: Mongo DB 簡介
- NoSQL 非關聯式資料庫
- 應用-JSON資料儲存、即時數據、大數據、低價值檔案儲存
- 階層: Database => Collection => Document
- Collection: 類似Table的概念
- Document: 自動產生_id(Primary Key)、每一筆被儲存的資料BSON(binary JSON)
- Indexes:  增加不同欄位的搜尋，可以透過條件搜尋加快速度

![pgadmin](/public/db/mongo/mongodb-compass.png)



## :pushpin: Docker Compose Mongo DB + Mongo Express

::: tip 建立時間：2023/12/15
用 Docker Compose 建立 Mongo DB + Mongo Express GUI 微服務
:::

## :pushpin: Docker Compose

- 建立 mongo.yaml 檔

``` yaml
version: '3.3'
services:
  mongo:
    image: mongo # Pull mongo Image
    restart: always
    container_name: mongo-docker
    environment:
      MONGO_INITDB_ROOT_USERNAME: mongoadmin # 登入帳號
      MONGO_INITDB_ROOT_PASSWORD: mongoadmin # 登入密碼
    ports:
      - "27017:27017" # Port 本機27017:服務27017
    volumes:
      - ./mongo-data:/db # Data存放路徑
```

- 建立 mongo-express.yaml 檔

``` yaml
version: '3.3'
services:
  mongo-express:
    image: mongo-express # Pull mongo-express Image
    container_name: mongo-express
    restart: always
    environment:
      ME_CONFIG_MONGODB_SERVER: mongo # 連線到mongo服務
      ME_CONFIG_BASICAUTH_USERNAME: admin # 進入web UI Alert的帳號
      ME_CONFIG_BASICAUTH_PASSWORD: changeme # 進入web UI Alert的密碼
      ME_CONFIG_MONGODB_ADMINUSERNAME: mongoadmin # Connect Db帳號
      ME_CONFIG_MONGODB_ADMINPASSWORD: mongoadmin # Connect Db密碼
      #ME_CONFIG_MONGODB_URL: mongodb://mongoadmin:mongoadmin@localhost:27017/ # 連接Url紀錄 mongodb://帳號:密碼@ip:port
    ports:
      - "28081:8081"
    volumes:
      - ./mongo-express-data:/data
```

## :pushpin: 進入 Mongo GUI 連線到 Mongo DB

- 拉取 Image、啟動服務
``` shell
docker-compose -f mongo.yaml pull  # 執行 mongo.yaml 內的 設定
docker-compose -f mongo.yaml up -d  # 啟動服務
docker-compose -f mongo-express.yaml pull  # 執行 mongo-express.yaml 內的 設定
docker-compose -f mongo-express.yaml up -d  # 啟動服務
docker ps  # 查看 Container
```

- `http://localhost:28081`  (Login: `admin` / `changeme`)

![docker-mongoweb-login](/public/db/mongo/mongoweb-login.png)
![docker-pgadmin-ui](/public/db/mongo/mongo-express.png)

## :pushpin: 使用本機 MongoDB Compass 登入 Mongo DB

- 下載安裝MongoDB Compass
- Username/Password
    - Username: mongoadmin
    - Password: mongoadmin

![docker-mongo-compass](/public/db/mongo/mongo-local.png)
![docker-mongo-compass](/public/db/mongo/mongo-compass.jpg)
![docker-mongo-compass](/public/db/mongo/mongo-express-ui.png)