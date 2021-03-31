<template>
  <div class="main-item main-instruments">
    <h4>Список торговых пар (обновляется онлайн)</h4>
    <table v-if="listTradePairs.length" class="table">
      <tr>
        <td class="bold">Symbol</td>
        <td class="bold">Last Price</td>
      </tr>
      <tr v-for="item in listTradePairs" :key="item.symbol" @click="clickHandle(item)">
        <td>{{ item.symbol }}</td>
        <td>{{ item.lastPrice }}</td>
      </tr>
    </table>

    <strong v-else>Loading</strong>
  </div>
</template>

<script>
import { loadActiveInstruments, subscribeToUpdatePrice } from "../api";

export default {
  created() {
    this.loadActiveInstrumentsFromApi();
  },
  data() {
    return {
      listTradePairs: ""
    };
  },
  methods: {
    async loadActiveInstrumentsFromApi() {
      this.listTradePairs = await loadActiveInstruments();
      subscribeToUpdatePrice(this.updatePrice);
    },
    updatePrice(ticker) {
      if (!ticker.length) return;

      this.listTradePairs
        .filter((t) => t.symbol == ticker[0].symbol)
        .forEach((t) => {
          t.lastPrice = ticker[0].fairPrice ?? t.lastPrice;
        });
    },
    clickHandle(item) {
      this.$emit("picked", item);
    }
  }
};
</script>

<style lang="scss" scoped></style>
