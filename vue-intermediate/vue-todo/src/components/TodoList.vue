<template>
    <div>
        <transition-group name="list" tag="ul">
            <!-- v-bind:key는 중복되지 않는 텍스트가 키가 되어서  중복되지 않는 선에서 키가 유일해서 vue-for의 성능을 가속화-->
            <!-- 여기서 index는 v-for의 고유의 문법으로 몇 번째인지 인덱스 번호를 부여해준다 -->
            <!-- 즉, v-for안에서 todoItem과 index로 데이터를 접근할 수 있다 -->
            <li
                v-for="(todoItem, index) in this.$store.state.todoItems"
                v-bind:key="todoItem.item"
                class="shadow"
            >
                <!-- 하나의 리스트가 만들어질 때마다 아래의 내용이 동일하게 입력되므로 어떤 리스트의 데이터를 눌러도 아래의 내용이 똑같이 작동됨 -->
                <!-- 위해서 토글을 눌러서 completed상태로 하게 된다면 v-on:click에 의해서 toggleComplete가 실행됨 -->
                <!-- 체크박스를 클릭하면 toggleComplete라는 이벤트가 발생, 즉, 토글이 클릭했을때 이벤트를 toggleComplete라고 이름 짓은 것을 의미 -->
                <i
                    class="checkBtn fa-solid fa-check"
                    v-bind:class="{ checkBtnCompleted: todoItem.completed }"
                    v-on:click="toggleComplete(todoItem, index)"
                ></i>
                <!-- v-bind:class은 기존의 html속성에다가  동적인 값을 부여하는 것을 의미함
                즉, 여기서는 todoItem.completed에 따라서 속성이 부여됨, 만약에 completed가 false이면 이 class는 없어짐 true라면 textCompleted만 남아서 속성이 적용됨-->
                <span v-bind:class="{ textCompleted: todoItem.completed }">{{
                    todoItem.item
                }}</span>
                <span
                    class="removeBtn"
                    v-on:click="removeTodo(todoItem, index)"
                >
                    <i class="fa-solid fa-trash-can"></i>
                </span>
            </li>
        </transition-group>
    </div>
</template>

<script>
export default {
    methods: {
        removeTodo(todoItem, index) {
            //즉, 삭제하라는 클릭이벤트를 removeItem이라는 이름으로 받아줌, 그리고 App.vue에 넘겨줌 그리고 App.vue는 이 이벤트를 받으면 매핑된 함수를 실행시켜준다.
            //클릭이 되면 removeTodo라는 함수가 발생되고 removeItem이라는 이름의 이벤트가 발생한다 그리고 App.vue에서 이 이벤트를 removeOneItem으로 받는다.
            // this.$emit("removeItem", todoItem, index);
            // console.log(todoItem);
            //즉, 이 함수에서 removeOneItem이라는 이벤트를 발생시킨다, 그리고 이 이벤트가 todoItem과 index를 인자로 넘겨줌
            //이 removeOneItem이라는 이벤트를 store.js에서 removeOneItem
            //commit -> mutation을 동작시키기 위한 api
            //{todoItem, index} ==> const obj= {todoItem : todoItem , index : index}
            this.$store.commit("removeOneItem", { todoItem, index });
        },
        toggleComplete(todoItem, index) {
            //할 일 완료 기능
            // this.$emit("toggleItem", todoItem, index);
            //여기에서는 app.vue에 이벤트를 연결시켜주는 과정 필요없이 바로 store.js의 이벤트와 바로 매핑을 시켜주면 됨
            this.$store.commit("toggleOneItem", { todoItem, index });
        },
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
