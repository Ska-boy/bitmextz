<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <active-instruments @picked="pickTickerHandle"></active-instruments>
        <quote-history :quote="quote" :pickedTicker="pickedTicker"></quote-history>
        <order-form :pickedTicker="pickedTicker"></order-form>
      </div>
      <history-orders></history-orders>
    </div>
  </div>
</template>

<script>
import { loadQuoteByTicker, subscribeToUpdateQuote } from "./api";
import ActiveInstruments from "./components/ActiveInstruments.vue";
import OrderForm from "./components/OrderForm.vue";
import QuoteHistory from "./components/QuoteHistory.vue";
import HistoryOrders from "./components/HistoryOrders.vue";

export default {
  name: "App",
  components: {
    ActiveInstruments,
    QuoteHistory,
    OrderForm,
    HistoryOrders
  },
  data() {
    return {
      quote: [],
      quoteNeedToUnsubscribe: Function,
      pickedTicker: {}
    };
  },
  methods: {
    pickTickerHandle(ticker) {
      this.quote = [];
      this.pickedTicker = ticker.symbol;
      this.loadQuoteFromApi(ticker.symbol);
    },
    async loadQuoteFromApi(symbol) {
      this.quoteNeedToUnsubscribe();
      this.quote = await loadQuoteByTicker(symbol);
      this.quoteNeedToUnsubscribe = subscribeToUpdateQuote(this.updateQuote, symbol);
    },
    updateQuote(quoteData) {
      this.quote = [...quoteData, ...this.quote];
    }
  }
};
</script>

<style src="@/assets/style.css"></style>
