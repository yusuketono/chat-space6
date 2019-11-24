class Group < ApplicationRecord
  has_many :group_users
  has_many :messages
  has_many :users, through: :group_users

  validates :name, presence: true

  def show_last_message
    if (last_message = messages.last).present?
      # 最新のメッセージを変数last_messageに代入しつつ、メッセージが投稿されているかどうかで場合分けを行なっています。
      last_message.content? ? last_message.content : '画像が投稿されています'
      # 条件式 ? trueの時の値 : falseの時の値
    else
      'まだメッセージはありません。'
    end
  end
end