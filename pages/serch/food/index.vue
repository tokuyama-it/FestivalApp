<template>
  <section class="container">
    <h1 class="title">たべもの検索</h1>
    <nuxt-link to="/serch">検索ページに戻る</nuxt-link>
    <div class="inputWord">
      <table>
        <tr>
          <th>
            <input class="serchword" v-model="serchWord">
          </th>
          <th>
            <button @click="doSerch">検索</button>
          </th>
          <th>
            <button @click="printAllFoods">一覧</button>
          </th>
        </tr>
      </table>
    </div>
    <div class="serchArea">
      <table border="3">
        <tr v-for="(data, key) in find_data" :key="key">
          <td>{{data.name}}</td>
          <td>{{data.endAt}}まで</td>
          <td>{{data.urikire}}</td>
          <td width="60%" >{{data.summary}}</td>
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
      key:0,
      json_data:{},
      find_data:{},
      serchWord:'',
    };
  },
  methods:{
    doSerch:function(){
      this.find_data = {};
      console.log(this.json_data);
      //データを探す．文字列はダブルクォーテーションで囲まれているので気をつける．Do not use ''. Use """.
      for(var item in this.json_data){
        if(this.json_data[item]['name'].match(this.serchWord) && this.json_data[item]['category']=="food"){
          console.log("find");
          this.find_data[item] = this.json_data[item];
        }
      }
      console.log(this.json_data);
      console.log(this.find_data);
    },

    printAllFoods: function(){
      this.serchWord = '';
      this.doSerch();
    }
  },
  created: function (){
    axios.get(base_url + 'kikaku.json').then((res)=>{
            this.json_data = res.data;
        }).catch(function(error){
            console.log("ERROR!! faild to get data");
        });
  },
}
</script>

<style scoped>
/* ここにsccの内容をかく */

</style>