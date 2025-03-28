# Sonarqube

::: tip 建立時間：2025/03/07
- 開源程式碼品質、分析工具
- 靜態程式分析(SAST): 掃描Souce Code
:::

## :pushpin: Sonarqube Docker Compoes
- 建立 ../sonarqube/docker-compose.yaml
``` yaml
services:
  sonarqube:
    image: sonarqube:latest
    container_name: sonarqube
    restart: always
    ports:
      - "9000:9000"
    environment:
      # - SONARQUBE_JDBC_URL=jdbc:postgresql://{IP or docker service name}:{PostgreSqlPort}/sonar
      - SONARQUBE_JDBC_URL=jdbc:postgresql://postgres:5432/sonar # DB Source
      - SONARQUBE_JDBC_USERNAME=sa # DB UserName
      - SONARQUBE_JDBC_PASSWORD=000000 # DB Password
    volumes:
      - "./sonarqube_data:/opt/sonarqube/data:rw" # 儲存 SonarQube 資料(分析結果)
      - "./sonarqube_logs:/opt/sonarqube/logs:rw" # logs 資料
      - "./sonarqube_extensions:/opt/sonarqube/extensions:rw" # SonarQube 如果有安裝額外的插件功能，會存放在這
    networks:
      - docker_networks # 表示postgres服務要加入docker_networks網路

networks:
  docker_networks:
    external: true # 如果少了這一行，他會嘗試建立 docker_networks，但如果網路已存在會出錯，所以先建立網路，在加上這一行。
```


## :pushpin: Pull Image、Run Service
``` shell
docker-compose pull  # 執行 redis.yaml 內的設定
docker-compose up -d  # 啟動服務
docker ps  # 查看 Container
```

- `http://localhost:9090`  (Login: `admin` / `admin`)
![sonarqube](/public/sonarqube/sonarqube.png)


## :pushpin: 掃描流程

- 點選 Locally
![pgadmin](/public/sonarqube/locally.jpg)

- 點選 Generate
![generate_token](/public/sonarqube/generate_token.jpg)

- 點選 Continue
![continue](/public/sonarqube/continue.jpg)

- 點選 Net、.Net Core
![continue](/public/sonarqube/net_core.jpg)

- 會顯示要執行的指令
![sonar_cmd](/public/sonarqube/sonar_cmd.jpg)

- 再到專案路徑底下執行CMD開啟終端機
![project_path](/public/sonarqube/project_path.jpg)

- 執行提供的指令
![sonar_scanner](/public/sonarqube/sonar_scanner.jpg)

- 掃描完成顯示掃描結果
![scanner_result](/public/sonarqube/scanner_result.jpg)