import { EventEmitter } from 'events';
import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import { ActionTypes } from '../constants/TodoConstants';

let _todos = {};

const CHANGE_EVENT = 'CHANGE';

function create(text) {
  let id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _todos[id] = {
    id: id,
    complete: false,
    text: text
  };
}

function update(id, updates) {
  _todos[id] = Object.assign({}, _todos[id], updates)
}

function updateAll(updates) {
  for (let id in _todos) {
    update(id, updates)
  }
}

function destroy(id) {
  delete _todos[id]
}

function destroyCompleted() {
  for (let id in _todos) {
    if (_todos[id].complete) {
      destroy(id)
    }
  }
}

const TodoStores = _.assign({}, EventEmitter.prototype, {
  areAllComplete() {
    for (let i in _todos) {
      if(!_todos[i].complete) {
        return false;
      }
    }
    return true;
  },

  getAll() {
    return _todos;
  },

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

    case ActionTypes.TODO_COMPLETE:
      update(action.id, {complete: true});
      TodoStores.emitChange()
      break

    case ActionTypes.TODO_UNDO_COMPLETE:
      update(action.id, {complete: false});
      TodoStores.emitChange()
      break

    case ActionTypes.TODO_UPDATE_TEXT:
      text = action.text.trim()
      if (text !== '') {
        update(action.id, {text: text})
        TodoStores.emitChange()
      }
      break

    case ActionTypes.TODO_DESTROY:
      destroy(action.id);
      TodoStores.emitChange()
      break

    case ActionTypes.TODO_TOGGLE_COMPLETE_ALL:
      if (TodoStores.areAllComplete()) {
        updateAll({complete: false})
      } else {
        updateAll({complete: true})
      }
      TodoStores.emitChange()
      break

    default:
  }
})

export default TodoStores;
