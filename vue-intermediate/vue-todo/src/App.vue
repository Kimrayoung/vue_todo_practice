<template>
    <div id="app">
        <TodoHeader></TodoHeader>
        <!--여기에 뿌려지는 내용은 TodoHeader.vue안에 있는 내용-->
        <!-- <TodoInput v-on:하위 컴포넌트에서 발생시킨 이벤트 이름="현재 컴포넌트의 메서드 명"></TodoInput> -->
        <!-- 로직 :  todoInput에서 입력 버튼을 클릭하면 addTodo가 동작함 그리고 this.$emit에서 addTodoItem이 발동하면서 인자가 딸려올라감
    즉, 이벤트가 발생하면서 해당 함수가 상위 컴포넌트로 올라감, 그리고 상위컴포넌트에 매핑된 함수가 실행될 것 -->
        <TodoInput></TodoInput>
        <!-- <TodoList v-bind:내려보낼 프롭스 속성 이름="현재 위치 컴포넌트 데이터 속서"></TodoList> -->
        <!-- removeItem이라는 이벤트가 발생했을때 removeOneItem이라는 함수가 실행이 될 것 -->
        <TodoList></TodoList>
        <TodoFooter></TodoFooter>
    </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";

export default {
    //여기서 이제 todoItems가 변경이 일어나지 않기 때문에 필요없음
    // data: function () {
    //     return {
    //         todoItems: [],
    //     };
    // },
    //컴포넌트 등록
    components: {
        //컴포넌트 태그명 :  컴포넌트 내용
        TodoHeader, //TodoHeader이라는 컴포넌트를 들고와서 TodoHeader이라는 태그에 넣은 것을 의미함
        TodoInput,
        TodoList,
        TodoFooter,
    },
};
</script>

<style>
body {
    text-align: center;
    background-color: #f6f6f8;
}
input {
    border-style: groove;
    width: 200px;
}
button {
    border-style: groove;
}
.shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
