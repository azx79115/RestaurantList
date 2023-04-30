#RestaurantList
![img.png](餐廳清單擴充CRUD截圖.png)

##介紹
紀錄屬於自己的餐廳清單，可以瀏覽餐廳、查看詳細資訊、甚至連結到地圖。

##Features產品功能
- 使用者可以註冊帳號
- 使用者可登入系統建立自己的餐廳資料
- 使用者可以新增、修改、查閱、刪除餐廳資料
- 使用者可以透過點擊地址連結googleMap

##開始使用
1. 請先確認有安裝node.js 與 npm
2. 將專案clone到本地
3. 在本地開啟之後，透過終端機進入資料夾，輸入:
```
cd install
```
4. 安裝完畢後，設定環境變數連線 MongoDB
```
MONGODB_URI=mongodb+srv://<Your MongoDB Account>:<Your MongoDB Password>@cluster0.xxxx.xxxx.net/<Your MongoDB Table><?retryWrites=true&w=majority
```
5. 繼續輸入：
```
npm run start
```
6. 若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址
```
Listening on http://localhost:3000
```
7. 若欲暫停使用
```
ctrl + c
```


##Environment SetUp 環境建置與需求
- Node.js @14.16.0
- Express @4.18.2
- Express-Handlebars @4.0.2
- Bootstrap
- Font-awesome
- MongoDB
- mongoose @5.13.17
- body-parser @1.20.2
- dotenv @16.0.3
- method-override @3.0.0
- passport: @0.4.1
- passport-facebook: @3.0.0
- passport-local: @1.0.0
- connect-flash: @0.1.1