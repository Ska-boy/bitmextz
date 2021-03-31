<template>
  <div class="history">
    <h4>History orders</h4>
    <table v-if="history.length" class="table">
      <tr class="bold">
        <td>Дата создания</td>
        <td>Валютная пара</td>
        <td>Тип</td>
        <td>Цена создания</td>
        <td>Объем</td>
        <td>Состояние</td>
        <td>Id ордера</td>
      </tr>
      <tr v-for="item in history" :key="item.orderID">
        <td>{{ item.timestamp }}</td>
        <td>{{ item.symbol }}</td>
        <td>{{ item.side }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.orderQty }}</td>
        <td>{{ item.ordStatus }}</td>
        <td>{{ item.orderID }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { historyOrders } from "../api";
export default {
  created() {
    this.getHistoryOrdersFromApi();
  },
  data() {
    return {
      history: ""
    };
  },
  methods: {
    async getHistoryOrdersFromApi() {
      this.history = await historyOrders();
    }
  }
};
</script>

<style lang="scss" scoped></style>
