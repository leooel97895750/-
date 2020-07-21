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

## 快速使用
1. 須先行安裝nodejs
2. 將專案下載後，在有package.json的那層資料夾的終端機上輸入npm install，將專案所需的套件一次安裝齊全
3. windows版本須將package.json中的"start": "nodejs ./bin/www"改成"start": "node ./bin/www"
4. 就可以在終端機上輸入npm start並用瀏覽器網址輸入localhost:3000，但功能還未完全啟用
5. 在資料夾中新增.env檔案，內容格式如下

      HOST='資料庫ip'
  
      USER='資料庫帳號'
  
      PASSWORD='資料庫密碼'
  
      DATABASE='資料庫名稱'
  
      SECRET='jwt密鑰(自行亂取就行)'
 
 6. 在建立完資料庫後，可將sql資料夾內的檔案一個一個建立起來(注意關聯順序)
 7. 圖片功能需自行註冊imgur api，將imgur.js中的authorization值改成你的access token
 8. 完成!!!

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
