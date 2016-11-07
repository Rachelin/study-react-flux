import * as c from '../contants/TodoList'

const initialState = [
  {
    id: 0,
    text: 'First my task',
    completed: false,
  }
]

export default function todos(state = initialState, action) {
  switch (action.type) {
    case c.ADD_NEW_TODO:
      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          text: action.text,
          compeleted: false,
        },
        ...state
      ]
      break

    case c.EDIT_TODO:
      return state.map((todo) =>
        (todo.id === action.id) ?
          { ...todo, text: action.text } :
          todo
      )
      break

    case c.DELETE_TODO:
      return state.filter((todo) => {
        return todo.id !== action.id
      })
      break

    case c.COMPLETED_TODO:
      return state.map((todo) =>
        (todo.id === action.id) ?
          { ...todo, completed : !todo.completed } :
          todo
      )
      break

    case c.TOGGLE_COMPLETED_ALL_TODO:
      const isAllMarked = state.every(todo => todo.completed)
      console.log(isAllMarked)
      return state.map((todo) => ({
        ...todo, completed : !isAllMarked
      }))
      break

    case c.CLEAR_COMPLETED:
      return state.filter((todo) => {
        return !todo.completed
      })
      break

    default:
      return state
  }
}
