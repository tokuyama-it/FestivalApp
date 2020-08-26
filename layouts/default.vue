<template>
  <div>
    <div class="warapper">
      <header>
        <n-link to="/">
          <h3 class="title">#ふぁんふぇす</h3>
        </n-link>
        <ul class="links">
          <li>
            <n-link to="/schedule">スケジュール</n-link>
          </li>
          <li>
            <n-link to="/serch">企画検索</n-link>
          </li>
          <li>
            <n-link to="/keyward">キーワード集め</n-link>
          </li>
          <li>
            <n-link to="/map">地図</n-link>
          </li>
          <li>
            <n-link to="/admin">管理者用ページ</n-link>
          </li>
        </ul>
      </header>
      <Nuxt />
      <footer>
        <a
          href="https://twitter.com/share?ref_src=twsrc%5Etfw"
          class="twitter-share-button"
          data-size="large"
          data-text="〇〇祭に参加しました!#〇〇祭#ふぁんふぇす"
          data-lang="ja"
          data-show-count="false"
        >Tweet</a>
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        <p>
          made by
          <a href="https://github.com/tokuyama-it">ITをむさぼる会</a>
        </p>
      </footer>
    </div>
  </div>
</template>

<style>
:root {
  /* テキストの基本色 */
  --app_text_color: #808080;
  /* アプリ名のフォント */
  --app_name_font: "M PLUS 1p", sans-serif;
  /* アプリ名の色 */
  --app_name_color: #000;
  /* フッターの背景色 */
  --footer_background_color: #000;
}
header {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 10px 0;
}
.links {
  margin: 0 auto;
  text-align: center;
  padding: 5px 0;
}
header li {
  list-style: none;
  display: inline-block;
  font-size: 10px;
  margin: 0 20px;
}
.title {
  font-family: var(--app_name_font);
  text-align: center;
  color: var(--app_name_color);
  font-weight: 100;
}
.warapper {
  min-height: 100vh;
  position: relative;
  box-sizing: border-box;
  padding-bottom: 100px;
}
footer {
  /* display: flex; */
  margin-top: auto;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: var(--footer_background_color);
  padding: 20px;
}
footer p {
  color: var(--app_text_color);
  font-size: 10px;
  margin-left: 10%;
  padding: 2px;
}
.twitter-share-button {
  float: right;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
}
a {
  text-decoration: none;
  color: var(--app_text_color);
}
</style>