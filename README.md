#　Chatspace(11項目)

## 0.Git
## 1.DB設計
## 2.viewの実装
## 3.ユーザー管理機能
## 4.グループ作成
## 5.メッセージ送信機能
## 6.投稿機能のテスト
## 7.メッセージ送信の非同期化
## 8.インクリエンタルサーチ
## 9.自動更新機能
## 10.AWS

# その他

## 正規表現
## javasprict



# README
## usersテーブル
|Column  |Type        |Options|
|--------|------------|-------|
|name    |string(15) |null: false, unique: true, index: true|
|email   |string(255)|null: false, unique: true             |
|password|string(255)|null: false, unique: true             |

### Association
- has_many :groups, through: :groups-users
- has_many :groups-users
- has_many :messages

## group-users テーブル
|Column  |Type      |Options|
|--------|----------|-------|
|user_id |references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル
|Column  |Type        |Options|
|--------|------------|-------|
|name    |string(255)|null: false|

### Association
- has_many :users, through: :groups-users
- has_many :groups-users
- has_many :messages

## messagesテーブル
|Column  |Type        |Options|
|--------|------------|-------|
|content |string      |                              |
|image   |string      |                              |
|user_id |references  |null: false, foreign_key: true|
|group_id|references  |null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


#　備考欄
・DB名について
ディレクトリ名は「chat-space6」になっているが、DB名はchat-space5になっている。
・viewの実装について
面倒さを避けるため変数、色等の定義はしていない。

・rails g controller usersでいらんファイルを作成したかも
  create  app/controllers/users_controller.rb
  invoke  haml
    exist    app/views/users
  invoke  test_unit
  create    test/controllers/users_controller_test.rb
  invoke  helper
  create    app/helpers/users_helper.rb
  invoke    test_unit
  invoke  assets
  invoke    coffee
  create      app/assets/javascripts/users.coffee
  invoke    scss
  create      app/assets/stylesheets/users.scss