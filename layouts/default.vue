<template>
  <div>
    <div class="warapper">
      <header>
        <ul>
          <li>
            <a href="#">スケジュール</a>
          </li>
          <li>
            <a href="/serch/allEvent">企画検索</a>
          </li>
          <li>
            <a href="#">お知らせ</a>
          </li>
        </ul>
      </header>
      <h1>omaturiRTA</h1>
      <Nuxt />
      <footer>made by ITをむさぼる会</footer>
    </div>
  </div>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

header li {
  display: inline-block;
}

h1 {
  text-align: center;
  font-family: 'Do Hyeon';
}

.warapper {
  min-height: 100vh;
  position: relative;
}

footer {
  position: absolute;
  bottom: 0;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
