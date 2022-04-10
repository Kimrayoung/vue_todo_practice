import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const storage = {
    fetch() {
        const arr = []; //fetch의 스콥이 달라서 아래 todoItems에 접근 할 수 없어서 이 배열을 가지고 넘겨줌
        //즉, if문으로 데이터가 감싸져 있기 때문에 if문 안에서 store의 state에 접근 할 수 없음
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                // this.todoItems.push(localStorage.key(i)); //이거는 localstorage해서 바로 해당 키값을 todolist에 넣는 것
                //로컬스토리지에 있는 아이템이 App.vue에 있는 todoItems에서 관리됨
                //그리고 이걸 todoList에서 사용하기 위해서는 todoList로 데이터를 내려주는 과정이 필요함 --> v-bind속성 사용
                if (localStorage.key(i) !== "loglevel:wepack-dev-server") {
                    arr.push(
                        JSON.parse(localStorage.getItem(localStorage.key(i)))
                    ); //해당 키에 해당 하는 것을 가져와서 this.todoItems에 넣는 것(그리고 가져와지는 것은 string값)
                }
            }
        }
        return arr;
    },
};

export const store = new Vuex.Store({
    //export로 const store하는 순간 store이라는 객체는 전역으로 사용이 가능하다.
    //이 store를 접근하려면 다른 파일에서 import를 하면 도미
    state: {
        todoItems: storage.fetch(),
    },
    mutations: {
        addOneItem(state, todoItem) {
            let obj = {
                completed: false, //check되어있는지 아닌지 확인하는 불린값
                item: todoItem,
            };
            localStorage.setItem(todoItem, JSON.stringify(obj)); //stringify는 자바스크립트 객체를 스트링의 형태로 변환
            //mutations에서 state를 접근하는 방법은 state를 인자로 받아서 접근함
            state.todoItems.push(obj); //state에 잇는 todoItems에 데이터를 넣어준다는 것
        },
        removeOneItem(state, payload) {
            localStorage.removeItem(payload.todoItem.item);
            state.todoItems.splice(payload.index, 1);
        },
        toggleOneItem(state, payload) {
            //payload라는 이름으로 객체를 받음
            state.todoItems[payload.index].completed =
                !state.todoItems[payload.index].completed;
            //로컬스토리지의 데이터를 갱신
            localStorage.removeItem(payload.todoItem.item);
            localStorage.setItem(
                payload.todoItem.item,
                JSON.stringify(payload.todoItem)
            );
        },
        clearAllItems(state) {
            localStorage.clear();
            state.todoItems = [];
        },
    },
});
