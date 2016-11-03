import React, { Component } from 'react'
import Morearty from 'morearty'
import reactMixin from 'react-mixin'

import TodoArty from '../stores/TodoArty'
import TodoActions from '../actions/TodoActions'
import TodoItem from './TodoItem.jsx'

// @reactMixin.decorate(Morearty.Mixin)

class MainList extends Component {

  render() {
    let {binding} = this.props
    let nowShowing = binding.get('nowShowing')
    let itemsBinding = binding.sub('list')
    let items = itemsBinding.get()
    const NOW_SHOWING = TodoArty.getShowingConfig()

    let isShown = (item) => {
      switch (nowShowing) {
        case NOW_SHOWING.ALL:
          return true;
        case NOW_SHOWING.ACTIVE:
          return !item.get('complete')
        case NOW_SHOWING.COMPLETED:
          return item.get('complete')
      }
    }

    let renderTodo = (item, index) => {
      let itemBinding = itemsBinding.sub(index)
      return isShown(item) ?
        <TodoItem binding={ itemBinding } key={ itemBinding.get('id') } />
        : null
    }

    let allCompleted = !items.find((item) => {
      return !item.get('complete')
    })

    return (
      <section id="main">

      {
        items.count() ?
          <Morearty.DOM.input id="toggle-all"
            type="checkbox"
            onChange={ this._onToggleCompleteAll }
            checked={ allCompleted } /> :
          null
      }

        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul> { items.map(renderTodo).toArray() }</ul>
      </section>
    );
  }

  _onToggleCompleteAll(event) {
    TodoActions.toggleCompleteAll(event.target.checked)
  }
}

export default MainList;
