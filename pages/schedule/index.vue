<template>
  <!-- データベースから得られたステージイベントのスケジュールの自動生成 -->
  <section>
    <h1>{{message}}のスケジュール</h1>
    <table>
      <tr>
        <th><button @click="swichPrint(true)">ステージイベント</button></th>
        <th><button @click="swichPrint(false)">メインイベント</button></th>
      </tr>
    </table>
    <table class="stage" border="3">
      <tr v-for="(data, key) in print_arr" :key="key">
        <td>{{json_data[data]["name"]}}</td>
        <td>{{json_data[data]["startAt"]}}-{{json_data[data]["endAt"]}}まで</td>
        <td>{{json_data[data]["summary"]}}</td>
      </tr>
    </table>
  </section>
</template>

<script>
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
    }
  },

  created:function(){
    axios.get(baseUrl + 'kikaku.json' + '?orderBy=%22endAt%22').then((res)=>{
      this.json_data = res.data;
      var sortedJsonArr = [];
      var tmp = ''
      var arr_leng = 1;
      for(var item in this.json_data){
        if(this.json_data[item]["category"] == "stage"){
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


      sortedJsonArr=[];
      for(var item in this.json_data){
        if(this.json_data[item]["category"] == "main"){
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
    })
  }
}
</script>