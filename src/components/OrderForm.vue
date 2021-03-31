<template>
  <div class="main-item main-form">
    <h4>
      Форма <br />
      создания ордера
    </h4>
    <table v-if="pickedTicker.length" class="table">
      <div>
        <label for="integer" class="bold">Объем: </label> <br />
        <input type="text" name="integer" :value="integer" @input="inputHandle" class="input" />
      </div>
      <div>
        <button type="button" class="btn bold" @click="formAction('Buy')">Купить</button>
        <button type="button" class="btn bold" @click="formAction('Sell')">Продать</button>
      </div>
    </table>
    <strong v-else>You need to pick pair</strong>
  </div>
</template>

<script>
import { sendOrder } from "../api";
export default {
  props: ["pickedTicker"],
  data() {
    return {
      integer: 1
    };
  },
  methods: {
    inputHandle(e) {
      if (Number.isInteger(+e.target.value) && e.data != ".") {
        this.integer = e.target.value;
      } else {
        e.target.value = this.integer;
      }
    },
    formAction(side) {
      sendOrder({
        ordType: "Market",
        symbol: this.pickedTicker,
        orderQty: this.integer,
        side: side
      }).catch((msg) => {
        alert(msg.message);
      });
    }
  }
};
</script>

<style></style>
