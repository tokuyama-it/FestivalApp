<template>
  <div id="app"></div>
</template>

<script>
//leafletの呼び出し
import "leaflet/dist/leaflet.css";
import L from "leaflet";
//マーカーの画像の設定
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

export default {
  mounted(){
    //地図の初期設定
    var map = L.map("app",{center: L.latLng(35.0104229,138.4946545),zoom: 18}) //マップ作成
    .addLayer(L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png")); //レイヤーの作成

    var marker = L.marker([35.6746615,139.7673382]).addTo(map)
    .bindPopup("ここは東京駅です")
    .openPopup();

    map.locate({ setView: true, maxZoom: 10}, 5000);
    function onLocationFound(e){
      L.marker(e.latlng)
      .addTo(map)
      .bindPopup("予想される現在位置はここです")
      .openPopup();
    }
    map.on("locationfound", onLocationFound);

    function onLocationError(e){
      alert("現在位置が取得できませんでした");
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