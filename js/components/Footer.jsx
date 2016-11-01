import React, { Component } from 'react';
import TodoActions from '../actions/TodoActions'

class Footer extends Component {
  render() {
    let allTodos = this.props.allTodos
    let total = Object.keys(allTodos).length

    if (total === 0) {
      return null
    }

    let completed = 0
    for (let key in allTodos) {
      if (allTodos[key].complete) {
        completed++;
      }
    }

    let itemsLeft = total - completed
    let itemsLeftPhrase = itemsLeft === 1 ? ' item' : 'items'
    itemsLeftPhrase += 'left'

    let clearCompletedButton
    if (completed) {
      clearCompletedButton =
        <button
          id="clear-completed"
          onClick={this._onClearCompletedClick}>
          Clear completed ({completed})
        </button>
    }

    return (
      <footer id="footer">
        <span id="todo-count">
          <strong>
            {itemsLeft}
          </strong>
            {itemsLeftPhrase}
        </span>
        {clearCompletedButton}
      </footer>
    );
  }

  _onClearCompletedClick() {
    TodoActions.destroyCompleted()
  }
}


export default Footer;
