<template>
  <div id="app">
    <TodoHeader></TodoHeader> <!--여기에 뿌려지는 내용은 TodoHeader.vue안에 있는 내용-->
    <TodoInput></TodoInput>
    <TodoList></TodoList>
    <TodoFooter></TodoFooter>
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
