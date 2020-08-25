<template>
  <section>
    <h1 class="title"></h1>
    <div class="inputWord">
      <h2>{{message}}を検索中</h2>
      <table>
        <tr>
          <td v-for="(data, key) in fesLengTmpArr" :key="key">
            <button @click="switchDate(key)">{{key +1}}日目</button>
          </td>
        </tr>
      </table>
      <table>
        <tr>
          <th><button @click="setCategoryFlag('all')">全てのイベント</button></th>
          <th><button @click="setCategoryFlag('main')">メインイベント</button></th>
          <th><button @click="setCategoryFlag('food')">食べ物</button></th>
          <th><button @click="setCategoryFlag('stage')">ステージイベント</button></th>
          <th><button @click="setCategoryFlag('experience')">体験型</button></th>
          <th><button @click="setCategoryFlag('exhibition')">展示</button></th>
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
          <td>{{data.date}}</td>
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
      return{
        title:'イベント検索',
        serchCategory:'',
        message:'全てのイベント',
        json_data:{},
        find_data:{},
        serchWord:'',
        isAllFind:true,
        confJson:{},//祭の設定
        FestivalConf:{
          firstDate:'',
          endDate:'',
          fesLength:1,
        },
        fesLengTmpArr: new Array(1),
        selectedFlag:false,
        selectedDate:"",//選択された日付、文字列 yyyy-mm-dd

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
        case 'exhibition':
          this.message="展示";
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
        var matchNameFlag = this.json_data[item]['name'].match(this.serchWord);
        var categoryFlag = this.isAllFind || this.json_data[item]['category']==this.serchCategory;
        var dateFlag = ((! this.selectedFlag) || this.json_data[item]['date'] == this.selectedDate);
        console.log(matchNameFlag,categoryFlag,this.selectedFlag,dateFlag);
        console.log(this.json_data[item]['date'] == this.selectedDate);
        console.log(this.json_data[item]["date"], this.selectedDate);
        if(matchNameFlag && categoryFlag && dateFlag){
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

    setFesConf:function(){
      this.FestivalConf.firstDate = this.confJson["startDate"];
      this.FestivalConf.endDate = this.confJson["endDate"];
      var firstDate = new Date(this.FestivalConf.firstDate);
      var endDate = new Date(this.FestivalConf.endDate);
      this.FestivalConf.fesLength = ((endDate - firstDate)/86400000) + 1;
      console.log("festivalConf-----------------------------");
      console.log(this.FestivalConf);

      this.fesLengTmpArr = new Array(this.FestivalConf.fesLength);
    },

    switchDate:function(date){
      //console.log("firestDate");
      //console.log(this.FestivalConf.firstDate);
      var selDate = new Date(this.FestivalConf.firstDate);
      selDate.setDate(selDate.getDate() + date);
      this.selectedDate = selDate.getFullYear()
                        + '-' + (selDate.getMonth() < 9 ? '0' +(selDate.getMonth() + 1):(selDate.getMonth() + 1))
                        + '-' + (selDate.getDate() < 9 ? '0' +(selDate.getDate()):(selDate.getDate()));
      console.log("selected!! date == ");
      console.log(this.selectedDate);
      this.selectedFlag = true;
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
    axios.get(base_url + 'detail.json').then((res) => {
      this.confJson = res.data;
      this.setFesConf();
    })
  },
}
</script>