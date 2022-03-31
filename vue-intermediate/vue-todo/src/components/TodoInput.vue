<template>
    <div class="inputBox shadow"> 
        <!-- v-model은  input에 입력된 값을 동적으로 바로바로  vue인스턴스 안에 매핑하는 역할-->
        <!-- v-model을 사용하기 위해서는 특정데이터와 연결시켜줘야 함
        즉, input에 입력된 값이 vue 인스턴스의 특정 데이터와 매핑 -->
        <!-- 여기서는 newTodoItem이라는 뷰인스턴스의 데이터와 매핑 -->
        <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
        <!-- v-on:click="클릭했을 때 동작할 메소드 이름" -->
        <span class="addContainer">
            <i class="fa-solid fa-plus addBtn" v-on:click="addTodo"></i>
        </span>
    </div>
</template>

<script>
export default {
    data : function() {
        return {
            newTodoItem: ""
        }
    },
    methods: {
        addTodo: function(){
            //여기서 this는 todoInput을 가르킴
            //TodoHeader, TodoInput, TodoList, TodoFooter은 App.vue에 등록이 되어있고 이 App.vue는 main.js에 등록이 되어있음 결과적으로 App하나에 등록
            // console.log(this.newTodoItem);
            //여기서 문제점 --> 바로바로 아래 todolist에 반영이 되지 않고 새로고침을 눌러야 반영이 됨 --> 이유 : todoLIst와 todoInput이 연결되어있지 않기 때문
            //여기에 저장하는 로직
            if (this.newTodoItem !== '') {
                let obj = {
                    completed: false, //check되어있는지 아닌지 확인하는 불린값
                    item : this.newTodoItem
                };
                localStorage.setItem(this.newTodoItem, JSON.stringify(obj)); //stringify는 자바스크립트 객체를 스트링의 형태로 변환
                this.clearInput();
            }
            
        },
        clearInput: function () {
            this.newTodoItem = '';
        }

    }
}
</script>

<style scoped>
input:focus {
    outline: none;
}
.inputBox {
    background: white;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
}
.inputBox input {
    border-style: none;
    font-size: 0.9rem;
}
.addContainer {
    float: right;
    background: linear-gradient(to right, #6478FB, #8763FB);
    display: block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
}
.addBtn {
    color: white;
    vertical-align: middle;
}
</style>