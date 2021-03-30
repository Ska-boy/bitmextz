<template>
  <div class="main-item main-quote">
    <h4>
      Список котировок <br />
      (обновляется онлайн)
    </h4>
    <!-- <strong>{{ quote[0].symbol }}</strong> -->
    <table class="table" v-if="quote != 'Loading'">
      <tr>
        <td class="bold">Time</td>
        <td class="bold">Price Open</td>
        <td class="bold">Price Close</td>
        <td class="bold">Max price</td>
        <td class="bold">Min price</td>
      </tr>
      <tr v-for="(item, idx) in quote" :key="item.symbol + idx">
        <td>{{ item.timestamp }}</td>
        <td>{{ item.open }} {{ item.symbol + idx }}</td>
        <td>{{ item.close }}</td>
        <td>{{ item.high }}</td>
        <td>{{ item.low }}</td>
      </tr>
    </table>

    <strong v-else> {{ message }}</strong>
  </div>
</template>

<script>
export default {
  props: ["quote"],
  data() {
    return {
      message: "<- Pick pair"
    };
  }
};
</script>

<style lang="scss" scoped></style>
