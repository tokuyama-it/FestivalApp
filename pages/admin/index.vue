<template>
  <div class="container">
      <h1 class="title">管理者ページ</h1>
      <div class="detail">
        <h2>基本設定</h2>
        <table border="3">
          <tr>
            <td>お祭りの名前</td>
            <td><input type="text" v-model="detailData.name"></td>
          </tr>
          <tr>
            <td>開始日時</td>
            <td><input type="date" v-model="detailData.startDate"><input type="time" v-model="detailData.startTime"></td>
          </tr>
          <tr>
            <td>終了日時</td>
            <td><input type="date" v-model="detailData.endDate"><input type="time" v-model="detailData.endTime"></td>
          </tr>
        </table>
      </div>

      <div class="notice">
        <h2>お知らせ</h2>
        <button @click="addNotice">追加</button>
        <table border="3">
          <tr>
            <td>タイトル</td>
            <td>内容</td>
          </tr>
          <tr v-for="data in noticeData" :key="Renderingkey">
            <td><input type="text" v-model="data.title"></td>
            <td><input type="text" v-model="data.body"></td>
          <td>{{data.setTime.slice(0,4)
                  +'/'+data.setTime.slice(4,6)
                  +'/'+data.setTime.slice(6,8)
                  +' '+data.setTime.slice(8,10)
                  +':'+data.setTime.slice(10,12)
                }}に追加
            </td>
            <td><button @click="deleteNotice(data)">削除</button></td>
          </tr>
        </table>
      </div>

      <div class="event">
        <h2>出しもの</h2>
        <button @click="addEvent">追加</button>
        <table border="3">
          <tr>
            <td>名前</td>
            <td>カテゴリー</td>
            <td>実行日</td>
            <td>開始時間</td>
            <td>終了時間</td>
          </tr>
          <tr v-for="data in eventData" :key="Renderingkey">
            <td><input type="text" v-model="data.name"></td>
            <td><select v-model="data.category" name="category" size="1">
              <option value="main">メイン</option>
              <option value="food">食べ物</option>
              <option value="stage">ステージ</option>
              <option value="experience">体験型</option>
              <option value="exhibition">展示</option>
              </select>
            </td>
            <td><input type="date" v-model="data.date"></td>
            <td><input type="time" v-model="data.startAt"></td>
            <td><input type="time" v-model="data.endAt"></td>
            <td><button @click="deleteEvent(data)">削除</button></td>
          </tr>
        </table>
      </div>

      <div class="map">
        <h2>地図の位置</h2>
        <div id="app"></div>
      </div>
      <button @click="save">保存</button>
  </div>
</template>

<script>
// firebaseの呼び出し
import firebase from "~/plugins/firebase"
//leafletの呼び出し
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const axios = require('axios');

// firebase
const base_url = 'https://matsurirta.firebaseio.com/';
const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);
const detailRef = firebase.database().ref('detail');
const eventRef = firebase.database().ref('kikaku');
const noticeRef = firebase.database().ref('notice');

//マーカーの画像の設定
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

