import { EventEmitter } from 'events'
import _ from 'lodash'
import TodoArty from './TodoArty'
import Immutable from 'Immutable'

import AppDispatcher from '../dispatcher/AppDispatcher'
import { ActionTypes } from '../constants/TodoConstants'

let _todos = {};

const CHANGE_EVENT = 'CHANGE';

let rootBinding = TodoArty.getMoreartyContent().getBinding()
let itemsBinding = rootBinding.sub('list')

function create(text) {
  itemsBinding.update((todos) => {
    return todos.push(Immutable.Map({
      id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
      text: text,
      complete: false,
      editing: false,
    }))
  })
}

function update(id, title) {
  let itemIndex = itemsBinding.get().findIndex((item) => {
    return item.get('id') === id
  })

  let itemBinding = itemsBinding.sub(itemIndex)
  itemBinding
    .atomically()
    .set('title', title)
    .set('editing', false)
    .commit();
}

function onToggle(id, checked) {
  let itemIndex = itemsBinding.get().findIndex((item) => {
    return item.get('id') === id
  })

  let itemBinding = itemsBinding.sub(itemIndex)
  itemBinding.atomically().set('complete', checked).commit()
}

function onToggleAll(checked) {
  this.itemsBinding.update((items) => {
    return items.map((item) => {
      return item.set('complete', checked)
    })
  })
}

function destroy(id) {
  delete _todos[id]

  let itemIndex = itemsBinding.get().findIndex((item) => {
    return item.get('id') === id
  })

  this.itemsBinding.delete(itemIndex)
}

function destroyCompleted() {
  itemsBinding.update((items) => {
    return items.filter((item) => {
      return !item.get('complete')
    })
  })
}

const TodoStores = _.assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

})

TodoStores.dispatchToken = AppDispatcher.register(action => {
  let text;
  switch(action.actionType) {
    case ActionTypes.TODO_CREATE:
      text = action.text.trim()
      if (text !== '') {
        create(text)
        TodoStores.emitChange()
      }
      break

    case ActionTypes.TODO_DESTROY_COMPLETED:
      destroyCompleted()
      TodoStores.emitChange()
      break

    case ActionTypes.TODO_TOGGLE_COMPLETE:
      onToggle(action.id, action.checked);
      TodoStores.emitChange()
      break

    case ActionTypes.TODO_UPDATE_TEXT:
      text = action.text.trim()
      if (text !== '') {
        update(action.id, text)
        TodoStores.emitChange()
      }
      break

    case ActionTypes.TODO_DESTROY:
      destroy(action.id);
      TodoStores.emitChange()
      break

    case ActionTypes.TODO_TOGGLE_COMPLETE_ALL:
      onToggleAll(action.checked)
      TodoStores.emitChange()
      break

    default:
  }
})

export default TodoStores;
