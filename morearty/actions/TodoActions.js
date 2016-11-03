import AppDispatcher from '../dispatcher/AppDispatcher';
import { ActionTypes } from '../constants/TodoConstants';

let TodoActions = {
  create(text) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TODO_CREATE,
      text: text,
    })
  },

  toggleComplete(id, checked) {
    AppDispatcher.dispatch({
      actionType: TODO_TOGGLE_COMPLETE,
      id: id,
      checked: checked
    });
  },

  toggleCompleteAll(checked) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TODO_TOGGLE_COMPLETE_ALL,
      checked: checked
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