export default {
  data: function() {
    return{
      // DOM更新用データ
      Renderingkey:0,
      // jsonデータ
      mapData:{},
      detailData:{},
      noticeData:{},
      eventData:{},
      // お知らせ追加用データ
      noticeBody:"",
      noticeTitel:"",
      // 出し物追加用データ
      eventCategory:"",
      eventDate:"",
      eventStartAt:"",
      eventEndAt:"",
      eventName:"",
      eventPlace:"",
      eventSummary:"",
      eventUrikire:"",
      // 地図用データ
      mapLink:"",
     };
  },
  methods:{
    // DOM更新
    forceRerender() {
      this.Renderingkey += 1;
    },
    // お知らせ追加
    addNotice(){
      let D = new Date();
      let now=String(D.getFullYear())
          +String(("0"+(D.getMonth()+1)).slice(-2),)
          +String(("0"+D.getDate()).slice(-2))
          +String(D.getHours())
          +String(D.getMinutes());
      let newNotice={
        body:this.noticeBody,
        setTime:now,
        title:this.noticeTitel,
      };
      let index='noticeID'+String(Object.keys(this.noticeData).length);
      this.noticeData[index]=newNotice;
      console.log(this.noticeData);
      this.forceRerender();
    },
    // お知らせ削除
    deleteNotice(data){
      try{
      delete this.noticeData[data];
      this.forceRerender();
      console.log(data);
      console.log(this.noticeData);
      }catch(error){
        // 例外処理
        console.log("エラーメッセージ:\n"+error.massage);
        alert("削除できませんでした。\nデベロッパーツールより、コンソールを確認して下さい。")
      }
    },
    // 出しもの追加
    addEvent(){
      let newEvent={
        category:this.eventCategory,
        date:this.eventDate,
        startAt:this.eventStartAt,
        endAt:this.eventEndAt,
        kikakuID:Object.keys(this.eventData).length,
        name:this.eventName,
        place:this.eventPlace,
        price:this.eventPrice,
        summary:this.eventSummary,
        urikire:this.eventUrikire
      };
      let index='kikakuID'+String(Object.keys(this.eventData).length);
      this.eventData[index]=newEvent;
      console.log(this.eventData);
      this.forceRerender();
    },
    deletEvent(data){
      try{
        this.eventData[data].remove();
      }catch(error){
        // 例外処理
        console.log("エラーメッセージ:\n"+error.massage);
        alert("削除できませんでした。\nデベロッパーツールより、コンソールを確認して下さい。")
      }
    },
    // 変更を保存
    save(){
      try{
      detailRef.set(this.detailData);
      eventRef.set(this.eventData);
      noticeRef.set(this.noticeData);
      alert('保存しました');
      }catch(error){
        // 例外処理
        console.log("エラーメッセージ:\n"+error.massage);
        alert('保存に失敗しました。\nデベロッパーツールより、コンソールを確認して下さい。');
      }
    },
  },
  
  created: function (){
    axios.get(base_url + 'detail.json').then((res)=>{
        console.log("get detail.json")
        this.detailData = res.data;
        }).catch(function(error){
            console.log("ERROR!! faild to get detailData");
        });

    axios.get(base_url + 'notice.json').then((res)=>{
        console.log("get notice.json")
        this.noticeData = res.data;
        }).catch(function(error){
            console.log("ERROR!! faild to get noticeData");
        });

    axios.get(base_url + 'kikaku.json').then((res)=>{
        console.log("get event.json")
        this.eventData = res.data;
        }).catch(function(error){
            console.log("ERROR!! faild to get eventData");
        });

    axios.get(base_url + 'map.json').then((res)=>{
        console.log("get map.json")
        this.mapData = res.data;
        }).catch(function(error){
            console.log("ERROR!! faild to get mapData");
        });
    },
  mounted:function(){
    for(let i=0;i<this.mapData.length;i++){

    }
    //地図の初期設定
    var map = L.map("app",{center: L.latLng(35.0104229,138.4946545),zoom: 18}) //マップ作成
    .addLayer(L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png")); //レイヤーの作成
    
    //マーカーとそれにつけるポップアップの作成

    L.marker([35.6746615,139.7673382]).addTo(map)
    .bindPopup("ここは東京駅です")
    .openPopup();

    L.marker([35.7135121,139.7939416]).addTo(map)
    .bindPopup("ここはまつりの中心です")
    .openPopup();
    
    //現在位置取得
    map.locate({ setView: true, maxZoom: 10}, 5000); //現在位置の座標を5秒ごとに取得
    //見つかったら
    function onLocationFound(e){
      L.marker(e.latlng) //ピンを指す
      .addTo(map) //マップに追加
      .bindPopup("予想される現在位置はここです") //ポップアップの設置
      .openPopup(); //表示
    }
    map.on("locationfound", onLocationFound);
    //見つからなかったら
    function onLocationError(e){
      alert("現在位置が取得できませんでした"); //エラーアラートを出す
    }
    map.on("locationerror",onLocationError);

    var popup = L.popup();

    function onMapClick(e){
      popup.setLatLng(e.latlng);
      popup.setContent("キミがいる場所の座標はここだよ<br>"+ e.latlng.toString());
      popup.openOn(map);
    }
    map.on("click", onMapClick);
  }
}
</script>

<style>
#app{
  height: 650px;
}
</style>