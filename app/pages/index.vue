<template>
  <section class="container">
    <div class="people-num">
      <div v-for="(account, index) in accounts" :key="`first-${index}`">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label level-lavel">{{ account.text }}等級</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input
                  v-model="account.num"
                  class="input"
                  type="number"
                  min="0"
                  placeholder="0"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        class="button is-primary"
        style="margin-top: 12px; margin-bottom: 12px; width: 100%"
        @click="addPartTimeWorker()"
      >
        Add a part-time worker
      </button>
      <div
        v-for="(partTimeWorker, index) in partTimeWorkers"
        :key="`second-${index}`"
        style="border: 1px solid #9b9b9b; box-sizing: border-box; padding: 1rem; border-radius: 15px;"
      >
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for="" class="label">No.{{ index }}</label>
          </div>
          <div>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label for="" class="label">時給</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control">
                    <input
                      v-model="partTimeWorker.salary"
                      type="number"
                      class="input"
                      min="0"
                      placeholder="0"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label for="" class="label">人数</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control">
                    <input
                      v-model="partTimeWorker.num"
                      type="number"
                      class="input"
                      min="0"
                      placeholder="0"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label level-lavel">想定時間<br />(単位：分)</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input
                v-model="estimatedTime"
                class="input"
                type="number"
                placeholder="30分"
              />
            </p>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <label class="checkbox">
          <input v-model="commonCostRealMode" type="checkbox" />
          共通費を一律2800円とする
        </label>
      </div>

      <nuxt-link :to="{ path: '/costInfo' }">原価情報はこちら</nuxt-link>
    </div>

    <div class="main-content">
      <p>{{ toHms(timer) }}</p>
      <p>人件費原価：{{ Math.round(money) }}円</p>
      <p>共通費込み：{{ Math.round(moneyAddCommonCost) }}円</p>
      <p v-if="estimatedTime !== 0">想定価格：{{ estimateMoney }}円</p>
      <p v-if="state === 1 && estimatedTime !== 0">
        節約価格：{{ Math.round(estimateMoney - moneyAddCommonCost) }}円
      </p>
      <p>
        <button
          v-if="state == 0 || state == 1"
          class="button is-link is-large"
          @click="startTimer"
        >
          Start
        </button>
        <button
          v-if="state == 2"
          class="button is-warning is-large"
          @click="stopTimer"
        >
          Stop
        </button>
        <button class="button is-danger is-large" @click="ResetTimer">
          Reset
        </button>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      state: 0, // 0 = initial, 1=stop, 2=start
      commonCostRealMode: true,
      estimatedTime: 0,
      timer: 0,
      money: 0,
      moneyAddCommonCost: 0,
      accounts: [
        {
          level: 1,
          text: '1',
          salary: 2135,
          profitableSalary: 10000,
          num: 0,
          commonCost: 1750,
          commonCostReal: 2800
        },
        {
          level: 2,
          text: '2',
          salary: 2396,
          profitableSalary: 10300,
          num: 0,
          commonCost: 1965,
          commonCostReal: 2800
        },
        {
          level: 3,
          text: '3',
          salary: 2682,
          profitableSalary: 10700,
          num: 0,
          commonCost: 2199,
          commonCostReal: 2800
        },
        {
          level: 4,
          text: '4',
          salary: 2969,
          profitableSalary: 11100,
          num: 0,
          commonCost: 2435,
          commonCostReal: 2800
        },
        {
          level: 5,
          text: '5',
          salary: 3385,
          profitableSalary: 11700,
          num: 0,
          commonCost: 2800,
          commonCostReal: 2800
        },
        {
          level: 6,
          text: 'V0',
          salary: 4010,
          profitableSalary: 12600,
          num: 0,
          commonCost: 3288,
          commonCostReal: 2800
        },
        {
          level: 7,
          text: 'V1',
          salary: 4583,
          profitableSalary: 13500,
          num: 0,
          commonCost: 4496,
          commonCostReal: 2800
        },
        {
          level: 8,
          text: 'V2',
          salary: 5208,
          profitableSalary: 14300,
          num: 0,
          commonCost: 4270,
          commonCostReal: 2800
        },
        {
          level: 9,
          text: 'V3',
          salary: 5990,
          profitableSalary: 15500,
          num: 0,
          commonCost: 4911,
          commonCostReal: 2800
        },
        {
          level: 10,
          text: 'V4',
          salary: 6875,
          profitableSalary: 16700,
          num: 0,
          commonCost: 5637,
          commonCostReal: 2800
        },
        {
          level: 11,
          text: 'V5',
          salary: 7813,
          profitableSalary: 18100,
          num: 0,
          commonCost: 6407,
          commonCostReal: 2800
        }
      ],
      partTimeWorkers: []
    }
  },
  computed: {
    estimateMoney: function() {
      let estimatedMoney = 0
      this.accounts.forEach(employee => {
        const salaryPerMinutes = employee.salary / 60
        const commonCostPerMinutes = employee.commonCost / 60
        const commonCostRealPerMinutes = employee.commonCostReal / 60
        estimatedMoney += salaryPerMinutes * this.estimatedTime * employee.num

        if (this.commonCostRealMode) {
          estimatedMoney +=
            commonCostRealPerMinutes * this.estimatedTime * employee.num
        } else {
          estimatedMoney +=
            commonCostPerMinutes * this.estimatedTime * employee.num
        }
      })
      if (this.partTimeWorkers.length > 0) {
        this.partTimeWorkers.forEach(partTimeWorker => {
          const salaryPerMinutesOfTimeWorker = partTimeWorker.salary / 60

          estimatedMoney +=
            salaryPerMinutesOfTimeWorker *
            this.estimatedTime *
            partTimeWorker.num
        })
      }
      return Math.round(estimatedMoney)
    }
  },
  methods: {
    startTimer() {
      this.intervalId = setInterval(() => {
        // 処理内容

        this.timer += 1

        this.accounts.forEach(employee => {
          this.money += (employee.salary * employee.num) / 3600
          if (this.commonCostRealMode) {
            this.moneyAddCommonCost +=
              (employee.salary * employee.num) / 3600 +
              (employee.commonCostReal * employee.num) / 3600
          } else {
            this.moneyAddCommonCost +=
              (employee.salary * employee.num) / 3600 +
              (employee.commonCost * employee.num) / 3600
          }
        })

        if (this.partTimeWorkers.length > 0) {
          this.partTimeWorkers.forEach(partTimeWorker => {
            this.money += (partTimeWorker.salary * partTimeWorker.num) / 3600
            this.moneyAddCommonCost +=
              (partTimeWorker.salary * partTimeWorker.num) / 3600
          })
        }
      }, 1000) // 1秒間隔で処理

      this.state = 2
    },
    stopTimer() {
      clearInterval(this.intervalId)
      this.state = 1
    },
    ResetTimer() {
      this.timer = 0
      this.money = 0
      this.moneyAddCommonCost = 0
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
    },
    sliceMoney(money) {
      return this.money.slice(0, 4)
    },
    addPartTimeWorker() {
      this.partTimeWorkers.push({
        salary: 0,
        num: 0
      })
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

<style scoped>
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
  flex: 2;
}
.level-lavel {
  width: 10vw;
  text-align: left;
}
.main-content p {
  font-size: 3rem;
}
.checkbox {
  justify-content: center;
}
@media screen and (max-width: 480px) {
  .container {
    display: block;
  }
  .field {
    display: flex;
  }
  .field-label {
    flex: 1;
    margin-left: 10%;
  }
  .field-body {
    flex: 2;
  }
}
</style>
