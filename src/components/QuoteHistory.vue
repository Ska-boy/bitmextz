<template>
  <div class="main-item main-quote">
    <h4>
      Список котировок <br />
      (обновляется онлайн)
    </h4>
    <div class="center" v-if="quote.length">
      <strong>{{ pickedTicker }}</strong>
    </div>
    <table class="table" v-if="quote.length">
      <tr class="bold">
        <td>Time</td>
        <td>Price Open</td>
        <td>Price Close</td>
        <td>Max price</td>
        <td>Min price</td>
      </tr>
      <tr v-for="(item, idx) in quote" :key="item.symbol + idx">
        <td>{{ item.timestamp }}</td>
        <td>{{ item.open }}</td>
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
  props: ["quote", "pickedTicker"],
  data() {
    return {
      message: "<- Pick pair"
    };
  }
};
</script>

<style lang="scss" scoped></style>
