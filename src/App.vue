<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <active-instruments @picked="pickTickerHandle"></active-instruments>
        <quote-history :quote="quote"></quote-history>
        <div class="main-item">
          <h4>Форма создания ордера</h4>
        </div>
      </div>
      <div class="history">
        <h4>History orders</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { loadQuoteByTicker } from "./api";
import ActiveInstruments from "./components/ActiveInstruments.vue";
import QuoteHistory from "./components/QuoteHistory.vue";

export default {
  name: "App",
  components: {
    ActiveInstruments,
    QuoteHistory
  },
  data() {
    return {
      quote: "Loading"
    };
  },
  methods: {
    pickTickerHandle(ticker) {
      this.quote = "Loading";
      this.loadQuoteFromApi(ticker.symbol);
    },
    async loadQuoteFromApi(symbol) {
      this.quote = await loadQuoteByTicker(symbol);
    }
  }
};
</script>

<style src="@/assets/style.css"></style>
