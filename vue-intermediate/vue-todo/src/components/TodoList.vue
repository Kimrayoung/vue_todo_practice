<template>
    <div>
        <transition-group name="list" tag="ul">
            <!-- v-bind:key는 중복되지 않는 텍스트가 키가 되어서  중복되지 않는 선에서 키가 유일해서 vue-for의 성능을 가속화-->
            <!-- 여기서 index는 v-for의 고유의 문법으로 몇 번째인지 인덱스 번호를 부여해준다 -->
            <!-- 즉, v-for안에서 todoItem과 index로 데이터를 접근할 수 있다 -->
            <li
                v-for="(todoItem, index) in this.todoItems"
                v-bind:key="todoItem.item"
                class="shadow"
            >
                <!-- 하나의 리스트가 만들어질 때마다 아래의 내용이 동일하게 입력되므로 어떤 리스트의 데이터를 눌러도 아래의 내용이 똑같이 작동됨 -->
                <!-- 위해서 토글을 눌러서 completed상태로 하게 된다면 v-on:click에 의해서 toggleComplete가 실행됨 -->
                <!-- 체크박스를 클릭하면 toggleComplete라는 이벤트가 발생, 즉, 토글이 클릭했을때 이벤트를 toggleComplete라고 이름 짓은 것을 의미 -->
                <i
                    class="checkBtn fa-solid fa-check"
                    v-bind:class="{ checkBtnCompleted: todoItem.completed }"
                    v-on:click="toggleComplete({ todoItem, index })"
                ></i>
                <!-- v-bind:class은 기존의 html속성에다가  동적인 값을 부여하는 것을 의미함
                즉, 여기서는 todoItem.completed에 따라서 속성이 부여됨, 만약에 completed가 false이면 이 class는 없어짐 true라면 textCompleted만 남아서 속성이 적용됨-->
                <span v-bind:class="{ textCompleted: todoItem.completed }">{{
                    todoItem.item
                }}</span>
                <span
                    class="removeBtn"
                    v-on:click="removeTodo({ todoItem, index })"
                >
                    <i class="fa-solid fa-trash-can"></i>
                </span>
            </li>
        </transition-group>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
    methods: {
        ...mapMutations({
            removeTodo: "removeOneItem", //removeTodo가 눌렸을 때(이벤트가 발생했을때 ) removeOneItem이라는 함수를 실행할래
            //todoItem. index는 념겨주지 않아도 됨 --> 이유: 만약에 위 이벤트에서 넘겨주는 인자가 있다면 mapMutation에서 알아서 가져옴
            //위 표현단에서 인덱스가 두개이므로 그 두개를 하나로 받기 위해서 하나로 묶어서 넘겨주는 부분이 필요하다. 즉, 객체로 묶어서  보내줘야 함
            toggleComplete: "toggleOneItem",
        }),
        // removeTodo(todoItem, index) {
        //     this.$store.commit("removeOneItem", { todoItem, index });
        // },
        // toggleComplete(todoItem, index) {
        //     this.$store.commit("toggleOneItem", { todoItem, index });
        // },
    },
    computed: {
        // ...mapGetters(["storedTodoItems"]), //배열 리터럴
        //객체 리터럴은 현재 템플릿에 매핑될 데이터의 이름과 동일하다면 배열 리터럴 사용
        //위의 템플릿에도 storedTodoItems가 있고 여기에도 storedTodoItems가 있다면 배열 리터럴
        ...mapGetters({
            todoItems: "storedTodoItem",
        }),
        // todoItems() {
        // return this.$store.getters.storeTodoItems;
        // },
    },
};
</script>

<style scoped>
ul {
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0;
    text-align: left;
}
li {
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
}
.checkBtn {
    line-height: 45px;
    /* color: black; */
    color: #62acde;
    margin-right: 5px;
}
.checkBtnCompleted {
    /* color: #62acde; */
    color: black;
}
.textCompleted {
    text-decoration: line-through;
}
.removeBtn {
    margin-left: auto;
    color: #de4343;
}
/* 리스트 아이템 트랜지션 효과 */
.list-enter-active,
.list-leave-active {
    transition: all 1s; /*트랜지션이 1초 정도 유지됨 */
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
}
</style>
