import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'

const App = ({todos, actions}) => (
  <div>
    <Header addNewTodo={actions.addNewTodo} />
    <MainSection todos={todos} actions={actions} />
  </div>
)

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  todos: state.todos
})

const mapDispachToProps = dispach => ({
  actions: bindActionCreators(TodoActions, dispach)
})

export default connect (
  mapStateToProps,
  mapDispachToProps
)(App)
