# cookie

::: tip 建立時間：2024/07/25
cookie 簡介
:::

## :pushpin: cookie 簡介
- 網站自動登入(記住帳密)、記住使用者行為或偏好(廣告推薦)
- 登入會員 => 透過 cookie 紀錄之前輸入帳號密碼 => 不用每次重新輸入
- cookie 設定資料 => 只儲存在 Client 端電腦

## :pushpin: Browser => F12 => Application => Cookies
![pgadmin](/public/cookie/cookie.png)


## :pushpin: HttpOnly
- 表示 cookie 只能通過 Http Request(GET、POST) 訪問，無法透過 JavaScript 取得 User cookie 資料。
``` script
<script>(document.cookie)</script>
```
- 防 XSS (跨站腳本攻擊) 攻擊者在網站前端塞入惡意 JavaScript 程式，User 在操作時，攻擊者透過 document.cookie 竊取 User 的 cookie 資料。

## :pushpin: Secure
- 表示 cookie 只能通過 https 發送，保護 cookie 只能在 https 傳遞。
- 假設設定 http://test.com 的 cookie 時，https://test.com 也能看到同樣的 cookie，但如果有設定 Secure，則 http 看不同該 cookie。

## :pushpin: SameSite
- 防 CSRF(跨站請求偽造攻擊) User 登入銀行 Web => 攻擊者使用 User 身分 => 惡意操作銀行轉帳
- User 登入後會得到一個代表 User 身分驗證的 cookie => User 操作時，開啟另一個分頁(攻擊者惡意網站) => 惡意網站發起 CSRF 攻擊(使用User已登入的可信銀行網站，去發送轉帳請求)，因為是使用 User 身分驗證的合法 cookie，會被視為有效的身分驗證。
- 使用三個值來防止 CSRF 攻擊 Strict、Lax、None：
    - Strict 最嚴格，只在同一個 Web 時才發送 cookie，其他跨站 Request 都不會發送cookie。
    - Lax 中等，允許 GET Request 發送 cookie，但阻止 POST 發送 cookie。
    - None 寬鬆，允許跨站發送 cookie，但必須與 Secure(僅https發送) 屬性一起使用。
