$(function(){
// $(function(){処理});でwindow.addEventListener('load', function() { 処理 });(HTMLの読み込み)をしている
  $('.form').on('submit',function(e){
    e.preventDefault()
    console.log('メッセージが送信されました');
  })
});

