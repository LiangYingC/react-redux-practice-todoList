import React, { Component } from 'react';
import { connect } from 'react-redux';

function ToDoInput(props) {
    const { todoValue, handleInputValue, addToDo } = props
    return (
        <div id="todo_input-area">
            <input type="text" id="todo_input" onChange={handleInputValue} value={todoValue} placeholder="輸入 ToDo 事項" />
            <button id="add_todo_btn" onClick={addToDo}>Add ToDo</button>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        todoValue: state.todoValue
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleInputValue: () => dispatch({
            type: 'HANDLE_INPUT_VALUE',
            todoValue: todo_input.value
        }),
        addToDo: () => dispatch({
            type: 'ADD_TODO',
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoInput)

// 將 couter component 傳入 connect function 並回傳新的 couter component，
// 其 prop 中帶有 mapStateToProps function 中所要的 state。

