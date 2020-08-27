<template>
  <section>
    <hr>
    <h1 class="title"></h1>
    <div class="inputWord" @keydown="doSerch">
      <h2>{{message}}を検索中</h2>
      <hr>
      <table>
        <tr>
          <td v-for="(data, key) in fesLengTmpArr" :key="key">
            <button @click="switchDate(key)">{{key +1}}日目</button>
          </td>
        </tr>
      </table>
      <div style="overflow-y:auto">
        <table>
          <tr>
            <th><button @click="setCategoryFlag('all')"><nobr>全て</nobr></button></th>
            <th><button @click="setCategoryFlag('main')"><nobr>メイン</nobr></button></th>
            <th><button @click="setCategoryFlag('food')"><nobr>食べ物</nobr></button></th>
            <th><button @click="setCategoryFlag('stage')" ><nobr>ステージ</nobr></button></th>
            <th><button @click="setCategoryFlag('experience')"><nobr>体験型</nobr></button></th>
            <th><button @click="setCategoryFlag('exhibition')"><nobr>展示</nobr></button></th>
          </tr>
        </table>
      </div>
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
        <tr>
          <th colspan="4">{{selectedDate}}</th>
        </tr>
        <tr>
          <th>イベント名</th>
          <th>開始</th>
          <th>終了</th>
          <th>紹介</th>
        </tr>
        <tr v-for="(data, key) in find_data" :key="key">
          <td>{{json_data[data]["name"]}}</td>
          <td>{{json_data[data]["startAt"]}}</td>
          <td>{{json_data[data]["endAt"]}}</td>
          <td width="50%" >{{json_data[data]["summary"]}}</td>
        </tr>
        <tr>
          <th colspan="4">{{selectedDate}}のイベントは以上です．</th>
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
        find_data:[],
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
        selectedDate:"日にちを選択してください",//選択された日付、文字列 yyyy-mm-dd

      }
  },

  methods:{
    setCategoryFlag:function(category){
      this.serchCategory=category;
      //console.log(this.serchCategory);
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
      var sorted_keyArr = [];
      //console.log(this.json_data);
      //データを探す．文字列はダブルクォーテーションで囲まれているので気をつける．Do not use ''. Use """.
      for(var item in this.json_data){
        //各種フラグを設定
        var matchNameFlag = this.json_data[item]['name'].match(this.serchWord);
        var categoryFlag = this.isAllFind || this.json_data[item]['category']==this.serchCategory;
        var dateFlag = ((! this.selectedFlag) || this.json_data[item]['date'] == this.selectedDate);
        //console.log(matchNameFlag,categoryFlag,this.selectedFlag,dateFlag);
        //console.log(this.json_data[item]['date'] == this.selectedDate);
        //console.log(this.json_data[item]["date"], this.selectedDate);
        if(matchNameFlag && categoryFlag && dateFlag){
          //console.log("find");
          this.find_data[item] = this.json_data[item];
        }
      }
      //console.log(this.json_data);
      //console.log(this.find_data);
      //日にちによる抽出は完了している．
      //開始時間で並び替える
      //とりまjsonのキーを配列に突っ込む
      for(let key in this.find_data){
        sorted_keyArr.push(key);
      }
      //console.log("sorted_keyArr");
      //console.log(sorted_keyArr);
      var tmp = '';
      for(let min = 0; min < sorted_keyArr.length-1; min++){
        for(let i = sorted_keyArr.length-1; min<i; i--){
          //console.log("dev")
          //console.log(this.json_data[sorted_keyArr[i]]["startAt"]);
          //console.log(this.json_data[sorted_keyArr[i-1]]["startAt"]);
          //console.log(this.json_data[sorted_keyArr[i]]["startAt"] < this.json_data[sorted_keyArr[i-1]]["startAt"])
          if(this.json_data[sorted_keyArr[i]]["startAt"] < this.json_data[sorted_keyArr[i-1]]["startAt"]){
            tmp = sorted_keyArr[i];
            sorted_keyArr[i] = sorted_keyArr[i-1];
            sorted_keyArr[i-1] = tmp;
          }
        }
      }
      //console.log(sorted_keyArr);
      this.find_data = sorted_keyArr.slice();
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
      //console.log("festivalConf-----------------------------");
      //console.log(this.FestivalConf);

      this.fesLengTmpArr = new Array(this.FestivalConf.fesLength);
      //初期値として最初の日にちが選択されるようにするための処理
      var fsDate = new Date(this.FestivalConf.firstDate);
      this.selectedDate = fsDate.getFullYear()
                        + '-' + (fsDate.getMonth() < 9 ? '0' +(fsDate.getMonth() + 1):(fsDate.getMonth() + 1))
                        + '-' + (fsDate.getDate() < 9 ? '0' +(fsDate.getDate()):(fsDate.getDate()));
      this.switchDate(0);
    },

    switchDate:function(date){
      //console.log("firestDate");
      //console.log(this.FestivalConf.firstDate);
      var selDate = new Date(this.FestivalConf.firstDate);
      selDate.setDate(selDate.getDate() + date);
      this.selectedDate = selDate.getFullYear()
                        + '-' + (selDate.getMonth() < 9 ? '0' +(selDate.getMonth() + 1):(selDate.getMonth() + 1))
                        + '-' + (selDate.getDate() < 9 ? '0' +(selDate.getDate()):(selDate.getDate()));
      //console.log("selected!! date == ");
      //console.log(this.selectedDate);
      this.selectedFlag = true;
      this.doSerch();
    },
  },

  created:function(){
    axios.get(base_url + 'kikaku.json').then((res)=>{
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