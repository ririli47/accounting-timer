<template>
  <section class="container">
    <div class="people-num">
      <div v-for="n in 11" :key="n">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <div v-if="n < 6">
              <label class="label">{{ n }}等級</label>
            </div>
            <div v-else>
              <label class="label">V{{ n - 6 }}等級</label>
            </div>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input
                  v-model="people[n - 1].num"
                  class="input"
                  type="number"
                  placeholder="0"
                />
              </p>
              <p>{{ people[n - 1].num }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-content">
      <p>{{ toHms(timer) }}</p>
      <p>{{ money }}円</p>
      <button class="button is-primary" @click="startTimer">Start</button>
      <button class="button is-primary" @click="stopTimer">Stop</button>
      <button class="button is-primary" @click="ResetTimer">Reset</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      timer: 0,
      money: 0,
      people: [
        { level: 1, num: 0 },
        { level: 2, num: 0 },
        { level: 3, num: 0 },
        { level: 4, num: 0 },
        { level: 5, num: 0 },
        { level: 6, num: 0 },
        { level: 7, num: 0 },
        { level: 8, num: 0 },
        { level: 9, num: 0 },
        { level: 10, num: 0 },
        { level: 11, num: 0 }
      ],
      account: [
        { level: 1, salary: 2135, profitableSalary: 10000 },
        { level: 2, salary: 2396, profitableSalary: 10300 },
        { level: 3, salary: 2682, profitableSalary: 10700 },
        { level: 4, salary: 2969, profitableSalary: 11100 },
        { level: 5, salary: 3385, profitableSalary: 11700 },
        { level: 6, salary: 4010, profitableSalary: 12600 },
        { level: 7, salary: 4583, profitableSalary: 13500 },
        { level: 8, salary: 5208, profitableSalary: 14300 },
        { level: 9, salary: 5990, profitableSalary: 15500 },
        { level: 10, salary: 6875, profitableSalary: 16700 },
        { level: 11, salary: 7813, profitableSalary: 18100 }
      ]
    }
  },
  methods: {
    startTimer() {
      this.intervalId = setInterval(() => {
        // 処理内容
        this.timer += 1

        for (let i = 0; i < this.people.length; i++) {
          for (let j = 0; j < this.people[i].num; j++) {
            this.money += this.account[this.people[i].level - 1].salary / 3600
          }
        }
      }, 1000) // 1秒間隔で処理
    },
    stopTimer() {
      clearInterval(this.intervalId)
    },
    ResetTimer() {
      this.timer = 0
    },
    toHms(t) {
      let hms = ''
      const h = (t / 3600) | 0
      const m = ((t % 3600) / 60) | 0
      const s = t % 60

      if (h !== 0) {
        hms = padZero(h) + ':' + padZero(m) + ':' + padZero(s)
      } else if (m !== 0) {
        hms = '00:' + padZero(m) + ':' + padZero(s)
      } else {
        hms = '00:' + '00:' + padZero(s)
      }

      return hms
    }
  }
}

function padZero(v) {
  if (v < 10) {
    return '0' + v
  } else {
    return v
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.people-num {
  flex: 1;
}

.main-content {
  flex: 4;
}
</style>
