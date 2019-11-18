# 学習メモ

##　Chatspace

### DB設計
### viewの実装
### ユーザー管理機能
### グループ作成
### メッセージ送信機能
### 投稿機能のテスト
### メッセージ送信の非同期化
### インクリエンタルサーチ
### 自動更新機能

## デプロイ

### AWS

## その他

### 正規表現
### javasprict
### Git


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