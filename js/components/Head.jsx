import React, { Component } from 'react';
import TodoActions from '../actions/TodoActions';
import TodoTextInput from './TodoTextInput.jsx'

class Head extends Component {
  render() {
    return (
      <header id="header">
        <h1>TODOS</h1>
        <TodoTextInput
          id="new-todo"
          placeholder="What you want to do?"
          onSave={this._onSave} />
      </header>
    );
  }

  _onSave(text) {
    if (text.trim()) {
      TodoActions.create(text);
    }
  }
}


export default Head;
