var React = require("react")

var Editable = React.createClass({
  render: function() {
    var autofocus = this.props.newItem ? true : null;

    return (
      <input className="editable"
        onKeyPress={this.props.handleKeypress}
        contentEditable
        autoFocus={autofocus}
        defaultValue={this.props.children}>
      </input>
    )
  }
})

module.exports = Editable
