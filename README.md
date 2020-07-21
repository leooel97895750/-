# webQuickStartFramework
已完成jwt安全驗證、帳號系統、信箱驗證、圖庫上傳、資料庫api規格設計、cookie暫存，用於不同情境下的快速開發

## 安全性措施
api需jwt token驗證

api參數會經過regex檢查

密碼由前端加密傳送

帳號由gmail開通

使用helmet套件

api使用express-rate-limit套件禁止一定時間內同ip重複存取

由detonv套件統一管理隱密資訊

## javascripts
* api.js

非同步API請求，傳入網址、回傳函式、jwt

* cookie.js

透過key值搜尋cookie中的value

* croppie.min.js

圖片裁切工具，將圖片修改成想要的型態並轉為base64傳至imgur圖庫中使用

* imgur.js

上傳圖片到imgur，並將產生的圖片id存入資料庫

* login.js

登入與註冊

* sha.js

加密函式
