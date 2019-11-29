<template>
  <section class="container">
    <div class="people-num">
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
        class="button is-primary"
        style="margin-top: 12px; margin-bottom: 12px; width: 100%"
        @click="addPartTimeWorker()"
      >
        Add a part-time worker
      </button>
      <div
        v-for="(partTimeWorker, index) in getPartTimeWorkers"
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
                        updatePartTimeWorkers('num', index, $event.target.value)
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
    </div>
    <div class="main-content">
      <p>{{ toHms(getTimer) }}</p>
      <p>人件費原価：{{ Math.round(getMoney) }}円</p>
      <p>共通費込み：{{ Math.round(getMoneyAddCommonCost) }}円</p>
      <p v-if="getEstimateTime !== 0">
        想定価格：{{ Math.round(getEstimateMoney) }}円
      </p>
      <p v-if="getTimerState === 3 && getEstimateTime !== 0">
        節約価格：{{ Math.round(getEstimateMoney - getMoneyAddCommonCost) }}円
      </p>

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
      }
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
    accountNumChange(level, eValue) {
      const accounts = {
        level: level,
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
        updateKey: updateKey,
        index: index,
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
