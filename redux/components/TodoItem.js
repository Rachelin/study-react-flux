import React, { PropTypes, Component } from 'react'
import TodoTextInput from './TodoTextInput'

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completedTodo: PropTypes.func.isRequired,
  }

  state = {editing: false}

  handleSave(text) {
    if (text.length) {
      this.props.editTodo(this.props.todo.id, text)
      this.setState({editing: false})
    }
  }

  handleEditingText() {
    this.setState({editing: true})
  }

  renderEditInput() {
    const { id, text } = this.props.todo

    return (
      <TodoTextInput
        newTodo={ false }
        onSave={ this.handleSave.bind(this) }
        placeholder={ text } />
    )
  }

  renderItemShow() {
    const { todo, editTodo, deleteTodo, completedTodo } = this.props

    return (
      <div className="view">
        <input className="toggle"
          type="checkbox"
          checked={ todo.completed }
          onChange={ () => completedTodo(todo.id) } />
        <label onDoubleClick= { () => this.handleEditingText() } >{ todo.text }</label>
        <button className="destroyItem"
          onClick={ () => deleteTodo(todo.id) }>
          X
        </button>
      </div>
    )
  }

  render() {
    return (
      <li className="view">
        {
          this.state.editing ? this.renderEditInput() : this.renderItemShow()
        }
      </li>
    )
  }
}
