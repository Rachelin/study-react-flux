import AppDispatcher from '../dispatcher/AppDispatcher';
import { ActionTypes } from '../constants/TodoConstants';

let TodoActions = {
  create(text) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TODO_CREATE,
      text: text,
    })
  },

  toggleComplete(todo) {
    let id = todo.id;
    let actionType = todo.complete ?
        ActionTypes.TODO_UNDO_COMPLETE :
        ActionTypes.TODO_COMPLETE;

    AppDispatcher.dispatch({
      actionType: actionType,
      id: id
    });
  },

  toggleCompleteAll() {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TODO_TOGGLE_COMPLETE_ALL,
    })
  },

  destroyCompleted() {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TODO_DESTROY_COMPLETED,
    })
  },

  complete(id) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TODO_COMPLETE,
      id: id,
    })
  },

  undoComplete(id) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TODO_UNDO_COMPLETE,
      id: id,
    })
  },

  updateText(text) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TODO_UPDATE_TEXT,
      text: text,
    })
  },

  destroy(id) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TODO_DESTROY,
      id: id,
    })
  },
}
export default TodoActions;
