$(function(){   //window.addEventListener('load', function() { 処理 });(HTMLの読み込み)と同様の役割
// 三項演算子バージョンbuildHTML
  // function buildHTML(message){
  //     const image = message.image ? `<img src="${message.image}">` : "" ;
  //     const html = `<div class="message" data-message_id= "${message.id}">
  //                     <div class="message__box">
  //                       <p class="message__box__user">${message.user_name}</p>
  //                       <p class="message__box__date">${message.created_at}</p>
  //                     </div>
  //                     <div class="lower-message">
  //                     <p class="lower-message__content">${message.content}</p>
  //                     <p class="lower-message__image">${image}</p>
  //                     </div>
  //                   </div>`
  //   return html
  // }

// if文バージョンbuildHTML
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="message" data-message_id= "${message.id}">
      <div class="message__box">
        <p class="message__box__user">${message.user_name}</p>
        <p class="message__box__date">${message.created_at}</p>
      </div>
      <div class="lower-message">
      <p class="lower-message__content">${message.content}</p>
      <p class="lower-message__image"><img src="${message.image}"></p>
      </div>
    </div>`
    } else {
      var html = `<div class="message" data-message_id= "${message.id}">
      <div class="message__box">
        <p class="message__box__user">${message.user_name}</p>
        <p class="message__box__date">${message.created_at}</p>
      </div>
      <div class="lower-message">
      <p class="lower-message__content">${message.content}</p>
      </div>
    </div>`
    }
    return html
  }

  // 非同期通信
  $('.new_message').on('submit',function(e){   // form_forを使用したHTMLにはクラス名が付与されている
    e.preventDefault();
    const formData = new FormData(this); //セレクタを間違えるとここが狂うので注意
    const url = $(this).attr('action');

    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      html = buildHTML(data);
      $(".messages").append(html);
      // ここのセレクタを.messageにするとうざい事になる。append先のミスはあるある
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.new_message')[0].reset();
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);//ここでdisabled解除している
    })
  })

// 自動更新
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').attr('data-message-id')
    // console.log(last_message_id );
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      // 本来はgroups/:group_id/api/messages(.:format)であるが、ルーティングをネストさせている時点でgroups/:group_idはparamsに入っている？
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.messages').append(insertHTML);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      console.log('error');
    });
  };
  setInterval(reloadMessages, 7000);
});

 