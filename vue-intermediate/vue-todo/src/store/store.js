import Vue from "vue";
import Vuex from "vuex";
import todoApp from "./modules/todoApp.js";

Vue.use(Vuex);

export const store = new Vuex.Store({
    //export로 const store하는 순간 store이라는 객체는 전역으로 사용이 가능하다.
    //이 store를 접근하려면 다른 파일에서 import를 하면 도미
    modules: {
        //todo에 관련된 데이터들로 모듈화를 한 것
        todoApp,
    },
});
