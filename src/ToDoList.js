import React from 'react';
import { connect } from 'react-redux';

function ToDoList(props) {
    const { todoList, todoFilter, updateToDo, deleteToDo } = props
    return (
        <div id="todo_list">
            <div className="wrap">
                {
                    todoList.filter(todo => { // 先用 filter 狀態篩過需要呈現的 ToDo
                        if (todoFilter === 'undo') {
                            return todo.isCompleted === false
                        } else if (todoFilter === 'done') {
                            return todo.isCompleted === true
                        } else {
                            return todo
                        }
                    }).map(todo => { // render 篩選過後的 ToDo
                        return (
                            <div className="todo_item" key={todo.todoId} id={todo.todoId}>
                                <div className={`todo_icon ${todo.isCompleted ? 'todo_icon--green' : ''}`}>{todo.isCompleted ? 'O' : 'X'}</div>
                                <div className="todo_content">{todo.todoContent}</div>
                                <button className="todo_status_btn" onClick={() => { updateToDo(todo.todoId) }}>{todo.isCompleted ? 'Undo' : 'Done'}</button>
                                <button className="todo_delete_btn" onClick={() => { deleteToDo(todo.todoId) }}>Delete</button>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}

function mapStateToProps(state) {
    return {
        todoList: state.todoList,
        todoFilter: state.todoFilter
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateToDo: (id) => dispatch({
            type: 'UPDATE_TODO',
            todoId: id
        }),
        deleteToDo: (id) => dispatch({
            type: 'DELETE_TODO',
            todoId: id
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList)