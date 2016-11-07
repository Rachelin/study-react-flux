import React, { PropTypes, Component } from 'react'
import TodoTextInput from './TodoTextInput'

export default class Header extends Component {
  static propTypes = {
    addNewTodo: PropTypes.func.isRequired,
  }

  handleSave(text) {
    if(text.length) {
      this.props.addNewTodo(text)
    }
  }

  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <TodoTextInput
          newTodo
          onSave={this.handleSave.bind(this)}
          placeholder="What needs to ben done?" />
      </header>
    )
  }
}
