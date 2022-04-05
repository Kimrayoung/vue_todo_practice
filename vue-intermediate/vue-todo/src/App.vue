<template>
  <div id="app">
    <TodoHeader></TodoHeader> <!--여기에 뿌려지는 내용은 TodoHeader.vue안에 있는 내용-->
    <!-- <TodoInput v-on:하위 컴포넌트에서 발생시킨 이벤트 이름="현재 컴포넌트의 메서드 명"></TodoInput> -->
    <!-- 로직 :  todoInput에서 입력 버튼을 클릭하면 addTodo가 동작함 그리고 this.$emit에서 addTodoItem이 발동하면서 인자가 딸려올라감
    즉, 이벤트가 발생하면서 해당 함수가 상위 컴포넌트로 올라감, 그리고 상위컴포넌트에 매핑된 함수가 실행될 것 -->
    <TodoInput v-on:addTodoItem="addOneItem"></TodoInput>
    <!-- <TodoList v-bind:내려보낼 프롭스 속성 이름="현재 위치 컴포넌트 데이터 속서"></TodoList> -->
    <!-- removeItem이라는 이벤트가 발생했을때 removeOneItem이라는 함수가 실행이 될 것 -->
    <TodoList v-bind:propsdata="todoItems" v-on:removeItem="removeOneItem" v-on:toggleItem="toggleOneItem"></TodoList>
    <TodoFooter v-on:clearAll="clearAllItems"></TodoFooter>
  </div>
</template>

<script>
//import를 한 것은 컴포넌트 파일을 가져온 것을 의미함 따로 해당 컴포넌트를 사용하기 위해서는 컴포넌트를 아래에 등록해주는 것이 필요하다
//컴포넌트 파일 가져옴
//컴포너트의 todoHeader파일을 가져와서 TodoHeader에 담겠다는 것을 의미함
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'

export default {
  data: function() {
    return {
      todoItems: []
    }
  },
  methods: {
    addOneItem: function(todoItem) {
      let obj = {
                    completed: false, //check되어있는지 아닌지 확인하는 불린값
                    item : todoItem
                };
      localStorage.setItem(todoItem, JSON.stringify(obj)); //stringify는 자바스크립트 객체를 스트링의 형태로 변환
      this.todoItems.push(obj);
    },
    removeOneItem: function(todoItem, index) {
      localStorage.removeItem(todoItem.item); //key랑 value값이 동일하므로  상관없음,물론 key값을 기준으로 지움
            //localstorage와 스크립트 영역은 분리되어있는 부분이기 때문에 지워지는 것등이 바로 보이지 않는다 바로 보기위해서는 따로 작업이 필요하다
      this.todoItems.splice(index, 1); //기준 배열을 변경 --> 이게 특정 아이템을 지우는 부분
    },
    toggleOneItem : function(todoItem, index) {
      // todoItem.completed = !todoItem.completed; //이 데이터는 App.vue에서 프롭스로 todoInput에 내린 후 데이터가 생기고 이걸 다시 TodoList에 넣어주고 이 넣어준 데이터 중에 하나를 조작하는 것
      //App.vue가 컨테이너의 성격을 가지고 있기 때문에 데이터에 직접적으로 접근해서 조작하는 것이 좋다
      //컴포넌트 간의 경계를 명확하게 하는 것을 의미함
      this.todoItems[index].completed = !this.todoItems[index].completed;
            //로컬스토리지의 데이터를 갱신
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    clearAllItems: function() {
      localStorage.clear();
      this.todoItems = [];
    }
  },
  //인스턴스가 생성되자마자 호출되는 라이프스타일 훅
    //훅이란? 생성되는 시점에 안의 내용이 한 번 호출됨
  created: function() {
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                // this.todoItems.push(localStorage.key(i)); //이거는 localstorage해서 바로 해당 키값을 todolist에 넣는 것
                //로컬스토리지에 있는 아이템이 App.vue에 있는 todoItems에서 관리됨
                //그리고 이걸 todoList에서 사용하기 위해서는 todoList로 데이터를 내려주는 과정이 필요함 --> v-bind속성 사용
                if (localStorage.key(i) !== 'loglevel:wepack-dev-server') {
                    this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i)))) //해당 키에 해당 하는 것을 가져와서 this.todoItems에 넣는 것(그리고 가져와지는 것은 string값)
                }
            }
        }
    },
  //컴포넌트 등록
  components: {
    //컴포넌트 태그명 :  컴포넌트 내용
    'TodoHeader' : TodoHeader,  //TodoHeader이라는 컴포넌트를 들고와서 TodoHeader이라는 태그에 넣은 것을 의미함
    'TodoInput' : TodoInput,
    'TodoList' : TodoList,
    'TodoFooter' : TodoFooter,
  }
}
</script>

<style>
  body {
    text-align: center;
    background-color: #F6F6F8;
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
