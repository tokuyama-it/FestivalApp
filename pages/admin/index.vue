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
        <button>追加</button>
        <table border="3">
          <tr>
            <td>タイトル</td>
            <td>内容</td>
          </tr>
          <tr v-for="(data, key) in noticeData" :key="key">
            <td><input type="text" v-model="data.title"></td>
            <td><input type="text" v-model="data.body"></td>
          <td>{{data.setTime.slice(0,4)
                  +'/'+data.setTime.slice(4,6)
                  +'/'+data.setTime.slice(6,8)
                  +' '+data.setTime.slice(8,10)
                  +':'+data.setTime.slice(10,12)
                }}に掲載
            </td>
          </tr>
        </table>
      </div>

      <div class="event">
        <h2>出しもの</h2>
        <button>追加</button>
        <table border="3">
          <tr>
            <td>名前</td>
            <td>場所</td>
            <td>実行日</td>
            <td>開始時間</td>
            <td>終了時間</td>
          </tr>
          <tr v-for="(data, key) in eventData" :key="key">
            <td><input type="text" v-model="data.name"></td>
            <td><input type="text" v-model="data.category"></td>
            <td><input type="date" v-model="data.date"></td>
            <td><input type="time" v-model="data.startAt"></td>
            <td><input type="time" v-model="data.endAt"></td>
          </tr>
        </table>
      </div>

      <div class="map">
        <h2>地図の位置</h2>
        <table border="3">
          <tr>
            <td>緯度</td>
            <td><input type="number" v-model="detailData.locationY"></td>
          </tr>
          <tr>
            <td>経度</td>
            <td><input type="number" v-model="detailData.locationX"></td>
          </tr>
        </table>
        <iframe :src="mapLink" width="100%" height="800px" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
      </div>
      <button @click="save">保存</button>
  </div>
</template>

<script>
const axios = require('axios');
const base_url = 'https://matsurirta.firebaseio.com/';

import firebase from "~/plugins/firebase.js"

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

let detailRef = firebase.database().ref('detail');
let locateRef = firebase.database().ref('kikaku');
let niticeRef = firebase.database().ref('notice');

export default {
  data: function() {
    return{
      detailData:{},
      locateData:{},
      noticeData:{},
      eventData:{},
      mapLink:"",
     };
  },
  methods:{
    save(){
      detailRef.update(this.detailData);
    },
  },
  created: function (){
    axios.get(base_url + 'detail.json').then((res)=>{
        console.log("get detail.json")
        this.detailData = res.data;
        }).catch(function(error){
            console.log("ERROR!! faild to get detailData");
        });
    console.log(this.detailData);

    axios.get(base_url + 'notice.json').then((res)=>{
        console.log("get notice.json")
        this.noticeData = res.data;
        }).catch(function(error){
            console.log("ERROR!! faild to get noticeData");
        });
    console.log(this.noticeData);

    axios.get(base_url + 'kikaku.json').then((res)=>{
        console.log("get event.json")
        this.eventData = res.data;
        }).catch(function(error){
            console.log("ERROR!! faild to get eventData");
        });
    console.log(this.eventData);

    this.mapLink="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.5165773199997!2d"+this.detailData.locationX+"1551107!3d"+this.detailData.locationY+"08580777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188ec1a4463df1%3A0x6c0d289a8292810d!2z5rWF6I2J5a-6!5e0!3m2!1sja!2sjp!4v1597894163501!5m2!1sja!2sjp"
    },
}
</script>

<style>
</style>