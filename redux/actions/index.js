import * as types from '../contants/TodoList'

export const addNewTodo = text => ({ type: types.ADD_NEW_TODO, text })
export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text })
export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const completedTodo = id => ({ type: types.COMPLETED_TODO, id })
export const toggleCompletedAllTodo = () => ({ type: types.TOGGLE_COMPLETED_ALL_TODO })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })


