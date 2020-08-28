<template>
<div class="main">
  <div class="img1"></div>
  <div class="tz">
    <div class="tx">
    <p id="text">↓キーワードを入力↓</p>
    </div>
    <div class="cp_iptxt">
      <input type="text" id="key" placeholder="" class="ef" style="text-align: center;color: #ffffff" maxlength="5">
      <label>key</label>
      <span class="focus_line"></span>
    </div>
    <button v-on:click="run" class="btn" ontouchstart="">UNLOCK</button>
  </div>
  <div class="img2"></div>
</div>

</template>
<script>
var origin="cider"  //指定キーワード
export default {
  methods: {
    run: function(){  //確認ボタンが押された時の操作
      var key=document.getElementById("key").value;  //入力値をkeyに格納
      if(origin==key){   //正解だった時
        var a = document.getElementById("text");
        a.innerHTML="正解だよ！";
        document.getElementById("key").value = "";
      }
      else{  //違ったとき
        var a = document.getElementById("text");
        a.innerHTML="キーが違うようだ...";
        document.getElementById("key").value = "";
      }
    }
  }
}
</script>
<style>
.img1{
    background-image: url("t2.png");
    background-repeat:  no-repeat;
    width:125px;
    height:150px;
    position: absolute;
    top: 15%;
    left: 0%;
    z-index: 2;
}
.img2{
  background-image: url("t3.png");
    background-repeat:  no-repeat;
    width:140px;
    height:165px;
    position: absolute;
    bottom: 10%;
    right: 0%;
    z-index: 2;
}
.tz{
  text-align: center;
  width: 60%;
  height: 70%;
  opacity: 1;
  background-color: #000000;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform : translate(-50%,-50%);
  transform : translate(-50%,-50%);
  z-index: 1;
}

/*unlockボタンのscc設定*/
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000000;
  text-align: center;
  text-decoration: none;
  width: 80%;
  height: 50px;
  top: 65%;
  left: 50%;
  -webkit-transform : translate(-50%,-50%);
  transform : translate(-50%,-50%); 
  padding: 20px 20px 20px 75px;
  background-color: #ffffff;
  border: 3px solid #000000;
  border-radius: 5px;
  box-sizing: border-box;
  position: absolute;
  transition-duration: 0.3s;
}
.btn::before {
  content: '';
  width: 48px;
  height: 60px;
  position: absolute;
  top: 64%;
  left: 15px;
  margin-top: -30px;
  background-image: url("1280.png");
  background-size: contain;
  background-repeat: no-repeat;
}
.btn span {
  font-size: 26px;
  font-weight: bold;
  line-height: 1;
}
.btn span span {
  display: block;
  font-size: 16px;
  margin-bottom: 7px;
}
.btn:hover {
  color: #ffffff;
  background-color: #f1af35;
}

/*入力フォームについてのscc設定*/
.cp_iptxt {
  -webkit-appearance: none;
	position: relative;
	width: 60%;
  top: 45%;
  left: 50%;
  -webkit-transform : translate(-50%,-50%);
  transform : translate(-50%,-50%); 
}
.cp_iptxt input[type='text'] {
  -webkit-appearance: none;
	font: 15px/24px sans-serif;
	box-sizing: border-box;
	width: 100%;
	letter-spacing: 1px;
	padding-left: -4em;
}
.cp_iptxt input[type='text']:focus {
  -webkit-appearance: none;
	outline: none;
}
.ef {
  -webkit-appearance: none;
	padding: 4px 0;
	border: 0;
	border-bottom: 1px solid #ffffff;
	background-color: transparent;
}
.ef ~ .focus_line {
  -webkit-appearance: none;
	position: absolute;
	bottom: 0;
	left: 50%;
	width: 0;
	height: 2px;
	transition: 0.4s;
	background-color: #ffffff;
}
.ef ~ .focus_line {
  -webkit-appearance: none;
	position: absolute;
	bottom: 0;
	left: 50%;
	width: 0;
	height: 2px;
	transition: 0.4s;
	background-color: #ffffff;
}
.ef:focus ~ .focus_line,
.cp_iptxt.ef ~ .focus_line {
  -webkit-appearance: none;
	left: 0;
	width: 100%;
	transition: 0.4s;
}
.ef ~ label {
  -webkit-appearance: none;
	position: absolute;
	z-index: -1;
	top: 4px;
	left: 0;
	width: 100%;
	transition: 0.3s;
	letter-spacing: 0.5px;
	color: #ffffff;
}
.ef:focus ~ label, .cp_iptxt.ef ~ label {
  -webkit-appearance: none;
	font-size: 12px;
	top: -16px;
	transition: 0.3s;
	color: #ffffff;
}
.tx{
  position: relative;
  top: 30%;
}
</style>