import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'
import { ALL, ACTIVE, COMPLETED } from '../contants/Filters.js'


const FILTERS_TITLE = {
  [ALL]: 'All',
  [ACTIVE]: 'Active',
  [COMPLETED]: 'Completed',
}

export default class Footer extends Component {
  static propTypes = {
    completedCount: PropTypes.number.isRequired,
    activeCount: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired,
    onShow: PropTypes.func.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
  }

  renderFilterLink(filter) {
    const { filter: selectedFilter, onShow } = this.props
    const title = FILTERS_TITLE[filter]

    return(
      <a className={ classnames({ selected: selectedFilter === filter })}
          onClick={ () => onShow(filter) }>
          { title }
          { selectedFilter === filter ?
            <em>*</em> : '' }
      </a>
    )
  }

  renderCountInfo() {
    const { activeCount } = this.props
    const items = activeCount > 1 ? 'items' : 'item'

    return (
      <span>
        <strong>{ activeCount }</strong> { items } left
      </span>
    )
  }

  renderCompletedInfo() {
    const { completedCount, onClearCompleted } = this.props

    if (completedCount) {
      return (
        <button type="text"
                onClick={ onClearCompleted }>
          Clear { completedCount } completed tasks
        </button>
      )
    }

  }

  render() {
    return (
      <footer>
        { this.renderCountInfo() }
        <ul className="filter-list">
          {[ ALL, ACTIVE, COMPLETED ].map(filter =>
            <li key={filter}>
              { this.renderFilterLink(filter) }
            </li>
          )}
        </ul>
        { this.renderCompletedInfo() }
      </footer>
    )
  }
}
