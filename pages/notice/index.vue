<template>
  <div class="container">
    <div class="sold">
      <h4>売り切れ情報</h4>
      <ul>
        <li v-for="item in soldStatus">{{item.urikire}}</li>
      </ul>
    </div>
    <hr />
    <div class="notice">
      <h4>お知らせ</h4>
      <ul>
        <li v-for="item in noticeStatus">{{item.notice}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
const axios = require("axios");
const sold_url = "https://matsurirta.firebaseio.com/kikaku.json?print=pretty";
const notice_url = "https://maturirta.firebaseio.com/notice.json?print=pretty";

export default {
  data: {
    soldStatus: [],
    noticeStatus: [],
  },
  methods: {
    getSoldStatus: function () {
      axios.get(sold_url).then((res) => {
        this.json_data = res.data;
        console.log(this.json_data);
        this.soldStatus.push({
          urikire: element.urikire
        });
      });
    },
    getNoticeStatus: function () {
      axios.get(notice_url).then((res) => {
        this.json_data = res.data;
        console.log(this.json_data);
        this.noticeStatus.push({
          notice: element.notice
        })
      })
    }
  },
};
</script>
<style>
.container {
  max-width: 100vw;
  margin: 0 auto;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  position: relative;
}

</style>