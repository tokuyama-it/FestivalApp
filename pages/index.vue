<template>
  <div class="container">
    <div class="tab_wrap">
      <input id="tab1" type="radio" name="tab_btn" checked />
      <input id="tab2" type="radio" name="tab_btn" />
      <div class="tab_area">
        <label class="tab1_label" for="tab1">
          <span></span>お知らせ
        </label>
        <label class="tab2_label" for="tab2">
          <span></span>売り切れ情報
        </label>
      </div>
      <div class="panel_area">
        <div id="panel1" class="tab_panel">
          <p>{{uri}}</p>
        </div>
        <div id="panel2" class="tab_panel">
          <p>売り切れは発生していません</p>
        </div>
      </div>
    </div>
    <div class="parent">
      <div class="child">
        <n-link to="#">
          スケジュール
          <p>ここをタップするとスケジュールに</p>
        </n-link>
      </div>
      <div class="child">
        <n-link to="/serch">
          企画検索
          <p>ここをタップすると企画検索に</p>
        </n-link>
      </div>
      <div class="child">
        <n-link to="#">
          お知らせ
          <p>ここをタップするとお知らせに</p>
        </n-link>
      </div>
    </div>
  </div>
</template>

<script>
const base_url = 'https://matsurirta.firebaseio.com/'

export default {
  data: function() {
    return {
      uri: '焼きそばが売り切れました'
    }
  },
  methods: {
    async getUri() {
      this.uri = await this.$axios.$get(base_url)
    }
  }
}
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
  width: 80%;
}

p {
  color: var(--app_text_color);
}

.parent {
  display: flex;
}

.child {
  flex: 1 1 150px;
  height: 120px;
  border-radius: 5px;
  background: #ffa500;
  margin: 5px;
  font-size: 2px;
}

.tab_wrap {
  margin: 60px auto;
}

input[type="radio"] {
  display: none;
}

.tab_area {
  font-size: 0;
  margin: 0 10px;
}

.tab_area label {
  width: 90px;
  margin: 0 5px;
  display: inline-block;
  padding: 12px 0;
  color: #999;
  background: #ddd;
  text-align: center;
  font-size: 13px;
  cursor: pointer;
  transition: ease 0.2s opacity;
  border-radius: 5px 5px 0 0;
  border: solid 1px ;
}

.tab_area span {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  color: #ddd;
}

.panel_area {
  background: #fff;
  border-radius: 8px 8px 8px 8px;
  margin: 0 auto;
  border: solid 1px #000;
}

.tab_panel {
  width: 100%;
  padding: 10px 0;
  display: none;
  color: #000;
  overflow: scroll;
}

.tab_panel p {
  font-size: 14px;
  letter-spacing: 1px;
  text-align: center;
}

#tab1:checked ~ .tab_area .tab1_label {
  background: #fff;
  color: #000;
  border: solid 1px #000;
  border-radius: 5px 5px 0 0;
  border-bottom: transparent;
}

#tab1:checked ~ .panel_area #panel1 {
  display: block;
}

#tab2:checked ~ .tab_area .tab2_label {
  background: #fff;
  color: #000;
  border: solid 1px #000;
  border-radius: 5px 5px 0 0;
  border-bottom: transparent;
}

#tab2:checked ~ .panel_area #panel2 {
  display: block;
}
</style>
<!-- これがテンプレート
<template>
  <div class="container">
    <div>
      こんにちは
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.container {
  max-width: 100vw;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  position: relative;
}
</style> -->
