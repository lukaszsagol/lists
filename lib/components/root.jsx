var React = require("react")
var Utils = require("../utils")
var Tree = require("./item").Tree

var Root = React.createClass({
  getInitialState: function() {
    return ({data: {}})
  },

  componentWillMount: function() {
    this.setState({data: this.props.store.getData()})
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
      id: Utils.uuid(),
      name: '',
      nodes: [],
      newNode: true
    })
  },

  render: function() {
    return (
      <div className="list">
        <Tree nodes={this.state.data.nodes} addNode={this.addNode} key="root" />
      </div>
    )
  }
})

module.exports = Root
