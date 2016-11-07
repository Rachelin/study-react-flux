import React, { PropTypes, Component } from 'react'
import TodoItem from './TodoItem'
import Footer from './Footer'
import { ALL, ACTIVE, COMPLETED } from '../contants/Filters.js'

const TODO_FILTERS = {
  [ALL]: () => true,
  [ACTIVE]: todo => !todo.completed,
  [COMPLETED]: todo => todo.completed,
}

export default class MainSection extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  }

  state = {
    filter: ALL
  }

  renderToggleAll(completedCount) {
    const { todos, actions } = this.props
    const todoAmount = todos.length

    if ( todoAmount ) {
      return (
        <div>
          <input type="checkbox"
            checked={ completedCount === todoAmount }
            id="toggle-completed"
            onChange={ actions.toggleCompletedAllTodo }/>
          <lable>Mark all tasks completed.</lable>
        </div>
      )
    }
  }

  handleShow = filter => {
    this.setState({ filter })
  }

  handleClearCompleted() {
    this.props.actions.clearCompleted()
  }

  renderFooter(completedCount) {
    const { todos } = this.props
    const { filter } = this.state
    const activeCount = todos.length - completedCount

    return (
      <Footer completedCount={ completedCount }
              activeCount ={ activeCount }
              filter={ filter }
              onShow={ this.handleShow.bind(this) }
              onClearCompleted={ this.handleClearCompleted.bind(this) }
              />
    )
  }

  render() {
    const { todos, actions } = this.props
    const { filter } = this.state
    const filters = todos.filter(TODO_FILTERS[filter])
    const completedCount = todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    )
    return (
      <section className="main-wrap">
        { this.renderToggleAll(completedCount) }
        <ul className="todo-list">
          {
            filters.map(todo =>
              <TodoItem todo={ todo } key={ todo.id } { ...actions } />
            )
          }
        </ul>

        { this.renderFooter(completedCount) }
      </section>
    )
  }
}
