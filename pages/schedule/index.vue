<template>
  <!-- データベースから得られたステージイベントのスケジュールの自動生成 -->
  <section>
    <h1>ステージイベントのスケジュール</h1>
    <table border="3">
      <tr v-for="(data, key) in sorted_arr" :key="key">
        <td>{{json_data[data]["name"]}}</td>
        <td>{{json_data[data]["startAt"]}}</td>
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
      key:'',
      json_data:{},
      sorted_arr:[],
    };
  },

  methods:{
    doReload:function(){
      location.reload(true);
    },

    sortJson:function(){
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
          console.log(this.json_data[item]["endAt"]);
          sortedJsonArr.push(item);
        }
      }
      for(let min=0; min<sortedJsonArr.length-1; min++){
        for(let i=sortedJsonArr.length-1; min<i; i--){
          if(this.json_data[sortedJsonArr[i]]["endAt"] < this.json_data[sortedJsonArr[i-1]]["endAt"]){
            tmp = sortedJsonArr[i];
            sortedJsonArr[i] = sortedJsonArr[i-1];
            sortedJsonArr[i-1] = tmp;
          }
        }
      }
      //console.log(sortedJsonArr[0]);
      //console.log(this.json_data[sortedJsonArr[0]]["endAt"],this.json_data[sortedJsonArr[1]]["endAt"]);
      console.log(sortedJsonArr);
      this.sorted_arr = sortedJsonArr.slice();
      console.log(this.sorted_arr);
    })
  }
}
</script>