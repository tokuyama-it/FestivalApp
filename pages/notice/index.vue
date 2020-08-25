<template>
  <div class="container">
    <div class="sold">
      <h4 @click="getData()">売り切れ情報</h4>
      <ul>
        <li></li>
      </ul>
    </div>
    <hr />
    <div class="notice">
      <h4>お知らせ</h4>
      <ul>
        <li></li>
      </ul>
    </div>
  </div>
</template>
<script>
const axios = require("axios");
const base_url = "https://matsurirta.firebaseio.com/kikaku.json?print=pretty";
export default {
  data: function () {
    return {
      json_data: {},
    };
  },
  methods: {
    getData: function () {
      axios.get(base_url).then((res) => {
        this.json_data = res.data;
        console.log(this.json_data);
      });
    },

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

.sold ul {
  list-style: none;
}

.notice ul {
  list-style: none;
}
</style>