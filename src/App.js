import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ToDoInput from './ToDoInput';
import ToDoList from './ToDoList';
import ToDoFilter from './TodoFilter';
import './style.css';

const HANDLE_INPUT_VALUE = 'HANDLE_INPUT_VALUE'
const ADD_TODO = 'ADD_TODO'
const UPDATE_TODO = 'UPDATE_TODO'
const DELETE_TODO = 'DELETE_TODO'
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'


const initialState = { // 初始化 state
    todoList: [],
    todoValue: '',
    todoId: '1', // 作為唯一的 key & id 使用，最初為 1
    todoFilter: 'all' // 作為 filter 狀態判斷，最初為 all
}

function todoReducer(state = initialState, action) {
    switch (action.type) {
        case HANDLE_INPUT_VALUE:
            return {
                ...state,
                todoValue: action.todoValue // object spread 用法（ES7)，不會改變原本 state，也可以用 object.assign
            }
        case ADD_TODO:
            if (state.todoValue !== "") {
                return {
                    ...state,
                    todoList: [...state.todoList, { // 陣列解構方法（Array destructuring）
                        todoId: state.todoId,
                        todoContent: state.todoValue,
                        isCompleted: false
                    }],
                    todoValue: '',
                    todoId: `${Number(state.todoId) + 1}`
                }
            } else {
                alert('請勿填入空值喔 ！')
            }
        case UPDATE_TODO:
            return {
                ...state,
                todoList: state.todoList.map(todo => {
                    if (todo.todoId === action.todoId) {
                        todo.isCompleted = !todo.isCompleted
                        return todo
                    } else {
                        return todo
                    }
                })
            }
        case DELETE_TODO:
            let confirmDelete = confirm('確定要刪除嗎？')
            if (confirmDelete) {
                return {
                    ...state,
                    todoList: state.todoList.filter(todo => {
                        todo.todoId !== action.todoId
                    })
                }
            }
        case SET_VISIBILITY_FILTER:
            return {
                ...state,
                todoFilter: action.todoFilter
            }
        default:
            return state
    }
}
const store = createStore(todoReducer)

function App(props) { // 宣告名為 App 的 class ，繼承 React 提供的 Component
    return (
        <Provider store={store}>
            <section id="todo_area" >
                <h1>To Do List React Redux</h1>
                <ToDoInput />
                <ToDoList />
                <ToDoFilter />
            </section >
        </Provider>
    )
}

export default App;




/*
1. connect
    【 Connect function 是一個高階函式，接受一個 child component 作為參數，與另一個參數 mapStateToProps / mapDispatchToProps， 前者得知要從 store 取出什麼 state，
       放入 child component 的 prop 中 ; 後者負責邏輯的操作，將 user 對 child component 的操作轉為 Action 傳送。】
    (1) Connect is a higher-order function, which is a fancy way of saying it returns a function when you call it.
    (2) Calling that function with a component returns a new (wrapped) component.
    (3) What connect does is hook into Redux, pull out the entire state (from Store),
        and pass it through the mapStateToProps function that you provide.

2.  Provider
    【 Provider component 會讓包覆之下的所有 component 能利用 connect function 從 store 提取 state 成 prop。】
    (1) Redux holds the global state for the entire app, and by wrapping the entire app with the Provider component from react-redux,
        every component in the app tree will be able to use connect to access the Redux store if it wants to.
    (2) Provider thing might seem like total magic right now. It is a little bit; it actually uses React’s “context” feature under the hood.
    (3) Provider needs a store to work with. It’ll take the store as a prop, but we need to create one first.

3. reducer
    (1) Redux makes zero assumptions about the shape of your state. It’s up to you.
    (2) We have to provide a function that will return the state. That function is called a reducer.
    (3) The Reducer Should Always Return Something,
        created a reducer function to tell Redux what our state should look like.

4. Presentational component (UI)
    (1) 负责 UI 的呈现，不带有任何业务逻辑
    (2) 没有状态（即不使用this.state这个变量）
    (3) 所有数据都由参数（this.props）提供
    (4) 不使用任何 Redux 的 API
    (5) UI 组件又称为「纯组件」，即它纯函数一样，纯粹由参数决定它的值

5. Container component
    (1) 负责管理数据和业务逻辑，不负责 UI 的呈现
    (2) 带有内部状态
    (3) 使用 Redux 的 API
    (4) UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑

*/