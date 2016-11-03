import React, { Component } from 'react'
import Morearty from 'morearty'
import reactMixin from 'react-mixin'

import TodoArty from '../stores/TodoArty'
import TodoActions from '../actions/TodoActions'
// @reactMixin.decorate(Morearty.Mixin)

class TodoItem extends Component {
  // componentDidMount() {
  //   let ctx = TodoArty.getMoreartyContent()
  //   let {binding} = this.props
  //   if (ctx.isChanged(binding.sub('editing'))) {
  //     let node = this.refs.editField
  //     debugger;
  //     node.focus()
  //     node.setSelectionRange(0, node.value.length)
  //   }
  // }

  constructor(props) {
    super(props)
    this.editing = false
  }
  render() {
    let {binding} = this.props
    let item = binding.get()

    // let liClass = React.addons.classSet({
    //   completed: item.get('complete'),
    //   editing: item.get('editing')
    // })

    let title = item.get('text')
    return (
      <li className="demo">
        <div className="view">
          <Morearty.DOM.input className="toggle"
            type="checkbox"
            checked={ item.get('complete') }
            onChange={this._onToggleCompleted}/>
          <label onDoubleClick={this._onToggleEditing.bind(this, true)}>
            {title}
          </label>
          <button className="destroy" onClick={this._onDestroyClick}>x</button>
        </div>

        {
          this.editing ?
          <Morearty.DOM.input className="edit"
            ref="editField"
            value={title}
            onChange={ Morearty.Callback.set(binding, 'title') }
            onKeyDown={ Morearty.Callback.onEnter(this._onSave) }
            onBlur={ this._onToggleEditing.bind(this, false) } />
          : null
        }

      </li>
    )
  }

  _onToggleCompleted(event) {
    let {binding} = this.props
    let id = binding.get('id')
    TodoActions.toggleComplete(id, event.target.checked);
  }

  _onToggleEditing(editing) {
    let {binding} = this.props
    binding.set('editing', editing)
    console.log("==> in editing", editing)
  }

  _onSave(event) {
    let text = event.target.value
    TodoActions.updateText(text)
  }

  _onDestroyClick() {
    let {binding} = this.props
    let id = binding.get('id')
    TodoActions.destroy(id)
  }
}

export default TodoItem
