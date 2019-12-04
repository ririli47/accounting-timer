<template>
  <section class="container">
    <div class="columns is-desktop">
      <div class="column outside-box">
        <h2 class="column-title">TODO</h2>
        <div class="tile is-ancestor">
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child notification is-primary">
                <p class="card-title">ロゴ作成</p>
              </article>
              <article class="tile is-child notification is-primary">
                <p class="card-title">LP（TOPページ）作成</p>
              </article>
              <article class="tile is-child notification is-primary">
                <p class="card-title">ログイン（アカウント）作成</p>
              </article>
              <article class="tile is-child notification is-primary">
                <p class="card-title">サービス基盤作成</p>
              </article>
            </div>
          </div>
        </div>
      </div>
      <div class="column outside-box">
        <h2 class="column-title">DOING</h2>
        <div class="tile is-ancestor">
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child notification is-warning">
                <p class="card-title">TypeScript導入</p>
              </article>
            </div>
          </div>
        </div>
      </div>
      <div class="column outside-box">
        <h2 class="column-title">DONE</h2>
        <div class="tile is-ancestor">
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child notification is-info">
                <p class="card-title">サービス名策定</p>
              </article>
            </div>
          </div>
        </div>
      </div>
      <div class="column outside-box">
        <h2 class="column-title">RELEASED</h2>
        <div class="tile is-ancestor">
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child notification is-success">
                <p class="card-title">vuex導入</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  margin: 100px auto 100px auto;
  min-height: 100vh;
  display: flex;
}

.columns {
  display: flex;
  justify-content: center;
  text-align: center;
}

.outside-box {
  top: 0px;
  margin: 5px;
  border: solid 1px #ccc;
  box-shadow: 0 0 2px #ccc;
}

.column-title {
  font-weight: 200;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.card-title {
  font-weight: 300;
  font-size: 30px;
  word-spacing: 5px;
}
</style>
