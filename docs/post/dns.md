# DNS 簡介

::: tip 建立時間：2024/11/03
DNS、Browser 渲染、PPPOE
:::

## :pushpin: DNS 簡介
- User 輸入網址 (example.com)
    - Browser 向 DNS伺服器(Hinet) 查詢對應的 IP
        - DNS 回應對應的 IP 給 Browser
            - Browser 接收到 IP
                - Browser 訪問該 IP 的主機

## :pushpin: Browser 渲染流程
- Client Url To Browser
    - Browser DNS 查詢 IP
        - TCP/IP 與 Server 連接 (http 80 or https 443)
            - Browser 向 Server 發送 http or https 請求(包含Url、http版本、Cookies等資訊)
                - Server 接收到後，查詢資料庫/執行服務,再將狀態、內容等回傳給Browser
                    - Browser 接收到後解析 Html 生成 Dom 渲染執行 JS 等請求，顯示到 Client端

## :pushpin: PPPOE
- PPPOE Get (IP-170.x.x.x)連線
    - DNS指定該(IP-170.x.x.x)指向(Domain-exp.com.tw)