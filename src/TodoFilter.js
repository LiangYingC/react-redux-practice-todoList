import React from 'react';
import { connect } from 'react-redux';

function ToDoFilter(props) {
    const { showFilter } = props
    return (
        <div id="todo_filter">
            <div className="wrap">
                <button id="filter_all_btn" onClick={() => { showFilter('all') }}>全部項目</button>
                <button id="filter_undo_btn" onClick={() => { showFilter('undo') }}>未完成項目</button>
                <button id="filter_done_btn" onClick={() => { showFilter('done') }}>已完成項目</button>
            </div>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        showFilter: (filterType) => dispatch({
            type: 'SET_VISIBILITY_FILTER',
            todoFilter: `${filterType}`
        })
    }
}

export default connect(null, mapDispatchToProps)(ToDoFilter)
