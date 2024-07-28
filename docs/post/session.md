# session

::: tip 建立時間：2024/07/29
session 簡介
:::

## :pushpin: session 簡介
- Session 儲存的資料在 Server 端
- Session 儲存在 cookie or Url中 => Server端為主、會去檢查
- Client 發送Request to Server，先檢查 Client 的 Request 是否有 Session ID
    - 若無 => 表示為新的，產生一個 Session Id 並 Response 給 Client 保存
    - 若有 => 則表示該 Requect 的 Client 端已經存放過該 Id

