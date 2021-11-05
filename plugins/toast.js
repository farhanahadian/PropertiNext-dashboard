import Vue from 'vue';
import VueToast from 'vue-toast-notification';
// Import one of the available themes
// import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

export default ({ app }, inject) => {
  inject('toast', Vue.use(VueToast));
};
