/**
 * @jsx React.DOM
 */

window.data = {}

var App = React.createClass({
  getInitialState: function() {
    return ({
      data: window.data
    })
  },

  render: function() {
    return (
      <div>Hello, components.</div>
    )
  }
})

React.renderComponent(App(), document.getElementById('app'))
