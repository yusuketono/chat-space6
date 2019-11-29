json.id         @message.id
json.user_name  @message.user.name
# ここ.nameにしてエラー解決に1日掛かった
json.created_at @message.created_at.to_s
json.content    @message.content
json.image      @message.image.url
# json.カラム インスタンス変数.カラム
# jbuilderファイルでは基本的にjson.KEY VALUEという形で書くことができます。
# ビューファイルを見て、必要な変数を考える 
# urlが付いていないと画像が取れないことになるので注意