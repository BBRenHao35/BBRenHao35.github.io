# JWT 簡介

::: tip 建立時間：2024/11/03
JWT 簡介
:::

## :pushpin: JWT 簡介
- 全名-Json Web Token
- 基於Json的編碼 => 用來傳遞資訊
- 使用者驗證
    - Client登入
        - Request to Server JWT
            - Server Response to Client 取得該 JWT
                - JWT 儲存 Client Localstorage
- User的Jwt 再向 Server請求資源 => JWT有效 則取得資源