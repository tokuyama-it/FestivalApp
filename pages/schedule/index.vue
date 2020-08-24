<template>
  <!-- データベースから得られたステージイベントのスケジュールの自動生成 -->
  <section>
    <h1>{{this.selectedDate}}</h1>
    <h1>{{message}}のスケジュール</h1>
    <table class="date">
      <tr>
        <td  v-for="(data, key) in dateJson" :key="key">
          <button @click="switchDate(key)">{{key + 1}}日目</button>
        </td>
      </tr>
    </table>
    <table>
      <tr>
        <th><button @click="swichPrint(true)">ステージイベント</button></th>
        <th><button @click="swichPrint(false)">メインイベント</button></th>
      </tr>
    </table>
    <table class="stage" border="3">
      <tr>
        <td>イベント名</td>
        <td>開催日</td>
        <td>開催時間</td>
        <td>紹介</td>
      </tr>
      <tr v-for="(data, key) in print_arr" :key="key" >
        <td>{{json_data[data]["name"]}}</td>
        <td>{{json_data[data]["date"]}}</td>
        <td>{{json_data[data]["startAt"]}}-{{json_data[data]["endAt"]}}まで</td>
        <td>{{json_data[data]["summary"]}}</td>
      </tr>
      <tr>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>選択した日の全てのイベントです</td>
      </tr>
    </table>
  </section>
</template>

<script>
import { functions } from 'firebase';
const axios = require('axios');
const baseUrl = 'https://matsurirta.firebaseio.com/';

export default {
  data:function(){
    return{
      title:'stageEvent',
      message: 'ステージイベント',
      key:'',
      json_data:{},
      sorted_arr:[],
      sorted_main_arr:[],
      print_arr:[],
      firstDate:'',
      selectedDate:"日にちを選択してください",
      holdLength:0,
      dateJson :null,
    };
  },

  methods:{
    swichPrint:function(flag){
      if(flag){
        this.print_arr = this.sorted_arr;
        this.message = "ステージイベント";
      }
      else{
        this.print_arr = this.sorted_main_arr;
        this.message = "メインイベント";
      }
    },

    switchDate:function(date){
      var dt0 = new Date(this.firstDate);
      dt0.setDate(dt0.getDate() + date);
      console.log(dt0);
      this.selectedDate = dt0.getFullYear()
                        + '-' + (dt0.getMonth() < 9 ? '0' +(dt0.getMonth() + 1):(dt0.getMonth() + 1))
                        + '-' + (dt0.getDate() < 9 ? '0' +(dt0.getDate()):(dt0.getDate()));
      console.log(this.selectedDate);
      this.setEventJson();
    },

    setDtailConf:function(){
      axios.get(baseUrl + 'detail.json').then((res)=>{
      var detailData = res.data;
      var startDay = new Date(detailData["startDate"].replace(/-/g,'/'));
      var endDay = new Date(detailData["endDate"].replace(/-/g,'/'));
      this.holdLength =  Number( (( endDay - startDay ) / 86400000) + 1 );
      this.dateJson = new Array(this.holdLength);

      this.firstDate = detailData["startDate"].replace(/-/g,'/');
      this.setEventJson();
      }).catch(function(error){
        console.log("ERROR!! faild to get detail Data");
        //console.log(baseUrl + 'detail.json');
      });
    },

    setEventJson:function(){
      //祭のステージイベントを取得する
        var sortedJsonArr = [];
        var tmp = ''
        var arr_leng = 1;
        for(var item in this.json_data){
          if(this.json_data[item]["category"] == "stage" && this.json_data[item]["date"] == this.selectedDate){
            //console.log(this.json_data[item]["endAt"]);
            sortedJsonArr.push(item);
          }
        }
        //データを開始時間でソートする
        for(let min=0; min<sortedJsonArr.length-1; min++){
          for(let i=sortedJsonArr.length-1; min<i; i--){
            if(this.json_data[sortedJsonArr[i]]["startAt"] < this.json_data[sortedJsonArr[i-1]]["startAt"]){
              tmp = sortedJsonArr[i];
              sortedJsonArr[i] = sortedJsonArr[i-1];
              sortedJsonArr[i-1] = tmp;
            }
          }
  
  
        }
        //console.log(sortedJsonArr[0]);
        //console.log(this.json_data[sortedJsonArr[0]]["endAt"],this.json_data[sortedJsonArr[1]]["endAt"]);
        //console.log(sortedJsonArr);
        this.sorted_arr = sortedJsonArr.slice();
        console.log(this.sorted_arr);
        this.print_arr = this.sorted_arr.slice();

        //メインイベントのデータを開始時間でソートする．
        sortedJsonArr=[];
        for(var item in this.json_data){

          if(this.json_data[item]["category"] == "main" && this.json_data[item]["date"] == this.selectedDate){
            //console.log(this.json_data[item]["endAt"]);
            sortedJsonArr.push(item);
          }
        }
        for(let min=0; min<sortedJsonArr.length-1; min++){
          for(let i=sortedJsonArr.length-1; min<i; i--){
            if(this.json_data[sortedJsonArr[i]]["startAt"] < this.json_data[sortedJsonArr[i-1]]["startAt"]){
              tmp = sortedJsonArr[i];
              sortedJsonArr[i] = sortedJsonArr[i-1];
              sortedJsonArr[i-1] = tmp;
            }
          }
        }
        this.sorted_main_arr = sortedJsonArr.slice();
        console.log(this.print_arr);

    }
  },

  created:function(){

    axios.get(baseUrl + 'kikaku.json').then((res)=>{
      this.json_data = res.data;
      this.setDtailConf();
      //this.setEventJson();
    }).catch(function(error){
      console.log("ERROR!! faild to get eventData");
  });
  },
}
</script>