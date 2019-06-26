<template>
  <section class="container">
    <table class="table is-fullwidth">
      <tr>
        <th>等級</th>
        <th>人件費原価（人時）</th>
        <th>共通費（人時）※共通費原価*0.82</th>
      </tr>
      <tr v-for="n in 11" :key="n">
        <th>{{ account[n - 1].text }}</th>
        <th>{{ account[n - 1].salary }}</th>
        <th>{{ account[n - 1].commonCost }}</th>
      </tr>
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
          salary: 2135,
          profitableSalary: 10000,
          commonCost: 1750
        },
        {
          level: 2,
          text: '2',
          salary: 2396,
          profitableSalary: 10300,
          commonCost: 1965
        },
        {
          level: 3,
          text: '3',
          salary: 2682,
          profitableSalary: 10700,
          commonCost: 2199
        },
        {
          level: 4,
          text: '4',
          salary: 2969,
          profitableSalary: 11100,
          commonCost: 2435
        },
        {
          level: 5,
          text: '5',
          salary: 3385,
          profitableSalary: 11700,
          commonCost: 2800
        },
        {
          level: 6,
          text: 'V0',
          salary: 4010,
          profitableSalary: 12600,
          commonCost: 3288
        },
        {
          level: 7,
          text: 'V1',
          salary: 4583,
          profitableSalary: 13500,
          commonCost: 4496
        },
        {
          level: 8,
          text: 'V2',
          salary: 5208,
          profitableSalary: 14300,
          commonCost: 4270
        },
        {
          level: 9,
          text: 'V3',
          salary: 5990,
          profitableSalary: 15500,
          commonCost: 4911
        },
        {
          level: 10,
          text: 'V4',
          salary: 6875,
          profitableSalary: 16700,
          commonCost: 5637
        },
        {
          level: 11,
          text: 'V5',
          salary: 7813,
          profitableSalary: 18100,
          commonCost: 6407
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
