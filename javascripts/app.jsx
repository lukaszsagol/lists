/**
 * @jsx React.DOM
 */

window.data = {
  tree: [{
    name: 'Lists TODO',
    children: [{
      name: '[ ] Rendering of nested lists',
      children: []
    },{
      name: '[ ] Adding new items',
      children: []
    },{
      name: '[ ] Indenting/unindenting lists',
      children: []
    },{
      name: '[ ] Editing current items',
      children: []
    }]
  },{
    name: 'Second top level list',
    children: [{
      name: 'Added just in case',
      children: []
    }]
  }]
}

var App = React.createClass({
  getInitialState: function() {
    return ({data: {}})
  },
  componentWillMount: function() {
    this.setState({data: window.data})
  },
  render: function() {
    return (
      <div>Hello, components.</div>
    )
  }
})

React.renderComponent(App(), document.getElementById('app'))
