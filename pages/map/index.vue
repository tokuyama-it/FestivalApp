<template>
  <div id="app"></div>
</template>

<script>
//leafletの呼び出し
import "../../node_modules/leaflet/dist/leaflet.css";
import L from "../../node_modules/leaflet";
//マーカーの画像の設定
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconUrl: require("../../node_modules/leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("../../node_modules/leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("../../node_modules/leaflet/dist/images/marker-shadow.png")
});

export default {
  mounted(){
    //地図の初期設定
    var map = L.map("app",{center: L.latLng(35.0104229,138.4946545),zoom: 18}) //マップ作成
    .addLayer(L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png")); //レイヤーの作成
    
    //マーカーとそれにつけるポップアップの作成
    var marker = L.marker([35.6746615,139.7673382]).addTo(map)
    .bindPopup("ここは東京駅です")
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

  }
};
</script>

<style>
  html,body,#app{
    height: 850px;
  }
  body {
    margin: 0;
  }
</style>