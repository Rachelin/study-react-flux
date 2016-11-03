import React, { Component } from 'react'
import { Router } from 'director'
import Morearty from 'morearty'
import reactMixin from 'react-mixin'

import TodoArty from '../stores/TodoArty'
import TodoStore from '../stores/TodoStores'
import Footer from './Footer.jsx'
import MainList from './MainList.jsx'
import Head from './Head.jsx'

// @reactMixin.decorate(Morearty.Mixin)

class Todo extends Component {
  componentDidMount() {
    let binding = this.getDefaultBinding()
    const NOW_SHOWING = TodoArty.getShowingConfig()
    Router({
      '/': binding.set.bind(binding, 'nowShowing', NOW_SHOWING.ALL),
      '/active': binding.set.bind(binding, 'nowShowing', NOW_SHOWING.ACTIVE),
      '/complete': binding.set.bind(binding, 'nowShowing', NOW_SHOWING.COMPLETED),
    }).init()

    TodoStore.addChangeListener(this._onChange.bind(this))
  }

  _onChange() {}

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange.bind(this))
  }

  render() {
    let binding = this.getDefaultBinding()
    return (
      <div>
        <Head binding={binding} />
        <MainList binding={binding} />
        <Footer binding={binding}/>
      </div>
    );
  }
}

// export default Todo;

export default reactMixin.onClass(Todo, Morearty.Mixin);

