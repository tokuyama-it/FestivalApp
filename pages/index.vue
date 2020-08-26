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
          <span></span>運営情報
        </label>
      </div>
      <div class="panel_area">
        <div id="panel1" class="tab_panel">
          <p>お知らせはありません</p>
        </div>
        <div id="panel2" class="tab_panel">
          <ul>
            <li v-for="sold in soldData" :key="sold.urikire">{{sold.name}}は{{sold.urikire}}です</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="parent">
      <div class="child">
        <n-link to="/schedule">
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
        <n-link to="/map">
        地図
          <p>ここをタップするとマップに</p>
        </n-link>
      </div>
    </div>
  </div>
</template>

<script>
const sold_url = "https://matsurirta.firebaseio.com/kikaku.json";
// const notice_url = "https://maturirta.firebaseio.com/notice.json?print=pretty";

export default {
  async asyncData({$axios}) {
    const soldData = await $axios.$get(sold_url)
    // const noticeData = await $axios.$get(notice_url)
    return {
      soldData
    }
  }
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
  border-radius: 5px;
  background: #fff;
  margin: 5px;
  font-size: 12px;
}
.tab_wrap {
  margin-top: 50px;
  margin-bottom: 20px;
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
  border: solid 1px;
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
  height: 150px;
  padding: 10px 0;
  display: none;
  color: #000;
  overflow: scroll;
}
.tab_panel p {
  font-size: 14px;
  /* letter-spacing: 1px; */
  text-align: center;
}
.tab_panel li {
  font-size: 13px;
  text-align: left;
  /* list-style: none; */
}
.tab_panel ul {
  overflow: scroll;
}
#tab1:checked ~ .tab_area .tab1_label {
  background: #fff;
  color: #000;
  border: solid 1px #000;
  border-radius: 5px 5px 0 0;
}
#tab1:checked ~ .panel_area #panel1 {
  display: block;
}
#tab2:checked ~ .tab_area .tab2_label {
  background: #fff;
  color: #000;
  border: solid 1px #000;
  border-radius: 5px 5px 0 0;
}
#tab2:checked ~ .panel_area #panel2 {
  display: block;
}
hr {
  width: 100%;
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
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  position: relative;
}
</style> -->