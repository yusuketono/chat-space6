$(function(){   //window.addEventListener('load', function() { 処理 });(HTMLの読み込み)と同様の役割
  $('.new_message').on('submit',function(e){   // form_forを使用したHTMLにはクラス名が付与されている
    e.preventDefault()
    console.log(this);

    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  })
});

