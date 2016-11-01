import React, { Component } from 'react';
import TodoActions from '../actions/TodoActions';
import TodoItem from './TodoItem.jsx';

class MainList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (Object.keys(this.props.allTodos).length < 1) {
      return null
    }

    let allTodos = this.props.allTodos
    let todos = []

    for(let key in allTodos) {
      todos.push(<TodoItem key={key} todo={allTodos[key]} />);
    }

    return (
      <section className="show-list">
        <input
          id="toggle-all"
          type="checkbox"
          onChange={this._onToggleCpmpleteAll.bind(this)}
          checked={this.props.areAllComplete ? 'checked' : ''}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul>
          {todos}
        </ul>
      </section>
    );
  }

  _onToggleCpmpleteAll() {
    TodoActions.toggleCompleteAll()
  }
}

MainList.propTypes = {
  allTodos: React.PropTypes.object.isRequired,
  areAllComplete: React.PropTypes.bool.isRequired
}


export default MainList;
