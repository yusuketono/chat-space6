$(function(){   //window.addEventListener('load', function() { 処理 });(HTMLの読み込み)と同様の役割

// 三項演算子バージョンのbuildHTML
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

// if文バージョンのbuildHTML
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="message" data-message_id= "${message.id}">
      <div class="message__box">
        <p class="message__box__user">${message.user_name}</p>
        <p class="message__box__date">${message.created_at}</p>
      </div>
      <div class="lower-message">
      <p class="lower-message__content">${message.content}</p>
      <p class="lower-message__image">${message.image}</p>
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

  $('.new_message').on('submit',function(e){   // form_forを使用したHTMLにはクラス名が付与されている
    e.preventDefault();
    const formData = new FormData(this); //セレクタを間違えるとここが狂うので注意
    const url = $(this).attr('action');
    // console.log(this);

    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      console.log(data);
      html = buildHTML(data);
      $(".messsages").append(html);
      // ここのセレクタを.messageにするとうざい事になる。append先のミスはあるある
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  })
});

