import Vue from 'vue'
import {ServerTable, ClientTable, Event} from 'vue-tables-2'

const options = {}
Vue.use(ClientTable, options, false, 'bootstrap4');
Vue.use(ServerTable, options, false, 'bootstrap4');

