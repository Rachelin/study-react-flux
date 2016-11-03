import React, { Component } from 'react'
import Morearty from 'morearty'
import reactMixin from 'react-mixin'

import TodoArty from '../stores/TodoArty'
import TodoActions from '../actions/TodoActions'

// @reactMixin.decorate(Morearty.Mixin)

class Footer extends Component {
  render() {
    // let binding = this.getDefaultBinding()
    let {binding} = this.props
    let nowShowing = binding.get('nowShowing')

    let items = binding.get('list')
    let completed = items.reduce((acc, item) => {
      return item.get('complete') ? acc + 1 : acc
    }, 0)
    let left = items.count() - completed

    let clearCompletedButton
    if (completed) {
      clearCompletedButton =
        <button id="clear-completed"
          onClick={this._onClearCompletedClick}>
          Clear completed ({completed})
        </button>
    }

    const NOW_SHOWING = TodoArty.getShowingConfig()
    return (
      <footer id="footer">
        <span id="todo-count">
          <strong>
            { left }
          </strong>
            {left > 1 ? 'items' : 'item' } <em>left</em>
        </span>
        <ul id='filters'>
          <li>
            <a className={ nowShowing === NOW_SHOWING.ALL ? 'selected' : ''}
              href='#/'>All</a>
          </li>
          <li>
            <a className={ nowShowing === NOW_SHOWING.ACTIVE ? 'selected' : ''}
              href='#/active'>ACTIVE</a>
          </li>
          <li>
            <a className={ nowShowing === NOW_SHOWING.COMPLETED ? 'selected' : ''}
              href='#/complete'>COMPLETED</a>
          </li>
        </ul>
        {clearCompletedButton}
      </footer>
    );
  }

  _onClearCompletedClick() {
    TodoActions.destroyCompleted()
  }
}


export default Footer;
