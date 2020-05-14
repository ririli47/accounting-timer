import firebase from '~/plugins/firebase'
const db = firebase.firestore()

const userRef = db.collection('users')

export const state = () => ({
  timerState: 1,
  timer: 0,
  money: 0,
  moneyAddCommonCost: 0,
  commonCostRealMode: true,
  estimateTime: 0,
  estimateMoney: 0,
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
  partTimeWorkers: [],
  user: {
    email: '',
    displayName: '',
    uid: '',
    metadata: ''
  },
  // user: null,
  isLogin: false
})

export const getters = {
  getUser(state) {
    return state.user
  },
  getIsLogin(state) {
    return state.isLogin
  },
  getTimer(state) {
    return state.timer
  },
  getAccounts(state) {
    return state.accounts
  },
  getMoney(state) {
    return state.money
  },
  getTimerState(state) {
    return state.timerState
  },
  getMoneyAddCommonCost(state) {
    return state.moneyAddCommonCost
  },
  getCommonCostRealMode(state) {
    return state.commonCostRealMode
  },
  getEstimateTime(state) {
    return state.estimateTime
  },
  getEstimateMoney(state) {
    return state.estimateMoney
  },
  getPartTimeWorkers(state) {
    return state.partTimeWorkers
  }
}

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  setIsLogin(state, payload) {
    state.isLogin = payload
  },
  signOut(state) {
    state.user = {
      email: '',
      displayName: '',
      uid: '',
      metadata: ''
    }
  },
  addTimer(state, addTime) {
    state.timer += addTime
  },
  calcMoney(state, addTime) {
    // 正社員分
    state.accounts.forEach(employee => {
      state.money += ((employee.salary * employee.num) / 3600) * addTime
      if (state.commonCostRealMode) {
        state.moneyAddCommonCost +=
          ((employee.salary * employee.num) / 3600 +
            (employee.commonCostReal * employee.num) / 3600) *
          addTime
      } else {
        state.moneyAddCommonCost +=
          ((employee.salary * employee.num) / 3600 +
            (employee.commonCost * employee.num) / 3600) *
          addTime
      }
    })

    // 契約社員分
    state.partTimeWorkers.forEach(employee => {
      const salaryPerSeconds = employee.salary / 3600

      state.money += salaryPerSeconds * employee.num * addTime
      state.moneyAddCommonCost += salaryPerSeconds * employee.num * addTime
    })
  },
  updateAccountNum(state, accounts) {
    state.accounts[accounts.level - 1].num = accounts.accountNum
  },
  addPartTimeWorker(state) {
    state.partTimeWorkers.push({
      salary: 0,
      num: 0
    })
  },
  updatePartTimeWorkers(state, updateInfomation) {
    state.partTimeWorkers[updateInfomation.index][updateInfomation.updateKey] =
      updateInfomation.value
  },
  changeTimerState(state, nextState) {
    state.timerState = nextState
  },
  toggleCommonCostRealMode(state) {
    state.commonCostRealMode = !state.commonCostRealMode
  },
  updateEstimateTime(state, estimateTime) {
    state.estimateTime = estimateTime
  },
  calcEstimateMoney(state, estimateTime) {
    state.estimateMoney = 0
    let estimateCommonCost = 0

    // 正社員分
    state.accounts.forEach(employee => {
      if (isNaN(employee.num)) {
        employee.num = 0
      }

      const salaryPerMinutes = employee.salary / 60
      const commonCostPerMinutes = employee.commonCost / 60
      const commonCostRealPerMinutes = employee.commonCostReal / 60

      state.estimateMoney += salaryPerMinutes * employee.num * estimateTime
      if (state.commonCostRealMode) {
        estimateCommonCost +=
          commonCostRealPerMinutes * employee.num * estimateTime
      } else {
        estimateCommonCost += commonCostPerMinutes * employee.num * estimateTime
      }
    })

    // 契約社員分
    state.partTimeWorkers.forEach(employee => {
      if (isNaN(employee.num)) {
        employee.num = 0
      }

      const salaryPerMinutes = employee.salary / 60

      state.estimateMoney += salaryPerMinutes * employee.num * estimateTime
      estimateCommonCost += salaryPerMinutes * employee.num * estimateTime
    })
    state.estimateMoney += estimateCommonCost
  },
  clearState(state) {
    state.timer = 0
    state.money = 0
    state.timerState = 1
    state.moneyAddCommonCost = 0
  }
}

export const actions = {
  async nuxtClientInit({ dispatch, commit }) {
    const user = await dispatch('getAuthStateus')

    if (user) {
      const { email, displayName, uid, metadata } = user

      const isUserExist = dispatch('fetchUser', uid)

      if (!isUserExist) {
        dispatch('registerUser', { uid, email })
      }

      await dispatch('templates/fetchTemplates', user.uid)

      await commit('setUser', { email, displayName, uid, metadata })
      await commit('setIsLogin', true)
    }
  },
  addTimer({ commit }, addTime) {
    commit('addTimer', addTime)
    commit('calcMoney', addTime)
  },
  updateAccountNum({ commit }, accounts) {
    commit('updateAccountNum', accounts)
  },
  changeTimerState({ commit }, nextState) {
    commit('changeTimerState', nextState)
  },
  toggleCommonCostRealMode({ commit }) {
    commit('toggleCommonCostRealMode')
  },
  clearState({ commit }) {
    commit('clearState')
  },
  updateEstimateTime({ commit }, estimateTime) {
    commit('updateEstimateTime', estimateTime)
    commit('calcEstimateMoney', estimateTime)
  },
  addPartTimeWorker({ commit }) {
    commit('addPartTimeWorker')
  },
  updatePartTimeWorkers({ commit }, updateInfomation) {
    commit('updatePartTimeWorkers', updateInfomation)
  },
  setUser({ commit }, user) {
    commit('setUser', user)
  },
  setIsLogin({ commit }, isLogin) {
    commit('setIsLogin', isLogin)
  },

  async googleSignIn({ dispatch, commit }) {
    const provider = new firebase.auth.GoogleAuthProvider()
    await firebase.auth().signInWithPopup(provider)

    const user = await dispatch('getAuthStateus')
    if (user) {
      console.log('user found')
      const { email, displayName, uid, metadata } = user

      const isUserExist = dispatch('fetchUser', uid)

      if (!isUserExist) {
        dispatch('registerUser', { uid, email })
      }

      commit('setUser', { email, displayName, uid, metadata })
    } else {
      console.log('user not found')

      commit('signOut')
      this.$router.push('/')
    }
  },
  getAuthStateus() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        resolve(user || false)
      })
    })
  },
  googleSignOut({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit('signOut')
        this.$router.push('/')
      })
      .catch(() => {
        console.log('sign out error')
      })
  },
  fetchUser({ commit }, userId) {
    userRef
      .doc(userId)
      .get()
      .then(res => {
        console.log('success : fetchUser')
        return true
      })
      .catch(error => {
        console.log('error : ' + error)
        return false
      })
  },
  registerUser({ commit }, user) {
    userRef
      .doc(user.uid)
      .set({
        email: user.email
      })
      .then(function(docRef) {
        console.log('success')
      })
      .catch(function(error) {
        console.error('Error adding document: ', error)
      })
  }
}
