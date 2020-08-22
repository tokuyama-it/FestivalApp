<template>
    <div id="text">
           <p>キーワードを入力するっピ</p>
        <div id="move">
          <input type="text" size="5" id="key">
          <input type="button" value="確認" onclick="func()">
        </div>
    </div>
</template>
<script>
export default {
    mounted(){
        var origin="cider"  //指定キーワード
            function func(){    //確認ボタンが押された時の操作
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
html, body {
  height: 100%;
}

.wrap {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button {
  width: 140px;
  height: 45px;
  font-family: 'Roboto', sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  }

.button:hover {
  background-color: #2EE59D;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);
}
</style>