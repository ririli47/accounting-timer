<template>
  <section class="container">
    <div class="people-num">
      <h2
        class="subtitle button is-info"
        id="config"
        @click="toggleFormShowStatus()"
      >
        設定
        <div></div>
      </h2>
      <div v-show="formShowStatus">
        <div v-for="(account, index) in getAccounts" :key="`first-${index}`">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label level-lavel">{{ account.text }}等級</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input
                    class="input"
                    type="number"
                    min="0"
                    placeholder="0"
                    @blur="accountNumChange(account.level, $event.target.value)"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          class="button is-primary part-time-worker"
          @click="addPartTimeWorker()"
        >
          Add a part-time worker
        </button>
        <div
          class="part-time-worker-list"
          v-for="(partTimeWorker, index) in getPartTimeWorkers"
          :key="`second-${index}`"
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
                        type="number"
                        class="input"
                        min="0"
                        placeholder="0"
                        @blur="
                          updatePartTimeWorkers(
                            'salary',
                            index,
                            $event.target.value
                          )
                        "
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
                        type="number"
                        class="input"
                        min="0"
                        placeholder="0"
                        @blur="
                          updatePartTimeWorkers(
                            'num',
                            index,
                            $event.target.value
                          )
                        "
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
                  class="input"
                  type="number"
                  placeholder="30分"
                  @blur="updateEstimateTime($event.target.value)"
                />
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <label class="checkbox">
            <input
              type="checkbox"
              checked="getCommonCostRealMode"
              @change="toggleCommonCostRealMode()"
            />
            共通費を一律2800円とする
          </label>
        </div>
        <nuxt-link :to="{ path: '/costInfo' }">原価情報はこちら</nuxt-link>
        <nuxt-link :to="{ path: '/features' }"
          >今後の開発計画はこちら</nuxt-link
        >
      </div>
    </div>
    <div class="main-content">
      <h2 class="subtitle button is-info">Meeting状況</h2>
      <table class="table is-hoverable">
        <tr v-if="getEstimateTime === 0 || leftTimerMode">
          <th class="table-th-left">経過時間</th>
          <th>{{ toHms(getTimer) }}</th>
        </tr>
        <tr
          v-if="getEstimateTime !== 0 && !leftTimerMode"
          @click="toggleLeftTimerMode()"
        >
          <th class="table-th-left">残り時間</th>
          <th>{{ toHms(getEstimateTime * 60 - getTimer) }}</th>
        </tr>
        <tr>
          <th class="table-th-left">人件費原価</th>
          <th>{{ Math.round(getMoney) }}円</th>
        </tr>
        <tr>
          <th class="table-th-left">共通費込み</th>
          <th>{{ Math.round(getMoneyAddCommonCost) }}円</th>
        </tr>
        <tr v-if="getEstimateTime !== 0 && leftTimerMode">
          <th class="table-th-left">
            想定価格
          </th>
          <th>{{ Math.round(getEstimateMoney) }}円</th>
        </tr>
        <tr v-if="getEstimateTime !== 0 && !leftTimerMode">
          <th class="table-th-left">
            残り予算
          </th>
          <th>{{ Math.round(getEstimateMoney - getMoneyAddCommonCost) }}円</th>
        </tr>
        <tr v-if="getTimerState === 3 && getEstimateTime !== 0">
          <th class="table-th-left">
            節約価格
          </th>
          <th>{{ Math.round(getEstimateMoney - getMoneyAddCommonCost) }}円</th>
        </tr>
      </table>

      <div>
        <button
          v-if="getTimerState != 2"
          class="button is-link is-large"
          @click="startTimer()"
        >
          Start
        </button>
        <button
          v-if="getTimerState == 2"
          class="button is-warning is-large"
          @click="stopTimer()"
        >
          Stop
        </button>
        <button
          v-if="getTimerState != 1"
          class="button is-danger is-large"
          @click="resetTimer()"
        >
          Reset
        </button>
        <button class="button is-info is-large" @click="toggleLeftTimerMode()">
          表示モード切り替え
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import timerStates from '../mixins/timerStates'

