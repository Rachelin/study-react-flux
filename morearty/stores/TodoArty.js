import Morearty from 'morearty'
import Immutable from 'Immutable'

export class TodoArty {
  constructor() {
    let state = {
      nowShowing: 'all',
      list: [{
        id: 1,
        text: 'My first task',
        complete: false,
      }]
    }
    this.ctx = Morearty.createContext(state, {}, {})
    this.NOW_SHOWING = Object.freeze({
      ALL: 'all',
      ACTIVE: 'active',
      COMPLETED: 'complete',
    })

  }

  getMoreartyContent() {
    return this.ctx
  }

  getShowingConfig() {
    return this.NOW_SHOWING
  }

}

export default new TodoArty()
