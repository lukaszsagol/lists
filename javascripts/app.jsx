/**
 * @jsx React.DOM
 */

var Utils = {
  uuid: function () {
    var i, random;
    var uuid = '';

    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }

      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
              .toString(16);
    }

    return uuid;
  },
}

window.data = {
  nodes: [{
    id: Utils.uuid(),
    name: 'Lists TODO',
    nodes: [{
      id: Utils.uuid(),
      name: '[x] Rendering of nested lists',
      nodes: [{
        id: Utils.uuid(),
        name: '[x] Just to verify multiple levels of nesting',
        nodes: []
      }]
    },{
      id: Utils.uuid(),
      name: '[x] Adding new items',
      nodes: []
    },{
      id: Utils.uuid(),
      name: '[ ] Saving the state',
      nodes: []
    },{
      id: Utils.uuid(),
      name: '[ ] Indenting/unindenting lists',
      nodes: []
    },{
      id: Utils.uuid(),
      name: '[ ] Editing current items',
      nodes: []
    }]
  },{
    id: Utils.uuid(),
    name: 'Second top level list',
    nodes: [{
      id: Utils.uuid(),
      name: 'Added just in case',
      nodes: []
    }]
  }]
}

var Item = React.createClass({
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
            newItem={this.props.newNode}
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

var Tree = React.createClass({
  render: function() {
    var items = this.props.nodes.map(function(item, i) {
      return (
        <Item
          key={item.id}
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

React.renderComponent(App(), document.getElementById('app'))
