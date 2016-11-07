import React, { PropTypes, Component } from 'react'

export default class TodoTextInput extends Component {
  static propTypes = {
    newTodo: PropTypes.bool,
    placeholder: PropTypes.string,
    editing: PropTypes.bool,
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
  }

  state = {
    text: this.props.text || ''
  }

  handleSubmit = e => {
    const text = e.target.value.trim()
    if (e.which === 13) {
      this.props.onSave(text)
      if (this.props.newTodo) {
        this.setState({ text: '' })
      }
    }
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
  }

  handleBlur = e => {
    if (!this.props.newTodo) {
      this.props.onSave(e.target.value)
    }
  }

  render() {
    return (
      <input
        type="text"
        value={ this.state.text }
        onBlur={ this.handleBlur }
        onChange={ this.handleChange }
        onKeyDown={ this.handleSubmit }
        placeholder={ this.props.placeholder }/>
    )
  }
}
