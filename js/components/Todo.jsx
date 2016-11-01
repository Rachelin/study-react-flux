import React, { Component } from 'react'
import TodoStore from '../stores/TodoStores'

import Footer from './Footer.jsx'
import MainList from './MainList.jsx'
import Head from './Head.jsx'

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = this.getTodoState()
  }

  getTodoState() {
    return {
      allTodos: TodoStore.getAll(),
      areAllComplete: TodoStore.areAllComplete()
    }
  }

  componentDidMount() {
    TodoStore.addChangeListener(this._onChange.bind(this))
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange.bind(this))
  }

  render() {
    return (
      <div>
        <Head />
        <MainList
          allTodos={this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
        />
        <Footer allTodos={this.state.allTodos} />
      </div>
    );
  }

  _onChange() {
    this.setState(this.getTodoState())
  }
}

export default Todo;
