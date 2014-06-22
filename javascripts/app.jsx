/**
 * @jsx React.DOM
 */

window.data = {
  tree: [{
    name: 'Lists TODO',
    children: [{
      name: '[x] Rendering of nested lists',
      children: [{
        name: '[x] Just to verify multiple levels of nesting',
        children: []
      }]
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

var Item = React.createClass({
  render: function() {
    return (
      <div className="list-item">
        <div className="list-item--name">
          {this.props.name}
        </div>
        <div className="list-item--children">
          <Tree nodes={this.props.children} />
        </div>
      </div>
    )
  }
})

var Tree = React.createClass({
  render: function() {
    var items = this.props.nodes.map(function(item) {
      return (<Item name={item.name} children={item.children} />)
    })

    return (
      <div className="list-tree">
        {items}
      </div>
    )
  }
})

var App = React.createClass({
  getInitialState: function() {
    return ({data: {}})
  },

  componentWillMount: function() {
    this.setState({data: window.data})
  },

  render: function() {
    return (
      <div className="list">
        <Tree nodes={this.state.data.tree} />
      </div>
    )
  }
})

React.renderComponent(App(), document.getElementById('app'))
