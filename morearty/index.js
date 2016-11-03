
import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './components/Todo.jsx';
import TodoArty from './stores/TodoArty'

let Bootstrap = TodoArty.getMoreartyContent().bootstrap(Todo)

ReactDOM.render(<Bootstrap />, document.getElementById('root'));
