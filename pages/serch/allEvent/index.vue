<template>
  <section class="container">
      <h1 class="title">全ての企画を検索する</h1>
      <div class="inputWord">
        <table>
          <tr>
            <th>
              <input class="serchword" v-model="serchWord">
            </th>
            <th>
              <button @click="doSerch" class="btn">検索</button>
            </th>
          </tr>
        </table>
      </div>
      <div class="serchArea">
        <table border="3">
          <tr v-for="(data, key) in find_data" :key="key">
            <td>{{data.name}}</td>
            <td>{{data.category}}</td>
            <td>{{data.endAt}}まで</td>
          </tr>
        </table>
      </div>
  </section>
</template>

<script>
const axios = require('axios');
const base_url = 'https://matsurirta.firebaseio.com/'
const d = new Date();

export default {
  data: function() {
    return{
      index:0,
      json_data:{},
      find_data:{},
      serchWord:'',
      nowTime:'',
    };
  },
  props:[
    'endAt'
  ],
  methods:{
    doSerch:function(){
      this.find_data = {};
      console.log(this.json_data);
      for(var item in this.json_data){
        if(this.json_data[item]['name'].match(this.serchWord)){
          console.log("find");
          this.find_data[item] = this.json_data[item];
        }
      }
      console.log(this.json_data);
      console.log(this.find_data);
    }
  },
  created: function (){
    this.nowTime = d.getFullYear() +
                  '/' + d.getMonth() +
                  '/' + d.getDate() +
                  ' ' + d.getHours() +
                  ':' + d.getMinutes();
    axios.get(base_url + 'kikaku.json').then((res)=>{
            this.json_data = res.data;
        }).catch(function(error){
            console.log("ERROR!! faild to get data");
        })
    }
}
</script>

<style scoped>

table{
  border:3
}
.printItem th {
  width:33%
}
</style>