<template>
<div class="tx">
    <div id="text" class="tz">
      <p>キーワードを入力するっピ</p>
      <input type="text" size="5" id="key">
      <button v-on:click="run">確認</button>
    </div>
</div>
</template>
<script>
var origin="cider"  //指定キーワード
export default {
  methods: {
    run: function(){  //確認ボタンが押された時の操作
      var key=document.getElementById("key").value;  //入力値をkeyに格納
      if(origin==key){  //正解だった時
        var a = document.getElementById("text");
        a.innerHTML="正解だよ！haha!";
      }
      else{  //違ったとき
        var a = document.getElementById("text");
        a.innerHTML="どうやらキーワードが違うようだ...";
      }
    }
  }
}
</script>
<style>
.tx{
  text-align: center;
}
.tz{
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform : translate(-50%,-50%);
  transform : translate(-50%,-50%);
}
body{
  background:rgb(114,0,38)
}
</style>