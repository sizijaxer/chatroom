# Software Studio 2020 Spring Midterm Project

## Topic
* Project Name : 107062333 chat-room

## Basic Components
|Component|Score|Y/N|
|:-:|:-:|:-:|
|Membership Mechanism|15%|Y|
|Firebase Page|5%|Y|
|Database|15%|Y|
|RWD|15%|Y|
|Topic Key Function|20%|Y|

## Advanced Components
|Component|Score|Y/N|
|:-:|:-:|:-:|
|Third-Party Sign In|2.5%|Y|
|Chrome Notification|5%|Y|
|Use CSS Animation|2.5%|Y|
|Security Report|5%|Y|

## Website Detail Description

# 作品網址：https://chat-room-107062333-5b1b1.web.app/

# Components Description : 
#### 1. 登入畫面:
![](https://i.imgur.com/4UDTaaX.png)
如果沒有帳號者，需先輸入Username、Email_address、Password，並按下Register來完成註冊(若沒有輸入Username，將以您的Email_address代為您的Username)

若已經註冊過的人，只需輸入Email_address以及Password欄位，並按下Sign in 即可登入。

另外，也可以利用Google帳號進行註冊並登入，Username將會是您的Google帳號的username


#### 2. 進入聊天室:
![](https://i.imgur.com/rqYpTOz.png)
![](https://i.imgur.com/qbjocxR.png)
首先左半邊可以看到Room的欄位，第一欄為您的使用者登入名稱(username)，點開該欄位可以看到您的基本資料以及帳號。

接下來的欄位依序為公眾聊天室PUBLIC_ROOM以及私人與所有使用者的私人聊天室

私人聊天室:
![](https://i.imgur.com/SN6KgEY.png)


對話窗中，右邊藍色便便以及藍色訊息泡泡圍在該聊天室中，您所發送的歷史紀錄，反之，左邊米白色便便以及白色信息泡泡為對發所發送給你的對話紀錄。

如何發送訊息:
step1. 將欲表達的文字打在下方黑色較深的訊息欄位
![](https://i.imgur.com/w6pgqwk.png)
step2. 按下旁邊的紙飛機按鈕即可成功送出
![](https://i.imgur.com/dN4kdJg.png)

如何得到訊息通知:
當另一個使用者發送訊息給您時，將會以chrome_notification的方式通知您(因此須先允許該網頁傳送通知給您喔)

#### h4登出:
點開自己的使用者欄位，再Username旁邊有一個登出圖案，
按下即可成功登出聊天室回到登入畫面。
![](https://i.imgur.com/ZaD1jQL.png)









# Other Functions Description : 
#### 1.如何寫入使用者資料:
![](https://i.imgur.com/bruR4HO.png)
當使用者按下register按鈕時，會藉由Listener的監聽去call firebase的function來寫入資料並再firebase端建立有效的使用者資料庫:
![](https://i.imgur.com/hPyyn1e.png)



#### 2.如何寫入訊息:
![](https://i.imgur.com/2tCji2c.png)
當使用者按下紙飛機send時，會trigger #post_btn 的Listener，並call firebase function 去寫入發送者(Sender)、收信者(Reciever)以、訊息內容(Message)以及發送時間(time)，並在firebase 端建立一個負責存訊息封包的資料結構。
![](https://i.imgur.com/NYzxods.png)

#### 4.讀取訊息:
![](https://i.imgur.com/hzAAt13.png)
![](https://i.imgur.com/E5euhCB.png)
在每次進入私人聊天室或是公眾天室時，在按下介面左邊的聊天室按鈕時，會先set好對象是誰(用一個痊癒的變數來記錄)，並call
_message()function，利用firebase.database().on()來取得所有目前所有人的訊息，並利用if else 判別訊息封包的Sender以及Reciever是否堆應到該聊天室的兩人，並將符合判別的message join起來並一併放入#post_list裡的innerHtml。(註publice_room只需考慮所有Reciever為PUBLIC的封包就行了)

另外&lt 與 &gt 是用來處理輸入的訊息為HTML format，避面造成不必要的block在網頁上生成。

#### 3.Notification:
![](https://i.imgur.com/y4MOxSk.png)
再initial時就會進行該工作，利用firebase.database().on()的function監聽是否有新的信息加入，並再針對該訊息封包裡的Reciver是否為目前正在使用的用戶端名稱，以及發送時間是否發生在1秒內，來決定是否new 一個Notification()來通知該使用者有新的訊息傳來。


