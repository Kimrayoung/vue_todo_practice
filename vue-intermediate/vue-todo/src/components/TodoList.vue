<template>
    <div>
        <ul>
            <!-- v-bind:key는 중복되지 않는 텍스트가 키가 되어서  중복되지 않는 선에서 키가 유일해서 vue-for의 성능을 가속화-->
            <!-- 여기서 index는 v-for의 고유의 문법으로 몇 번째인지 인덱스 번호를 부여해준다 -->
            <!-- 즉, v-for안에서 todoItem과 index로 데이터를 접근할 수 있다 -->
            <li v-for="(todoItem, index) in todoItems" v-bind:key="todoItem.item" class="shadow">
                <i class="checkBtn fa-solid fa-check" v-bind:class="{checkBtnCompleted: todoItem.completed}" v-on:click="toggleComplete(todoItem, index)"></i>
                <!-- 하나의 리스트가 만들어질 때마다 아래의 내용이 동일하게 입력되므로 어떤 리스트의 데이터를 눌러도 아래의 내용이 똑같이 작동됨 -->
                <span v-bind:class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</span>
                <!-- v-bind:class은 기존의 html속성에다가  동적인 값을 부여하는 것을 의미함
                즉, 여기서는 todoItem.completed에 따라서 속성이 부여됨, 만약에 completed가 false이면 이 class는 없어짐 true라면 textCompleted만 남아서 속성이 적용됨-->
                <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">
                    <i class="fa-solid fa-trash-can"></i>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data : function() {
        return {
            todoItems: []
        }
    },
    //인스턴스가 생성되자마자 호출되는 라이프스타일 훅
    //훅이란? 생성되는 시점에 안의 내용이 한 번 호출됨
    created: function() {
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                // this.todoItems.push(localStorage.key(i)); //이거는 localstorage해서 바로 해당 키값을 todolist에 넣는 것
                this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i)))) //해당 키에 해당 하는 것을 가져와서 this.todoItems에 넣는 것(그리고 가져와지는 것은 string값)
            }
        }
    },
    methods: {
        removeTodo: function(todoItem, index) {
            // console.log(todoItem, index);
            localStorage.removeItem(todoItem); //key랑 value값이 동일하므로  상관없음,물론 key값을 기준으로 지움
            //localstorage와 스크립트 영역은 분리되어있는 부분이기 때문에 지워지는 것등이 바로 보이지 않는다 바로 보기위해서는 따로 작업이 필요하다
            this.todoItems.splice(index, 1); //기준 배열을 변경 --> 이게 특정 아이템을 지우는 부분
        },
        toggleComplete: function(todoItem, index) {
            todoItem.completed = !todoItem.completed;
            //로컬스토리지의 데이터를 갱신
            localStorage.removeItem(todoItem.item);
            localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
        }
    }
}
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
</style>