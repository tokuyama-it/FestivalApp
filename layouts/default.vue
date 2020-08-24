<template>
  <div>
    <div class="warapper">
      <header>
<<<<<<< HEAD
        <n-link to="/"><h1 class="title">omaturiRTA</h1></n-link>
        <nav>
          <ul>
            <li>
              <n-link to="#">スケジュール</n-link>
            </li>
            <li>
              <n-link to="/serch">企画検索</n-link>
            </li>
            <li>
              <n-link to="#">お知らせ</n-link>
            </li>
          </ul>
        </nav>
=======
        <ul>
          <li>
            <a href="/schedule">スケジュール</a>
          </li>
          <li>
            <a href="/serch">企画検索</a>
          </li>
          <li>
            <a href="#">お知らせ</a>
          </li>
        </ul>
>>>>>>> 0b85087e90111adf0d5d61689cafee6f8bfb96ff
      </header>
      <Nuxt />
      <footer>
        <p>
          made by
          <a href="#">ITをむさぼる会</a>
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
  --app_name_font: "Do Hyeon", sans-serif;
  /* アプリ名の色 */
  --app_name_color: #000;
}

header {
  display: flex;
  justify-content: center;
}

header ul {
  list-style: none;
  margin: 0 auto;
}

header li {
  display: inline;
  /* margin-left: 15px; */
  font-size: 10px;
}

ul li:nth-child(2) {
  margin-left: 15px;
}

ul li:nth-child(3) {
  margin-left: 15px;
}

.title {
  text-align: center;
  font-family: var(--app_name_font);
  font-size: 20px;
  color: var(--app_name_color);
}

.warapper {
  min-height: 100vh;
  position: relative;
}

footer {
  position: absolute;
  bottom: 0;
  height: 50px;
}

footer p {
  color: var(--app_text_color);
  font-size: 15px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

a {
  text-decoration: none;
  color: var(--app_text_color);
}
</style>
