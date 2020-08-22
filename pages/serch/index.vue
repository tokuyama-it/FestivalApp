<template>
  <section>
    <h1 class="title"></h1>
    <div class="inputWord">
      <h2>{{message}}を検索中</h2>
      <table>
        <tr>
          <th><button @click="setCategoryFlag('all')">全てのイベント</button></th>
          <th><button @click="setCategoryFlag('main')">メインイベント</button></th>
          <th><button @click="setCategoryFlag('food')">食べ物</button></th>
          <th><button @click="setCategoryFlag('stage')">ステージイベント</button></th>
          <th><button @click="setCategoryFlag('experience')">体験型</button></th>
        </tr>
      </table>
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
          <td>{{data.startAt}}</td>
          <td>{{data.endAt}}</td>
          <td width="50%" >{{data.summary}}</td>
        </tr>
      </table>
    </div>
  </section>
</template>

<script>
const axios = require('axios');
const base_url = 'https://matsurirta.firebaseio.com/'
export default {
  data: function(){
    data:{
      return{
        title:'イベント検索',
        serchCategory:'',
        message:'全てのイベント',
        json_data:{},
        find_data:{},
        serchWord:'',
        isAllFind:true,
      }
    }
  },

  methods:{
    setCategoryFlag:function(category){
      this.serchCategory=category;
      console.log(this.serchCategory);
      this.isAllFind=false;
      switch(this.serchCategory){
        case 'all':
          this.message="全てのイベント";
          this.isAllFind=true;
          break;
        case 'food':
          this.message="食べる所";
          break;
        case 'stage':
          this.message="ステージ";
          break;
        case 'experience':
          this.message="体験型イベント";
          break;
        case 'main':
          this.message="メインイベント"
          break;
        default:
          this.message="error";
      };
      this.doSerch();
    },

    doSerch:function(){
      this.find_data = {};
      console.log(this.json_data);
      //データを探す．文字列はダブルクォーテーションで囲まれているので気をつける．Do not use ''. Use """.
      for(var item in this.json_data){
        if(this.json_data[item]['name'].match(this.serchWord) && (this.isAllFind || this.json_data[item]['category']==this.serchCategory)){
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
    },
  },

  created:function(){
    axios.get(base_url + 'kikaku.json' + '?orderBy=%22startAt%22').then((res)=>{
            this.json_data = res.data;
            this.printAllFoods();
        }).catch(function(error){
            console.log("ERROR!! faild to get data");
        });
  },
}
</script>