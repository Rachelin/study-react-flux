import React, { Component } from 'react'
import Morearty from 'morearty'
import reactMixin from 'react-mixin'

import TodoActions from '../actions/TodoActions'

class Head extends Component {

  componentDidMount() {
    // this.newTodo.focus();
  }

  _onSave(event) {
    let text = event.target.value
    if (text.trim()) {
      TodoActions.create(text)
      event.target.value = ''
    }
  }

  render() {
    return (
      <header id="header">
        <h1>TODOS</h1>
        <Morearty.DOM.input id="new-todo"
          ref={(c) => this.newTodo = c}
          placeholder="What you want to do?"
          onKeyDown={ Morearty.Callback.onEnter(this._onSave) } />
      </header>
    );
  }
}

export default reactMixin.onClass(Head, Morearty.Mixin)
