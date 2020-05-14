<template>
  <section class="container">
    <div class="people-num">
      <h2 v-show="getEditMode" class="subtitle">
        テンプレート編集
      </h2>
      <h2 v-show="!getEditMode" class="subtitle">
        テンプレート登録
      </h2>
      <div v-for="(account, index) in accounts" :key="`first-${index}`">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label level-lavel">{{ account.text }}等級</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input
                  :value="account.num"
                  class="input"
                  type="number"
                  min="0"
                  placeholder="0"
                  @blur="accountNumChange(account.level, $event.target.value)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal estimate-time-form">
        <div class="field-label is-normal">
          <label class="label level-lavel">想定時間<br />(単位：分)</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                :value="estimateTime"
                class="input"
                type="number"
                placeholder="30"
                @blur="updateEstimateTime($event.target.value)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label level-lavel">テンプレート名</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                :value="templateLabel"
                class="input"
                type="text"
                placeholder="template1"
                @blur="updateTemplateLabel($event.target.value)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="buttons">
      <a
        v-show="getEditMode"
        class="button is-light is-primary is-right"
        @click="registerTemplate"
      >
        <strong>更新する</strong>
      </a>
      <a
        v-show="!getEditMode"
        class="button is-light is-primary is-right"
        @click="registerTemplate"
      >
        <strong>登録する</strong>
      </a>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getAccounts: 'getAccounts',
      getEstimateTime: 'getEstimateTime',
      getUser: 'getUser',
      getEditMode: 'templates/getEditMode',
      getTemplateLabel: 'templates/getTemplateLabel',
      getSelectedTemplateId: 'templates/getSelectedTemplateId'
    }),
    accounts: {
      get() {
        return this.getAccounts
      }
    },
    estimateTime: {
      get() {
        return this.getEstimateTime
      }
    },
    templateLabel: {
      get() {
        return this.getTemplateLabel
      }
    }
  },
  methods: {
    registerTemplate() {
      const user = this.$store.getters.getUser
      const accountNums = []
      this.accounts.forEach(account => {
        accountNums.push(account.num)
      })
      const templateData = {
        uid: user.uid,
        accounts: accountNums,
        estimateTime: this.estimateTime,
        label: this.templateLabel
      }
      if (this.getEditMode) {
        templateData.docId = this.getSelectedTemplateId

        this.$store.dispatch('templates/updateTemplates', templateData)
        this.$store.dispatch('templates/setEditMode', false)
      } else {
        this.$store.dispatch('templates/addTemplates', templateData)
      }

      this.$router.push('/')
    },
    accountNumChange(level, eValue) {
      const accountNum = {
        level,
        accountNum: parseInt(eValue)
      }
      this.$store.dispatch('updateAccountNum', accountNum)
    },
    updateEstimateTime(eValue) {
      if (eValue === '') {
        eValue = 0
      }
      this.$store.dispatch('updateEstimateTime', eValue)
    },
    updateTemplateLabel(eValue) {
      this.$store.dispatch('templates/setTemplateLabel', eValue)
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  width: 100%;
}
.people-num {
  margin: 0 auto 0 auto;
  width: 60%;
}

.estimate-time-form {
  margin-top: 20px;
}
.buttons {
  margin: 20px auto 0 auto;
  width: 60%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