export default {
  mixins: [timerStates],
  data() {
    return {
      accountNums: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0
      },
      leftTimerMode: true,
      formShowStatus: true
    }
  },
  computed: {
    ...mapGetters({
      getAccounts: 'getAccounts',
      getTimerState: 'getTimerState',
      getTimer: 'getTimer',
      getMoney: 'getMoney',
      getMoneyAddCommonCost: 'getMoneyAddCommonCost',
      getEstimateMoney: 'getEstimateMoney',
      getCommonCostRealMode: 'getCommonCostRealMode',
      getEstimateTime: 'getEstimateTime',
      getPartTimeWorkers: 'getPartTimeWorkers'
    })
  },
  methods: {
    toggleLeftTimerMode() {
      this.leftTimerMode = !this.leftTimerMode
    },
    toggleFormShowStatus() {
      this.formShowStatus = !this.formShowStatus
    },
    accountNumChange(level, eValue) {
      const accounts = {
        level,
        accountNum: eValue
      }
      this.accountNums[level] = eValue
      this.$store.dispatch('updateAccountNum', accounts)
      this.$store.commit('calcEstimateMoney', this.getEstimateTime)
    },
    startTimer() {
      const timerStateStart = this.timerStates.start
      this.$store.dispatch('changeTimerState', timerStateStart)

      this.intervalId = setInterval(() => {
        this.$store.dispatch('addTimer', 1)
      }, 1000)
    },
    stopTimer() {
      const timerStateStop = this.timerStates.stop
      this.$store.dispatch('changeTimerState', timerStateStop)

      clearInterval(this.intervalId)
    },
    resetTimer() {
      const timerStateDefault = this.timerStates.default
      this.$store.dispatch('changeTimerState', timerStateDefault)

      clearInterval(this.intervalId)
      this.$store.dispatch('clearState')
    },
    toggleCommonCostRealMode() {
      this.$store.dispatch('toggleCommonCostRealMode')
    },
    updateEstimateTime(eValue) {
      if (eValue === '') {
        eValue = 0
      }
      this.$store.dispatch('updateEstimateTime', eValue)
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
    addPartTimeWorker() {
      this.$store.dispatch('addPartTimeWorker')
    },
    updatePartTimeWorkers(updateKey, index, eValue) {
      const updateInfomation = {
        updateKey,
        index,
        value: eValue
      }
      this.$store.dispatch('updatePartTimeWorkers', updateInfomation)
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
  width: 100%;
  font-weight: 300;
  font-size: 20px;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.part-time-worker {
  margin-top: 12px;
  margin-bottom: 12px;
  width: 100%;
}

.part-time-worker-list {
  border: 1px solid #9b9b9b;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 15px;
  margin-bottom: 10px;
}

.people-num {
  width: 30%;
}

.main-content {
  width: 70%;
  height: 100%;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.level-lavel {
  font-size: 1rem;
  text-align: left;
}
.main-content p {
  font-size: 3rem;
}
.checkbox {
  justify-content: center;
}

.table {
  width: 100%;
}

.table th {
  padding: 2rem 2rem;
  font-size: 2rem;
  text-align: left;
}

.table-th-left {
  width: 60%;
}

.subtitle .button .is-info::after {
  display: block;
  width: 15px;
  height: 15px;
  border-top: solid 3px #697b91;
  border-right: solid 3px #697b91;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

@media screen and (max-width: 480px) {
  .subtitle {
    width: 95%;
  }
  .people-num {
    width: 100%;
    margin-top: 20px;
  }

  .part-time-worker {
    margin-top: 12px;
    margin-bottom: 12px;
    width: 80%;
  }

  .part-time-worker-list {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }

  .checkbox {
    margin-left: auto;
    margin-right: auto;
  }

  .main-content {
    width: 100%;
    margin-left: 0;
    margin-top: 20px;
    margin-bottom: 20px;
  }
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
  .table th {
    padding: 0.75rem 0.75rem;
    font-size: 1rem;
  }
}
</style>
