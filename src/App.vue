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
import { loadQuoteByTicker, subscribeToUpdateQuote } from "./api";
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
      quote: "Loading",
      quoteNeedToUnsubscribe: Function
    };
  },
  methods: {
    pickTickerHandle(ticker) {
      this.quote = [];
      this.loadQuoteFromApi(ticker.symbol);
    },
    async loadQuoteFromApi(symbol) {
      this.quoteNeedToUnsubscribe();

      this.quote = await loadQuoteByTicker(symbol);

      this.quoteNeedToUnsubscribe = subscribeToUpdateQuote(this.updateQuote, symbol);
    },
    updateQuote(quoteData) {
      this.quote = [...quoteData, ...this.quote];
      console.log(quoteData);
    }
  }
};
</script>

<style src="@/assets/style.css"></style>
