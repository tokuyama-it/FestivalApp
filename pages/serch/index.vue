<template>
  <section class="container">
    <h1 class="title">イベント検索</h1>
    <ul>
      <li>
        <div class="content_1 content_default">
          <nuxt-link to="/serch/stage">ステージイベントを検索</nuxt-link>
          <p>ステージイベントを検索します</p>
        </div>
      </li>
      <li>
        <div class="content_2 content_default">
          <nuxt-link to="/serch/food">食べる所を検索</nuxt-link>
          <p>食べる場所を検索します</p>
        </div>
      </li>
      <li>
        <div class="content_3 content_default">
          <nuxt-link to="/serch/omise">体験型のイベントを検索</nuxt-link>
        </div>
      </li>
      <li>
        <div class="content_4 content_default">
          <nuxt-link to="/serch/allEvent">すべての企画を検索</nuxt-link>
        </div>
      </li>
    </ul>
  </section>
</template>

<style>
a {
  text-decoration: none;
}

li a {
  color: #000;
}

li {
  list-style: none;
}

.content_default {
  width: 80%;
  border-radius: 4px;
  margin-bottom: 20px;
}

.content_default p {
  color: #808080;
  text-align: center;
  font-weight: bold;
  font-size: 5px;
}

.content_1 {
  background: #b0e4dc;
}


.content_2 {
  background: #f5deb3;
}

.content_3 {
  background: #1e90ff;
}

.content_4 {
  background: #7cfc00;
}
</style>