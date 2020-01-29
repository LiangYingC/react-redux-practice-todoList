import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

ReactDom.render(<App />, document.getElementById('root'))

/*
一、Redux 核心概念
    // 定義 reducer，內部包含 state & action，可以想像 reducer 是 stateChanger（Maker）
    function reducer (state, action) {
        初始化 state 和 switch case
    }

    // 以 reducer 生成 store
    const store = createStore(reducer)

    // 監聽 store 內部 state 是否改變
    store.subscribe(() => renderApp(store.getState()))

    // 首次渲染畫面
    renderApp(store.getState())

    // 將要改變的 state & action 加在 dispatch 中，讓頁面隨著資料而更新
    store.dispatch(...)
        舉例而言：
            store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
            store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
*/