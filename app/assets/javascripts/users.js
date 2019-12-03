$(function() {
  // インクリ前半のappend
  function addUser(user) {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  // インクリ後半のappend(追加ボタンを押した時の挙動)
  function addDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }

  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }

// インクリ前半(文字を入力すると候補の名前が出てくる)
  // ここのセレクタはinputタグ。この段階で間違っている人もいる
  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users) {
        $("#user-search-result").empty();

        if (users.length !== 0) {
          users.forEach(function(user) {
            addUser(user);
          });
        } else if (input.length == 0) {
          return false;
        } else {
          addNoUser();
        }
      })
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
      });
  });

// インクリ後半(追加削除ボタン)
// 非同期で追加したビューに付いている要素をセレクタにしているので、documentで読み込む必要がある
  $(document).on("click", ".chat-group-user__btn--add", function() {
    console.log(this)
    // 追加ボタンにユーザーの名前とidが付与されているので、thisでユーザーの名前とidを使用できる
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");

    // クリックした親要素ごと削除するという意味
    $(this)
      .parent()
      .remove();

    addDeleteUser(userName, userId);
    addMember(userId);
  });
  
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    // クリックした親要素ごと削除するという意味
    $(this)
      .parent()
      .remove();
  });
});