<template>
  <section class="container">
    <table class="table is-fullwidth">
      <tbody>
        <tr>
          <th>等級</th>
          <th>人件費原価（人時）</th>
          <th>共通費（人時）※一律</th>
          <th>共通費（人時）※人件費原価と同値</th>
        </tr>
        <tr v-for="n in 12" :key="n">
          <th>{{ account[n - 1].text }}</th>
          <th>{{ account[n - 1].salary }}</th>
          <th>{{ account[n - 1].commonCostReal }}</th>
          <th>{{ account[n - 1].commonCost }}</th>
        </tr>
      </tbody>
    </table>

    <nuxt-link :to="{ path: '/' }" class="backlink">タイマーに戻る</nuxt-link>
  </section>
</template>

<script>
export default {
  data() {
    return {
      account: [
        {
          level: 1,
          text: '1',
          salary: 2316,
          commonCost: 2316,
          commonCostReal: 2800
        },
        {
          level: 2,
          text: '2',
          salary: 2595,
          commonCost: 2595,
          commonCostReal: 2800
        },
        {
          level: 3,
          text: '3',
          salary: 2907,
          commonCost: 2907,
          commonCostReal: 2800
        },
        {
          level: 4,
          text: '4',
          salary: 3220,
          commonCost: 3220,
          commonCostReal: 2800
        },
        {
          level: 5,
          text: '5',
          salary: 3666,
          commonCost: 3666,
          commonCostReal: 2800
        },
        {
          level: 6,
          text: 'V0',
          salary: 4347,
          commonCost: 4347,
          commonCostReal: 2800
        },
        {
          level: 7,
          text: 'V1',
          salary: 4967,
          commonCost: 4967,
          commonCostReal: 2800
        },
        {
          level: 8,
          text: 'V2',
          salary: 5642,
          commonCost: 5642,
          commonCostReal: 2800
        },
        {
          level: 9,
          text: 'V3',
          salary: 6490,
          commonCost: 6490,
          commonCostReal: 2800
        },
        {
          level: 10,
          text: 'V4',
          salary: 7540,
          commonCost: 7540,
          commonCostReal: 2800
        },
        {
          level: 11,
          text: 'V5',
          salary: 8471,
          commonCost: 8471,
          commonCostReal: 2800
        },
        {
          level: 12,
          text: 'V6',
          salary: 9487,
          commonCost: 9487,
          commonCostReal: 2800
        }
      ]
    }
  }
}
</script>

<style scoped>
.container {
  margin: 100px auto 100px auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.table {
  flex: 1;
}
.backlink {
  flex: 1;
}
</style>
