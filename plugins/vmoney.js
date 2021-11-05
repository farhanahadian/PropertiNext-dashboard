import Vue from "vue";
import money from "v-money";

// register directive v-money
Vue.use(money, {
  decimal: ',',
  thousands: '.',
  prefix: 'Rp ',
  suffix: ' ',
  precision: 0,
  masked: false /* doesn't work with directive */
});
