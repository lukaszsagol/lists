/**
 * @jsx React.DOM
 */

window.data = {
  nodes: [{
    name: 'Lists TODO',
    nodes: [{
      name: '[x] Rendering of nested lists',
      nodes: [{
        name: '[x] Just to verify multiple levels of nesting',
        nodes: []
      }]
    },{
      name: '[x] Adding new items',
      nodes: []
    },{
      name: '[ ] Indenting/unindenting lists',
      nodes: []
    },{
      name: '[ ] Editing current items',
      nodes: []
    }]
  },{
    name: 'Second top level list',
    nodes: [{
      name: 'Added just in case',
      nodes: []
    }]
  }]
}

var Item = React.createClass({
  componentDidMount: function(a) {
    if (this.props.newNode) {
      this.refs.inputField.getDOMNode().focus()
    }
  },

  handleKeypress: function(ev) {
    if (ev.which == 13 && !ev.shiftKey) {
      this.props.addNode()
      ev.preventDefault()
    }
  },

  render: function() {
    return (
      <div className="list-item">
        <div className="list-item--name">
          <Editable
            ref="inputField"
            handleKeypress={this.handleKeypress}>
            {this.props.name}
          </Editable>
        </div>
        <div className="list-item--nodes">
          <Tree
            nodes={this.props.nodes}
            addNode={this.props.addNode} />
        </div>
      </div>
    )
  }
})

var Editable = React.createClass({
  render: function() {
    return (
      <div className="editable"
        onKeyPress={this.props.handleKeypress}
        contentEditable>
        {this.props.children}
      </div>
    )
  }
})

var Tree = React.createClass({
  render: function() {
    var items = this.props.nodes.map(function(item, i) {
      return (
        <Item
          name={item.name}
          nodes={item.nodes}
          newNode={item.newNode}
          addNode={this.props.addNode.bind(null, i)} />)
    }.bind(this))

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

  addNode: function() {
    var path = Array.prototype.slice.call(arguments, 0)
    var position = path.pop()

    var tree = this.state.data
    var root = tree

    for (i in path) {
      root = root.nodes[path[i]]
    }

    root.nodes.splice(position + 1, 0, this.newNode())

    this.setState({data: tree})
  },

  newNode: function() {
    return ({
      name: '',
      nodes: [],
      newNode: true
    })
  },

  render: function() {
    return (
      <div className="list">
        <Tree nodes={this.state.data.nodes} addNode={this.addNode}/>
      </div>
    )
  }
})

React.renderComponent(App(), document.getElementById('app'))
