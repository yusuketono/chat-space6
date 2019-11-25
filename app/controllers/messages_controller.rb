class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    # binding.pryするとこんな感じ
    # {"utf8"=>"✓", "authenticity_token"=>"d5lWzIIDidVW703/Vd41HvEipOtaUG6bopaYf3SP0Qk16KUo+QrQv6sn8fRRcxK10xjNIs4NowGhcJLm6MrLHw==", "message"=>{"content"=>"s"}, "controller"=>"messages", "action"=>"create", "group_id"=>"1"} 
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html {redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'}
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end