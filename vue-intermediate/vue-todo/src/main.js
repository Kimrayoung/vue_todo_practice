import Vue from "vue";
import App from "./App.vue";
import { store } from "./store/store";

new Vue({
    el: "#app",
    store, //축약 -> store : store
    render: (h) => h(App),
});
