<template>
    <div class="inputBox shadow">
        <!-- v-model은  input에 입력된 값을 동적으로 바로바로  vue인스턴스 안에 매핑하는 역할-->
        <!-- v-model을 사용하기 위해서는 특정데이터와 연결시켜줘야 함
        즉, input에 입력된 값이 vue 인스턴스의 특정 데이터와 매핑 -->
        <!-- 여기서는 newTodoItem이라는 뷰인스턴스의 데이터와 매핑 -->
        <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo" />
        <!-- v-on:click="클릭했을 때 동작할 메소드 이름" -->
        <span class="addContainer">
            <i class="fa-solid fa-plus addBtn" v-on:click="addTodo"></i>
        </span>
        <Modal v-if="showModal" @close="showModal = false">
            <!--
        you can use custom content here to overwrite
        default content : 너가 원하는 content를 이용해서 이 모달을 다시 재정의할 수 있다는 것을 의미
    -->
            <!-- modal에 있는 header부분을 가져와서 이렇게 수정된 것을 의미함
                <div class="modal-header">
                    <h3 slot=header">
                        경고
                    </h3>
                <div>
            -->
            <h3 slot="header">
                <!-- custom header -->
                경고!
                <i
                    class="closeModalBtn fa-solid fa-xmark"
                    @click="showModal = false"
                ></i>
            </h3>
            <h3 slot="body">무언가를 입력하세요.</h3>
            <h3 slot></h3>
        </Modal>
    </div>
</template>

<script>
//Modal 컴포넌트에 대한 기능을 Modal이라는 객체 에 넣어줌
import AlertModal from "./common/AlertModal.vue";
export default {
    data: function () {
        return {
            // 새로운 목록을 생성할 때 todoInput만의 새로운 데이터인 newTodoItem를 바로 todoItem에 추가해주는 것이 좋음
            newTodoItem: "",
            showModal: false,
        };
    },
    methods: {
        addTodo: function () {
            //여기서 this는 todoInput을 가르킴
            //TodoHeader, TodoInput, TodoList, TodoFooter은 App.vue에 등록이 되어있고 이 App.vue는 main.js에 등록이 되어있음 결과적으로 App하나에 등록
            // console.log(this.newTodoItem);
            //여기서 문제점 --> 바로바로 아래 todolist에 반영이 되지 않고 새로고침을 눌러야 반영이 됨 --> 이유 : todoLIst와 todoInput이 연결되어있지 않기 때문
            //여기에 저장하는 로직
            if (this.newTodoItem !== "") {
                //지금 바로 위 컴포넌트인 App.vue로 newTodoItem을 보내줘야 함
                //이유 : todoList를 바로 업데이트 하기 위해서는 App.vue로 입력된 목록을 보내서 다시 TodoList로 내려줘야 하기 때문
                // this.$emit('이벤트 이름', 인자1, 인자2, 인자3,,,,)
                //$emit을 하게되면 todoInput이라는 컴포넌트에서 addTodoItem이라는 이벤트를 발생시킴, 그리고 그게  App.vue로 올라와서 매핑시키면 메서드가 실행됨
                this.$emit("addTodoItem", this.newTodoItem);
                this.clearInput();
            } else {
                this.showModal = true;
            }
        },
        clearInput: function () {
            this.newTodoItem = "";
        },
    },
    components: {
        //위의 Modal 객체를 Modal태그에 연결
        Modal: AlertModal,
    },
};
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
    background: linear-gradient(to right, #6478fb, #8763fb);
    display: block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
}
.addBtn {
    color: white;
    vertical-align: middle;
}
.closeModalBtn {
    color: #42b983;
}
</style>
