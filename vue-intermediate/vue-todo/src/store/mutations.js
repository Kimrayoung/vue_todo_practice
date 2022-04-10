const addOneItem = (state, todoItem) => {
    let obj = {
        completed: false, //check되어있는지 아닌지 확인하는 불린값
        item: todoItem,
    };
    localStorage.setItem(todoItem, JSON.stringify(obj)); //stringify는 자바스크립트 객체를 스트링의 형태로 변환
    //mutations에서 state를 접근하는 방법은 state를 인자로 받아서 접근함
    state.todoItems.push(obj); //state에 잇는 todoItems에 데이터를 넣어준다는 것
};
const removeOneItem = (state, payload) => {
    localStorage.removeItem(payload.todoItem.item);
    state.todoItems.splice(payload.index, 1);
};
const toggleOneItem = (state, payload) => {
    //payload라는 이름으로 객체를 받음
    state.todoItems[payload.index].completed =
        !state.todoItems[payload.index].completed;
    //로컬스토리지의 데이터를 갱신
    localStorage.removeItem(payload.todoItem.item);
    localStorage.setItem(
        payload.todoItem.item,
        JSON.stringify(payload.todoItem)
    );
};
const clearAllItems = (state) => {
    localStorage.clear();
    state.todoItems = [];
};

export { addOneItem, removeOneItem, toggleOneItem, clearAllItems };
